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

function mySetup() {  
  timerToStart = new Timer();
}

function draw() {
  background(255);

  let lineWidth = widthSlider.value();
  let speed = speedSlider.value();
  let opacity = opacitySlider.value();
  text('Width: ' + lineWidth, widthSlider.x * 2 + widthSlider.width, 35);
  text('Speed: ' + speed, speedSlider.x * 2 + speedSlider.width, 65);
  text('Opacity: ' + opacity, opacitySlider.x * 2 + opacitySlider.width, 185);

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
    pauseStripes();
    showStripes();
    timerToStart.reset();
  } else {
    pauseButton.html('Playing automatically in...');
    timerToStart.start(
      seconds = timerToStartInput.value(),
      updateCallback = (count) => {
        timerToStartInput.value(count);
      },
      endCallback = () => {
        showStripes();
        playStripes();
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
  speedSlider.value(-speedSlider.value());
}
