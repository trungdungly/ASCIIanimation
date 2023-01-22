let TimerID;
let SPEED = 250;

window.onload = function () {
    let startElement = document.getElementById("start");
    let stopElement = document.getElementById("stop");
    let turboSpeed = document.getElementById("turbo");
    let fontSize = document.getElementById("fontsize");
    let textArea = document.getElementById("text-area");
    let animationSelect = document.getElementById("animation");

    textArea.classList.toggle(fontSize.value);

    startElement.onclick = function () {
        document.getElementById("stop").disabled = false;
        startAnimation();
    };

    stopElement.onclick = function () {
        document.getElementById("stop").disabled = true;
        stopAnimation();
    };

    turboSpeed.onchange = function () {
        if (this.checked === true)
            SPEED = 50;
        else
            SPEED = 250;
    }

    fontSize.onchange = function () {
        textArea.classList = "";
        textArea.classList.toggle(this.value);
    }

    animationSelect.onchange = function () {
        stopAnimation();
        if (!stopElement.disabled)
            startAnimation();
    }
}

function startAnimation() {
    let selectedAnimationValue = document.getElementById("animation").value;
    let frameStr = ANIMATIONS[selectedAnimationValue];
    let frameSeq = "";

    if (frameStr.indexOf("\r\n") != -1)
        frameSeq = frameStr.split("=====\r\n");
    else
        frameSeq = frameStr.split("=====\n");

    let currentFrame = 0;
    showNextFrame(frameSeq, currentFrame);
}

function showNextFrame(frameSeq, currentFrame) {
    document.getElementById("text-area").value = frameSeq[currentFrame]
    currentFrame = (currentFrame + 1) % frameSeq.length;

    TimerID = setTimeout(showNextFrame, SPEED, frameSeq, currentFrame);
}

function stopAnimation() {
    document.getElementById("text-area").value = "";
    clearTimeout(TimerID);
}