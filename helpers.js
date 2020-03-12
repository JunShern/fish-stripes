let widthSlider, speedSlider, opacitySlider;
let reverseButton, pauseButton, hideButton;
let colorInput1, colorInput2;
let currentX = 0;
let playing = true;
let hidden = false;
let color1 = "#333333";
let color2 = "#111111";
let timerToStart;
let timerToStartInput;
let timerToStop;
let timerToStopInput;
let timerToReverse;
let timerToReverseInput;

function mySetup() {  
  timerToStart = new Timer();
  timerToStop = new Timer();
  timerToReverse = new Timer();
}

function draw() {
  background(255);

  let lineWidth = widthSlider.value();
  let speed = speedSlider.value();
  let opacity = opacitySlider.value();
  text('Width: ' + lineWidth, widthSlider.x * 2 + widthSlider.width, widthSlider.y + widthSlider.height/2);
  text('Speed: ' + speed, speedSlider.x * 2 + speedSlider.width, speedSlider.y + speedSlider.height/2);
  text('Opacity: ' + opacity, opacitySlider.x * 2 + opacitySlider.width, opacitySlider.y + opacitySlider.height/2);

  if (playing) {
    currentX = (currentX + speed) % (2 * lineWidth);
  }

  if (!hidden) {
    background(color1);
    let c = color(color2);
    c.setAlpha(opacitySlider.value() * 255);
    fill(c);
    let x = currentX - lineWidth;
    while (x < width) {
      rect(x, 0, lineWidth, height);
      x += 2 * lineWidth;
    }
  }
}

function togglePlayPause() {
  if (playing || timerToStart.running) {
    pauseButton.html('Pausing automatically in...');
    timerToStop.start(
      seconds = timerToStopInput.value(),
      updateCallback = (count) => {
        timerToStopInput.value(count);
      },
      endCallback = () => {
        pauseStripes();
      }
    );
  } else {
    pauseButton.html('Playing automatically in...');
    timerToStart.start(
      seconds = timerToStartInput.value(),
      updateCallback = (count) => {
        timerToStartInput.value(count);
      },
      endCallback = () => {
        playStripes();
        // Check if want auto stop
        if (timerToStopInput.value() > 0) {
          togglePlayPause();
        }
        if (timerToReverseInput.value() > 0) {
          reverseDirection();
        }
      }
    );
  }
}

function playStripes() {
  playing = true;
  pauseButton.html('Pause');
}
function pauseStripes() {
  playing = false;
  pauseButton.html('Play');
}

function colorInput1Event() {
  color1 = this.value();
}
function colorInput2Event() {
  color2 = this.value();
}

function toggleStripes() {
  if (hidden) {
    showStripes();
  } else {
    hideStripes();
  }
}
function hideStripes() {
  hidden = true;
  hideButton.html('Show');
}
function showStripes() {
  hidden = false;
  hideButton.html('Hide');
}

function reverseDirection() {
  reverseButton.html('Reversing automatically in...');
  timerToReverse.start(
    seconds = timerToReverseInput.value(),
    updateCallback = (count) => {
      timerToReverseInput.value(count);
    },
    endCallback = () => {
      reverseButton.html('Reverse');
      speedSlider.value(-speedSlider.value());
    }
  );
}
