function newRow(name, slider, percent) {
  let row = document.createElement("div");
  row.className = "row";
  name.className = "name";
  slider.type = "range";
  percent.className = "percent";

  let setValue = function () {
    slider.setAttribute("value", slider.value);
  };
  let updatePercent = function () {
    percent.innerHTML = slider.value;
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

function listEditor(numLabels) {
  let editor, submitButton;

  editor = document.createElement("form");
  editor.id = "editor";
  for (let i = 0; i < numLabels; i++) {
    let name = document.createElement("input");
    name.setAttribute("data-lpignore", "true");
    name.type = "text";
    let slider = document.createElement("input");
    let percent = document.createElement("p");
    editor.appendChild(newRow(name, slider, percent));
  }

  submitButton = document.createElement("button");
  submitButton.innerHTML = "Submit";
  editor.appendChild(submitButton);

  editor.addEventListener("submit", event => {
    event.preventDefault();
    generateList(editor.id);
  })

  return editor;
}

function generateListFromListEditor(editorId) {
  let list, numLabels, i;

  list = document.createElement("div");
  list.id = "result";

  numLabels = document.getElementById(editorId).childElementCount - 1;

  for (i = 0; i < numLabels; i++) {
    let row, name, progress, percent;

    row = document.getElementById(editorId).childNodes[i].childNodes;
    
    name = document.createElement("p");
    name.innerHTML = row[0].value;

    progress = document.createElement("progress");
    progress.value = row[1].value / 100;

    percent = document.createElement("p");
    percent.innerHTML = (Number(row[2].innerHTML).toString() * 100) + "%";
    
    list.appendChild(newRow(name, progress, percent));
  }

  return list;
}

function generate(node) {
  if (document.getElementById(node.id)) {
    document.body.removeChild(document.getElementById(node.id));
    document.body.appendChild(node);
  } else {
    document.body.appendChild(node);
  }
  return node;
}

function generateEditor(numLabelsId) {
  let editor, numLabels;
  numLabels = document.getElementById(numLabelsId);
  editor = generate(listEditor(numLabels.value));
  numLabels.value = "";
  return editor;
}

function generateList(editorId) {
  return generate(generateListFromListEditor(editorId));
}