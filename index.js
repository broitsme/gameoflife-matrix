/*intializing board of size 1000X1000*/
let boardSize = 50;
let future;
let board;
( function () {
    future = new Array(boardSize);
    board = new Array(boardSize);
    for (let i = 0; i < board.length; i++) {
        board[i] = new Array(board.length);
        future[i] = new Array(board.length);
        for (let j = 0; j < board.length; j++) {
            if (i >= 30 && i <= 60 && j >= 30 && j <= 60) {
                let n = Math.random();
                board[i][j] = n > .3 ? 1 : 0;
            }
            else {
                board[i][j] = 0;
            }
            future[i][j] = 0;
        }
    }
}) ();
/*createing the grid*/
( function () {
    let gridElement = document.getElementById('board-container');
    for (let i = 0; i < board.length; i++) {
        let rowElement = document.createElement('div');
        for (let j = 0; j < board.length; j++) {
            let blockElement = document.createElement('div');
            blockElement.setAttribute('id', i + ',' + j);
            blockElement.classList.add('grid-block');
            blockElement.onclick = () => { board[i][j] = 1; updateCell(i,j)};
            rowElement.appendChild(blockElement);
            if (board[i][j] == 0) {
                blockElement.classList.add('black-grid');
            }
            else {
                blockElement.classList.add('white-grid');
            }
        }
        gridElement.appendChild(rowElement);
    }
}) ();


 function updateCell(i, j) {
    let cellElement = document.getElementById(i+','+j);
    cellElement.classList.remove('black-grid');
    cellElement.classList.remove('white-grid');
     if (future[i][j] == 0) {
         cellElement.classList.add('black-grid');
    }
    else {
         cellElement.classList.add('white-grid');
     }
 }

function NeighborsCount(i,j) {
    let count = 0;
    for (let l = -1; l <= 1; l++){
        for (let m = -1; m <= 1; m++){
            let a = i + l, b = j + m;
            if (a >= board.length) {
                a = 0;
            }
            if (a < 0) {
                a = board.length - 1;
            }
            if (b >= board.length) {
                b = 0;
            }
            if (b < 0) {
                b = board.length - 1;
            }
             count += board[a][b];
        }
    }
     count -= board[i][j];
    return count; 
}
function makeChanges() {
    future = new Array();
    for (let i = 0; i < board.length; i++) {
        future[i] = new Array();
        for (let j = 0; j < board.length; j++) {
            future[i][j] = 0;
            let neighborsCount = NeighborsCount(i, j);
            if (board[i][j] === 1 && neighborsCount < 2) {
                future[i][j] = 0;
            } else if (board[i][j] === 1 && neighborsCount > 3) {
                future[i][j] = 0;
            }
            else if (board[i][j] === 0 && neighborsCount === 3) {
                future[i][j] = 1;
            }
            else {
                future[i][j] = board[i][j];
            }
            updateCell(i, j);
        }
    }
    board = future;
}

setInterval(makeChanges, 100);