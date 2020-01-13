let widthSlider, speedSlider;
let reverseButton, pauseButton, hideButton;
let colorInput1, colorInput2;
let currentX = 0;
let playing = true;
let hidden = false;
let color1 = "#333333";
let color2 = "#111111";
let timer;
let timerStarted = false;

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
  
  function reverseDirection() {
    speedSlider.value(-speedSlider.value());
  }
  