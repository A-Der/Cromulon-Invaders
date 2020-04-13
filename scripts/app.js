function init() {


  //* DOM ELEMENTS
  const grid = document.querySelector('.grid')
  const playBtn = document.querySelector('.play-button')
  const cells = []
  const scoreDisplay = document.querySelector('#score')
  


  //*GRID VARIABLES
  const width = 11
  const cellCount = width * (width + 3)




  //* GAME VARIABLES
  let rickIndex = 148
  let jerrysIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 13, 14, 15, 16, 17, 18, 19]
  let direction = 'r'
  let playerScore = 0
  let rickDead = false
  let confirm = false
  playBtn.disabled = false
  // const laserIndex = rickIndex - width
  



  //* FUNCTIONS
  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
    }
    cells[rickIndex].classList.add('rick')

    jerrysIndex.forEach(jerry =>  {
      cells[jerry].classList.add('jerry')
    })
  }
  
  //*KEYBOARD CONTROLS -> MOVE RICK AND SHOOT
  function handleKeyDown(event) {
    switch (event.keyCode) {
      case 37:
        if (rickIndex > 143) {
          cells[rickIndex].classList.remove('rick')
          cells[rickIndex--]
          cells[rickIndex].classList.add('rick')
        }
        break
      case 39:
        if (rickIndex < 153){
          cells[rickIndex].classList.remove('rick')
          cells[rickIndex++]
          cells[rickIndex].classList.add('rick')
        }
        break
      case 32:
        event.preventDefault()
        laser()
    }
  }
    

  //* LOGIC TO WORK OUT WHERE JERRY MOVES TO
  function jerrysMoves() { 
    const leftSide = jerrysIndex[0] % width === 0
    const rightSide = jerrysIndex[jerrysIndex.length - 1] % width === 10

    if (rightSide && direction === 'r') {
      direction = 'l'
      jerrysIndex.forEach(jerry =>  {
        cells[jerry].classList.remove('jerry')
      })
      jerrysIndex = jerrysIndex.map(jerry => {
        return jerry + 11
      })
      jerrysIndex.forEach(jerry =>  {
        cells[jerry].classList.add('jerry')
      })

    } else if (leftSide === true && direction === 'l') {
      direction = 'r'
      jerrysIndex.forEach(jerry =>  {
        cells[jerry].classList.remove('jerry')
      })
      jerrysIndex = jerrysIndex.map(jerry => {
        return jerry + 11
      })
      jerrysIndex.forEach(jerry =>  {
        cells[jerry].classList.add('jerry')
      })

    } else if (direction === 'r') {
      jerrysIndex.forEach(jerry =>  {
        cells[jerry].classList.remove('jerry')
      })
      jerrysIndex = jerrysIndex.map(jerry => {
        return jerry + 1
      })
      jerrysIndex.forEach(jerry =>  {
        cells[jerry].classList.add('jerry')
      })

    } else if (direction === 'l') {
      jerrysIndex.forEach(jerry =>  {
        cells[jerry].classList.remove('jerry')
      })
      jerrysIndex = jerrysIndex.map(jerry => {
        return jerry - 1
      })
      jerrysIndex.forEach(jerry =>  {
        cells[jerry].classList.add('jerry')
      })

    } 
  }

  function laser() {
    let laserIndex = rickIndex - width
    const timerId = setInterval(() => {

      if (cells[laserIndex].classList.contains('jerry')) {

        clearInterval(timerId)
        cells[laserIndex].classList.remove('jerry') 
        jerrysIndex = jerrysIndex.filter(jerry => {
          return cells[jerry].classList.contains('jerry')
        })

        cells[laserIndex].classList.remove('laser')
        playerScore += 100
        scoreDisplay.textContent = playerScore  
        console.log('jerry shot')

        //* LASER DOESNT GO BEYOND TOP OF BOARD
      } else if (laserIndex < width) {
        cells[laserIndex].classList.remove('laser')
        //*LASER CONTINUES SHOOTING UP
      } else {
        cells[laserIndex].classList.remove('laser')
        laserIndex = laserIndex - 11
        cells[laserIndex].classList.add('laser')
      }
    },30) 
  }
  
  
  //* FUNCTION TO  START GAME TO MOVE JERRY UNTIL HE REACHES RICKS ROW
  function startGame() {
    playBtn.disabled = true
  
    const timerId0 =  setInterval(() => {
      if (jerrysIndex.length  === 0) {
        console.log('you won!')
      
      } else if (jerrysIndex[jerrysIndex.length - 1] < (width * (width + 2))) {
        jerrysMoves()

      } else {
        rickDead = true
        clearInterval(timerId0)
        playAgain()
      }
    }, 10)
  }

  function playAgain() {
    confirm = window.confirm('You Died! You scored ' + (scoreDisplay.textContent) + ', play again?')
    if (confirm === true) {
      document.location.href = ''
    } else {
      window.alert('Bye')
    }
  }

  
  
  
  

  createGrid()

  //*EVENT LISTENERS
  playBtn.addEventListener('click', startGame)
  document.addEventListener('keydown', handleKeyDown)




}

window.addEventListener('DOMContentLoaded', init)