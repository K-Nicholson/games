var numSelected = null;
var tileSelected = null;

var errors = 0;
var board = [
    [".", ".", "7", "2", "9", "1", "6", ".", "5"],
    ["2", ".", ".", ".", "6", ".", "3", ".", "9"],
    [".", ".", ".", ".", ".", "7", ".", "1", "."],
    [".", "5", "8", "6", ".", ".", ".", ".", "4"],
    [".", ".", "3", ".", ".", ".", ".", "9", "."],
    [".", ".", "6", "2", ".", ".", "1", "8", "7"],
    ["9", ".", "4", ".", "7", ".", ".", ".", "2"],
    ["6", "7", ".", "8", "3", ".", ".", ".", "."],
    ["8", "1", ".", ".", "4", "5", ".", ".", "."]
]
var solution = [
    ["3", "8", "7", "4", "9", "1", "6", "2", "5"],
    ["2", "4", "1", "5", "6", "8", "3", "7", "9"],
    ["5", "6", "9", "3", "2", "7", "4", "1", "8"],
    ["7", "5", "8", "6", "1", "9", "2", "3", "4"],
    ["1", "2", "3", "7", "8", "4", "5", "9", "6"],
    ["4", "9", "6", "2", "5", "3", "1", "8", "7"],
    ["9", "3", "4", "1", "7", "6", "8", "5", "2"],
    ["6", "7", "5", "8", "3", "2", "9", "4", "1"],
    ["8", "1", "2", "9", "4", "5", "7", "6", "3"]

]

window.onload = function () {
    setGame();
}

function setGame() {
    //Digits 1-9
    for (let i = 1; i <= 9; i++) {
        let num = document.createElement("div");
        num.id = i;
        num.innerText = i;
        num.addEventListener("click", selectNumber);
        num.classList.add("number");
        document.getElementById("digits").appendChild(num);
    }

    setBoard();
    startTimer();

    //restart button
    document.getElementById("restart").addEventListener("click",restart);
}

function setBoard() {
    // 9x9 board
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();

            if (board[r][c] != ".") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }else{
                tile.innerText = "";
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }

            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }

    }
}

function selectNumber() {
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
    if (numSelected) {
        if (this.innerText != "") {
            return;
        }

        let coords = this.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solution[r][c] == numSelected.id) {
            this.innerText = numSelected.id;
        }
        else {
            errors++;
            document.getElementById("errors").innerText = "Mistakes: " + errors +"/3";
            if (errors >= 3) {
                gameOver();
            }

        }
    }
}

function gameOver() {
    document.getElementById("gameOver").style.display = "block";
}

function restart() {
    //Clear board
    var div = document.getElementById("board");
              
    while(div.firstChild) {
        div.removeChild(div.firstChild);
    }

    setBoard();
    errors=0;
    document.getElementById("errors").innerText = "Mistakes: " + errors +"/3";
    document.getElementById("gameOver").style.display = "none";
    resetTimer();
    startTimer();


}

//Stopwatch
let stopBtn = document.getElementById('pause');

let hour = 00;
let minute = 00;
let second = 00;
let count = 00;

function startTimer(){
    timer = true;
	stopWatch();
}

stopBtn.addEventListener('click', function () {
	timer = false;
});

function resetTimer(){
    timer = false;
	hour = 0;
	minute = 0;
	second = 0;
	count = 0;
	document.getElementById('hr').innerHTML = "00";
	document.getElementById('min').innerHTML = "00";
	document.getElementById('sec').innerHTML = "00";
	document.getElementById('count').innerHTML = "00";
}

function stopWatch() {
	if (timer) {
		count++;

		if (count == 100) {
			second++;
			count = 0;
		}

		if (second == 60) {
			minute++;
			second = 0;
		}

		if (minute == 60) {
			hour++;
			minute = 0;
			second = 0;
		}

		let hrString = hour;
		let minString = minute;
		let secString = second;
		let countString = count;

		if (hour < 10) {
			hrString = "0" + hrString;
		}

		if (minute < 10) {
			minString = "0" + minString;
		}

		if (second < 10) {
			secString = "0" + secString;
		}

		if (count < 10) {
			countString = "0" + countString;
		}

		document.getElementById('hr').innerHTML = hrString;
		document.getElementById('min').innerHTML = minString;
		document.getElementById('sec').innerHTML = secString;
		document.getElementById('count').innerHTML = countString;
		setTimeout(stopWatch, 10);
	}
}
