const board = document.querySelector('#main-board')
const turn = document.querySelector('#turn')
const turnInner = document.querySelector('#turn-inner')
const question = document.querySelector('#clue-text')
const reveal = document.querySelector('#reveal')
const answer = document.querySelector('#answer-text')
const scoring = document.querySelector('#scoring')
const scoringButtons = document.querySelectorAll(`[id^="btn"]`)
const submitAnswer = document.querySelector('#submit-answer')
const backToBoard = document.querySelector('#back')
const noBlood = document.querySelector('#btn3')
const alex = document.querySelector('#alex')


const player1 = {
    scoreDisplay: document.querySelector('#p1'),
    inc: document.querySelector('#btn1'),
    score: 0
}

const player2 = {
    scoreDisplay: document.querySelector('#p2'),
    inc: document.querySelector('#btn2'),
    score: 0
}

let categories = []
let params = (new URL(document.location)).searchParams;
for (let catId = 1; catId <= 5; catId++) {
    let clues = []
    // console.log(params.get(`cat${catId}`))
    categories.push({title: params.get(`cat${catId}`),
    clues})
    // 
    for (let clueId = 1; clueId <= 5; clueId++) {
        clues.push({
            id: clueId, 
            answer: params.get(`cat${catId}__a${clueId}`),
            question: params.get(`cat${catId}__q${clueId}`),
            value: clueId * 200})
    }

}

window.addEventListener('keydown', (e) => {
    if(e.key === 'a') {
        alex.classList.remove('hidden')
    }
        else if(e.key = 't') {
            alex.classList.add('hidden')
        }
        else return
})

for (let category of categories) {
    const catColumn = document.createElement('div')
    const clueList = document.createElement('div')
    clueList.classList.add('flex', 'flex-col', 'justify-center')

    for (let clue of category.clues) {
        let score = clue.value
        const clueScreen = document.createElement('button')
        clueScreen.innerHTML = `<div>$${clue.value}</div>`
        clueScreen.classList.add('flex', 'justify-center', 'items-center', 'bg-gradient-to-r', 'from-blue-800', 'via-blue-900', 'to-blue-800', 'font-bold', 'h-24', '2xl:h-32', 'text-amber-400', 'text-4xl', '2xl:text-6xl', 'align-middle', 'drop-shadow-md', 'shadow-black', 'cursor-pointer', 'border-b-2', 'border-slate-900')
        
        clueList.append(clueScreen)


        function roundResult(winner, loser) {
            winner.score += score
            console.log(winner)
            console.log(winner.score)
            winner.scoreDisplay.textContent = Intl.NumberFormat().format(winner.score)
            score = 0
            winner.inc.setAttribute('disabled', '')
            winner.inc.classList.remove('bg-transparent', 'text-white-100', 'hover:bg-white', 'hover:text-blue-800')
            winner.inc.classList.add('cursor-not-allowed', 'bg-white', 'text-blue-800')
            loser.inc.setAttribute('disabled', '')
            loser.inc.classList.remove('text-white-100', 'hover:bg-white', 'hover:text-blue-800', 'border-white')
            loser.inc.classList.add('text-slate-400', 'border-slate-400', 'cursor-not-allowed')
            noBlood.setAttribute('disabled', '')
            noBlood.classList.remove('text-white-100', 'hover:bg-white', 'hover:text-blue-800', 'border-white')
            noBlood.classList.add('text-slate-400', 'border-slate-400', 'cursor-not-allowed')
            backToBoard.classList.add('text-white')
            backToBoard.removeAttribute('disabled', '')
        }

    /**show the question when a tile is clicked */
    clueScreen.addEventListener('click', function() {
        turn.classList.remove('hidden')
        question.innerText = `${clue.question}`.toUpperCase()
        
        answer.innerText = `${clue.answer}`.toUpperCase()
        answer.classList.add('hidden')
        reveal.classList.remove('hidden')
        scoring.classList.add('text-transparent')
        for (let button of scoringButtons) {
            button.classList.remove('border-white', 'hover:bg-white', 'hover:text-blue-800')
            button.classList.add('border-transparent', 'cursor-default')
            button.setAttribute('disabled', '')
        }
                
        player1.inc.classList.remove('text-slate-400', 'border-slate-400', 'cursor-not-allowed', 'bg-white', 'text-blue-800')
        player2.inc.classList.remove('text-slate-400', 'border-slate-400', 'cursor-not-allowed', 'bg-white', 'text-blue-800')
        noBlood.classList.remove('text-slate-400', 'border-slate-400', 'cursor-not-allowed', 'bg-white', 'text-blue-800')
        backToBoard.classList.remove('text-white')
        backToBoard.setAttribute('disabled', '')
        
        /**disable the tile after it has been clicked */
        this.innerText = ''
        this.classList.add('cursor-not-allowed')
        this.setAttribute('disabled', '')

        /**reveal the answer and scoring buttons when 'Reveal' is clicked */
        reveal.addEventListener('click', function() {
            
            reveal.classList.add('hidden')
            answer.classList.remove('hidden', 'ease-in', 'duration-300')
            answer.classList.add('text-amber-400')
            scoring.classList.remove('text-transparent')
            for (let button of scoringButtons) {
                button.classList.add('border-white', 'cursor-pointer', 'hover:bg-white', 'hover:text-blue-800')
                button.classList.remove('border-transparent', 'cursor-default')
                button.removeAttribute('disabled', '')
            }

            /**activate scoring for this round to the Player scoring buttons  */
            player1.inc.addEventListener('click', function() {
                roundResult(player1, player2)
            })

            player2.inc.addEventListener('click', function() {
                roundResult(player2, player1)
            })

            /**activate 0 score to the noBlood scoring button if neither player scores */
            noBlood.addEventListener('click', function() {
                score = 0
                submitAnswer.classList.remove('hidden')
                player1.inc.classList.remove('bg-white', 'text-blue-800', 'hover:bg-white', 'hover:text-blue-800')
                player1.inc.classList.add('text-slate-400', 'border-slate-400', 'cursor-not-allowed')
                player2.inc.classList.add('text-slate-400', 'border-slate-400', 'cursor-not-allowed')
                player2.inc.classList.remove('bg-white', 'text-blue-800', 'hover:bg-white', 'hover:text-blue-800')
                this.setAttribute('disabled', '')
                this.classList.add('cursor-not-allowed', 'bg-white', 'text-blue-800')
                backToBoard.classList.add('text-white')
                backToBoard.removeAttribute('disabled', '')
            })
            
            /**go back to the main board when Play button is clicked */
            backToBoard.addEventListener('click', back)

        })
 


        })}
    
    /**create the columns for each category */    
    catColumn.innerHTML = `<div class="flex items-center justify-center bg-gradient-to-r from-blue-800 via-blue-900 to-blue-800 font-bold h-28 2xl:h-32 border-b-4 border-slate-900 text-white text-3xl 2xl:text-4xl text-center">${category.title.toUpperCase()}</div>`
    catColumn.append(clueList)
    board.append(catColumn)
}

function back() {
    turn.classList.add('hidden')
    player1.inc.removeAttribute('disabled', '')
    player1.inc.classList.remove('cursor-not-allowed')
    player2.inc.removeAttribute('disabled', '')
    player2.inc.classList.remove('cursor-not-allowed')
    noBlood.removeAttribute('disabled', '')
    noBlood.classList.remove('cursor-not-allowed')
    }


