let widthSlider, speedSlider;
let currentX = 0;

function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
  fill(0);
  frameRate(50);

  // create sliders
  widthSlider = createSlider(2, 500, 50);
  widthSlider.position(20, 20);
  speedSlider = createSlider(1, 20, 2);
  speedSlider.position(20, 50);
}

function draw() {
  background(255, 255, 255);
  let lineWidth = widthSlider.value();
  let speed = speedSlider.value();
  text('Width', widthSlider.x * 2 + widthSlider.width, 35);
  text('Speed', speedSlider.x * 2 + speedSlider.width, 65);

  currentX = (currentX + speed) % (2 * lineWidth);
  let x = currentX - lineWidth;
  while (x < width) {
    rect(x, 0, lineWidth, height);
    x += 2 * lineWidth;
  }
}