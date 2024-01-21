const degSecs = 360 / 60;
const degMinutes = degSecs;
const degHours = 360 / 12;

const clock = document.getElementById("clock");

function addZero(i) {
  if (i < 10) return "0" + i;
  return i;
}

function getClockCell(number, top, deg, className, invisible) {
  const element = document.createElement('div');
  element.className = `cell ${className}`;
  element.style.top = `${top}px`;
  element.innerHTML = number;
  element.style.transform = `rotate(-${deg}deg)`;
  if (invisible) element.style.display = 'none';
  return element;
}

function drawClockPoint(countPoints, deg, value, className, space, left, width) {
  const clockPointDiv = document.createElement('div');
  clockPointDiv.className = 'clock-point';
  clockPointDiv.style.width = `${width}px`;
  clockPointDiv.style.left = `${left}px`;
  clockPointDiv.style.transform = `rotate(${value * deg}deg)`;
  for (let i = 0; i < 7; i++) {
    clockPointDiv.appendChild(getClockCell(addZero(value), i * space, value * deg, className, countPoints > i));
  }
  clock.appendChild(clockPointDiv);
}

function draw() {
  const d = new Date();
  clock.innerHTML = '';
  drawClockPoint(2, degHours, d.getHours(), 'hour-cell', 48.5, 290, 40);
  drawClockPoint(1, degMinutes, d.getMinutes(), 'minute-cell', 42, 295, 30);
  drawClockPoint(0, degSecs, d.getSeconds(), 'second-cell', 43, 298, 24);
}

setInterval(() => {
  draw();
}, 1000);

draw();