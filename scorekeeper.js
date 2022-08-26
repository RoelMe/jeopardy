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
// const backToBoard = document.querySelector('#back')


/* clue.addEventListener('click', function() {
    answer.classList.remove('hidden')
}) */


class JeopardyGame {
    constructor(element) {
        //Database
        this.categories = []
        this.clues = {}
        this.players = []
        
        
        //State
        this.currentClue = null
        this.score = 0
        this.roundWinner = null //assign to player1, player2 or neither

        //Elements
        this.boardElement = element.querySelector("#main-board");        
        this.turnElement = element.querySelector("#turn");
        this.clueTextElement = element.querySelector("#clue-text");
        this.resultElement = element.querySelector("#result");
    }
}

const categories = [
    {
        title: 'Stranger Things',
        clues: [
            {
                id: 1,
                answer: 'Steve',
                question: 'Who is the guy with good hair who drives the BMW 733?',
                value: 200,
                category_id: 1
            },
            {
                id: 2,
                answer: 'Nancy',
                question: "What is the name of Mike's older sister?",
                value: 400,
                category_id: 1
            },
            {
                id: 3,
                answer: 'Hopper',
                question: "What is the name of the police chief?",
                value: 600,
                category_id: 1 
            },
            {
                id: 4,
                answer: 'Joyce',
                question: "What is the name of Will's mother?",
                value: 800,
                category_id: 1
            },
            {
                id: 5,
                answer: 'Eleven',
                question: "What number does the girl from Hawkins Labs have tattoed on her arm?",
                value: 1000,
                category_id: 1
            }
        ]
    },
    {
        title: "Sports in the 80's",
        clues: [
            {
                id: 6,
                answer: 'Ben Johnson',
                question: "Which Canadian sprinter was disqualified from the 1988 Olympics after testing positive for steroids?",
                value: 200,
                category_id: 2
            },
            {
                id: 7,
                answer: 'Michael Jordan',
                question: "Which 1985 rookie of the year would go on to lead the Chicago Bulls to win 6 NBA Championships?",
                value: 400,
                category_id: 2
            },
            {
                id: 8,
                answer: 'Joe Montana',
                question: "Which 1980's football player for the San Francisco 49ers is considered by many the greatest quarterback of all time?",
                value: 600,
                category_id: 2
            },
            {
                id: 9,
                answer: 'John McEnroe',
                question: "Which American tennis player was more infamous for his rants against umpires than for his Wimbledon victories?",
                value: 800,
                category_id: 2
            },
            {
                id: 10,
                answer: 'Greg Lemond',
                question: "Which cyclist was the first American to win the Tour de France in 1986?",
                value: 1000,
                category_id: 2
            }
        ]
    },
    {
        title: 'American History',
        clues: [
            {
                id: 11,
                answer: 'John Adams and Thomas Jefferson',
                question: 'Which two signers of the Declaration of Independence went on to serve as president of the United States?',
                value: 200,
                category_id: 3
            },
            {
                id: 12,
                answer: 'Eleanor Roosevelt',
                question: "Which First Lady made news by serving hot dogs when King George VI visited this her and her husband in 1939?",
                value: 400,
                category_id: 3
            },
            {
                id: 13,
                answer: 'Abraham Lincoln',
                question: "Who was the first Republican President of the United States?",
                value: 600,
                category_id: 3 
            },
            {
                id: 14,
                answer: 'Bill Clinton',
                question: "Who was the former American president that met with Kim Jong-il in August 2009 to help release two journalists?",
                value: 800,
                category_id: 3
            },
            {
                id: 15,
                answer: 'Susan B. Anthony',
                question: "Who was the Quaker women who, in 1869, wrote in a women's suffrage newspaper: “Join the union, girls, and together say equal pay for equal work?",
                value: 1000,
                category_id: 3
            }
        ]
    },
    {
        title: "Cornhole",
        clues: [
            {
                id: 16,
                answer: '27 feet',
                question: "How far apart are official cornhole boards positioned from the front edge to front edge of the board?",
                value: 200,
                category_id: 4
            },
            {
                id: 17,
                answer: 'Woody',
                question: "What do you call a cornhole bag that has been pitched and remains on the cornhole board playing surface at the conclusion of the frame?",
                value: 400,
                category_id: 4
            },
            {
                id: 18,
                answer: 'If a player pitches out of turn at any time during a frame, their pitch will be considered a Foul Bag and swept from the playing surface.',
                question: "What happens if a player pitches out of turn?",
                value: 600,
                category_id: 4
            },
            {
                id: 19,
                answer: 'Any cornhole bag that leaves a players hand once the final step (if taken) and final forward swing of the delivery process has started, shall count as a pitched bag.',
                question: "What happens when a player accidentally releases a bag?",
                value: 800,
                category_id: 4
            },
            {
                id: 20,
                answer: 'Slide',
                question: "What do you call the type of shot that hits the center of the board and then slides into the hole?",
                value: 1000,
                category_id: 4
            }
        ]
    },
    {
        title: "Hip Hop",
        clues: [
            {
                id: 21,
                answer: 'Sean John',
                question: "What is the name of Puff Daddy / Diddy / P Diddy's streetwear clothing line?",
                value: 200,
                category_id: 5
            },
            {
                id: 22,
                answer: 'Jay-Z',
                question: "Who was the first rapper honored in the Songwriters Hall of Fame, the first solo living rapper inducted in the Rock and Roll Hall of Fame, and one of the 100 most influential people in the world in 2013 according to Time Magazine?",
                value: 400,
                category_id: 5
            },
            {
                id: 23,
                answer: 'Juice WRLD',
                question: "Which rapper had a triple platinum debut album 'Goodbye and Good Riddance' in 2018 and died following a drug overdose the following year?",
                value: 600,
                category_id: 5
            },
            {
                id: 24,
                answer: 'XXXTentacion',
                question: "What is Jahseh Dwayne Ricardo Onfroy better known as? He started as a Soundcloud rapper in 2013 and was murdered at age 20 in 2018.",
                value: 800,
                category_id: 5
            },
            {
                id: 25,
                answer: 'Doja Cat',
                question: "Who was the most streamed rapper of 2021 on Spotify? She outstreamed Drake to come on top with 63.6m monthly listeners.",
                value: 1000,
                category_id: 5
            }
        ]
    }
]

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
        clueScreen.innerText = `$${clue.value}`
        clueScreen.classList.add('flex', 'justify-center', 'align-middle', 'bg-gradient-to-r', 'from-blue-800', 'via-blue-900', 'to-blue-800', 'font-bold', 'h-36', 'py-10', 'text-amber-400', 'text-6xl', 'align-middle', 'drop-shadow-md', 'shadow-black', 'cursor-pointer', 'border-b-2', 'border-slate-900')
        
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
    catColumn.innerHTML = `<div class="flex items-center justify-center bg-gradient-to-r from-blue-800 via-blue-900 to-blue-800 font-bold h-32 border-b-4 border-slate-900 text-white text-3xl text-center">${category.title.toUpperCase()}</div>`
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


