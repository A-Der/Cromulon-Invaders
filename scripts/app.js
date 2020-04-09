function init() {


  //* DOM ELEMENTS
  const grid = document.querySelector('.grid')
  const playBtn = document.querySelector('.play-button')
  const cells = []


  //*GRID VARIABLES
  // const width = 8
  const cellCount = 99



  //* GAME VARIABLES
  const rickStartPosition = 94
  // const armyInit = []






  //* FUNCTIONS
  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
    }
    cells[rickStartPosition].classList.add('rick')

    for (let i = 0; i < 7 && i < 16; i++) {
      for (let j = 9; j < 16; j++) {
        cells[i].classList.add('jerry')
        cells[j].classList.add('jerry')
      }
    }
  }
  
  function moveArmy() {
    
    
  }




  createGrid()

  //*EVENT LISTENERS
  playBtn.addEventListener('click', moveArmy)



}

window.addEventListener('DOMContentLoaded', init)