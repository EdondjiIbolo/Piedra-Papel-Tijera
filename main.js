const game = document.getElementById('game')
const score = document.getElementById('score')
const btnRule = document.getElementById('btn-rule') 
const toggle = document.getElementById('toggle-modal')
const modal = document.getElementById('modal')
const choicesElements = document.querySelectorAll('[data-choice]')
const loader = document.getElementById('loader')
const initialScore = localStorage.getItem('score') ?? 0
let newscore =  parseInt(initialScore)
score.textContent = newscore
const gameRule = {
    "Scissors":{
        Paper:"Win",
        Rock:"Lose"
    },
    "Paper":{
        Scissors:"Lose",
        Rock:"Win"
    },
    "Rock":{
        Paper:"Lose",
        Scissors:"Win"
    }
}
btnRule.addEventListener('click', ()=>{
    modal.classList.remove('active')
    console.log('hola')
})
toggle.addEventListener('click',()=>{
    modal.classList.add('active')
    console.log('desactivar')
})

let userChoice 
const playGames = [ 'Scissors' , 'Paper' , 'Rock' ]
const getRandom = Math.floor(Math.random() * 3)
const getLaptopChoice = ()=>{
    let choice = playGames[getRandom]
    return choice
}
let laptopChoice = getLaptopChoice()

choicesElements.forEach(element => {
    element.addEventListener('click', (e)=>{
        userChoice = e.target.dataset.choice
        loader.classList.remove('loader-inactive')
        setTimeout(()=>{
            loader.classList.add('loader-inactive')
            
            game.innerHTML = `<section class="game">
                                <div class="winner-container picked">
                                <div>
                                    <p class="text__description--bold">You Picked</p>
                                    <picture class="img-container"><img class="img img--${userChoice.toLocaleLowerCase()} user-winner" src="images/icon-${userChoice}.svg" alt="${userChoice}"></picture>
                                </div>
                                <div>
                                    <p class="text__description--bold">The House Picked</p>
                                    <picture class="img-container"><img class="img img--${laptopChoice.toLocaleLowerCase()}" src="images/icon-${laptopChoice}.svg" alt="${laptopChoice}"></picture>
                                </div>
                                </div>
                            </section>`
        },1200)

        setTimeout(()=>{
          
            let classWinner = gameRule[userChoice][laptopChoice] === 'Win' ? 'user-winner' : ''
            const getWinner =()=>{
                if(userChoice == laptopChoice) return 'Tie'
                return gameRule[userChoice][laptopChoice] === 'Win' ? 'You Win' : 'You Lose'
            }
            let winLose = getWinner()
            
            const getNewscore =()=>{
                let gameResult = gameRule[userChoice][laptopChoice]
                if( gameResult=== 'Win') {
                    newscore = newscore + 5
                    localStorage.setItem('score', newscore)
                    console.log(newscore)
                    return newscore
                }
                else if(gameRule[userChoice][laptopChoice] === 'Lose'){
                    newscore = newscore - 5
                    localStorage.setItem('score', newscore)
                    console.log(newscore)
                    return newscore
                }else{

                    return newscore
                }
            }
  
            
           
           
            game.innerHTML = `<section class="game">
                                <div class="winner-container">
                                <picture class="img-container"><img class="img img--${userChoice.toLocaleLowerCase()} ${classWinner == 'Win' ? '' : 'user-winner'  }" src="images/icon-${userChoice}.svg" alt="score-num"></picture>
                                <section class="winner">
                                    <h2 class="text-title">${winLose}</h2>
                                    <button id="btn-play" class="btn btn--white">PLAY AGAIN</p>
                                </section>
                                <picture class="img-container"><img class="img img--${laptopChoice.toLocaleLowerCase()} ${classWinner == 'Win' ?  'user-winner' : '' }" src="images/icon-${laptopChoice}.svg" alt="Paper"></picture>
                                </div>
                              <section>`
                              const btnPlay = document.getElementById('btn-play')
                              btnPlay.addEventListener('click', ()=>{
                                
                                location.reload(true)
                                score.textContent =  getNewscore()
                            })
        },3000)
        
    })
} )


