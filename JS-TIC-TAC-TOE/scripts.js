
const X_CLASS = 'x'
const O_CLASS = 'o'

let circleTurn
const board = document.getElementById('board')
const cellElements = document.querySelectorAll('[data-cell]')
const winningMessage = document.getElementById('winningMessage')
const winningMessageText = document.querySelector('[data-winning-message-text]')
const restartButton = document.getElementById('restartButton')
const WINNER_COMBINATION = [
    [5,11,17,23],[0,6,12,18],[6,12,18,24],[1,7,13,19],
    [3,7,11,15],[4,8,12,16],[8,12,16,20],[9,13,17,21],
    [0,5,10,15],[5,10,15,20],[1,6,11,16],[6,11,16,21],[2,7,12,17],[7,12,17,22],[3,8,13,18],[8,13,18,23],[4,9,14,19],[9,14,19,24],
    [0,1,2,3],[1,2,3,4],[5,6,7,8],[6,7,8,9],[10,11,12,13],[11,12,13,14],[15,16,17,18],[16,17,18,19],[20,21,22,23],[21,22,23,24]
]


startGame()

restartButton.addEventListener('click', startGame)


function startGame() {
    circleTurn = false
    // To only fire this once when clicked
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass()
    winningMessage.classList.remove('show')
}

function endGame(draw) {
    if (draw) {
        winningMessageText.innerText = 'Draw!'
    }else{
        winningMessageText.innerText = `${circleTurn ? "O's Wins!" : "X's Wins!"}`
    }
    winningMessage.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => { //destructuring this to handle the every method
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    })
}

function handleClick(evt) {
    // placeMark
    // Check For Win
    // Check for Draw
    //Switch Turns
    const cell = evt.target
    const currentClass = circleTurn ? O_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)){
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }  
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)
    if (circleTurn){
        board.classList.add(O_CLASS)
    }else{
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass){
    
    return WINNER_COMBINATION.some(combination => { // returns true if any combination found
        return combination.every(index => { // loops over each combination
            return cellElements[index].classList.contains(currentClass) // compares all cells
        })
    })
}

