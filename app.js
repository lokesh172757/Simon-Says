//original game logic
let userSeq = [];
let gameSeq = [];
let btns = ["red", "yellow", "green", "purple"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");
let highest = 0;

document.addEventListener("keypress", function () {
    if (started == false) {
        started = true;
        console.log("game started");
        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randomIdx = Math.floor(Math.random() * 4);
    randomColor = btns[randomIdx];
    randomBtn = document.querySelector(`.${randomColor}`)
    gameSeq.push(randomColor);
    console.log(randomColor);
    btnFlash(randomBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    }
    else {
        if (highest < level - 1) {
            highest = level - 1;
        }
        h2.innerHTML = `Game over, your score was <b>${level - 1}</b><br>Press any key to restart game.<br>Highest score is ${highest}.`;
        
        // Enhanced game over effect
        document.body.style.background = "linear-gradient(135deg, #ff4757, #c44569)";
        setTimeout(function () {
            document.body.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

let allbtn = document.querySelectorAll(".btn");
for (btn of allbtn) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    level = 0;
    started = false;
    userSeq = [];
    gameSeq = [];
}

// Enhanced particle effect
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.animationDelay = Math.random() * 3 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 5000);
}

// Create particles periodically
setInterval(createParticle, 300);

// Add loading animation
window.addEventListener('load', () => {
    document.querySelector('.game-container').classList.add('loading');
});