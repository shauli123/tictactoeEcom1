const playAgBtn = document.querySelector('#plg');
const header = document.querySelector('#header');
const modeSpan = document.querySelector('#mode-span');
const turnSpan = document.querySelector('#turn-span');
const cells = document.querySelectorAll('.cell');
const robotBtn = document.querySelector('#robotBtn');
const winMoves = [[1, 2, 3], [4, 5, 6], [7, 8, 9],
[1, 4, 7], [2, 5, 8], [3, 6, 9],
[1, 5, 9], [3, 5, 7]]
let avMoves = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let Xmoves = [];
let Cmoves = [];
let currentPlayer = 'X';
let gameStart = false;
let gameMode = 'player';
function checkWin() {
    if (currentPlayer == 'X') {
        for (let i = 0; i < winMoves.length; i++) {
            if (Xmoves.includes(winMoves[i][0]) && Xmoves.includes(winMoves[i][1]) && Xmoves.includes(winMoves[i][2])) {
                return true;
            }
        }
        return false;
    }
    if (currentPlayer == 'O') {
        for (let i = 0; i < winMoves.length; i++) {
            if (Cmoves.includes(winMoves[i][0]) && Cmoves.includes(winMoves[i][1]) && Cmoves.includes(winMoves[i][2])) {
                return true;
            }
        }
        return false;
    }
}

playAgBtn.addEventListener('click', () => {
    window.location.reload();
})
for (let i = 0; i < cells.length; i++) {
    let cell = cells[i];
    cell.addEventListener('click', () => {
        gameStart = true;
        cellNum = parseInt(cell.id.replace("cell-", ""));
        if (gameMode == 'player') {
            if (avMoves.includes(cellNum)) {
                if (currentPlayer == 'X') {
                    cell.style.color = "red"
                    cell.innerHTML = "<i class='bi bi-x-lg'></i>";
                    Xmoves.push(cellNum);
                    if (checkWin()) {
                        alert("Player X wins!");
                        header.textContent = 'Player X wins!';
                        return;
                    }
                    else {
                        turnSpan.textContent = 'O';
                        currentPlayer = 'O';
                    }
                }
                else if (currentPlayer == 'O') {
                    cell.style.color = "blue"
                    cell.innerHTML = "<i class='bi bi-circle'></i>";
                    Cmoves.push(cellNum);
                    if (checkWin()) {
                        alert("Player O wins!");
                        header.textContent = 'Player O wins!';
                        return;
                    }
                    else {
                        turnSpan.textContent = 'X';
                        currentPlayer = 'X';
                    }
                }
                avMoves.splice(avMoves.indexOf(cellNum), 1);
            }
            else {
                alert("This cell is already taken");
            }
            if (avMoves.length == 0) {
                alert("It's a draw!");
                header.textContent = 'Its a draw!';
            }
        }
        if (gameMode == "robot") {
            if (avMoves.length > 0) {
                if (avMoves.includes(cellNum)) {
                    if (currentPlayer == 'X') {
                        cell.style.color = "red";
                        cell.innerHTML = "<i class='bi bi-x-lg'></i>";
                        Xmoves.push(cellNum);
                        if (checkWin()) {
                            alert("Player wins!");
                            header.textContent = 'Player wins!';
                            return;
                        } else {
                            turnSpan.textContent = 'O';
                            currentPlayer = 'O';
                        }
                        avMoves.splice(avMoves.indexOf(cellNum), 1);
                    }

                    let robotMove = avMoves[Math.floor(Math.random() * avMoves.length)];
                    console.log(robotMove);
                    let robotCell = document.getElementById(`cell-${robotMove}`);
                    if (robotCell) {
                        robotCell.style.color = "blue";
                        robotCell.innerHTML = "<i class='bi bi-circle'></i>";
                        Cmoves.push(robotMove);
                        if (checkWin()) {
                            alert("Robot wins!");
                            header.textContent = 'Robot wins!';
                            return;
                        } else {
                            turnSpan.textContent = 'X';
                            currentPlayer = 'X';
                        }
                        avMoves.splice(avMoves.indexOf(robotMove), 1);
                    } else {
                        console.error(`Cell with ID cell-${robotMove} not found`);
                    }

                }
                if (avMoves.length == 0) {
                    alert("It's a draw!");
                    header.textContent = 'Its a draw!';
                }
            } else {
                alert("This cell is already taken");
            }
        }
    }
    );
}
robotBtn.addEventListener('click', () => {
    if (!gameStart) {
        if (gameMode === 'robot') {
            robotBtn.innerHTML = "<i class='bi bi-robot'></i>";
            modeSpan.innerHTML = "Friends";
            gameMode = 'player';
        } 
        else {
            robotBtn.innerHTML = "<i class='bi bi-people-fill'></i>";
            modeSpan.innerHTML = "Robot";
            gameMode = 'robot';
        }
        localStorage.setItem('gameMode', gameMode);
    }
});
window.addEventListener('load', () => {
    const savedMode = localStorage.getItem('gameMode');
    if (savedMode) {
        gameMode = savedMode;
        modeSpan.innerHTML = gameMode === 'robot' ? "Robot" : "Friends";
        robotBtn.innerHTML = gameMode === 'robot' ? "<i class='bi bi-people-fill'></i>" : "<i class='bi bi-robot'></i>";
    }
});
