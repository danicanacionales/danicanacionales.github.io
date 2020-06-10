const startButton = document.getElementById('startButton');
const startPanel = document.getElementById('startPanel');

const gamePanel = document.getElementById('gamePanel');
const questionContainer = document.getElementById('questionContainer');
const answerContainer = document.getElementById('answerContainer');
const arrows = document.getElementsByClassName('arrow');
const arrowLeft = document.getElementById('arrowLeft');
const arrowRight = document.getElementById('arrowRight');
const numberCircle = document.getElementById('numberCircle');
const questionNumber = document.getElementById('numberContent');
const nameDisplay = document.getElementById('nameDisplay');
const nameContent = document.getElementById('nameContent');
var kwento = document.getElementById('kwento');

const whoThisButton = document.getElementById('whoThisButton');
const iKnowButton = document.getElementById('iKnowButton');

var videoContainer = document.getElementById('videoContainer');
var videoNode = document.getElementById('videoNode');
const control = document.getElementById('control');
const controlButton = document.getElementById('controlButton');

var questions;
var currentQuestion;
var index;


startButton.addEventListener('click', (event) => {
    startPanel.style.display = 'none';

    arrows[0].style.display = 'block';
    arrows[1].style.display = 'block';
    gamePanel.style.display = 'block';

    index = 0;
    displayQuestion();
});

function displayQuestion() {
    
    videoNode = document.getElementById('videoNode');
    console.log(videoNode);
    if(videoNode != null) {
        videoContainer.innerHTML = "";
    }

    if(index == 0) {
        arrows[0].style.visibility = 'hidden';
    } else {
        arrows[0].style.visibility = 'visible';
    }

    if(index < questions.length - 1) {
        arrows[1].style.visibility = 'visible';
    } else {
        arrows[1].style.visibility = 'hidden';
    }

    numberCircle.style.display = 'table';
    questionContainer.style.display = 'flex';
    answerContainer.style.display = 'none';
    nameDisplay.style.display = 'none';
    
    currentQuestion = questions[index];

    questionNumber.innerHTML = index + 1;
    kwento.innerHTML = currentQuestion.question.kwento;
    console.log(currentQuestion.question.kwento);
}

iKnowButton.addEventListener('click', (event) => {
    displayAnswer();
});

function displayAnswer() {
    questionContainer.style.display = 'none';
    numberCircle.style.display = 'none';
    answerContainer.style.display = 'block';
    nameDisplay.style.display = 'table';
    nameContent.innerHTML = currentQuestion.person;
    
    

    videoContainer.innerHTML = "";
    videoNode = document.getElementById('videoNode');

    var nodeVideo = document.createElement('VIDEO');
    nodeVideo.classList.add('video-js');
    nodeVideo.classList.add('vjs-default-skin');
    nodeVideo.setAttribute('id', 'videoNode');
    nodeVideo.setAttribute('width', '70%');
    nodeVideo.setAttribute('type', 'video/mp4');
    nodeVideo.setAttribute('src', 'resources/videoMessages/' + currentQuestion.videoMessage);
    nodeVideo.setAttribute('onended', 'switchToPlay()')
    videoContainer.appendChild(nodeVideo);

    control.classList.remove('fa-play');
    control.classList.add('fa-pause');

    nodeVideo.play();
}

controlButton.addEventListener('click', (event) => {
    videoNode = document.getElementById('videoNode');
    if(control.classList.contains('fa-pause')) {
        switchToPlay();
        videoNode.pause();
        console.log('pause');
    } else if (control.classList.contains('fa-play')) {
        switchToPause();
        videoNode.play();
        console.log('play');
    }
});

function switchToPlay() {
    control.classList.remove('fa-pause');
    control.classList.add('fa-play');
}

function switchToPause() {
    control.classList.remove('fa-play');
    control.classList.add('fa-pause');
}

arrowRight.addEventListener('click', (event) => {
    if(index + 1 < questions.length) {
        index++;
        displayQuestion();
    }
});

arrowLeft.addEventListener('click', (event) => {
    if(index > 0) {
        index--;
        displayQuestion();
    }
});

function initPart2() {
    loadJSON(function(response) {
        questions = JSON.parse(response.toString());

        console.log(questions);
    });
}

function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'resources/questions.json', true);
    xobj.onreadystatechange = function () {
        if(xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };

    xobj.send(null);
}


