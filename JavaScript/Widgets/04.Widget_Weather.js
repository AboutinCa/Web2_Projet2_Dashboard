import CreateElement from "../Utilities/00.Create_Element.js";
import Widget_Container from "./00.Widget_Container.js";
import Dashboard from "../Dashboard.js";
import LocalSave from "../Utilities/01.Local_Save.js";

const DashboardNode = document.getElementById("Dashboard");
const WeatherIcon = document.getElementById("WeatherWidget");

class Widget_Weather {
  constructor(Index, Id, ParentNode) {
    this.index = Index;
    this.id = Id;
    this.content = this.createWidget(ParentNode);
  }

  createWidget(parent) {
    const container = CreateElement.createDiv(
      `WeatherContainer${this.index}`,
      "weather-widget",
      parent
    );
    parent.setAttribute("data-type", "weather-widget");

    const title = document.createElement("h3");
    title.textContent = "Météo actuelle";
    container.appendChild(title);

    const input = CreateElement.createInput(
      `WeatherInput${this.index}`,
      "weather-input",
      "text",
      "city",
      "Entrez une ville (ex: Chicoutimi)",
      container
    );

    const button = CreateElement.createButton(
      `WeatherButton${this.index}`,
      "widget-btn color-flax opacity50",
      "Afficher la météo",
      null,
      container
    );

    const result = CreateElement.createDiv(
      `WeatherResult${this.index}`,
      "weather-result",
      container
    );

    button.addEventListener("click", () => {
      const city = input.value.trim();
      if (city) {
        this.getWeatherByCity(city, result);
      } else {
        result.textContent = "Veuillez entrer une ville valide.";
      }
    });

    const lastCity = localStorage.getItem("LastWeatherCity");
    if (lastCity) {
      input.value = lastCity;
      this.getWeatherByCity(lastCity, result);
    }

    input.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        event.preventDefault();
        button.click();
      }
    });

    this.input = input;
    this.result = result;
  }

  async getWeatherByCity(city, result) {
    try {
      localStorage.setItem("LastWeatherCity", city);

      result.innerHTML = "";
      const spinner = document.createElement("div");
      spinner.className = "weather-spinner";
      result.appendChild(spinner);

      const coords = await this.getCoordinates(city);
      if (!coords) {
        result.textContent = "Ville introuvable.";
        return;
      }

      const { latitude, longitude } = coords;
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=weathercode,temperature_2m_min,temperature_2m_max&timezone=auto`
      );

      const data = await response.json();
      const weather = data.current_weather;

      const dailyWeather = data.daily.weathercode.slice(1, 7); //jours 1 à 6 (on skip aujourd’hui et j'ignore le jour actuel +7)
      const tempsMin = data.daily.temperature_2m_min.slice(1, 7);
      const tempsMax = data.daily.temperature_2m_max.slice(1, 7);
      const moyennes = tempsMin.map((min, i) =>
        Math.round((min + tempsMax[i]) / 2)
      ); //moyenne des températures min et max pour un jour donné

      const emoji = this.weatherCodeToEmoji(weather.weathercode);
      result.innerHTML = ""; //enlève le spinner
      result.textContent = `${city} ► ${weather.temperature}°C ${emoji}`;
      const dayLabels = this.getNext6DaysLabels().join("    ");
      const forecastIcons = dailyWeather
        .map(code => this.weatherCodeToEmoji(code))
        .join("  ");

      //tableau météo
      const table = document.createElement("table");
      table.style.marginTop = "10px";
      table.style.borderCollapse = "collapse";
      table.style.width = "100%";
      table.style.textAlign = "center";
      table.style.fontFamily = "monospace";

      //row1 lettres des jours
      const rowDays = document.createElement("tr");
      this.getNext6DaysLabels().forEach(letter => {
        const cell = document.createElement("td");
        cell.textContent = letter;
        rowDays.appendChild(cell);
      });

      //row2  emojis
      const rowIcons = document.createElement("tr");
      dailyWeather.forEach(code => {
        const cell = document.createElement("td");
        cell.textContent = this.weatherCodeToEmoji(code);
        rowIcons.appendChild(cell);
      });

      //row3 températures moyennes
      const rowTemps = document.createElement("tr");
      moyennes.forEach(temp => {
        const cell = document.createElement("td");
        cell.textContent = `${temp}°C`;
        cell.style.fontSize = "11px";
        rowTemps.appendChild(cell);
      });

      //section d'append
      table.appendChild(rowDays);
      table.appendChild(rowIcons);
      table.appendChild(rowTemps);
      result.appendChild(table);
    } catch (error) {
      console.error(error);
      result.textContent = "Erreur lors de la récupération de la météo";
    }
  }

  async getCoordinates(city) {
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        city
      )}&count=1`
    );
    const geoData = await geoRes.json();
    if (geoData && geoData.results && geoData.results.length > 0) {
      return {
        latitude: geoData.results[0].latitude,
        longitude: geoData.results[0].longitude,
      };
    }
    return null;
  }

  weatherCodeToEmoji(code) {
    if ([0].includes(code)) return "☀️";
    if ([1, 2].includes(code)) return "⛅";
    if ([3].includes(code)) return "☁️";
    if ([45, 48].includes(code)) return "🌫️";
    if ([51, 53, 55].includes(code)) return "🌦️";
    if ([61, 63, 65].includes(code)) return "🌧️";
    if ([71, 73, 75].includes(code)) return "❄️";
    if ([95, 96, 99].includes(code)) return "⛈️";
    return "🌈";
  }
  getNext6DaysLabels() {
    const jours = ["D", "L", "M", "M", "J", "V", "S"];
    const today = new Date().getDay(); //0 =dimanche
    const rotated = [];
    for (let i = 1; i <= 6; i++) {
      rotated.push(jours[(today + i) % 7]); //je veux que mon app montre le jour de demain en premier
    }
    return rotated;
  }
}

export default Widget_Weather;

let newWidget = () => {
  Dashboard.widgetID++;
  let containerId = `Widget${Dashboard.widgetIndex}`;
  let widgetId = `Weather${Dashboard.widgetIndex}`;

  new Widget_Container(
    Dashboard.widgetIndex,
    containerId,
    DashboardNode,
    "Météo"
  );

  new Widget_Weather(
    Dashboard.widgetID,
    widgetId,
    document.getElementById(`Widget${Dashboard.widgetIndex}`)
  );
};

let assignEvent = () => {
  WeatherIcon.addEventListener("click", () => {
    newWidget();
    LocalSave.saveDashboard();
  });
};
document.addEventListener("DOMContentLoaded", assignEvent);
