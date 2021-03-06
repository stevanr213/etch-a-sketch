const slider = document.querySelector(".slider");
const label = document.querySelector("label");
const canvas = document.querySelector(`.canvas`);
const buttons = document.querySelectorAll(".btn");
const colorPicker = document.querySelector("#color");
const clearBtn = document.querySelector("#clear");

// generate grid
function removeGrid() {
  const n = canvas.children.length;
  for (let i = 0; i < n; i++) {
    canvas.removeChild(canvas.firstChild);
  }
}

let cells;

function generateGrid(number) {
  removeGrid();
  canvas.style["grid-template-columns"] = `repeat(${number}, 1fr)`;
  for (let i = 0; i < numOfCells; i++) {
    let cell = document.createElement("div");
    cell.style["background-color"] = "white";
    cell.classList.add("cell");
    canvas.appendChild(cell);
  }
  cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => cell.addEventListener("mouseover", paint));
  return cells;
}

// slider
label.textContent = `${slider.value} x ${slider.value}`;
let numOfCells = parseInt(slider.value) * parseInt(slider.value);
cells = generateGrid(slider.value);

slider.addEventListener("mousemove", (event) => {
  label.textContent = `${event.target.value} x ${event.target.value}`;
});

slider.addEventListener("change", (event) => {
  numOfCells = parseInt(event.target.value) * parseInt(event.target.value);
  cells = generateGrid(event.target.value);
});

// buttons
buttons.forEach((button) => button.addEventListener("click", btnClicked));
function btnClicked() {
  for (let i = 0; i < buttons.length; i++) {
    if (
      this.textContent != buttons[i].textContent &&
      buttons[i].classList.contains("btn-check")
    ) {
      buttons[i].classList.remove("btn-check");
    }
  }
  if (!this.classList.contains("btn-check")) {
    this.classList.add("btn-check");
  } else {
    this.classList.remove("btn-check");
  }
}

clearBtn.addEventListener("click", clear);

// painting
function paint() {
  const rainbow = [
    "#ff0000",
    "#ffa500",
    "#ffff00",
    "#00ff00",
    "#00f3f3",
    "#0000ff",
    "#ed00ed",
  ];
  if (buttons[0].classList.contains("btn-check")) {
    this.style["background-color"] = colorPicker.value;
  } else if (buttons[1].classList.contains("btn-check")) {
    this.style["background-color"] = rainbow[Math.floor(7 * Math.random())];
  } else if (buttons[2].classList.contains("btn-check")) {
    let currentColor = this.style.backgroundColor;
    if (currentColor === "white") {
      currentColor = "rgb(255, 255, 255)";
    }
    currentColor = currentColor.slice(4, currentColor.length - 1);
    let rgbArray = currentColor.split(",");
    for (let i = 0; i < rgbArray.length; i++) {
      rgbArray[i] = (parseInt(rgbArray[i]) - 15).toString();
    }
    this.style.backgroundColor = `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]})`;
  } else if (buttons[3].classList.contains("btn-check")) {
    this.style["background-color"] = "white";
  }
}

function clear() {
  cells.forEach((cell) => (cell.style.backgroundColor = "white"));
}
