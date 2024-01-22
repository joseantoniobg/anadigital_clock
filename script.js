const degSecs = 360 / 60;
const degMinutes = degSecs;
const degHours = 360 / 12;
const hourInterval = 1 / 3600;
const minuteInterval = 1 / 60;

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

function drawClockPoint(countPoints, deg, value, className, space, left, width, begin, interval) {
  const clockPointDiv = document.createElement('div');
  clockPointDiv.className = 'clock-point';
  clockPointDiv.style.width = `${width}px`;
  clockPointDiv.style.left = `${left}px`;

  const newspaperSpinning = [
    { transform: `rotate(${(value + begin) * deg}deg)` },
    { transform: `rotate(${(value + begin + interval) * deg}deg)` },
  ];

  clockPointDiv.animate(newspaperSpinning, { duration: 1000 });

  for (let i = 0; i < 7; i++) {
    clockPointDiv.appendChild(getClockCell(addZero(value), i * space, (value + begin + interval) * deg, className, countPoints > i));
  }
  clock.appendChild(clockPointDiv);
}

let lastMinute = new Date().getMinutes();
let lastHour = new Date().getHours();

function draw() {
  const d = new Date();
  clock.innerHTML = '';

  drawClockPoint(2, degHours, d.getHours(), 'hour-cell', 48.5, 290, 40, (d.getMinutes() * 60 + d.getSeconds()) / 3600, hourInterval);
  drawClockPoint(1, degMinutes, d.getMinutes(), 'minute-cell', 42, 295, 30, d.getSeconds() / 60, minuteInterval);
  drawClockPoint(0, degSecs, d.getSeconds(), 'second-cell', 43, 300, 20, 0, 1);

  lastMinute = d.getMinutes();
  lastHour = d.getHours();
}

setInterval(() => {
  draw();
}, 1000);

draw();