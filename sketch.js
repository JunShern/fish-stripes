let widthSlider, speedSlider;
let pauseButton, hideButton;
let colorInput1, colorInput2;
let currentX = 0;
let playing = true;
let hidden = false;
let color1 = "#333333";
let color2 = "#111111";

function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
  frameRate(50);
  noStroke();

  // create sliders
  widthSlider = createSlider(10, 400, 50, 5);
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

  pauseButton = createButton('Pause');
  pauseButton.position(20, 140);
  pauseButton.mousePressed(togglePlayPause);
  pauseButton.size(speedSlider.width, 25);

  hideButton = createButton('Hide');
  hideButton.position(20, 170);
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

function colorInput1Event() {
  console.log(this.value());
  color1 = this.value();
}
function colorInput2Event() {
  color2 = this.value();
}

function draw() {
  background(color1);
  fill(color2);

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