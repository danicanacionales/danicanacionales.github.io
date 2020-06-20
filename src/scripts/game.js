const startContainer = document.getElementById('startContainer');
const startButton = document.getElementById('startButton');
const arrowContainers = document.getElementsByClassName('arrowContainer');
const arrowLeft = document.getElementById('arrowLeft');
const arrowRight = document.getElementById('arrowRight');

const questionContainer = document.getElementById('questionContainer');
const questionNumber = document.getElementById('numberContent');
const panelQuestion = document.getElementById('panelQuestion');
const question = document.getElementById('question');
const panelPhoto = document.getElementById('panelPhoto');
const photo = document.getElementById('photo');

const whoThisButton = document.getElementById('whoThisButton');
const iKnowButton = document.getElementById('iKnowButton');

const answerContainer = document.getElementById('answerContainer');
const videoElement = document.getElementById('videoElement');
const videoController = document.getElementById('videoController');
var videoControllerIcon = document.getElementById('videoControllerIcon');

const name = document.getElementById('name');
var currentQuestion;
var index;
var storage;
var storageRef;

function displayAnswer() {
    questionContainer.style.setProperty('display', 'none', 'important');
    answerContainer.style.removeProperty('display');

    name.innerHTML = currentQuestion.person;

    var sourceNode = document.createElement('SOURCE');
    storageRef.child('videoMessages/' + currentQuestion.question.filename).getDownloadURL().then(function(url) {
        sourceNode.setAttribute('src', url);
    }).catch(function(error) {
        // Handle any errors
    });

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
}

function displayQuestion() {
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
    
    videoElement.innerHTML = '';
    switchToPlay();

    answerContainer.style.setProperty('display', 'none', 'important');
    questionContainer.style.removeProperty('display');

    currentQuestion = questions[index];
    questionNumber.innerHTML = index + 1;

    if(currentQuestion.questionType == 'kwento') {
        panelQuestion.style.removeProperty('display');
        panelPhoto.style.setProperty('display', 'none', 'important');
        
        question.innerHTML = currentQuestion.question.kwento;
    } else {
        panelQuestion.style.setProperty('display', 'none', 'important');
        panelPhoto.style.removeProperty('display');

        // photo.setAttribute('src', 'resources/photos/' + currentQuestion.question.filename)

        storageRef.child('images/' + currentQuestion.question.filename).getDownloadURL().then(function(url) {
            photo.setAttribute('src', url);
        }).catch(function(error) {
            // Handle any errors
        });
    }

    console.log(currentQuestion.question.kwento);
}

startButton.addEventListener('click', (event) => {
    startContainer.style.setProperty('display', 'none', 'important');
    console.log(startContainer);

    arrowContainers[0].style.visibility = 'visible';
    arrowContainers[1].style.visibility = 'visible';
    questionContainer.style.removeProperty('display');

    index = 0;
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

whoThisButton.addEventListener('click', (event) => {
    displayAnswer();
});

iKnowButton.addEventListener('click', (event) => {
    displayAnswer();
});

function initPart2() {
    loadJSON(function(response) {
        questions = JSON.parse(response.toString());

        console.log(questions);
    });

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