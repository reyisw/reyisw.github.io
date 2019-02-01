const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const colors = [
  "#AC0003",
  "#034D0E",
  "#004382",
  "#DBAC01",
  "#5C3566",
  "#000000"
];
const colorDiv = document.querySelector(".colors");
colors.forEach(color => {
  const button = document.createElement("button");
  button.classList.add("color");
  button.style.backgroundColor = color;
  colorDiv.appendChild(button);
  button.addEventListener("click", () => (context.strokeStyle = color));
});
const setSize = () => {
  canvas.setAttribute("width", window.innerWidth);
  canvas.setAttribute("height", window.innerHeight);
  context.strokeStyle = colors[0];
  context.lineJoin = "round";
  context.lineWidth = 5;
};
setSize();
window.addEventListener("resize", setSize);
let firstX, firstY, secondX, secondY, paint;
function getCoordinates(event) {
  // check to see if mobile or desktop
  if (["mousedown", "mousemove"].includes(event.type)) {
    // click events
    return [event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop];
  } else {
    // touch coordinates
    return [
      event.touches[0].pageX - canvas.offsetLeft,
      event.touches[0].pageY - canvas.offsetTop
    ];
  }
}
function addClick(event, canvas) {
  let [x, y] = getCoordinates(event);
  secondX = firstX;
  secondY = firstY;
  firstX = x;
  firstY = y;
}
function draw() {
  context.beginPath();
  context.moveTo(secondX, secondY);
  context.lineTo(firstX, firstY);
  context.closePath();
  context.stroke();
}
function startPaint(event) {
  addClick(event, this);
  paint = true;
}
function endPaint(event) {
  if (paint) {
    addClick(event, this);
    draw();
  }
}
canvas.addEventListener("mousedown", startPaint);
canvas.addEventListener("touchstart", startPaint);
const exit = _ => {
  paint = false;
  firstX = null;
  firstY = null;
};
canvas.addEventListener("mouseup", exit);
canvas.addEventListener("mouseleave", exit);
canvas.addEventListener("touchend", exit);
canvas.addEventListener("mousemove", endPaint);
canvas.addEventListener("touchmove", endPaint);
