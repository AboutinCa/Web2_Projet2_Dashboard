// Creation of HTML elements using JavaScript
const CreateElement = {
  createDiv(divId, divClass, parentNode = document.body) {
    const newDiv = document.createElement("div");
    newDiv.id = divId;
    newDiv.classList = divClass;

    parentNode.appendChild(newDiv);
    return newDiv;
  },
  createH3(id, classList, content, parentNode = document.body) {
    const newH3 = document.createElement("h3");
    newH3.id = id;
    newH3.classList = classList;
    newH3.textContent = content;

    parentNode.appendChild(newH3);
    return newH3;
  },
  createPara(paraId, paraClass, paraContent, parentNode = document.body) {
    const newPara = document.createElement("p");
    newPara.id = paraId;
    newPara.classList = paraClass;
    newPara.textContent = paraContent;

    parentNode.appendChild(newPara);
    return newPara;
  },
  createButton(btnId, btnClass, btnText, callback, parentNode = document.body) {
    const newBtn = document.createElement("button");
    newBtn.id = btnId;
    newBtn.classList = btnClass;
    newBtn.textContent = btnText;
    newBtn.addEventListener("click", callback);
    parentNode.appendChild(newBtn);
    return newBtn;
  },
  createLabel(labelId, labelClass, labelText, parentNode = document.body) {
    const newLabel = document.createElement("label");
    newLabel.id = labelId;
    newLabel.classList = labelClass;
    newLabel.textContent = labelText;

    parentNode.appendChild(newLabel);
    return newLabel;
  },
  createInput(
    inputId,
    inputClass,
    inputType,
    inputName,
    inputPlaceH,
    parentNode = document.body
  ) {
    const newInput = document.createElement("input");
    newInput.id = inputId;
    newInput.classList = inputClass;
    newInput.type = inputType;
    newInput.name = inputName;
    newInput.placeholder = inputPlaceH;

    parentNode.appendChild(newInput);
    return newInput;
  },

  createTextArea(
    id, 
    className, 
    placeholder, 
    parent) 
  {
    const textArea = document.createElement("textarea");
    textArea.id = id;
    textArea.className = className;
    textArea.placeholder = placeholder;
    parent.appendChild(textArea);
    return textArea;
  },

  createElementWithText(tag, text, parent) {
    const el = document.createElement(tag);
    el.textContent = text;
    if (parent) parent.appendChild(el);
    return el;
  },
};

export default CreateElement;
