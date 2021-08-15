const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColor");
const range = document.querySelector("#jsRange");
const changeBtn = document.querySelector("#jsMode");
const saveBtn = document.querySelector("#jsSave");

canvas.width = 600;
canvas.height = 600;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, 700, 700);

let painting = false;
let filling = false;
const stopPainting = () => (painting = false);

function startPainting() {
  painting = true;
}

function handleColorClick(event) {
  ctx.strokeStyle = event.target.style.backgroundColor;
}

function onMouseEnter(event) {
  const { offsetX: x, offsetY: y } = event;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onInputHandler(event) {
  ctx.lineWidth = event.target.value;
}

function onClickHandler(event) {
  if (filling) {
    // true == fill, false == paint
    filling = false;
    changeBtn.innerText = "fill";
  } else {
    filling = true;
    changeBtn.innerText = "paint";
  }
}

function onHandlerModeCh(event) {
  if (filling) {
    ctx.fillStyle = ctx.strokeStyle;
    ctx.fillRect(0, 0, 700, 700);
  }
}

function onContextMenuHandler(event) {
  event.preventDefault();
}

function onDownloadHandler(event) {
  const image = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = image;
  link.download = "image.jpeg";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseEnter);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", onHandlerModeCh);
  canvas.addEventListener("contextmenu", onContextMenuHandler);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", onInputHandler);
}

if (changeBtn) {
  changeBtn.addEventListener("click", onClickHandler);
}

if (saveBtn) {
  saveBtn.addEventListener("click", onDownloadHandler);
}
