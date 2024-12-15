const board = document.getElementById('board');
const statusDiv = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameActive = true;
let boardState = Array(9).fill(null);

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

 function createBoard() {
    board.innerHTML = '';
    boardState.forEach((_, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = index;
        board.appendChild(cell);
    });
}

 function handleCellClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (boardState[index] || !gameActive) return;

    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');

    if (checkWin()) {
        statusDiv.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (boardState.every(cell => cell !== null)) {
        statusDiv.textContent = `It's a draw!`;
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDiv.textContent = `Player ${currentPlayer}'s turn`;
}

 function checkWin() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return (
            boardState[a] &&
            boardState[a] === boardState[b] &&
            boardState[a] === boardState[c]
        );
    });
}

 function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    boardState = Array(9).fill(null);
    statusDiv.textContent = `Player X's turn`;
    createBoard();
}

 board.addEventListener('click', handleCellClick);
resetButton.addEventListener('click', resetGame);

 createBoard();
