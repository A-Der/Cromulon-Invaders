function init() {


  //* DOM ELEMENTS
  const grid = document.querySelector('.grid')
  const playR = document.querySelector('.play-button-rick')
  const playM = document.querySelector('.play-button-morty')
  const playRC = document.querySelector('.play-button-rickCom')
  const cells = []
  const scoreDisplay = document.querySelector('#score')
  const HSscoreDisplay = document.querySelector('#HSscore')
  const HSImage = document.querySelector('.HSImage')
  const mainAudio = document.querySelector('#main')
  const secondAudio = document.querySelector('#secondary')
  const thirdAudio = document.querySelector('#third')
  const fourthAudio = document.querySelector('#fourth')
  const backgroundAudio = document.querySelector('#background-audio')

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
  let playerClass = ''
  let HSImageClass = ''
  let audioIntroClass = ''
  let audioExitClass = ''
  let audioWeaponClass = ''
  let imageWeaponClass = ''
  let direction = 're'
  let playerScore = 0
  let HSscore = 0
  let playingNow = false
  let result = 'won'
  let laserCount = 0
  playR.disabled = false
  playM.disabled = false
  playRC.disabled = false

  //*ADD AND REMOVE ALIVE JERRYS-----------------------------------------------------
  function addJerrys() {
    jerrysIndex.forEach(jerry => {
      if (jerry.isAlive) {
        cells[jerry.currentIndex].classList.add('jerry')
      }
    })
  }

  function removeJerrys() {
    jerrysIndex.forEach(jerry => {
      if (jerry.isAlive) {
        cells[jerry.currentIndex].classList.remove('jerry')
      }
    })
  }


  //* FUNCTIONS
  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      grid.appendChild(cell)
      cells.push(cell)
    }
  }
  
  //*KEYBOARD CONTROLS -> MOVE RICK AND SHOOT--------------------------------------
  function handleKeyDown(event) {
    event.preventDefault()
    if (playingNow && rickDead === false) {
      switch (event.keyCode) {
        case 37:
          if (rickIndex > 216) {
            cells[rickIndex].classList.remove(playerClass)
            cells[rickIndex--]
            cells[rickIndex].classList.add(playerClass)
          }
          break
        case 39:
          if (rickIndex < 227){
            cells[rickIndex].classList.remove(playerClass)
            cells[rickIndex++]
            cells[rickIndex].classList.add(playerClass)
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

    removeJerrys()
    
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

    addJerrys()
  } 
  

  //*SOUND FUNCTIONS------------------------------------------------------------------------
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

  function playFourthAudio(e){
    console.log('pickle')
    fourthAudio.src = `../assets/${e}.wav`
    fourthAudio.play()
  }

  function playBackgroundAudio(){
    console.log('background music')
    backgroundAudio.src = '../assets/background-music.wav'
    backgroundAudio.play()
  }

  //* JERRYS SOUND--------------------------------------------------------------
  function jerrySound() {
    if (cells[width].classList.contains('jerry')) {
      setTimeout(playMainAudio('show-me'), 3000)
    }
  }

  //*LASER FROM RICK WILL CONTINUE UNTIL 2 SCENRIOS; 1: REACHES TOP OF BOARD AND STOPS. 2: HITS JERRY, STOPS AND ADDS POINTS TO SCORE
  function laser() {
    if (laserCount === 13){
      laserCount = 0

      playFourthAudio('pickle-rick')
      let laserIndex = rickIndex - width
      const timerId = setInterval(() => {
        if (rickDead) {
          clearInterval(timerId)
      
        } else if (cells[laserIndex].classList.contains('jerry')) {
          playThirdAudio('pickleKillJ')
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
      playSecondAudio(audioWeaponClass)
      let laserIndex = rickIndex - width
      const timerId = setInterval(() => {
        if (rickDead) {
          clearInterval(timerId)
        } else if (cells[laserIndex].classList.contains('jerry')) {
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

          cells[laserIndex].classList.remove(imageWeaponClass)
          playerScore += 100
          scoreDisplay.textContent = playerScore  
          console.log('jerry shot')

        //* LASER DOESNT GO BEYOND TOP OF BOARD
        } else if (laserIndex < width) {
          cells[laserIndex].classList.remove(imageWeaponClass)

        //*LASER CONTINUES SHOOTING UP
        } else {
          cells[laserIndex].classList.remove(imageWeaponClass)
          laserIndex = laserIndex - 12
          cells[laserIndex].classList.add(imageWeaponClass)
        }
      },40) 
    }
  }

  //* JERRYS BOMBS-----------------------------------------------------------------
  function bombs() {
    const aliveJerrys = jerrysIndex.filter(jerry => {
      return jerry.isAlive 
    })
    let bombIndex = aliveJerrys[Math.floor(Math.random() * aliveJerrys.length)].currentIndex
    const timerIdBomb = setInterval(() => {
  
      if (cells[bombIndex].classList.contains(playerClass) || cells[rickIndex].classList.contains('jerry')) {
        rickDead = true
        console.log('hit rick')
        clearInterval(timerIdBomb)
  
      } else if (bombIndex >= (cellCount - width) ) {
        cells[bombIndex].classList.remove('bomb')
        clearInterval(timerIdBomb)

      } else {
        cells[bombIndex].classList.remove('bomb')
        bombIndex = bombIndex + 12
    
        cells[bombIndex].classList.add('bomb')
      }
    },120)
  }
  
  //* FUNCTION TO CHANGE CHARACTERS IMAGES/AUDIOS/WEAPONS ACCORDING TO CHOICE AND START GAME-----------------
  function whichClass(){
    document.querySelector('.play-button-rickCom').onclick = () => {
      playerClass = 'rickComPlayer'
      HSImageClass = 'HSrickCom'
      audioIntroClass = 'ricki-tiki'
      audioExitClass = 'lick-my-balls'
      audioWeaponClass = 'laserRickCom'
      imageWeaponClass = 'rickComWeapon'
      startGame()
      console.log('rickComChar')
    }

    document.querySelector('.play-button-rick').onclick = () => { 
      playerClass = 'rickPlayer'
      HSImageClass = 'HSrick'
      audioIntroClass = 'wub-a-lub'
      audioExitClass = 'and-thats-the-way-the-news-goes'
      audioWeaponClass = 'laserRick'
      imageWeaponClass = 'rickWeapon'
      startGame()
      console.log('rickChar')
    }
      
    document.querySelector('.play-button-morty').onclick = () => {
      playerClass = 'mortyPlayer'
      HSImageClass = 'HSmorty'
      audioIntroClass = 'one-true-morty'
      audioExitClass = 'i-love-morty'
      audioWeaponClass = 'mortyLaser'
      imageWeaponClass = 'mortyWeapon'
      startGame()
      console.log('mortyChar')
    }
  }
  
    
  
  //* STARTS GAME WITH SELECTED CHARACTER AND DISBLES BUTTONS--------------------------------
  function startGame() {
    playBackgroundAudio('background-music')
    playR.disabled = true
    playM.disabled = true
    playRC.disabled = true
    playingNow = true 
    playMainAudio(audioIntroClass)
   
    cells[rickIndex].classList.add(playerClass)
    addJerrys()

    const timerIdOne =  setInterval(() => {
      const winOrNo = jerrysIndex.every(jerry => {
        return !jerry.isAlive
      })
      
      if (rickDead) {
        playThirdAudio('bomb')
        cells[rickIndex].classList.remove(playerClass)
        cells[rickIndex].classList.add('rick-explosion')
        highScore()
        setTimeout(playMainAudio('goddamn'), 1000)
        result = 'died!'
        playingNow = false
        clearInterval(timerIdOne)

        setTimeout(playAgain, 3000)
      
      } else if (winOrNo === false) {
        jerrysMoves()
        bombs()
        jerrySound()
        
      } else {
        result = 'won!'
        playingNow = false
        playMainAudio(audioExitClass)
        setTimeout(playAgain, 3000)
        clearInterval(timerIdOne)
        highScore()
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

  //*UPDATE HIGHSCORE---------------------------------------------------------
  function highScore() {
    if (playerScore > HSscore ) {
      HSImage.classList.remove('HSrick')
      HSImage.classList.remove('HSrickCom')
      HSImage.classList.remove('HSmorty')
      HSImage.classList.add(HSImageClass)
      HSscore = playerScore
      HSscoreDisplay.textContent = HSscore
    }
  }


  //* RESTART FUNCTION ----------------------------------------------------------------
  function restartGame() {
    cells.forEach(cell => {
      cell.classList = ''
    })

    rickIndex = 222
    rickDead = false
    jerrysIndex = JSON.parse(JSON.stringify(armyIndex))
    playerClass = ''
    audioIntroClass = ''
    audioExitClass = ''
    audioWeaponClass = ''
    imageWeaponClass = ''
    direction = 're'
    playerScore = 0
    playingNow = false
    result = 'won'
    laserCount = 0
    playR.disabled = false
    playM.disabled = false
    playRC.disabled = false
  }


  createGrid()

  //*EVENT LISTENERS---------------------------------------
  playR.addEventListener('mouseenter', whichClass)
  playM.addEventListener('mouseenter', whichClass)
  playRC.addEventListener('mouseenter', whichClass)

  playR.addEventListener('click', playBackgroundAudio)
  playM.addEventListener('click', playBackgroundAudio)
  playRC.addEventListener('click', playBackgroundAudio)
  
  document.addEventListener('keydown', handleKeyDown)




}

window.addEventListener('DOMContentLoaded', init)