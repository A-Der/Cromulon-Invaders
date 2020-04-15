

    //**************************************************************************************************/

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
      let highScore = 0
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
      // function spawnSwarm() {
      //   while (playingNow === true) {
          
          
    
      //     swarm.forEach(single =>  {
      //       cells[single].classList.add('jerry')
      //     })
    
      //     jerrysMoves(swarm)
    
      //     console.log('jerrysIndexnew')
      //   }
          
      // }
      
    
    
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





    //**************JACKS OBJECT EXAMPLE and my attempt**************************************************/

    const cells = []
console.log('first log', jerrys)
jerrysIndex = jerrysIndex.map(jerry => {
  if (jerry.currentIndex === 2) {
    return { ...jerry, isAlive: false }
  }
  return jerry
})
jerrys = jerrys.map(jerry => {
  return { ...jerry, currentIndex: jerry.currentIndex + 1 }
})
let jerrys = [
  { currentIndex: 0, isAlive: true },
  { currentIndex: 2, isAlive: false },
  { currentIndex: 4, isAlive: true }
]
jerrys.forEach(jerry => {
  if (jerry.isAlive) {
    cells[jerry.currentIndex].classList.add('jerry')
  }
})
const something = jerrys.every(jerry => {
  return !jerry.isAlive
})
console.log('log after hit', jerrys)

const ogArray = [1,2,3]
const cloneArray = JSON.parse(JSON.stringify(ogArray))


//**mine */--------------------------------------------------------------------------
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
  const cellCount = width * (width + 4)




  //* GAME VARIABLES
  let rickIndex = 159
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
  let direction = 'r'
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
          if (rickIndex > 154) {
            cells[rickIndex].classList.remove('rick')
            cells[rickIndex--]
            cells[rickIndex].classList.add('rick')
          }
          break
        case 39:
          if (rickIndex < 164){
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
    const leftSide = jerrysIndex[0].currentIndex % width === 0
    const rightSide = jerrysIndex[jerrysIndex.length - 1].currentIndex % width === 10
    
    jerrysIndex.forEach(jerry => {
      if (!jerry.isAlive) {
        cells[jerry.currentIndex].classList.remove('jerry-explosion')
        cells[jerry.currentIndex].classList.remove('pickle-explosion')
      }
    })

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
          


          jerrysIndex = jerrysIndex.map(jerry => {
            if (jerry.currentIndex === laserIndex) {
              return { ...jerry, isAlive: false }
            }
            return jerry
          })

          cells[laserIndex].classList.remove('pickle-rick')
          playerScore += 100
          scoreDisplay.textContent = playerScore  
          console.log('jerry shot')


        //* LASER DOESNT GO BEYOND TOP OF BOARD
        } else if (laserIndex < width) {
          cells[laserIndex].classList.remove('pickle-rick')
        //*LASER CONTINUES SHOOTING UP
        } else {
          cells[laserIndex].classList.remove('pickle-rick')
          laserIndex = laserIndex - 11
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
          laserIndex = laserIndex - 11
          cells[laserIndex].classList.add('laser')

        }
      },30) 
    }
  }

  //*JERRYS BOMBS
  function bombs() {
    const aliveJerrys = jerrysIndex.filter(jerry => {
      return jerry.isAlive 
    })
    let bombIndex = aliveJerrys[Math.floor(Math.random() * aliveJerrys.length)].currentIndex
    console.log(cells[bombIndex])
   
    const timerIdBomb = setInterval(() => {
      if (cells[bombIndex].classList.contains('rick')) {
        cells[rickIndex].classList.remove('rick')
        cells[bombIndex].classList.remove('bomb')
        playThirdAudio('bomb')
        console.log('hit rick')
        rickDead = true
        clearInterval(timerIdBomb)
  
      } else if (bombIndex >= (width * 14)) {
        cells[bombIndex].classList.remove('bomb')
        clearInterval(timerIdBomb)

      } else {
        cells[bombIndex].classList.remove('bomb')
        bombIndex = bombIndex + 11
        cells[bombIndex].classList.add('bomb')
      }
      
    },100)
  
  }


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