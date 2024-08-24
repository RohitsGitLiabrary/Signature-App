let textColor = document.getElementById("textColor");
const bgColor = document.getElementById("bgColor");
let textSize = document.getElementById("textSize");
const myCanvas = document.getElementById("myCanvas");
const clearbutton = document.getElementById("clearbutton");
const savebutton = document.getElementById("savebutton");
const retrivebutton = document.getElementById("retrivebutton");
const rect = myCanvas.getBoundingClientRect();

const ctx = myCanvas.getContext("2d");

textColor.addEventListener("change", (e) => {
  ctx.strokeStyle = textColor.value;
});
myCanvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  x = event.offsetX;
  y = event.offsetY;
});

myCanvas.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.lineWidth = textSize.value;
    ctx.stroke();

    x = event.offsetX;
    y = event.offsetY;
  }
});
myCanvas.addEventListener("mouseup", (e) => {
  isDrawing = false;
});

bgColor.addEventListener("change", (e) => {
  ctx.fillStyle = bgColor.value;
  ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);
  x = event.offsetX;
  y = event.offsetY;
});

function clearCanvas() {
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);
  x = event.offsetX;
  y = event.offsetY;
}
function saveIamge() {
  let dataURL = myCanvas.toDataURL("image/png");
  localStorage.setItem("myCanvas", dataURL);
  var a = document.createElement("a");
  a.href = dataURL;
  a.download = "canvas.jpeg";
  a.click();
}
function doNotSave() {}

savebutton.addEventListener("click", () => {
  if (confirm("Do yo want to download image ?")) {
    saveIamge();
  } else doNotSave();
});

retrivebutton.addEventListener("click", () => {
  let savedImage = localStorage.getItem("myCanvas");
  let img = new Image();
  img.src = savedImage;
  ctx.drawImage(img, 0, 0);
});
