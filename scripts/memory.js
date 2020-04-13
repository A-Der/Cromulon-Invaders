function init() {


  //* DOM ELEMENTS
  const grid = document.querySelector('.grid')
  const playBtn = document.querySelector('.play-button')
  const cells = []


  //*GRID VARIABLES
  const width = 8
  const cellCount = 126



  //* GAME VARIABLES
  let rickIndex = 121
  let jerrysIndex = [0, 1, 2, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15]



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
  
  function moveRick(event) {
    cells[rickIndex].classList.remove('rick')
    switch (event.keyCode) {
      case 37:
        if (rickIndex > 117) {
          cells[rickIndex--]
        }
        break
      case 39:
        if (rickIndex < 125){
          cells[rickIndex++]
        }
    }
    cells[rickIndex].classList.add('rick')
  }


  //* JERRYS MOMVEMENTS INDIVIDUAL AND COMBINED
  function jerryRight() {
    jerrysIndex.forEach(jerry =>  {
      cells[jerry].classList.remove('jerry')
    })
    jerrysIndex = jerrysIndex.map(jerry => {
      return jerry + 1
    })
    jerrysIndex.forEach(jerry =>  {
      cells[jerry].classList.add('jerry')
    })
  }

  function jerryDown() {
    jerrysIndex.forEach(jerry =>  {
      cells[jerry].classList.remove('jerry')
    })
    jerrysIndex = jerrysIndex.map(jerry => {
      return jerry + 9
    })
    jerrysIndex.forEach(jerry =>  {
      cells[jerry].classList.add('jerry')
    })
  }

  function jerryLeft() {
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
      

  function jerrysDirections() {
    setTimeout((jerryRight), 1000)
    setTimeout((jerryRight), 2000)
    setTimeout((jerryDown), 3000)
    setTimeout((jerryLeft), 4000)
    setTimeout((jerryLeft), 5000)
    setTimeout((jerryDown), 6000)
  }

  function jerrysMove() {
    jerrysDirections()
    setInterval((jerrysDirections), 6000)
  }


  createGrid()

  //*EVENT LISTENERS
  playBtn.addEventListener('click', jerrysMove)
  document.addEventListener('keydown', moveRick)



}

window.addEventListener('DOMContentLoaded', init)




//* 2nd draft

function init() {


  //* DOM ELEMENTS
  const grid = document.querySelector('.grid')
  const playBtn = document.querySelector('.play-button')
  const cells = []


  //*GRID VARIABLES
  const width = 11
  const cellCount = width * (width + 1)




  //* GAME VARIABLES
  let rickIndex = 126
  let jerrysIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 13, 14, 15, 16, 17, 18, 19]
  let direction = 'r'



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
  
  function moveRick(event) {
    cells[rickIndex].classList.remove('rick')
    switch (event.keyCode) {
      case 37:
        if (rickIndex > 121) {
          cells[rickIndex--]
        }
        break
      case 39:
        if (rickIndex < 131){
          cells[rickIndex++]
        }
    }
    cells[rickIndex].classList.add('rick')
  }


  //* LOGIC TO WORK OUT WHERE JERRY MOVES TO
  function jerrysMoves() { 
    const leftSide = jerrysIndex[0] % width === 0
    const rightSide = jerrysIndex[jerrysIndex.length - 1] % width === 10

    if (leftSide && (direction === 'r')) {
      jerrysIndex.forEach(jerry =>  {
        cells[jerry].classList.remove('jerry')
      })
      jerrysIndex = jerrysIndex.map(jerry => {
        return jerry + 1
      })
      jerrysIndex.forEach(jerry =>  {
        cells[jerry].classList.add('jerry')
      })

    } else if ((jerrysIndex[0] % width === 1) && (direction === 'r')) {
      jerrysIndex.forEach(jerry =>  {
        cells[jerry].classList.remove('jerry')
      })
      jerrysIndex = jerrysIndex.map(jerry => {
        return jerry + 1
      })
      jerrysIndex.forEach(jerry =>  {
        cells[jerry].classList.add('jerry')
      })

    } else if ((jerrysIndex[0] % width === 2) && (direction === 'r')) {
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

    } else if ((jerrysIndex[0] % width === 2) && (direction === 'l')) {
      jerrysIndex.forEach(jerry =>  {
        cells[jerry].classList.remove('jerry')
      })
      jerrysIndex = jerrysIndex.map(jerry => {
        return jerry - 1
      })
      jerrysIndex.forEach(jerry =>  {
        cells[jerry].classList.add('jerry')
      })

    } else if ((jerrysIndex[0] % width === 1) && (direction === 'l')) {
      jerrysIndex.forEach(jerry =>  {
        cells[jerry].classList.remove('jerry')
      })
      jerrysIndex = jerrysIndex.map(jerry => {
        return jerry - 1
      })
      jerrysIndex.forEach(jerry =>  {
        cells[jerry].classList.add('jerry')
      })

    } else if ((jerrysIndex[0] % width === 0) && (direction === 'l')) {
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
    }
  }

  function movingJerry() {
    jerrysMoves()
    setInterval((jerrysMoves), 1000)
  }



  createGrid()

  //*EVENT LISTENERS
  playBtn.addEventListener('click', movingJerry)
  document.addEventListener('keydown', moveRick)



}

window.addEventListener('DOMContentLoaded', init)




//*lasers working kinda
function laser() {
  let laserIndex = rickIndex - width
  const timerId = setInterval(() => {

    if (cells[laserIndex].classList.contains('jerry')) {
      clearInterval(timerId)
      console.log('jerry shot') 
    
    } else {
      cells[laserIndex].classList.remove('laser')
      laserIndex = laserIndex - 11
      cells[laserIndex].classList.add('laser')
      
    }
  },100)
}

//* original moving jerry. but jerrys loads back
function movingJerry() {

  const timerId1 = setInterval(() => {

    if (rickDead === false) {
      const timerId0 =  setInterval(() => {
        if (jerrysIndex[0] !== (width * (width + 1))) {
          jerrysMoves()
        } else {
          clearInterval(timerId0)
          rickDead = true
          console.log('fin')
        }
      }, 1000)
    } else {
      clearInterval(timerId1)
    }



  }, 2000)





  function laser() {
     
    let laserIndex = rickIndex - width
    const timerId = setInterval(() => {

      if (cells[laserIndex].classList.contains('jerry')) {
        clearInterval(timerId)

        const killedJerrys = []

        console.log(killedJerrys)
        let shotJerrys = jerrysIndex.splice(laserIndex, 1, 'x')
        killedJerrys.push(shotJerrys)


        console.log(killedJerrys)
        cells[laserIndex].classList.remove('jerry') 

        cells[killedJerrys].classList.add('x')

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
  
  function shoot(event) {
    event.preventDefault() 
    if (event.keyCode === 32) {
      laser()
    }
  }



        //* lasers working

  function laser() {
    let laserIndex = rickIndex - width

    const timerId = setInterval(() => {
      if (cells[laserIndex].classList.contains('jerry')) {

        clearInterval(timerId)
        
        console.log(jerrysIndex[0])
        jerrysIndex = jerrysIndex.splice(laserIndex, 1)
        cells[laserIndex].classList.remove('jerry') 
        cells[laserIndex].classList.remove('laser')
        playerScore += 100
        scoreDisplay.textContent = playerScore  
        console.log('jerry shot')
        console.log(jerrysIndex[0])
      
      } else if (laserIndex < width) {
        cells[laserIndex].classList.remove('laser')
      } else {
        cells[laserIndex].classList.remove('laser')
        laserIndex = laserIndex - 11
        cells[laserIndex].classList.add('laser')
      }
    },30) 
  }

  //* ----------------------------------------------------------------
  //* monday 13th april

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
          cells[rickIndex].classList.remove('rick')
          if (rickIndex > 143) {
            cells[rickIndex--]
            cells[rickIndex].classList.add('rick')
          }
          break
        case 39:
          cells[rickIndex].classList.remove('rick')
          if (rickIndex < 153){
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
    
    //* ACTUAL FUNCTION TO MOVE JERRY UNTIL HE REACHES RICKS ROW
    function startGame() {
  
      const timerId0 =  setInterval(() => {
        if (jerrysIndex[0] !== (width * (width + 1))) {
          jerrysMoves()
        } else {
          clearInterval(timerId0)
          rickDead = true
          console.log('fin')
        }
      }, 1000)
    
    }
  
    function laser() {
      let laserIndex = rickIndex - width
      const timerId = setInterval(() => {
  
        if (cells[laserIndex].classList.contains('jerry')) {
          clearInterval(timerId)
  
          console.log(jerrysIndex)
          console.log(jerrysIndex[0])
  
          cells[laserIndex].classList.remove('jerry') 
          jerrysIndex = jerrysIndex.filter(jerry => {
            return cells[jerry].classList.contains('jerry')
          })
  
          console.log(jerrysIndex)
          console.log(jerrysIndex[0])
  
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
    
  
  
  
    
    
    
    
  
    createGrid()
  
    //*EVENT LISTENERS
    playBtn.addEventListener('click', startGame)
    document.addEventListener('keydown', handleKeyDown)
    // document.addEventListener('keydown', shoot)
  
  
  
  }
  
  window.addEventListener('DOMContentLoaded', init)