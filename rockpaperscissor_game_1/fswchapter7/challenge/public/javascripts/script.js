class Player{
    constructor(name){
        this.name = name;
        this.choice = null;
    }

    resetChoice() {
        this.choice = null;
      }
}

class Game {
    constructor() {
        this.choices = ["batu", "kertas", "gunting"];
        this.player = new Player("Player");
        this.computer = new Player("COM");
    }
  
    getCOMRandomChoice() {
        const randomIndex = Math.floor(Math.random() * this.choices.length);
        const computerChoice = this.choices[randomIndex]

        return computerChoice;
    }
  
    play(playerChoice) {
        this.player.choice = playerChoice;
        this.computer.choice = this.getCOMRandomChoice();
        this.playerSelection = ""
        this.comSelection = ""

        console.log("player: " + this.player.choice)
        console.log("com: "+ this.computer.choice)


        if (this.player.choice === this.computer.choice) {
            this.displayResult("DRAW");
            this.changeMessage("green", "white")
            this.removeTilt();
        } else if (
            (this.player.choice === "batu" && this.computer.choice === "gunting") ||
            (this.player.choice === "kertas" && this.computer.choice === "batu") ||
            (this.player.choice === "gunting" && this.computer.choice === "kertas")
        ) {
            this.displayResult("PLAYER 1 WIN");
            this.changeMessage("lightgreen", "white")
        } else {
            this.displayResult("COM WIN");
            this.changeMessage("lightgreen", "white")
        }

        var selection = document.getElementsByClassName("selection");
        var comselection = document.getElementsByClassName("comselection");

        for (var i = 0; i < selection.length; i++){
            selection[i].classList.remove("selected");
            comselection[i].classList.remove("selected");
        }
        for (var i = 0; i < comselection.length; i++){
            comselection[i].classList.remove("com-selected");
        }
        
        var playerButton = document.getElementById(this.player.choice);
        playerButton.classList.add("selected");        

        const combatu = document.getElementById("com-batu")
        const comkertas = document.getElementById("com-kertas")
        const comgunting = document.getElementById("com-gunting")

        if(this.computer.choice == "batu"){
            combatu.classList.add("selected");
        } 
        if(this.computer.choice == "kertas"){
            comkertas.classList.add("selected");
        }
         if(this.computer.choice == "gunting"){
            comgunting.classList.add("selected");
        }
    }

    resetRound() {
        this.player.resetChoice();
        this.computer.resetChoice();
        this.displayResult("VS");
        this.changeMessage("burlywood", "red")
        this.removeTilt();

        var selection = document.getElementsByClassName("selection");
        var comselection = document.getElementsByClassName("comselection");

        for (var i = 0; i < selection.length; i++){
            selection[i].classList.remove("selected")
            comselection[i].classList.remove("selected");
        }
    }

    displayResult(resultText) {
        const resultElement = document.getElementById("result");
        resultElement.innerText = resultText;
    }
        
    changeMessage(backgroundcolor, color){
        var message = document.getElementById("result");
        message.style.backgroundColor = backgroundcolor;
        message.style.color = color;
        message.classList.add("tilted")
    }

    removeTilt(){
        var message = document.getElementById("result");
        message.classList.remove("tilted")
    }
  }
  
  const game = new Game();


  //button clicks
  document.getElementById("batu").addEventListener("click", () => game.play("batu"))
  document.getElementById("kertas").addEventListener("click", () => game.play("kertas"));
  document.getElementById("gunting").addEventListener("click", () => game.play("gunting"));
  document.getElementById("refresh").addEventListener("click", () => game.resetRound());


// const selectionButtons = document.querySelectorAll(`[data-selection]`)

// selectionButtons.forEach(function(selectionButton){
//     selectionButton.addEventListener('click', e => {
//         const selectionName = selectionButton.dataset.selection
//         makeSelection(selectionName)
//     })
// });

// function makeSelection(selection){
//     console.log(selection)
// }

//add background color
// function changeBackgroundColor(element) {
//     element.style.backgroundColor = 'grey';
//   }

// let Player1 = new Gamer ("batu", "kertas", "gunting");
// let COM = new Gamer ("batu", "kertas", "gunting")