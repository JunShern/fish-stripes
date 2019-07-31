let widthSlider, speedSlider, pauseButton, hideButton;
let currentX = 0;
let playing = true;
let hidden = false;

function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
  fill(0);
  frameRate(50);

  // create sliders
  widthSlider = createSlider(10, 500, 50, 10);
  widthSlider.position(20, 20);

  speedSlider = createSlider(-20, 20, 2, 2);
  speedSlider.position(20, 50);

  pauseButton = createButton('Pause');
  pauseButton.position(20, 80);
  pauseButton.mousePressed(togglePlayPause);
  pauseButton.size(speedSlider.width, 25);

  hideButton = createButton('Hide');
  hideButton.position(20, 110);
  hideButton.mousePressed(toggleStripes);
  hideButton.size(speedSlider.width, 25);
}

function togglePlayPause() {
  playing = !playing;
  if (playing) {
    pauseButton.html('Pause');
  } else {
    pauseButton.html('Play');
  }
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
  background(255, 255, 255);

  let lineWidth = widthSlider.value();
  let speed = speedSlider.value();
  text('Width: ' + lineWidth, widthSlider.x * 2 + widthSlider.width, 35);
  text('Speed: ' + speed, speedSlider.x * 2 + speedSlider.width, 65);

  if (playing) {
    currentX = (currentX + speed) % (2 * lineWidth);
  }
  
  if (!hidden) {
    let x = currentX - lineWidth;
    while (x < width) {
      rect(x, 0, lineWidth, height);
      x += 2 * lineWidth;
    }  
  }
}