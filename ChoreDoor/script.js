let doorImage1 = document.getElementById('door1');
let doorImage2 = document.getElementById('door2');
let doorImage3 = document.getElementById('door3');

const closedDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg";
const botDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg";
const beachDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg";
const spaceDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg";

let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;
let startButton = document.getElementById('start');
let currentlyPlaying = true;

const isBot = door => {
    if (door.src === botDoorPath) {
        return true;
    }
    return false;
}
const isClicked = door => {
    if (door.src === closedDoorPath) {
        return false;
    }
    return true;
}

const playDoor = door => {
    numClosedDoors--;
    if (numClosedDoors === 0) {
        gameOver('win');
    }
    else if (isBot(door)) {
        gameOver();
    }
}

const gameOver = status => {
    if (status === 'win') {
        startButton.innerHTML = 'You win! Play again?';
    }
    else {
        startButton.innerHTML = 'Game over! Play again?';
    }
    currentlyPlaying = false;
}

const randomChoreDoorGenerator = () => {
    let choreDoor = Math.floor(Math.random()*3);
    if (choreDoor === 0) {
        openDoor1 = botDoorPath;
        openDoor2 = beachDoorPath;
        openDoor3 = spaceDoorPath;
    }
    else if (choreDoor === 1) {
        openDoor1 = spaceDoorPath;
        openDoor2 = botDoorPath;
        openDoor3 = beachDoorPath;
    }
    else {
        openDoor1 = beachDoorPath;
        openDoor2 = spaceDoorPath;
        openDoor3 = botDoorPath;
    }
};

doorImage1.onclick = () => {
    if (currentlyPlaying && !isClicked(doorImage1)) {
        doorImage1.src = openDoor1;
    playDoor(doorImage1);
    }
};

doorImage2.onclick = () => {
    if (currentlyPlaying && !isClicked(doorImage2)) {
        doorImage2.src = openDoor2;
    playDoor(doorImage2);
    }
};

doorImage3.onclick = () => {
    if (currentlyPlaying && !isClicked(doorImage3)) {
        doorImage3.src = openDoor3;
    playDoor(doorImage3);
    }
};

const startRound = () => {
    doorImage2.src = closedDoorPath;
    doorImage3.src = closedDoorPath;
    doorImage1.src = closedDoorPath;
    numClosedDoors = 3;
    startButton.innerHTML = 'Good luck!';
    currentlyPlaying = true;
    randomChoreDoorGenerator();
}

startButton.onclick = () => {
    if (!currentlyPlaying) {
        startRound();
    }
}
randomChoreDoorGenerator()
