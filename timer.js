var audio = new Audio("img/bell.mp3");
var tick = new Audio("img/tick.mp3");
var clockDiv = document.getElementById("clockdiv");

function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    // var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
        var t = getTimeRemaining(endtime);
        if (t.total === 0) {
            // audio.play();
            modal.style.display = "block";
        }
        if(t.total < (11 * 1000)){
            clockDiv.style.color = "red"
            tick.play();
        }

        //   daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}

function startClock() {

    var time = prompt("Time (HH:MM) : ","00:04:00");
    var hour = time.split(":")[0];
    var min = time.split(":")[1];
    var sec = time.split(":")[2];
    console.log(hour,min)

    var timeInSeconfs = ((parseInt(hour) * 60) + parseInt(min)) * 60 + parseInt(sec);

    var deadline = new Date(Date.parse(new Date()) + 1000 * timeInSeconfs);
    initializeClock('clockdiv', deadline);
}



var elem = document.documentElement;
function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}


var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
// btn.onclick = function () {
//     modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
// span.onclick = function () {
//     modal.style.display = "none";
// }

document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {

        if(modal.style.display === 'block')
        modal.style.display = "none";
    }
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}