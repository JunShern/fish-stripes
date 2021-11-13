let widthSlider, speedSlider, opacitySlider;
let reverseButton, pauseButton, hideButton, automateButton;
let colorInput1, colorInput2;
let currentX = 0;
let playing = true;
let hidden = false;
let verticalStripes = true;
let color1 = "#FFFFFF";
let color2 = "#000000";
let autoInstructions = [];
let validCommands = ['none', 'start', 'stop', 'reverse'];
let instructionCounter = 1;
let totalInstructions;

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

class Instruction {
  constructor(timer, command, width) {
    this.timer = timer;
    this.command = command;
    this.width = width;
  }
}

function startAutomation(commandIndex = 0) {
  fullCommandString = textArea.value();
  console.log(fullCommandString);
  console.log("Parsing...");
  commandStrings = fullCommandString.split(/\r?\n/);
  for (let i=0; i<commandStrings.length; i++) {
    commandString = commandStrings[i];
    command = commandString.split(',').map(x => x.trim());
    console.log(i+1, command);

    // Input validation
    if (isNaN(Number(command[0])))
    {
      alert(`Error on line ${i+1} "${commandString}":\n${command[0]} is not a valid number`);
    }
    if (!validCommands.includes(command[1]))
    {
      alert(`Error on line ${i+1} "${commandString}":\n${command[1]} is not a valid command. Should be one of: ${validCommands}`);
    }
    if (isNaN(Number(command[2])))
    {
      alert(`Error on line ${i+1} "${commandString}":\n${command[2]} is not a valid number`);
    }

    instruction = new Instruction(Number(command[0]), command[1], Number(command[2]));
    autoInstructions.push(instruction);
  }
  instructionCounter = 1;
  totalInstructions = autoInstructions.length;
  executeNextInstruction();
}

function executeNextInstruction() {
  if (autoInstructions.length <= 0)
  {
    console.log("Done!");
    autoStatus.html("Done!");
    return;
  }

  nextInstruction = autoInstructions.shift();
  autoStatus.html(`(${instructionCounter} / ${totalInstructions})<br>${nextInstruction.timer}s before executing "${nextInstruction.command}" with width=${nextInstruction.width}.`);

  console.log("Executing", nextInstruction)

  let timer = new Timer();
  timer.start(
    seconds = nextInstruction.timer,
    updateCallback = (count) => {
      autoStatus.html(`(${instructionCounter} / ${totalInstructions})<br>${count}s before executing "${nextInstruction.command}" with width=${nextInstruction.width}.`);
    },
    endCallback = () => {
      widthSlider.value(nextInstruction.width);
      switch (nextInstruction.command) {
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
      instructionCounter++;
      executeNextInstruction();
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
