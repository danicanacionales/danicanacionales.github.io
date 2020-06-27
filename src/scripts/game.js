const body = document.querySelector('.part2');
const startContainer = document.getElementById('startContainer');
const startButton = document.getElementById('startButton');
const arrowContainers = document.getElementsByClassName('arrowContainer');
const arrows = document.querySelectorAll('.arrow');
const arrowLeft = document.getElementById('arrowLeft');
const arrowRight = document.getElementById('arrowRight');

const gameContent = document.getElementById('gameContent');
const questionContainer = document.getElementById('questionContainer');
const questionNumber = document.getElementById('numberContent');
const panelQuestion = document.getElementById('panelQuestion');
const question = document.getElementById('question');
const panelPhoto = document.getElementById('panelPhoto');
const photo = document.getElementById('photo');

const choiceButton = document.querySelectorAll('.choiceButton');
const scoreQuestionContainer = document.getElementById('scoreQuestionContainer');
const scoreAnswerContainer = document.getElementById('scoreAnswerContainer');

const answerContainer = document.getElementById('answerContainer');
const videoElement = document.getElementById('videoElement');
const videoController = document.getElementById('videoController');
var videoControllerIcon = document.getElementById('videoControllerIcon');

const name = document.getElementById('name');
var currentQuestion;
var selectedAnswer;
var score = 0;
var index;
var storage;
var storageRef;

const correctColor = '#27ae60';
const wrongColor = '#c0392b';

function setBackground(isCorrect) {
    var orig = body.style.backgroundColor;
    body.style.backgroundColor = isCorrect ? correctColor : wrongColor;
    setTimeout(function() {
        body.style.backgroundColor = orig;
    }, 2000);
}

function displayAnswer() {

    if(setScore()) {
        gameContent.classList.add('animate__animated', 'animate__tada');
        correctSound.play();
        setBackground(true);
    } else {
        gameContent.classList.add('animate__animated', 'animate__headShake');
        wrongSound.play();
        setBackground(false);
    }
    questionContainer.style.setProperty('display', 'none', 'important');
    answerContainer.style.removeProperty('display');
    photo.setAttribute('src', '');

    var sourceNode = document.createElement('SOURCE');

    storageRef.child('videoMessages/' + currentQuestion.video.filename).getDownloadURL().then(function(url) {
        sourceNode.setAttribute('src', url);

        videoElement.setAttribute('onended', 'switchToPlay()');
        if(currentQuestion.video.orientation === 'landscape') {
            videoElement.setAttribute('width', '100%');
            videoElement.removeAttribute('height');
        } else {
            videoElement.setAttribute('height', '100%');
            videoElement.removeAttribute('width');
        }
        videoElement.appendChild(sourceNode);
        videoElement.play();
        switchToPause();

        name.innerHTML = currentQuestion.person;
    }).catch(function(error) {
        // Handle any errors
    });
}

function setScore() {
    if(selectedAnswer === currentQuestion.person) {
        score += currentQuestion.question.points;
        displayScore();
        return true;
    }

    return false;
}

function displayQuestion() {
    gameContent.classList.remove('animate__animated');
    gameContent.classList.remove('animate__tada');
    gameContent.classList.remove('animate__headShake');

    if(index == 0) {
        arrowContainers[0].style.visibility = 'hidden';
    } else {
        arrowContainers[0].style.visibility = 'visible';
    }

    if(index < questions.length - 1) {
        arrowContainers[1].style.visibility = 'visible';
    } else {
        arrowContainers[1].style.visibility = 'hidden';
    }
    
    photo.setAttribute('src', '');
    videoElement.innerHTML = '';
    switchToPlay();

    answerContainer.style.setProperty('display', 'none', 'important');
    questionContainer.style.removeProperty('display');

    currentQuestion = questions[index];
    questionNumber.innerHTML = index + 1;

    localStorage.setItem('questionNumber', index);

    for(var key in currentQuestion.question.choices) {
        document.getElementById(key).setAttribute('value', currentQuestion.question.choices[key])
    }

    if(currentQuestion.questionType.type == 'kwento') {
        panelQuestion.style.removeProperty('display');
        panelPhoto.style.setProperty('display', 'none', 'important');
        
        question.innerHTML = currentQuestion.question.kwento;
    } else {
        panelQuestion.style.setProperty('display', 'none', 'important');
        panelPhoto.style.removeProperty('display');

        // photo.setAttribute('src', 'resources/photos/' + currentQuestion.question.filename)

        storageRef.child('images/' + currentQuestion.question.filename).getDownloadURL().then(function(url) {
            photo.setAttribute('src', url);
            if(currentQuestion.questionType.orientation === 'landscape') {
                photo.style.setProperty('width', '100%');
                photo.style.removeProperty('height');
            } else {
                photo.style.setProperty('height', '100%');
                photo.style.removeProperty('width');
            }
        }).catch(function(error) {
            // Handle any errors
        });
    }

    console.log(currentQuestion.question.kwento);
}

function displayScore() {
    scoreQuestionContainer.innerHTML = "<i class='fas fa-star'></i> " + score;
    scoreAnswerContainer.innerHTML = "<i class='fas fa-star'></i> " + score; 
}

choiceButton.forEach(
    function(choiceButton) {
        choiceButton.addEventListener('click', function(choice) {
            selectedAnswer = choiceButton.value;
            displayAnswer();
        });

        choiceButton.addEventListener('mouseover', function(event) {
            choiceSound.play();
        });
    }
)

startButton.addEventListener('click', (event) => {
    startSound.play();
    startContainer.style.setProperty('display', 'none', 'important');
    console.log(startContainer);

    arrowContainers[0].style.visibility = 'visible';
    arrowContainers[1].style.visibility = 'visible';
    questionContainer.style.removeProperty('display');
    
    const storageQuestionNumber = localStorage.getItem('questionNumber');
    console.log(storageQuestionNumber);
    index = storageQuestionNumber != null && storageQuestionNumber < questions.length 
            ? parseInt(localStorage.getItem('questionNumber')) : 0;

    displayScore();
    displayQuestion();
});

videoController.addEventListener('click', (event) => {
    if(videoControllerIcon.classList.contains('fa-pause')) {
        switchToPlay();
        console.log('pause');
    } else if (videoControllerIcon.classList.contains('fa-play')) {
        switchToPause();
        console.log('play');
    }
});

function switchToPlay() {
    videoControllerIcon = document.getElementById('videoControllerIcon');
    videoElement.pause();
    videoControllerIcon.classList.remove('fa-pause');
    videoControllerIcon.classList.add('fa-play');
}

function switchToPause() {
    videoControllerIcon = document.getElementById('videoControllerIcon');
    console.log(videoControllerIcon);
    videoElement.play();
    videoControllerIcon.classList.remove('fa-play');
    videoControllerIcon.classList.add('fa-pause');
}

arrowLeft.addEventListener('click', (event) => {
    if(index > 0) {
        index--;
        displayQuestion();
    }
});

arrowRight.addEventListener('click', (event) => {
    if(index + 1 < questions.length) {
        index++;
        displayQuestion();
    }
});

arrows.forEach(
    function(arrow) {
        arrow.addEventListener('click', function(event) {
            navigateSound.play();
        });
    }
)

function initPart2() {
    loadJSON(function(response) {
        questions = JSON.parse(response.toString());
        console.log(questions);
    });

    initSounds();

    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    storage = firebase.storage();
    storageRef = storage.ref();
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

var firebaseConfig = {
    apiKey: "AIzaSyBb1pPlPb4bWfNHP21iiBniXnppCvGyY88",
    authDomain: "selebrasyon-11649.firebaseapp.com",
    databaseURL: "https://selebrasyon-11649.firebaseio.com",
    projectId: "selebrasyon-11649",
    storageBucket: "selebrasyon-11649.appspot.com",
    messagingSenderId: "211956830893",
    appId: "1:211956830893:web:bc0e5bb83ff932a481ac24",
    measurementId: "G-LF1Q8334H5"
};