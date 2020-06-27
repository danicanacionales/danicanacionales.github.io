const gamePinForm = document.getElementById('gamePinForm');
const gamePinButton = document.getElementById('enterGamePinButton');
const gamePin = document.getElementById('gamePin');

const usernameForm = document.getElementById('usernameForm');
const username = document.getElementById('username');
const nameButton = document.getElementById('enterNameButton');

const welcomeTitle = document.getElementById('welcomeTitle');
const letsGoButton = document.getElementById('letsGoButton');

var choiceSound;
var navigateSound;
var startSound;
var correctSound;
var wrongSound;

const alert = document.getElementById('alert');
const password = '302060';
var name;

if(gamePinButton != null && nameButton != null) {
    gamePinButton.addEventListener('click', (event) => {
        if(gamePin.value === password) {
            gamePinForm.style.display = 'none';
            usernameForm.style.display = 'block';
            alert.classList.remove("incorrect");
        } else {
            alert.innerHTML = "Hey, incorrect Game PIN!"
            alert.classList.add("incorrect");
        }
    });

    nameButton.addEventListener('click', (event) => {
        if(isEmptyOrSpaces(username.value)) {
            alert.classList.remove("incorrect");
            window.location.href = "part1.html";
            name = username.value;
        } else {
            alert.innerHTML = "Hey, enter your name!";
            alert.classList.add("incorrect");
        }
    });

    gamePinButton.addEventListener('mouseover', function(event) {
        choiceSound.play();
    });
}

function initPart1() {
    welcomeTitle.innerHTML = "Welcome, " + name + "! 😁👋🏼";
}

if(letsGoButton != null) {
    letsGoButton.addEventListener('click', (event) => {
        window.location.href = "part2.html";
    });
}

function isEmptyOrSpaces(str) {
    return !(str.value === null || str.match(/^ *$/) !== null);
}

function loadIndex() {
    initSounds();
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