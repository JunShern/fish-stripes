
function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
  frameRate(50);
  noStroke();

  // create sliders
  widthSlider = createSlider(10, 50, 20, 1);
  widthSlider.position(20, 20);
  widthSlider.style('width', '250px');

  colorInput1 = createInput('#333333');
  colorInput1.input(colorInput1Event);
  colorInput1.position(20, 80);
  colorInput1.style('width', '250px');
  colorInput2 = createInput('#111111');
  colorInput2.input(colorInput2Event);
  colorInput2.position(20, 110);
  colorInput2.style('width', '250px');

  opacitySlider = createSlider(0, 1, 1, 0.1);
  opacitySlider.position(20, 140);
  opacitySlider.style('width', '250px');

  hideButton = createButton('Hide');
  hideButton.position(20, 170);
  hideButton.mousePressed(toggleStripes);
  hideButton.size(widthSlider.width, 25);

  pauseButton = createButton('Pause');
  pauseButton.position(20, 260);
  pauseButton.mousePressed(togglePlayPause);
  pauseButton.size(widthSlider.width, 25);

  timerToStartInput = createInput('0');
  timerToStartInput.position(20, 290);
  timerToStartInput.style('width', '120px');
  
  timerToStopInput = createInput('0');
  timerToStopInput.position(145, 290);
  timerToStopInput.style('width', '120px');

  speedSlider = createSlider(-20, 20, 2, 1);
  speedSlider.position(20, 350);
  speedSlider.style('width', '250px');

  reverseButton = createButton('Reverse');
  reverseButton.position(20, 380);
  reverseButton.mousePressed(reverseDirection);
  reverseButton.size(widthSlider.width, 25);

  timerToReverseInput = createInput('0');
  timerToReverseInput.position(20, 410);
  timerToReverseInput.style('width', '245px');

  mySetup();
}
