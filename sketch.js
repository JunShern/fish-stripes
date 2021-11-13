
function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
  frameRate(50);
  noStroke();

  // create sliders
  widthSlider = createSlider(1, 50, 10, 1);
  widthSlider.position(20, 20);
  widthSlider.style('width', '250px');

  colorInput1 = createInput('#FFFFFF');
  colorInput1.input(colorInput1Event);
  colorInput1.position(20, 80);
  colorInput1.style('width', '250px');
  colorInput2 = createInput('#000000');
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

  rotateButton = createButton('Rotate');
  rotateButton.position(20, 200);
  rotateButton.mousePressed(rotateStripes);
  rotateButton.size(widthSlider.width, 25);

  speedSlider = createSlider(-20/15, 20/15, 0.6, 1/15);
  speedSlider.position(20, 260);
  speedSlider.style('width', '250px');

  reverseButton = createButton('Reverse');
  reverseButton.position(20, 290);
  reverseButton.mousePressed(reverseDirection);
  reverseButton.size(widthSlider.width, 25);

  pauseButton = createButton('Pause');
  pauseButton.position(20, 350);
  pauseButton.mousePressed(togglePlayPause);
  pauseButton.size(widthSlider.width, 25);

  automateButton = createButton('Automate');
  automateButton.position(20, 410);
  automateButton.mousePressed(startAutomation);
  automateButton.size(widthSlider.width * 0.8, 25);
  helpButton = createButton('?');
  helpButton.position(20 + widthSlider.width * 0.8, 410);
  helpButton.size(widthSlider.width * 0.2, 25);
  helpButton.mousePressed(x => 
    alert(`To use automation, enter lines in the box:
WAIT_SECS,{none/start/reverse/stop},STRIPE_WIDTH

For example:
5,stop,10
5,start,10
5,reverse,20
5,reverse,30`)
    );

  textArea = createElement('textarea');
  textArea.position(20, 440);
  textArea.size(widthSlider.width, 100);
  textArea.value(defaultInstruction);

  autoStatus = createDiv("Awaiting instructions.");
  autoStatus.style('background', '#fff');
  autoStatus.style('padding', '5px');
  autoStatus.position(20, 550);
  autoStatus.size(widthSlider.width, 60);

  mySetup();
}

defaultInstruction = `5,start,10
15,stop,10
0,reverse,10
5,start,10
15,stop,10
0,reverse,10
5,start,9
15,stop,9
0,reverse,9
5,start,9
15,stop,9
0,reverse,9
5,start,8
15,stop,8
0,reverse,8
5,start,8
15,stop,8
0,reverse,8
5,start,7
15,stop,7
0,reverse,7
5,start,7
15,stop,7
0,reverse,7
5,start,6
15,stop,6
0,reverse,6
5,start,6
15,stop,6
0,reverse,6
5,start,5
15,stop,5
0,reverse,5
5,start,5
15,stop,5
0,reverse,5
5,start,4
15,stop,4
0,reverse,4
5,start,4
15,stop,4
0,reverse,4
5,start,3
15,stop,3
0,reverse,3
5,start,3
15,stop,3
0,reverse,3`;