function init() {


  //* DOM ELEMENTS
  const grid = document.querySelector('.grid')
  const playBtn = document.querySelector('.play-button')
  const cells = []


  //*GRID VARIABLES
  const width = 11
  const cellCount = width * (width + 3)




  //* GAME VARIABLES
  let rickIndex = 148
  let jerrysIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 13, 14, 15, 16, 17, 18, 19]
  let direction = 'r'
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

  //* LOGIC TO WORK OUT WHERE JERRY MOVES TO
  function jerrysMoves() { 
    if ((jerrysIndex[0] % width === 0) && (direction === 'r')) {
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
  
  //* ACTUAL FUNCTION TO MVE JERRY UNTIL HE REACHES RICKS ROW
  function movingJerry() {
    const timerId =  setInterval(() => {
      if (jerrysIndex[0] !== (width * (width + 1))) {
        jerrysMoves()
      } else {
        clearInterval(timerId)
        console.log('fin')
      }
    }, 1000)
  }

  function laser() {
    let laserIndex = rickIndex - width
    const timerId = setInterval(() => {

      if (!cells[laserIndex].classList.contains('jerry')) {
        cells[laserIndex].classList.add('laser')
        laserIndex = laserIndex - 11
      } else {
        clearInterval(timerId)
        console.log('jerry shot') 
      }
    },100)
  }
  // if (cells[laserIndex].classList !== ('jerry')) {
  //   cells[laserIndex].classList.add('laser')
  // } else {
  //   console.log('jerry shot')
  // }
  

  function shoot(event) {
    event.preventDefault() 
    if (event.keyCode === 32) {
      laser()
    }
  }
  
  
  


  // const timerId = setInterval(  {
  //   if (!(laserIndex - 11).classList('jerry')) {
  //     shoot()
  //   } else {
  //     clearInterval(timerId)
  //     console.log('jerry is shot')
  //   }



  // }, 100)

  

  createGrid()

  //*EVENT LISTENERS
  playBtn.addEventListener('click', movingJerry)
  document.addEventListener('keydown', moveRick)
  document.addEventListener('keydown', shoot)



}

window.addEventListener('DOMContentLoaded', init)