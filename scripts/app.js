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
  
  function moveRick(event) {
    cells[rickIndex].classList.remove('rick')
    switch (event.keyCode) {
      case 37:
        if (rickIndex > 143) {
          cells[rickIndex--]
        }
        break
      case 39:
        if (rickIndex < 153){
          cells[rickIndex++]
        }
    }
    cells[rickIndex].classList.add('rick')
  }


  // function laser() {
     
  //   let laserIndex = rickIndex - width
  //   const timerId = setInterval(() => {

  //     if (cells[laserIndex].classList.contains('jerry')) {
  //       clearInterval(timerId)

  //       const killedJerrys = jerrysIndex.splice(laserIndex, 1, 'x')
  //       console.log(killedJerrys)
  //       jerrysIndex.splice(laserIndex, 1, 'x')
  //       console.log(killedJerrys)
  //       cells[laserIndex].classList.remove('jerry') 

  //       cells[killedJerrys].classList.add('x')

  //       cells[laserIndex].classList.remove('laser')

        
  //       playerScore += 100
  //       scoreDisplay.textContent = playerScore  
  //       console.log('jerry shot')
      
      

  //       //* LASER DOESNT GO BEYOND TOP OF BOARD
  //     } else if (laserIndex < width) {
  //       cells[laserIndex].classList.remove('laser')
  //       //*LASER CONTINUES SHOOTING UP
  //     } else {
  //       cells[laserIndex].classList.remove('laser')
  //       laserIndex = laserIndex - 11
  //       cells[laserIndex].classList.add('laser')
  //     }
  //   },30) 
  // }
  
  // function shoot(event) {
  //   event.preventDefault() 
  //   if (event.keyCode === 32) {
  //     laser()
  //   }
  // }


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
  function movingJerry() {


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


  //* LASER IS KILLING JERRYS AND FILTERING OUT REMAINING JERRYS HOWEVER SOMETIMES STOPS MOVING; THIS IS BECAUSE IN MY JERRY MOVES FUNCTION IT IS USING ONLY COLUMNS 0,1,2. AFTER KILLING SOME JERRYS JERRY[0] COULD BE IN A DIFFERENT COLUMN
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
  


  function shoot(event) {
    event.preventDefault() 
    if (event.keyCode === 32) {
      laser()
    }
  }
  
  
  
  

  createGrid()

  //*EVENT LISTENERS
  playBtn.addEventListener('click', movingJerry)
  document.addEventListener('keydown', moveRick)
  document.addEventListener('keydown', shoot)



}

window.addEventListener('DOMContentLoaded', init)