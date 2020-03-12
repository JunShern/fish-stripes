
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

  speedSlider = createSlider(-20/15, 20/15, 1, 1/15);
  speedSlider.position(20, 230);
  speedSlider.style('width', '250px');

  reverseButton = createButton('Reverse');
  reverseButton.position(20, 260);
  reverseButton.mousePressed(reverseDirection);
  reverseButton.size(widthSlider.width, 25);

  pauseButton = createButton('Pause');
  pauseButton.position(20, 320);
  pauseButton.mousePressed(togglePlayPause);
  pauseButton.size(widthSlider.width, 25);

  automateButton = createButton('Automate');
  automateButton.position(20, 380);
  automateButton.mousePressed(execute);
  automateButton.size(widthSlider.width, 25);

  // 1 hour, start
  // 20 seconds, stop
  // 20 seconds, reverse
  // 0, start
  // 20 seconds, stop
  let initCommands = [
    [3600, 'start'],
    [20, 'stop'],
    [20, 'reverse'],
    [0, 'start'],
    [20, 'stop'],
    [0, 'none'],
    [0, 'none'],
    [0, 'none'],
    [0, 'none'],
    [0, 'none'],
  ];
  for (let i=0; i<initCommands.length; i++) {
    commandPairInput = new CommandPair(20, 410 + i*30,
      initialTimer = initCommands[i][0],
      initialCommand = initCommands[i][1]);
    commandPairs.push(commandPairInput);
  }

  mySetup();
}
