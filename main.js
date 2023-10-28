let gameContainer = document.getElementsByClassName('game-container');
let startButton = document.getElementById('start-button');
let changeButton = document.getElementById('change-button');
let resetButton = document.getElementById('reset-button');

//Button to change board size & check input
changeButton.addEventListener( 'click', () => {
    clearBoard();
    let userInput = prompt("Please enter a number from 1 to 50: ");
    if (Number(userInput) < 0 || Number(userInput) > 100){
        alert("Please enter a number between 1 and 100.");
        return;
    } else if (isNonNumeric(Number(userInput))){
        alert("Please enter a number between 1 and 100.");
        return;
    }

    init(userInput);
    console.log("Change button function complete. userInput: " + userInput);
})

//resets the board to the origninal 16x16. 
resetButton.addEventListener('click', () => {
    clearBoard();
    init(16);
    console.log('Reset function complete.');
})

//Initializes the board. Was originally going to run this on DOM load and have only a start button
startButton.addEventListener('click', () =>{

    init(16);
    console.log('Start function complete.');

})

//Board generation
function init(size){
    let divSize = size * 20; //Hard square div sizeof 20px, getting the area of the square
    let fragment = document.createDocumentFragment();
    let gameContainer = document.querySelector('.game-container');
    for(let i = 0; i < size * size; i++){
        let div = document.createElement('div');
        div.setAttribute('class', 'square');
        div.style.backgroundColor = 'grey'; 
        div.addEventListener('mouseenter', () => {
            if (div.style.backgroundColor === 'grey'){ //checking if default background color is there
                div.style.backgroundColor = generateHex(); 
            } else { //Changing brightness down 10%
                let brightness = getComputedStyle(div).filter.match(/brightness\((\d+)%\)/); 
                if (brightness && Number(brightness[1]) > 10) {
                    div.style.filter = `brightness(${Number(brightness[1]) - 10}%)`;
                } else {
                    div.style.filter = 'brightness(90%)';
                }
            }
            

        });
        fragment.appendChild(div);
    }
    gameContainer.appendChild(fragment);
    gameContainer.style.width = divSize + "px";
    console.log('Init function complete');
}
//removes divs
function clearBoard(){
    let nodes = document.getElementsByClassName('square');
    let nodesArray = Array.from(nodes);
    for (let i = 0; i < nodesArray.length; i++){
        nodesArray[i].remove();
    }
    console.log('Clear Board function complete.');
}

function isNonNumeric(input) {
    return typeof input !== 'number';
    console.log('Non Numeric Check function complete.');
}
//Assembles random hex
function generateHex(){
    let letters = "0123456789ABCDEF";
    let color = '#';
    for (let i = 1; i <= 6; i++){
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}