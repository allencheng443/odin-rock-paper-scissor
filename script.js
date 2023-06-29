const init = () => {
  data.total = 0
  data.win = 0
  data.lose = 0
  data.even = 0
  data.logs.length = 0
}

/**
 * Generate computer's choice by random function
 * @returns string
 */
const getRandomChoice = () => ['rock', 'scissor', 'paper'][Math.floor(Math.random() * 3)]

const getMessage = (player, com, isPlayerWin) =>
  typeof isPlayerWin === 'undefined'
    ? `This game is even.`
    : isPlayerWin
    ? `You win, ${player[0].toUpperCase() + player.slice(1)} beats ${com[0].toUpperCase() + com.slice(1)}`
    : `You lose, ${com[0].toUpperCase() + com.slice(1)} beats ${player[0].toUpperCase() + player.slice(1)}`

/**
 * Compare both choice and return the result message
 * @param {*} player
 * @param {*} com
 * @returns
 */
const playRound = (player, com) => {
  // Define the maps of game result
  const results = new Map([
    [['scissor', 'paper'], true],
    [['scissor', 'rock'], false],
    [['rock', 'scissor'], true],
    [['rock', 'paper'], false],
    [['paper', 'rock'], true],
    [['paper', 'scissor'], false],
  ])

  for (let [key, value] of results) {
    if (key[0] === player && key[1] === com) {
      value ? data.win++ : data.lose++
      return getMessage(player, com, value)
    }
  }
  data.even++
  return getMessage(player, com)
}

const renderScreen = ({ total, win, lose, even, logs }, message) => {
  const texts = document.querySelectorAll('.current > p > span')
  const logsElement = document.querySelector('.logs')
  const history = logs.reduce((acc, curr, key) => acc + `<p>${key + 1} ${curr}</p>\n`, '<h2>Logs</h2>\n')
  logsElement.innerHTML = history
  texts[0].textContent = total || null
  texts[1].textContent = win || null
  texts[2].textContent = lose || null
  texts[3].textContent = even || null
  texts[4].textContent = message || null
}

let data = {
  total: 0,
  win: 0,
  lose: 0,
  even: 0,
  logs: [],
}

const buttons = document.querySelectorAll('.game > button')
buttons.forEach(button =>
  button.addEventListener('click', () => {
    data.total === 5 && init()
    data.total += 1
    const player = button.value
    const com = getRandomChoice()
    const message = playRound(player, com)
    data.logs.push(message)
    renderScreen(data, message)
  })
)
