// Creation of HTML elements using JavaScript
const CreateElement = {
  createDiv(divId, divClass, parent = document.body) {
    const newDiv = document.createElement("div");
    newDiv.id = divId;
    newDiv.classList = divClass;

    parent.appendChild(newDiv);
    return newDiv;
  },
  createH3(id, classList, content, parent = document.body) {
    const newH3 = document.createElement("h3");
    newH3.id = id;
    newH3.classList = classList;
    newH3.textContent = content;

    parent.appendChild(newH3);
    return newH3;
  },
  createPara(paraId, paraClass, paraContent, parent = document.body) {
    const newPara = document.createElement("p");
    newPara.id = paraId;
    newPara.classList = paraClass;
    newPara.textContent = paraContent;

    parent.appendChild(newPara);
    return newPara;
  },
  createButton(btnId, btnClass, btnText, callback, parent = document.body) {
    const newBtn = document.createElement("button");
    newBtn.id = btnId;
    newBtn.classList = btnClass;
    newBtn.textContent = btnText;
    newBtn.addEventListener("click", callback);
    parent.appendChild(newBtn);
    return newBtn;
  },
  createLabel(labelId, labelClass, labelText, parent = document.body) {
    const newLabel = document.createElement("label");
    newLabel.id = labelId;
    newLabel.classList = labelClass;
    newLabel.textContent = labelText;

    parent.appendChild(newLabel);
    return newLabel;
  },
  createInput(
    inputId,
    inputClass,
    inputType,
    inputName,
    inputPlaceH,
    parent = document.body
  ) {
    const newInput = document.createElement("input");
    newInput.id = inputId;
    newInput.classList = inputClass;
    newInput.type = inputType;
    newInput.name = inputName;
    newInput.placeholder = inputPlaceH;

    parent.appendChild(newInput);
    return newInput;
  },
};

export default CreateElement;
