let myCasino = artifacts.require("MyCasino");

let myCasinoInstance;
let expectedMaxbet = 10;
let testNumber = 11;
let totalBet = 0;


contract ('MyCasinoContract', function(accounts){

    //TEST CASE 1 : Here we check if the contract is defined.
    it('myCasinoContract', function() {
        return myCasino.deployed().then( function(instance){
            myCasinoInstance = instance;
            assert(myCasinoInstance != undefined, "MyCasino contract should be defined.")
        })
    });

    //TEST CASE 2 : Here we check the generateNumber function
    //  it('Number generated is less than 10', () => {
    //     let numGenerated = myCasinoInstance.generateNumber().
    //         assert(numGenerated < 11,"The number generated is not in the range 1-10")
    // });

    //TEST CASE 3 : Here we check the placeBet function
    // it('The bet is placed', (accounts) => {
       
    //     return myCasinoInstance.placeBet( 5, 2,{from: accounts[1]}).then( function ()  {
    //         assert(totalBet >= 0,"Bet has not been placed")
    //     }
            
    //     )
    // });
    
    //TEST CASE 4 : Check the maximum number of bets
    it('Check maximum bets', function () {
        return myCasinoInstance.then( function(instance){
            assert(myCasinoInstance.maxBets == expectedMaxbet, "Maximum bets are not 10")
        })
    })
    
    

});