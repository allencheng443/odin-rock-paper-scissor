// Define the maps of game result
const results = new Map([
  [['scissor', 'paper'], true],
  [['scissor', 'rock'], false],
  [['rock', 'scissor'], true],
  [['rock', 'paper'], false],
  [['paper', 'rock'], true],
  [['paper', 'scissor'], false],
])

/**
 * Generate computer's choice by random function
 * @returns string
 */
const getComputerChoice = () => {
  const games = ['scissor', 'rock', 'paper']
  return games[Math.floor(Math.random() * 3)]
}

/**
 *
 * @returns string playerChoice
 */
const getPlayerInput = () => {
  let input
  while (true) {
    input = prompt('Please enter scissor, rock or paper (case-insensitive)')
    if (input && ['scissor', 'rock', 'paper'].includes(input.toLowerCase())) {
      return input.toLowerCase()
    }
  }
}

/**
 * Compare both choice and return the result message
 * @param {*} playerSelection
 * @param {*} computerSelection
 * @returns
 */
const playRound = (playerSelection, computerSelection) => {
  for (let [key, value] of results) {
    if (key[0] === playerSelection && key[1] === computerSelection) {
      const player = playerSelection[0].toUpperCase() + playerSelection.slice(1)
      const com = computerSelection[0].toUpperCase() + computerSelection.slice(1)
      return value ? `You Win! ${player} beats ${com}` : `You Lose! ${com} beats ${player}`
    }
  }
  return `Game is even!`
}

/**
 * Run the game by specific loops
 * @param {*} count
 */
const game = count => {
  for (let i = 1; i <= count; i++) {
    const playerSelection = getPlayerInput()
    const computerSelection = getComputerChoice()
    console.log(`Term ${i}: ${playRound(playerSelection, computerSelection)}`)
  }
}

const init = () => {
  return {
    total: 0,
    win: 0,
    lose: 0,
    even: 0,
    logs: [],
  }
}
