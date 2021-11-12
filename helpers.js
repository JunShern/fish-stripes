let widthSlider, speedSlider, opacitySlider;
let reverseButton, pauseButton, hideButton, automateButton;
let colorInput1, colorInput2;
let currentX = 0;
let playing = true;
let hidden = false;
let verticalStripes = true;
let color1 = "#FFFFFF";
let color2 = "#000000";
let commandPairs = [];

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
  fill(0);
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
    if (verticalStripes) {
      while (x < width) {
        rect(x, 0, lineWidth, height);
        x += 2 * lineWidth;
      }
    } else {
      while (x < height) {
        rect(0, x, width, lineWidth);
        x += 2 * lineWidth;
      }
    }
  }
}

class CommandPair {
  constructor(x, y, initialTimer=0, initialCommand='none', w=250) {
    this.timerInput = createInput(`${initialTimer}`);
    this.timerInput.position(x, y);
    this.timerInput.style('width', `${w/2 - 10}px`);

    this.commandInput = createSelect();
    this.commandInput.position(x + w/2, y);
    this.commandInput.style('width', `${w/2}px`);
    this.commandInput.option('none');
    this.commandInput.option('start');
    this.commandInput.option('stop');
    this.commandInput.option('reverse');
    this.commandInput.selected(initialCommand);
  }
}
function execute(commandIndex = 0) {
  if (commandIndex >= commandPairs.length) {
    console.log("Finished");
    return;
  }

  let commandPair = commandPairs[commandIndex];
  console.log(commandPair.timerInput.value(), commandPair.commandInput.value());

  let timer = new Timer();
  timer.start(
    seconds = commandPair.timerInput.value(),
    updateCallback = (count) => {
      commandPair.timerInput.value(count);
    },
    endCallback = () => {
      switch (commandPair.commandInput.value()) {
        case 'start':
          playStripes();
          break;
        case 'stop':
          pauseStripes();
          break;
        case 'reverse':
          reverseDirection();
          break;
      }
      commandPair.commandInput.selected('none');
      execute(commandIndex+1);
    }
  );

}

function togglePlayPause() {
  if (playing) {
    pauseStripes();
  } else {
    playStripes();
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

function rotateStripes() {
  verticalStripes = !verticalStripes;
  currentX = 0;
}

function reverseDirection() {
  speedSlider.value(-speedSlider.value());
}
