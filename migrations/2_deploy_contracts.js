const Mycasino = artifacts.require("./MyCasino.sol");

module.exports  = function (deployer) {

    //CONVERTED 0.1 ETHER TO WEI
    //10 IS THE MAXIMUM PLAYERS ALLOWED 
    deployer.deploy(Mycasino, (web3.utils.toWei("0.1", "ether"), 1)  )  
}