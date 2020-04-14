function init() {


  //* DOM ELEMENTS
  const grid = document.querySelector('.grid')
  const playBtn = document.querySelector('.play-button')
  const cells = []
  const scoreDisplay = document.querySelector('#score')
  const mainAudio = document.querySelector('#main')
  


  //*GRID VARIABLES
  const width = 11
  const cellCount = width * (width + 3)




  //* GAME VARIABLES
  let rickIndex = 148
  let jerrysIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 13, 14, 15, 16, 17, 18, 19, 22, 23, 24, 25, 26, 27, 28, 29, 30]
  // const swarm = Array.from(jerrysIndex)
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
    jerrysIndex.forEach(jerry =>  {
      cells[jerry].classList.add('jerry')
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
    const leftEdge = [0, 11, 22, 33, 44, 55, 66, 77, 88, 99, 110, 121, 132, 143]
    const rightEdge = [10, 21, 32, 43, 54, 65, 76, 87, 98, 109, 120, 131, 142, 153]
  
    const isOnLeftEdge = leftEdge.some(edge => {
      return cells[edge].classList.contains('jerry')
    })
  
    const isOnRightEdge = rightEdge.some(edge => {
      return cells[edge].classList.contains('jerry')
    })
  
    jerrysIndex.forEach(jerry =>  {
      cells[jerry].classList.remove('jerry')
    })

    if (isOnLeftEdge && direction === 'r') {
      jerrysIndex = jerrysIndex.map(jerry => {
        return jerry + 1
      })
    
    } else if (isOnRightEdge && direction === 'r') {
      direction = 'l'
      jerrysIndex = jerrysIndex.map(jerry => {
        return jerry + 11
      })
  
    } else if (isOnRightEdge && direction === 'l') {
      jerrysIndex = jerrysIndex.map(jerry => {
        return jerry - 1
      })
  
    } else if (isOnLeftEdge && direction === 'l') {
      direction = 'r'
      jerrysIndex = jerrysIndex.map(jerry => {
        return jerry + 11
      })
  
    } else if (direction === 'r') {
      jerrysIndex = jerrysIndex.map(jerry => {
        return jerry + 1
      })

    } else if (direction === 'l') {
      jerrysIndex = jerrysIndex.map(jerry => {
        return jerry - 1
      })
    }

    jerrysIndex.forEach(jerry =>  {
      cells[jerry].classList.add('jerry')
    })
  
  } 
  

  //*SOUND FUNCTIONS -> NEEDS STREAMLINING INTO ONE FUNTION AND CALL THE ID FROM HTML POSSIBLY?
  function playShootClip() {
    console.log('play clip')
    mainAudio.src = '../assets/laserfire01trim.wav'
    mainAudio.play()
  }

  function playSplatClip(){
    console.log('splat')
    mainAudio.src = '../assets/splat.wav'
    mainAudio.play()
  }

  // function playRickWin(){
  //   console.log('rick win sound')
  //   mainAudio.src = '../assets/and-thats-the-way-news-goes.wav'
  //   mainAudio.play()
  // }



  //*LASER FROM RICK WILL CONTINUE UNTIL 2 SCENRIOS; 1: REACHES TOP OF BOARD AND STOPS. 2: HITS JERRY, STOPS AND ADDS POINTS TO SCORE
  function laser() {
    let laserIndex = rickIndex - width
    const timerId = setInterval(() => {

      if (cells[laserIndex].classList.contains('jerry')) {
        playSplatClip()
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
  


  
  //* FUNCTION TO  START GAME TO MOVE JERRY UNTIL HE REACHES RICKS OR RICK KILLS ALL JERRYS - TRIGGERS PLAYAGAIN FUNCTION
  function startGame() {
    playBtn.disabled = true
    playingNow = true 
  
    const timerIdOne =  setInterval(() => {
      if (jerrysIndex.length  === 0) {
        result = 'won!'
        playingNow = false
        // playRickWin()
        playAgain()
        clearInterval(timerIdOne)
      
      } else if (jerrysIndex[jerrysIndex.length - 1] < (width * (width + 2))) {
        jerrysMoves()
        // setInterval(spawnSwarm, 5000)
      } else {
        result = 'died!'
        playingNow = false
        playAgain()
        clearInterval(timerIdOne)
      }
    }, 400)
  }


  // //*KEEP SPAWNING ARMIES UNTIL RICK IS DEAD OR GAME IS FINISHED
  function spawnSwarm() {
    while (playingNow === true) {
      
      

      swarm.forEach(single =>  {
        cells[single].classList.add('jerry')
      })

      jerrysMoves(swarm)

      console.log('jerrysIndexnew')
    }
      
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