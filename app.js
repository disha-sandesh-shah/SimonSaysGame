let gameSeq = [];
let userSeq = [];
let highestScore = 0;

let btns = ["red", "yellow", "green", "blue"];

let started = false;
let level = 0;
let h3 = document.querySelector("h3");

document.addEventListener("keypress", function() {
    if(started == false) {
        console.log("Game is started");
        started = true;

        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);
}

function checkAns(idx) {
    if(gameSeq[idx] === userSeq[idx]) {
        if(gameSeq.length == userSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h3.innerHTML = `Game Over! Your Score was <b>${level}</b> <br>Press Any Key to Start!!`;
        highestScore = Math.max(highestScore, level);
        console.log(highestScore);
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress() {
    console.log(this);
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function levelUp() {
    userSeq = [];
    level++;
    h3.innerText = `Level ${level}`;
    
    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq);

    gameFlash(randBtn);
}

function reset() {
    gameSeq = [];
    userSeq = [];
    level = 0;
    started = false;
}