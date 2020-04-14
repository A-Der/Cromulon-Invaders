function init() {


  //* DOM ELEMENTS
  const grid = document.querySelector('.grid')
  const playBtn = document.querySelector('.play-button')
  const cells = []
  const scoreDisplay = document.querySelector('#score')
  const mainAudio = document.querySelector('#main')
  const secondAudio = document.querySelector('#secondary')
  const thirdAudio = document.querySelector('#third')
  


  //*GRID VARIABLES
  const width = 11
  const cellCount = width * (width + 3)




  //* GAME VARIABLES
  let rickIndex = 148
  const rickDead = false
  const armyIndex = [
    { currentIndex: 0, isAlive: true },
    { currentIndex: 1, isAlive: true },
    { currentIndex: 2, isAlive: true },
    { currentIndex: 3, isAlive: true },
    { currentIndex: 4, isAlive: true },
    { currentIndex: 5, isAlive: true },
    { currentIndex: 6, isAlive: true },
    { currentIndex: 7, isAlive: true },
    { currentIndex: 8, isAlive: true },
    { currentIndex: 11, isAlive: true },
    { currentIndex: 12, isAlive: true },
    { currentIndex: 13, isAlive: true },
    { currentIndex: 14, isAlive: true },
    { currentIndex: 15, isAlive: true },
    { currentIndex: 16, isAlive: true },
    { currentIndex: 17, isAlive: true },
    { currentIndex: 18, isAlive: true },
    { currentIndex: 19, isAlive: true },
    { currentIndex: 22, isAlive: true },
    { currentIndex: 23, isAlive: true },
    { currentIndex: 24, isAlive: true },
    { currentIndex: 25, isAlive: true },
    { currentIndex: 26, isAlive: true },
    { currentIndex: 27, isAlive: true },
    { currentIndex: 28, isAlive: true },
    { currentIndex: 29, isAlive: true },
    { currentIndex: 30, isAlive: true }
  ]
  let jerrysIndex = JSON.parse(JSON.stringify(armyIndex))
  const aliveJerrys = []
  let direction = 'r'
  let playerScore = 0
  let playingNow = false
  let result = 'won'
  playBtn.disabled = false
  
  // Array.prototype.addJerry = function() {
  //   this.forEach(i => {
  //     cells[i].classList.add('Jerry')
  //   })
  // }

  // jerrysIndex.forEach(jerry =>  {
  //   cells[jerry].classList.add('jerry')
  // })
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
    jerrysIndex.forEach(jerry => {
      if (jerry.isAlive) {
        cells[jerry.currentIndex].classList.add('jerry')
      }
    })

  }
  
  //*KEYBOARD CONTROLS -> MOVE RICK AND SHOOT
  function handleKeyDown(event) {
    event.preventDefault()
    if (playingNow === true) {
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
          playShootClip()
          laser()
      }
    }
  }


  
  //* LOGIC TO WORK OUT WHERE JERRY MOVES TO. NEEDS TO BE UPDATED SO THAT IF *ANY* JERRY EQUALS LEFT SIDE OR RIGHT SIDE.
  function jerrysMoves() { 
    const leftSide = jerrysIndex[0].currentIndex % width === 0
    const rightSide = jerrysIndex[jerrysIndex.length - 1].currentIndex % width === 10
  
    jerrysIndex.forEach(jerry => {
      if (jerry.isAlive) {
        cells[jerry.currentIndex].classList.remove('jerry')
      }
    })

    if (leftSide && direction === 'r') {
      jerrysIndex = jerrysIndex.map(jerry => {
        return { ...jerry, currentIndex: jerry.currentIndex + 1 }
      })
  
    } else if (rightSide && direction === 'r') {
      direction = 'l'
      jerrysIndex = jerrysIndex.map(jerry => {
        return { ...jerry, currentIndex: jerry.currentIndex + 11 }
      })
    
  
    } else if (rightSide && direction === 'l') {
      jerrysIndex = jerrysIndex.map(jerry => {
        return { ...jerry, currentIndex: jerry.currentIndex - 1 }
      })
    
    } else if (leftSide && direction === 'l') {
      direction = 'r'
      jerrysIndex = jerrysIndex.map(jerry => {
        return { ...jerry, currentIndex: jerry.currentIndex + 11 }
      })
    

    } else if (direction === 'r') {
      jerrysIndex = jerrysIndex.map(jerry => {
        return { ...jerry, currentIndex: jerry.currentIndex + 1 }
      })

    } else if (direction === 'l') {
      jerrysIndex = jerrysIndex.map(jerry => {
        return { ...jerry, currentIndex: jerry.currentIndex - 1 }
      })
  
    } 

    jerrysIndex.forEach(jerry => {
      if (jerry.isAlive) {
        cells[jerry.currentIndex].classList.add('jerry')
      }
    })
  } 
  

  //*SOUND FUNCTIONS -> NEEDS STREAMLINING INTO ONE FUNcTION AND CALL THE ID FROM HTML POSSIBLY?
  function playMainAudio(e) {
    console.log('main audio')
    mainAudio.src = `../assets/${e}.wav`
    mainAudio.play()
  }
    
  function playShootClip(){
    console.log('shoot')
    secondAudio.src = '../assets/laserfire01trim.wav'
    secondAudio.play()
  }
  function playSplat() {
    console.log('splat')
    thirdAudio.src = '../assets/splat.wav'
    thirdAudio.play()
  }



  //*LASER FROM RICK WILL CONTINUE UNTIL 2 SCENRIOS; 1: REACHES TOP OF BOARD AND STOPS. 2: HITS JERRY, STOPS AND ADDS POINTS TO SCORE
  function laser() {
    let laserIndex = rickIndex - width
    const timerId = setInterval(() => {

      if (cells[laserIndex].classList.contains('jerry')) {
        playSplat()
        clearInterval(timerId)
        cells[laserIndex].classList.remove('jerry') 


        jerrysIndex = jerrysIndex.map(jerry => {
          if (jerry.currentIndex === laserIndex) {
            return { ...jerry, isAlive: false }
          }
          return jerry
        })

        cells[laserIndex].classList.remove('laser')
        playerScore += 100
        scoreDisplay.textContent = playerScore  
        console.log('jerry shot')
        console.log(aliveJerrys)


        //* LASER DOESNT GO BEYOND TOP OF BOARD
      } else if (laserIndex < width) {
        cells[laserIndex].classList.remove('laser')
        clearInterval(timerId)
        //*LASER CONTINUES SHOOTING UP
      } else {
        cells[laserIndex].classList.remove('laser')
        laserIndex = laserIndex - 11
        cells[laserIndex].classList.add('laser')
      }
    },30) 
  }

  
  // function bombs() {
  //   const aliveJerrys = jerrysIndex.filter(jerry => {
  //     return jerry.isAlive 
  //   })
  //   let bombIndex = aliveJerrys[Math.floor(Math.random() * aliveJerrys.length)]
  //   const timerIdBomb = setInterval(() => {
  //     if (cells[bombIndex].classList.contains('jerry')) {
  //       rickDead = true
  
  //     } else if (bombIndex >= (width * 13)) {
  //       cells[bombIndex].classList.remove('bomb')
  
  //     } else {
  //       cells[bombIndex].classList.remove('bomb')
  //       bombIndex = bombIndex + 11
  //       cells[bombIndex].classList.add('bomb')
  //     }
      
  //   },90)
  
  // }


  //* FUNCTION TO  START GAME TO MOVE JERRY UNTIL HE REACHES RICKS OR RICK KILLS ALL JERRYS - TRIGGERS PLAYAGAIN FUNCTION
  function startGame() {
    playBtn.disabled = true
    playingNow = true 
    playMainAudio('wub-a-lub')

    const timerIdOne =  setInterval(() => {
      const winOrNo = jerrysIndex.every(jerry => {
        return !jerry.isAlive
      })
      
      if (cells[rickIndex].classList.contains('jerry') || rickDead) {
        result = 'died!'
        playingNow = false
        playAgain()
        clearInterval(timerIdOne)
      
      } else if (winOrNo === false) {
        jerrysMoves()

      } else {
        result = 'won!'
        playingNow = false
        // playRickWin()
        playAgain()
        clearInterval(timerIdOne)
      }
    }, 800)
  }


  //*DISPLAYS IF WIN OR LOSE, SCORE AND OPTION TO PLAY AGAIN
  function playAgain() {
    const confirm = window.confirm('You ' + (result) + ' You scored ' + (scoreDisplay.textContent) + ', play again?')
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