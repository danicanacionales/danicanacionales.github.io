const gamePinForm = document.getElementById('gamePinForm');
const gamePinButton = document.getElementById('enterGamePinButton');
const gamePin = document.getElementById('gamePin');

const usernameForm = document.getElementById('usernameForm');
const username = document.getElementById('username');
const nameButton = document.getElementById('enterNameButton');

const welcomeTitle = document.getElementById('welcomeTitle');
const letsGoButton = document.getElementById('letsGoButton');

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