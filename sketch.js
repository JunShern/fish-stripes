let widthSlider, speedSlider;
let pauseButton, hideButton;
let colorInput1, colorInput2;
let currentX = 0;
let playing = true;
let hidden = false;
let color1 = "#333333";
let color2 = "#111111";
let timer;
let timerStarted = false;

function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
  frameRate(50);
  noStroke();

  // create sliders
  widthSlider = createSlider(10, 40, 50, 5);
  widthSlider.position(20, 20);
  widthSlider.style('width', '250px');

  speedSlider = createSlider(-20, 20, 2, 1);
  speedSlider.position(20, 50);
  speedSlider.style('width', '250px');

  colorInput1 = createInput('#333333');
  colorInput1.input(colorInput1Event);
  colorInput1.position(20, 80);
  colorInput1.style('width', '250px');
  colorInput2 = createInput('#111111');
  colorInput2.input(colorInput2Event);
  colorInput2.position(20, 110);
  colorInput2.style('width', '250px');

  hideButton = createButton('Hide');
  hideButton.position(20, 140);
  hideButton.mousePressed(toggleStripes);
  hideButton.size(speedSlider.width, 25);

  pauseButton = createButton('Pause');
  pauseButton.position(20, 200);
  pauseButton.mousePressed(togglePlayPause);
  pauseButton.size(speedSlider.width, 25);

  timerInput = createInput('0');
  timerInput.input(timerInputEvent);
  timerInput.position(20, 230);
  timerInput.style('width', '250px');
}

function togglePlayPause() {
  if (int(timerInput.value()) == 0) {
    playing = !playing;
    if (playing) {
      pauseButton.html('Pause');
    } else {
      pauseButton.html('Play');
    }  

  } else {
    if (!timerStarted) {
      // Start the timer
      timer = setInterval(countdownCallback, 1000);
      timerStarted = true;
      pauseButton.html('Playing automatically in...');
      // Hide stripes
      hidden = true;
      hideButton.html('Show');
    } else {
      // User clicks after timer started, means they want to stop
      resetTimer();
      // Show stripes
      hidden = false;
      hideButton.html('Hide');
      // Set to playing, then stop it
      playing = true;
      togglePlayPause();
    }
  }
}

// Timer offers functionality to start playback after user-defined number of seconds
function getTimerValue() {
  return int(timerInput.value());
}
function setTimerValue(val) {
  timerInput.value(val);
}
function timerInputEvent() {
  if (getTimerValue() > 0) {
    pauseButton.html('Start timer');
  }
}
function countdownCallback() {
  setTimerValue(getTimerValue() - 1);
  if (getTimerValue() == 0) {
    resetTimer();
    // Show stripes
    hidden = false;
    hideButton.html('Hide');
    // Set to not playing, then start it
    playing = false;
    togglePlayPause();
  }
}
function resetTimer() {
  clearInterval(timer);
  setTimerValue(0);
  timerStarted = false;
}

function colorInput1Event() {
  color1 = this.value();
}
function colorInput2Event() {
  color2 = this.value();
}

function toggleStripes() {
  hidden = !hidden;
  if (hidden) {
    hideButton.html('Show');
  } else {
    hideButton.html('Hide');
  }
}

function draw() {
  background(255);

  let lineWidth = widthSlider.value();
  let speed = speedSlider.value();
  text('Width: ' + lineWidth, widthSlider.x * 2 + widthSlider.width, 35);
  text('Speed: ' + speed, speedSlider.x * 2 + speedSlider.width, 65);

  if (playing) {
    currentX = (currentX + speed) % (2 * lineWidth);
  }

  if (!hidden) {
    background(color1);
    fill(color2);
    let x = currentX - lineWidth;
    while (x < width) {
      rect(x, 0, lineWidth, height);
      x += 2 * lineWidth;
    }
  }
}
