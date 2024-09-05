const root = document.getElementById("root");
const containerGen = document.createElement("div");
const displayTurn = document.createElement("h2");
displayTurn.classList.add("winner");
displayTurn.id = "turn";
const displayX = document.createElement("h2");
displayX.classList.add("winner");
displayX.id = "win-X";
const displayY = document.createElement("h2");
displayY.classList.add("winner");
displayY.id = "win-Y";
const displayT = document.createElement("h2");
displayT.classList.add("winner");
displayT.id = "tie";
containerGen.classList.add("container");
containerGen.id = "container";

displayTurn.textContent = "Turn: X";
displayX.textContent = "X wins the game!";
displayY.textContent = "Y wins the game!";
displayT.textContent = "It's a tie!";

const rst = document.createElement("button");
rst.id = "reset-btn";
rst.textContent = "Reset";

root.appendChild(displayTurn);
root.appendChild(displayX);
root.appendChild(displayY);
root.appendChild(displayT);
root.appendChild(containerGen);
root.appendChild(rst);

const generate = () => {
    for (let i = 0; i < 9; i++) {
        const sqr = document.createElement("div");
        sqr.className = "spots";
        sqr.id = `n${i + 1}`;
        containerGen.appendChild(sqr);
    }
}


generate()


const container = document.getElementById("container");
const winnerX = document.getElementById("win-X");
const winnerY = document.getElementById("win-Y");
const tie = document.getElementById("tie");
const spots = document.querySelectorAll(".spots");
const sign = document.getElementsByClassName("sign");
const turnText = document.getElementById("turn");
const n1 = document.getElementById("n1");
const n2 = document.getElementById("n2");
const n3 = document.getElementById("n3");
const n4 = document.getElementById("n4");
const n5 = document.getElementById("n5");
const n6 = document.getElementById("n6");
const n7 = document.getElementById("n7");
const n8 = document.getElementById("n8");
const n9 = document.getElementById("n9");
const resetBtn = document.getElementById("reset-btn");
const allSpots = [n1, n2, n3, n4, n5, n6, n7, n8, n9];
let turn = 0;



 // BOT 
    
    
 const bot = () => {

    let random = Math.floor(Math.random() * 9) + 1;
    let picked = `n${random}`;
    
  
    let pickedElement = document.getElementById(picked);
    if (pickedElement.children.length === 0){
        pickedElement.innerHTML = `<div class="y sign"></div>`;
        turn = 0;
        turnText.textContent = "Turn: X";
        enableClicks();
        if (!winCheck()) {
            order(); 
        }
    } else {
        bot();
    }
   
    
};


const order = () => {
    if (turn === 1) {
        disableClicks();
        setTimeout(bot, 1000);
    }
};



// for the Endgame

const disableClicks = () => {
    container.classList.add('disabled');
};
// for reset 

const enableClicks = () => {
    container.classList.remove('disabled');
};



    // Game Logic
    const winCheck = () => {

        const winningCombinations = [
            [n1, n2, n3], // Top row
            [n4, n5, n6], // Middle row
            [n7, n8, n9], // Bottom row
            [n1, n4, n7], // Left column
            [n2, n5, n8], // Middle column
            [n3, n6, n9], // Right column
            [n1, n5, n9], // Left diagonal
            [n3, n5, n7]  // Right diagonal
        ];
    
    
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
    
            // Check if all three spots in the combination contain the same player's mark
            if (a.children.length > 0 && 
                a.children[0].classList.contains('x') && 
                b.children.length > 0 && 
                b.children[0].classList.contains('x') && 
                c.children.length > 0 && 
                c.children[0].classList.contains('x')) {
                turnText.style.display = "none";
                winnerX.style.display = "block";
                disableClicks();
                return true;
            }
            
            if (a.children.length > 0 && 
                a.children[0].classList.contains('y') && 
                b.children.length > 0 && 
                b.children[0].classList.contains('y') && 
                c.children.length > 0 && 
                c.children[0].classList.contains('y')) {
                turnText.style.display = "none";
                winnerY.style.display = "block";
                disableClicks();
                return true;
            }
        }
    
        if (allSpots.every(spot => spot.children.length > 0)) {
            turnText.style.display = "none";
            tie.style.display = "block";
            disableClicks();
            return true;
        }
    
        return false;
    }
    
    


// Thing that populates the cell with the next sign depending on turn

const action = (event) => {
    
    const clickedCell = event.currentTarget;

    if (winCheck()) {
        return;  
     }

    if (clickedCell.children.length === 0) {
        turnText.textContent = "";
        if (turn === 0) {
            clickedCell.innerHTML = `<div class="x sign"></div>`
            turn = 1;
            turnText.textContent = "Turn: O"
            disableClicks();
            
            

        } else {
            clickedCell.innerHTML = `<div class="y sign"></div>`
            turn = 0;
            turnText.textContent = "Turn: X"
            
           
        }
        
        if (!winCheck()) {
            order();  
        }
     }
    }

    
    spots.forEach(spot => {
        spot.addEventListener('click', action);
    });


// Reset button function

const reset = () => {
    turnText.style.display = "block";
    tie.style.display = "none";
    winnerX.style.display = "none";
    winnerY.style.display = "none";
    turn = 0;
    turnText.textContent = "Turn: X"
    while(sign[0]) {
        sign[0].parentNode.removeChild(sign[0]);
    }
    enableClicks();
}

resetBtn.addEventListener("click", reset)

