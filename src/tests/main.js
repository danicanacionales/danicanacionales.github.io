const firstName = document.getElementById('firstName');

firstName.addEventListener('focusout', (event) => {
    if(!isEmptyOrSpaces(firstName.value)) {
        firstName.style.border = 0;
        document.getElementById('scrollDownIcon').style.visibility = "visible";
        document.getElementById('welcomeText').innerHTML = "Welcome " + firstName.value + "!";
    } else {
        firstName.style.border = "0 0 3px";
        document.getElementById('scrollDownIcon').style.visibility = "hidden";
    }
});


function isEmptyOrSpaces(str) {
    return str.value === null || str.match(/^ *$/) !== null;
}

function sound(src) {
    this.sound = document.createElement('audio');
    this.sound.src = src;
    this.sound.setAttribute('preload', 'auto');
    this.sound.setAttribute('controls', 'none');
    this.sound.style.display = 'none';
    document.body.appendChild(this.sound);

    this.play = function() {
        this.sound.play();
    }
    this.stop = function() {
        this.sound.pause();
    }
}

function initSounds() {
    choiceSound = new sound('https://felgo.com/web-assets/pop.wav');
    navigateSound = new sound('resources/audio/next.wav');
    startSound = new sound('resources/audio/start.wav');
    correctSound = new sound('resources/audio/correct3.wav');
    wrongSound = new sound('resources/audio/wrong3.wav');
}