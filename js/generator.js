let myNumberInput = document.createElement("input");
myNumberInput.setAttribute("type", "number");

let myNumberInputSubmitBtn = document.createElement("button");
myNumberInputSubmitBtn.innerHTML = "Set number of labels";

function newRow(name, slider, percent) {
  let row = document.createElement("div");
  row.className = "row";
  name.className = "name";
  slider.type = "range";
  percent.className = "percent";

  let setValue = function () {
    slider.setAttribute("value", slider.value)
  };
  let updatePercent = function () {
    percent.innerHTML = slider.value
  };
  let sliderEvent = function () {
    setValue();
    updatePercent();
  };
  sliderEvent();
  slider.addEventListener("change", event => {
    sliderEvent();
  });

  row.appendChild(name);
  row.appendChild(slider);
  row.appendChild(percent);

  return row;
}

function listEditor(numPeople) {
  let myListEditor = document.createElement("form");
  myListEditor.id = "myListEditor";
  for (let i = 0; i < numPeople; i++) {
    let name = document.createElement("input");
    name.setAttribute("data-lpignore", "true");
    name.type = "text";
    let slider = document.createElement("input");
    let percent = document.createElement("p");
    myListEditor.appendChild(newRow(name, slider, percent));
  }

  let myCreateBtn = document.createElement("button");
  myCreateBtn.innerHTML = "Create";
  myListEditor.appendChild(myCreateBtn);

  myListEditor.addEventListener("submit", event => {
    event.preventDefault();
    generateList();
  })

  return myListEditor;
}

function generatedList() {
  let myGeneratedList = document.createElement("div");
  myGeneratedList.id = "myGeneratedList";

  let numPeople = document.getElementById("myListEditor").childElementCount - 1;

  for (let i = 0; i < numPeople; i++) {
    let row = document.getElementById("myListEditor").childNodes[i].childNodes;
    let name = document.createElement("p");
    name.innerHTML = row[0].value;
    let slider = document.createElement("input");
    slider.value = row[1].value;
    let percent = document.createElement("p");
    percent.innerHTML = row[2].innerHTML;
    myGeneratedList.appendChild(newRow(name, slider, percent));
  }

  return myGeneratedList;
}

function generate(id, node) {
  if (document.getElementById(id)) {
    document.body.removeChild(document.getElementById(id));
    document.body.appendChild(node);
  } else {
    document.body.appendChild(node);
  }
  myNumberInput.value = "";
  return false;
}

function generateEditor() {
  return generate("myListEditor", listEditor(myNumberInput.value));
}

function generateList() {
  return generate("myGeneratedList", generatedList());
}

let myForm = document.createElement("form");
myForm.addEventListener("submit", event => {
  event.preventDefault();
  generateEditor();
});
myForm.appendChild(myNumberInput);
myForm.appendChild(myNumberInputSubmitBtn);
document.body.appendChild(myForm);