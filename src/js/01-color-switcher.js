function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

document.getElementById('starter').addEventListener('click', startHandler);
document.getElementById('stopper').addEventListener('click', stopHandler);

document.getElementById('stopper').disabled = true;

let timerId;

function startHandler() {
  console.log('start');
  document.body.style.backgroundColor = getRandomHexColor();
  if (!timerId) {
    timerId = setInterval(startHandler, 1000);
    document.getElementById('starter').disabled = true;
    document.getElementById('stopper').disabled = false;
  }
}

function stopHandler() {
  console.log('stop');
  clearInterval(timerId);
  timerId = null;
  document.getElementById('starter').disabled = false;
  document.getElementById('stopper').disabled = true;
}
