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
  const width = 12
  const height = 19
  const cellCount = width * height




  //* GAME VARIABLES
  let rickIndex = 222
  let rickDead = false
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
    { currentIndex: 9, isAlive: true },
    { currentIndex: 12, isAlive: true },
    { currentIndex: 13, isAlive: true },
    { currentIndex: 14, isAlive: true },
    { currentIndex: 15, isAlive: true },
    { currentIndex: 16, isAlive: true },
    { currentIndex: 17, isAlive: true },
    { currentIndex: 18, isAlive: true },
    { currentIndex: 19, isAlive: true },
    { currentIndex: 20, isAlive: true },
    { currentIndex: 21, isAlive: true },
    { currentIndex: 24, isAlive: true },
    { currentIndex: 25, isAlive: true },
    { currentIndex: 26, isAlive: true },
    { currentIndex: 27, isAlive: true },
    { currentIndex: 28, isAlive: true },
    { currentIndex: 29, isAlive: true },
    { currentIndex: 30, isAlive: true },
    { currentIndex: 31, isAlive: true },
    { currentIndex: 32, isAlive: true },
    { currentIndex: 33, isAlive: true },
    { currentIndex: 36, isAlive: true },
    { currentIndex: 37, isAlive: true },
    { currentIndex: 38, isAlive: true },
    { currentIndex: 39, isAlive: true },
    { currentIndex: 40, isAlive: true },
    { currentIndex: 41, isAlive: true },
    { currentIndex: 42, isAlive: true },
    { currentIndex: 43, isAlive: true },
    { currentIndex: 44, isAlive: true },
    { currentIndex: 45, isAlive: true }
  ]
  const leftEdge = [0, 12, 24, 36, 48, 60, 66, 72, 84, 96, 108, 120, 132, 144, 156, 168, 180, 192, 204, 216]
  const rightEdge = [11, 23, 35, 47, 59, 71, 83, 95, 107, 119, 131, 143, 155, 167, 179, 191, 203, 215, 227]
  let jerrysIndex = JSON.parse(JSON.stringify(armyIndex))
  let direction = 're'
  let playerScore = 0
  let playingNow = false
  let result = 'won'
  let laserCount = 0
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
          if (rickIndex > 216) {
            cells[rickIndex].classList.remove('rick')
            cells[rickIndex--]
            cells[rickIndex].classList.add('rick')
          }
          break
        case 39:
          if (rickIndex < 227){
            cells[rickIndex].classList.remove('rick')
            cells[rickIndex++]
            cells[rickIndex].classList.add('rick')
          }
          break
        case 32:
          laser()
          laserCount = laserCount + 1
      }
    }
  }


  
  //* LOGIC TO WORK OUT WHERE JERRY MOVES TO. NEEDS TO BE UPDATED SO THAT IF *ANY* JERRY EQUALS LEFT SIDE OR RIGHT SIDE.
  function jerrysMoves() {
    const isOnLeftEdge = leftEdge.some(edge => {
      return cells[edge].classList.contains('jerry')
    }) 
    const isOnRightEdge = rightEdge.some(edge => {
      return cells[edge].classList.contains('jerry')
    })
    
    jerrysIndex.forEach(jerry => {
      cells[jerry.currentIndex].classList.remove('pickle-explosion')
      cells[jerry.currentIndex].classList.remove('jerry-explosion')
    })

    jerrysIndex.forEach(jerry => {
      if (jerry.isAlive) {
        cells[jerry.currentIndex].classList.remove('jerry')
      }
    })
    

    if (isOnLeftEdge && direction === 're') {
      console.log('on left going right + 1')
      direction = 'r'
      jerrysIndex = jerrysIndex.map(jerry => {
        return { ...jerry, currentIndex: jerry.currentIndex + 1 }
      })
  
    } else if (isOnRightEdge && direction === 'r') {
      console.log('on right going down')
      direction = 'l'
      jerrysIndex = jerrysIndex.map(jerry => {
        return { ...jerry, currentIndex: jerry.currentIndex + 12 }
      })
    
  
    } else if (isOnRightEdge && direction === 'l') {
      console.log('on right goingleft')
      jerrysIndex = jerrysIndex.map(jerry => {
        return { ...jerry, currentIndex: jerry.currentIndex - 1 }
      })
    
    } else if (isOnLeftEdge && direction === 'l') {
      console.log('on left going down')
      direction = 'r'
      jerrysIndex = jerrysIndex.map(jerry => {
        return { ...jerry, currentIndex: jerry.currentIndex + 12 }
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
    
  function playSecondAudio(e){
    console.log('shoot')
    secondAudio.src = `../assets/${e}.wav`
    secondAudio.play()
  }
  function playThirdAudio(e) {
    console.log('splat')
    thirdAudio.src = `../assets/${e}.wav`
    thirdAudio.play()
  }
  //*random sounds generator--------------------------------------------------------------

  function randomSounds() {
    if (laserCount === 12) {
      playMainAudio('show-me')
    }
  }
 


  //*LASER FROM RICK WILL CONTINUE UNTIL 2 SCENRIOS; 1: REACHES TOP OF BOARD AND STOPS. 2: HITS JERRY, STOPS AND ADDS POINTS TO SCORE
  function laser() {

    if (laserCount >= 6){
      laserCount = 0


      playMainAudio('pickle-rick')
      let laserIndex = rickIndex - width
      const timerId = setInterval(() => {
      
        if (cells[laserIndex].classList.contains('jerry')) {
          playThirdAudio('killJ')
          clearInterval(timerId)
          cells[laserIndex].classList.remove('jerry')
          cells[laserIndex + 1].classList.remove('jerry')
          cells[laserIndex + 1].classList.add('pickle-explosion')
          cells[laserIndex].classList.add('pickle-explosion') 
          

          //* BONUS SHOT - PICKLE RICK, NEXT JERRY DIES TOO - WOULD BE GOOD TO ADD CONDITION IF ONLY NEXT ONE IS ALIVE OR ONE BEFORE
          jerrysIndex = jerrysIndex.map(jerry => {
            if (jerry.currentIndex === laserIndex) {
              return { ...jerry, isAlive: false }
            }
            return jerry
          })
          jerrysIndex = jerrysIndex.map(jerry => {
            if (jerry.currentIndex + 1 === laserIndex + 1) {
              return { ...jerry, isAlive: false }
            }
            return jerry
          })

          cells[laserIndex].classList.remove('pickle-rick')
          playerScore += 150
          scoreDisplay.textContent = playerScore  
          console.log('jerry shot')


        //* LASER DOESNT GO BEYOND TOP OF BOARD
        } else if (laserIndex < width) {
          cells[laserIndex].classList.remove('pickle-rick')
        //*LASER CONTINUES SHOOTING UP
        } else {
          cells[laserIndex].classList.remove('pickle-rick')
          laserIndex = laserIndex - 12
          cells[laserIndex].classList.add('pickle-rick')
        }
      },100) 

    } else {

      playSecondAudio('laserfire01trim')
      let laserIndex = rickIndex - width
      const timerId = setInterval(() => {
      
        if (cells[laserIndex].classList.contains('jerry')) {
          playThirdAudio('killJ')
          clearInterval(timerId)
          cells[laserIndex].classList.remove('jerry')
          cells[laserIndex].classList.add('jerry-explosion') 


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


        //* LASER DOESNT GO BEYOND TOP OF BOARD
        } else if (laserIndex < width) {
          cells[laserIndex].classList.remove('laser')

        //*LASER CONTINUES SHOOTING UP
        } else {
          cells[laserIndex].classList.remove('laser')
          laserIndex = laserIndex - 12
          cells[laserIndex].classList.add('laser')

        }
      },30) 
    }
  }

  //*JERRYS BOMBS-----------------------------------------------------------------
  function bombs() {
    const aliveJerrys = jerrysIndex.filter(jerry => {
      return jerry.isAlive 
    })
    
    let bombIndex = aliveJerrys[Math.floor(Math.random() * aliveJerrys.length)].currentIndex

   
    const timerIdBomb = setInterval(() => {
  
      if (cells[bombIndex].classList.contains('rick') || cells[rickIndex].classList.contains('jerry')) {
        cells[rickIndex].classList.add('rick-explosion')
        cells[rickIndex].classList.remove('rick')
        cells[bombIndex].classList.remove('bomb')
        playThirdAudio('bomb')
        console.log('hit rick')
        rickDead = true
        clearInterval(timerIdBomb)
  
      } else if (bombIndex >= (cellCount - width) ) {
        cells[bombIndex].classList.remove('bomb')
        clearInterval(timerIdBomb)

      } else {
        cells[bombIndex].classList.remove('bomb')
        bombIndex = bombIndex + 12
    
        cells[bombIndex].classList.add('bomb')
      }
      
    },100)
  
  }
  

  //* FUNCTION TO  START GAME TO MOVE JERRY UNTIL HE REACHES RICKS OR RICK KILLS ALL JERRYS - TRIGGERS PLAYAGAIN FUNCTION
  function startGame() {
    playBtn.disabled = true
    playingNow = true 
    playMainAudio('wub-a-lub')
    // randomSounds()

    const timerIdOne =  setInterval(() => {
      const winOrNo = jerrysIndex.every(jerry => {
        return !jerry.isAlive
      })
      
      if (rickDead) {
        setTimeout(playMainAudio('goddamn'), 1000)
        cells[rickIndex].classList.remove('rick')
        cells[rickIndex].classList.add('rick-explosion')
        
        result = 'died!'
        playingNow = false
        
        clearInterval(timerIdOne)
        setTimeout(playAgain, 3000)
      
      } else if (winOrNo === false) {
        jerrysMoves()
        bombs()
        randomSounds()
        
      } else {
        result = 'won!'
        playingNow = false
        playMainAudio('and-thats-the-way-news-goes')
        setTimeout(playAgain, 3000)
        clearInterval(timerIdOne)
      }
    }, 600)
  }


  //*DISPLAYS IF WIN OR LOSE, SCORE AND OPTION TO PLAY AGAIN
  function playAgain() {
    const confirm = window.confirm('You ' + (result) + ' You scored ' + (scoreDisplay.textContent) + ', play again?')
    if (confirm === true) {
      restartGame()
    } else {
      window.alert('Bye')
    }
  }


  //* RESTART FUNCTION ----------------------------------------------------------------

  function restartGame() {
    rickIndex = 222
    rickDead = false
    jerrysIndex = JSON.parse(JSON.stringify(armyIndex))
    direction = 'r'
    playerScore = 0
    playingNow = false
    result = 'won'
    laserCount = 0
    playBtn.disabled = false


    cells.forEach(cell => {
      cell.classList = ''
    })

    cells[rickIndex].classList.add('rick')
    jerrysIndex.forEach(jerry => {
      if (jerry.isAlive) {
        cells[jerry.currentIndex].classList.add('jerry')
      }
    })
  }







  createGrid()

  //*EVENT LISTENERS
  playBtn.addEventListener('click', startGame)
  document.addEventListener('keydown', handleKeyDown)




}

window.addEventListener('DOMContentLoaded', init)