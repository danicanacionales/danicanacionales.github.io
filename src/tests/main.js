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