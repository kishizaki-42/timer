const hoursEl = document.querySelector("#hours");
const minutesEl = document.querySelector("#minutes");
const secondsEl = document.querySelector("#seconds");
const startButton = document.querySelector("#start-button");
const pauseButton = document.querySelector("#pause-button");
const resetButton = document.querySelector("#reset-button");
const setupForm = document.querySelector("#setup-form");
const inputs = [
  document.querySelector("#input-hours"),
  document.querySelector("#input-minutes"),
  document.querySelector("#input-seconds"),
];
const messageEl = document.querySelector("#message");
const progressBar = document.querySelector("#progress-bar");
const presetFiveButton = document.querySelector("#preset-5min");
const presetsSection = document.querySelector(".presets");
const modeButtons = Array.from(document.querySelectorAll(".mode-switch__btn"));

const TICK_INTERVAL_MS = 200;

let mode = "countdown"; // countdown | stopwatch
let timerState = "idle"; // idle | running | paused
let timerId = null;

const countdownState = {
  totalMs: 0,
  remainingMs: 0,
  endTimestamp: 0,
};

const stopwatchState = {
  elapsedMs: 0,
  startTimestamp: 0,
};

startButton.addEventListener("click", handleStartClick);
pauseButton.addEventListener("click", handlePauseClick);
resetButton.addEventListener("click", () => resetTimer());
presetFiveButton.addEventListener("click", handlePresetFiveMinutes);
modeButtons.forEach((button) => {
  button.addEventListener("click", () => switchMode(button.dataset.mode));
});

function handleStartClick() {
  clearMessage();
  if (timerState === "running") {
    return;
  }

  if (mode === "countdown" && timerState === "idle") {
    const duration = readDurationFromInputs();
    if (duration <= 0) {
      showMessage("1秒以上の時間を設定してください。");
      return;
    }
    countdownState.totalMs = duration;
    countdownState.remainingMs = duration;
    prepareNotifications();
  }

  if (mode === "stopwatch" && timerState === "idle") {
    stopwatchState.elapsedMs = 0;
  }

  startTimer();
}

function handlePauseClick() {
  if (timerState !== "running") {
    return;
  }
  pauseTimer();
}

function startTimer() {
  if (mode === "countdown") {
    startCountdown();
  } else {
    startStopwatch();
  }
}

function pauseTimer() {
  stopTimer();

  if (mode === "countdown") {
    countdownState.remainingMs = Math.max(0, countdownState.endTimestamp - Date.now());
  } else {
    stopwatchState.elapsedMs = Math.max(0, Date.now() - stopwatchState.startTimestamp);
  }

  timerState = "paused";
  startButton.disabled = false;
  pauseButton.disabled = true;
  resetButton.disabled = false;
  startButton.textContent = "再開";
}

function resetTimer() {
  stopTimer();
  timerState = "idle";
  startButton.disabled = false;
  pauseButton.disabled = true;
  resetButton.disabled = true;
  startButton.textContent = "スタート";
  clearMessage();

  if (mode === "countdown") {
    toggleInputsDisabled(false);
    const presetMs = readDurationFromInputs();
    countdownState.totalMs = presetMs;
    countdownState.remainingMs = presetMs;
    updateTimerUI({ ms: presetMs, mode: "countdown" });
    updateProgressBar(0);
  } else {
    stopwatchState.elapsedMs = 0;
    updateTimerUI({ ms: 0, mode: "stopwatch" });
    updateProgressBar(0);
  }
}

function startCountdown() {
  if (countdownState.remainingMs <= 0) {
    finishCountdown();
    return;
  }

  countdownState.endTimestamp = Date.now() + countdownState.remainingMs;
  timerState = "running";
  toggleInputsDisabled(true);
  startButton.disabled = true;
  pauseButton.disabled = false;
  resetButton.disabled = false;

  updateTimerUI({ ms: countdownState.remainingMs, mode: "countdown" });
  stopTimer();
  timerId = window.setInterval(handleCountdownTick, TICK_INTERVAL_MS);
}

function startStopwatch() {
  stopwatchState.startTimestamp = Date.now() - stopwatchState.elapsedMs;
  timerState = "running";
  toggleInputsDisabled(true);
  startButton.disabled = true;
  pauseButton.disabled = false;
  resetButton.disabled = false;

  updateTimerUI({ ms: stopwatchState.elapsedMs, mode: "stopwatch" });
  stopTimer();
  timerId = window.setInterval(handleStopwatchTick, TICK_INTERVAL_MS);
}

function handleCountdownTick() {
  countdownState.remainingMs = Math.max(0, countdownState.endTimestamp - Date.now());
  updateTimerUI({ ms: countdownState.remainingMs, mode: "countdown" });

  if (countdownState.remainingMs <= 0) {
    finishCountdown();
  }
}

function handleStopwatchTick() {
  stopwatchState.elapsedMs = Math.max(0, Date.now() - stopwatchState.startTimestamp);
  updateTimerUI({ ms: stopwatchState.elapsedMs, mode: "stopwatch" });
}

function finishCountdown() {
  stopTimer();
  countdownState.remainingMs = 0;
  timerState = "idle";
  toggleInputsDisabled(false);
  startButton.disabled = false;
  pauseButton.disabled = true;
  resetButton.disabled = true;
  startButton.textContent = "スタート";
  handleCountdownCompletion();
}

function handleCountdownCompletion() {
  updateTimerUI({ ms: 0, mode: "countdown" });
  showMessage("タイマーが完了しました！");
  pulseProgressBar();
  triggerVibration();
  triggerNotification();
}

function stopTimer() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
}

function readDurationFromInputs() {
  const [hoursInput, minutesInput, secondsInput] = inputs;
  const hoursResult = readAndClamp(hoursInput);
  const minutesResult = readAndClamp(minutesInput);
  const secondsResult = readAndClamp(secondsInput);

  if (!hoursResult.valid || !minutesResult.valid || !secondsResult.valid) {
    return 0;
  }

  const totalSeconds =
    hoursResult.value * 3600 + minutesResult.value * 60 + secondsResult.value;
  return totalSeconds * 1000;
}

function readAndClamp(input) {
  const parsed = Number(input.value);
  if (!Number.isFinite(parsed)) {
    showMessage("数値を入力してください。");
    return { valid: false, value: 0 };
  }
  const clamped = clamp(parsed, input.min, input.max);
  input.value = clamped;
  return { valid: true, value: clamped };
}

function clamp(value, min, max) {
  const numericMin = Number(min);
  const numericMax = Number(max);
  if (Number.isNaN(value)) return 0;
  const normalized = Math.floor(value);
  return Math.min(Math.max(normalized, numericMin), numericMax);
}

function updateTimerUI({ ms, mode: activeMode }) {
  const safeMs = Math.max(0, ms);
  const totalSeconds =
    activeMode === "countdown"
      ? Math.ceil(safeMs / 1000)
      : Math.floor(safeMs / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.max(0, totalSeconds % 60);

  hoursEl.textContent = formatTimePart(hours);
  minutesEl.textContent = formatTimePart(minutes);
  secondsEl.textContent = formatTimePart(seconds);

  if (activeMode === "countdown") {
    const total = countdownState.totalMs;
    const clampedRemaining = total === 0 ? 0 : Math.min(safeMs, total);
    const progressPercent =
      total === 0 ? 0 : ((total - clampedRemaining) / total) * 100;
    updateProgressBar(progressPercent);
  } else {
    updateProgressBar(0);
  }

  updateDocumentTitle(hours, minutes, seconds, activeMode);
}

function updateProgressBar(progressPercent) {
  const value = Math.min(Math.max(progressPercent, 0), 100);
  progressBar.style.width = `${value}%`;
}

function updateDocumentTitle(hours, minutes, seconds, activeMode) {
  const titleTime = [hours, minutes, seconds]
    .map((value) => value.toString().padStart(2, "0"))
    .join(":");
  const label = activeMode === "countdown" ? "カウントダウン" : "ストップウォッチ";
  document.title = `${titleTime} - ${label}`;
}

function formatTimePart(value) {
  return value.toString().padStart(2, "0");
}

function toggleInputsDisabled(isDisabled) {
  const shouldDisable = isDisabled || mode !== "countdown";
  inputs.forEach((input) => {
    input.disabled = shouldDisable;
  });
}

function handlePresetFiveMinutes() {
  if (mode !== "countdown") {
    return;
  }
  if (timerState === "running") {
    return;
  }

  inputs[0].value = 0;
  inputs[1].value = 5;
  inputs[2].value = 0;

  const duration = readDurationFromInputs();
  countdownState.totalMs = duration;
  countdownState.remainingMs = duration;
  if (timerState === "idle") {
    updateTimerUI({ ms: duration, mode: "countdown" });
  }
}

function switchMode(newMode) {
  if (newMode === mode) {
    return;
  }

  stopTimer();
  mode = newMode;
  timerState = "idle";
  startButton.disabled = false;
  pauseButton.disabled = true;
  resetButton.disabled = true;
  startButton.textContent = "スタート";
  clearMessage();

  modeButtons.forEach((button) => {
    const isActive = button.dataset.mode === newMode;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", isActive ? "true" : "false");
  });

  updateModeVisibility();

  if (mode === "countdown") {
    toggleInputsDisabled(false);
    const presetMs = readDurationFromInputs();
    countdownState.totalMs = presetMs;
    countdownState.remainingMs = presetMs;
    updateTimerUI({ ms: presetMs, mode: "countdown" });
    updateProgressBar(0);
  } else {
    toggleInputsDisabled(true);
    stopwatchState.elapsedMs = 0;
    updateTimerUI({ ms: 0, mode: "stopwatch" });
    updateProgressBar(0);
  }
}

function updateModeVisibility() {
  const isCountdown = mode === "countdown";
  setupForm.classList.toggle("is-hidden", !isCountdown);
  presetsSection.classList.toggle("is-hidden", !isCountdown);
}

function pulseProgressBar() {
  progressBar.animate(
    [
      { transform: "scaleX(1)", opacity: 1 },
      { transform: "scaleX(0.95)", opacity: 0.4 },
      { transform: "scaleX(1)", opacity: 1 },
    ],
    {
      duration: 900,
      iterations: 3,
      easing: "ease-in-out",
    },
  );
}

function triggerVibration() {
  if ("vibrate" in navigator) {
    navigator.vibrate([120, 60, 120]);
  }
}

async function prepareNotifications() {
  if (!("Notification" in window)) {
    return;
  }
  if (Notification.permission === "default") {
    try {
      await Notification.requestPermission();
    } catch {
      // ignore permission errors
    }
  }
}

function triggerNotification() {
  if (!("Notification" in window)) {
    return;
  }
  if (Notification.permission !== "granted") {
    return;
  }

  new Notification("タイマー完了", {
    body: "設定したカウントダウンが終了しました。",
    tag: "timer-finished",
  });
}

function showMessage(text) {
  messageEl.textContent = text;
}

function clearMessage() {
  messageEl.textContent = "";
}

// 初期状態のセットアップ
countdownState.totalMs = readDurationFromInputs();
countdownState.remainingMs = countdownState.totalMs;
updateModeVisibility();
toggleInputsDisabled(false);
updateTimerUI({ ms: countdownState.remainingMs, mode: "countdown" });
updateProgressBar(0);
