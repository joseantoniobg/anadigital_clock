const degSecs = 360 / 60;
const degMinutes = degSecs;
const degHours = 360 / 12;

const clock = document.getElementById("clock");

function addZero(i) {
  if (i < 10) return "0" + i;
  return i;
}

function getClockCell(number, top, deg, className) {
  const element = document.createElement('div');
  element.className = `cell ${className}`;
  element.style.top = `${top}px`;
  element.innerHTML = number;
  element.style.transform = `rotate(-${deg}deg)`;
  return element;
}

function drawClockPoint(deg, value, className, space, left, width) {
  const clockPointDiv = document.createElement('div');
  clockPointDiv.className = 'clock-point';
  clockPointDiv.style.width = `${width}px`;
  clockPointDiv.style.left = `${left}px`;
  clockPointDiv.style.transform = `rotate(${value * deg}deg)`;
  for (let i = 0; i < 7; i++) {
    clockPointDiv.appendChild(getClockCell(addZero(value), i * space, value * deg, className));
  }
  clock.appendChild(clockPointDiv);
}

function draw() {
  const d = new Date();
  clock.innerHTML = '';
  drawClockPoint(degHours, d.getHours(), 'hour-cell', 48.5, 290, 40);
  drawClockPoint(degMinutes, d.getMinutes(), 'minute-cell', 42, 295, 30);
  drawClockPoint(degSecs, d.getSeconds(), 'second-cell', 43, 298, 24);
}

const interval = setInterval(() => {
  draw();
}, 1000);

draw();