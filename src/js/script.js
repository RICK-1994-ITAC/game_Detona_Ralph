const state ={
    views:{
        square: document.querySelectorAll(".square"),
        ralph: document.querySelector(".ralph"),
        changeTime: document.querySelector(".time"),
        changeScore: document.querySelector(".score"),
        changeLives: document.querySelector(".lives")
    },
    values:{
        timeleft: 60,
        score:0,
        boxRalphID:0,
        gameVelocity:1000,
        live:3
    }
}

function initial(){
    timeleft()
    changeRalph()
    clickBox()
    
}

function checkBox(){
    state.views.square.forEach((square)=>{
        square.classList.remove('ralph')
            
    })
    const randomNumber= Math.floor(Math.random()*9+1)
    state.views.square[randomNumber-1].classList.add('ralph')

    state.values.boxRalphID = state.views.square[randomNumber-1].id
    
}

function randomBoxNumber(){
    state.views.square.forEach((square)=>{
        if (square.id === state.values.randomBoxNumber) {
            square.classList.add('ralph')
        }
        
    })
}

function changeRalph(){
    setInterval(checkBox,state.values.gameVelocity)
}

function clickBox(){
 state.views.square.forEach((square)=>{
    square.addEventListener("mousedown", ()=>{
        if(square.id===state.values.boxRalphID){
          state.values.score ++
          state.views.changeScore.textContent = state.values.score 
          addSound()
        }
        else{
            state.values.live --
            state.views.changeLives.textContent = `x${state.values.live}`
            
        }
    })
 })
}

function stopwatch(){
    const time=state.values.timeleft --
    state.views.changeTime.textContent = time
   gameOver(time)
}

function timeleft(){
    setInterval(stopwatch,1000)
}

function addSound(){
    const sound = new Audio('./src/audios/hit.m4a')
    sound.volume= 0.3
    sound.play()
}

function gameOver(time){
    if(time<=0){
        
        alert(`Game-over! seu tempo acabou.`+ ' '+`Pontuação: ${state.views.changeScore.textContent}`)
        state.values.timeleft=60
        state.values.score = 0
        state.views.changeScore.textContent = 0
        state.values.live=3
        state.views.changeLives.textContent = `x${state.values.live}`
    }
    if(state.values.live<1){
        
        alert('Game-over! suas vidas acabaram.'+' '+`Pontuação: ${state.views.changeScore.textContent}`)
        state.values.timeleft=60
        state.values.score = 0
        state.values.live=3
        state.views.changeLives.textContent = `x${state.values.live}`
        state.views.changeScore.textContent = 0
    }
}

initial()

