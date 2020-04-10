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
      


  function startGame() {
    setTimeout((jerryRight), 1000)
    setTimeout((jerryRight), 2000)
    setTimeout((jerryDown), 3000)
    setTimeout((jerryLeft), 4000)
    setTimeout((jerryLeft), 5000)
    setTimeout((jerryDown), 6000)
  }
  




  createGrid()

  //*EVENT LISTENERS
  playBtn.addEventListener('click', startGame)
  document.addEventListener('keydown', moveRick)



}

window.addEventListener('DOMContentLoaded', init)