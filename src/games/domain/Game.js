module.exports = class Game {
    
    static play(){
        return new Game(Game.throwDice(), Game.throwDice());
    }
    
    constructor(diceOne, diceTwo, id) {
        this.id = id;
        this.diceOne = diceOne;
        this.diceTwo = diceTwo;
        this.result = this.calculate();
        this.won = this.checkResult();
    }
 
    static throwDice(){
        return parseInt(6 * Math.random() + 1)
    }

    calculate(){
        return parseInt(this.diceOne) + parseInt(this.diceTwo);
    }

    checkResult(){
        if(this.result === 7) return 1;
        return 0;
    }

};