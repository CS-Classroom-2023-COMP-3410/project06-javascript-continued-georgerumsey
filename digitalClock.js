document.addEventListener('DOMContentLoaded', () => {
    const digitalClock = document.getElementById('clock-digital');
    const analogClock = document.getElementById('clock-analog');
    const flipClock = document.getElementById('clock-flip');

    const flipHours1 = document.getElementById('flip-hours1');
    const flipHours2 = document.getElementById('flip-hours2');
    const flipMinutes1 = document.getElementById('flip-minutes1');
    const flipMinutes2 = document.getElementById('flip-minutes2');
    const flipSeconds1 = document.getElementById('flip-seconds1');
    const flipSeconds2 = document.getElementById('flip-seconds2');

    const clockTypeSelect = document.getElementById('clock-type');
    const formatToggle = document.getElementById('format-toggle');
    const timezoneSelector = document.getElementById('timezone-selector');
    const alarmInput = document.getElementById('alarm-time');
    const setAlarmButton = document.getElementById('set-alarm');
    const alarmSound = document.getElementById('alarm-sound');

    let is24HourFormat = false;
    let selectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let lastTime = { hours: "", minutes: "", seconds: "" };

    function updateClock() {
        let now = new Date();
        if (selectedTimezone !== 'local') {
            now = new Date(new Date().toLocaleString('en-US', { timeZone: selectedTimezone }));
        }

        let hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        if (!is24HourFormat) {
            hours = hours % 12 || 12;
        }

        digitalClock.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        const hoursStr = hours.toString().padStart(2, '0');
        const minutesStr = minutes.toString().padStart(2, '0');
        const secondsStr = seconds.toString().padStart(2, '0');

        flipDigit(flipHours1, lastTime.hours[0], hoursStr[0]);
        flipDigit(flipHours2, lastTime.hours[1], hoursStr[1]);
        flipDigit(flipMinutes1, lastTime.minutes[0], minutesStr[0]);
        flipDigit(flipMinutes2, lastTime.minutes[1], minutesStr[1]);
        flipDigit(flipSeconds1, lastTime.seconds[0], secondsStr[0]);
        flipDigit(flipSeconds2, lastTime.seconds[1], secondsStr[1]);

        lastTime = { hours: hoursStr, minutes: minutesStr, seconds: secondsStr };
    }

    function flipDigit(flipElement, oldDigit, newDigit) {
        if (oldDigit !== newDigit) {
            flipElement.style.transform = "rotateX(-90deg)";
            setTimeout(() => {
                flipElement.textContent = newDigit;
                flipElement.style.transform = "rotateX(0deg)";
            }, 200);
        }
    }

    function updateClockType() {
        digitalClock.style.display = "none";
        analogClock.style.display = "none";
        flipClock.style.display = "none";

        if (clockTypeSelect.value === "digital") {
            digitalClock.style.display = "block";
        } else if (clockTypeSelect.value === "analog") {
            analogClock.style.display = "block";
        } else if (clockTypeSelect.value === "flip") {
            flipClock.style.display = "block";
        }
    }

    clockTypeSelect.addEventListener("change", updateClockType);
    formatToggle.addEventListener("change", () => {
        is24HourFormat = formatToggle.value === "24";
        updateClock();
    });

    setInterval(updateClock, 1000);
    updateClock();
    updateClockType();
});
