//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0;

contract MyCasino {
    
    //OWNER OF THE ACCOUNT
    address payable public owner;   
    
    
    constructor(uint _minBet) public {
        owner = msg.sender;     //USER THAT CREATED THIS CONTRACT IS THE OWNER
        if(_minBet != 0)
            minimumBet = _minBet;   //MINIMUM BET VALUE
    }
    
    
    //ARRAY FOR ALL THE PLAYERS
    address payable[]  public players;
    
    //MINIMUM PRICE OF BET
    uint public minimumBet; 
    
    //TOTAL ETHER COLLECTED
    uint public totalBetAmount;
    
    //NUMBER OF BETS PLACED
    uint256 public numberOfBets ;
    
    //MAXIMUM NUMBER OF BETS ALLOWED
    //A NEW ROUND WILL TAKE PLACE AFTER 10 BETS
    uint256 public maxBets = 100 ;     
    
   
    
    //SO THAT ETHER DOES NOT GET LOST
      function()external payable { }
    
    //ONLY THE OWNER CAN KILL THE CONTRACT 
    //THE REMAINING ETHER WOULD BE SENT TO THE OWNER
    function kill() external {      
        if(msg.sender == owner)
        {
            selfdestruct(owner);
        }
    }
    
    struct Player {
        uint betAmount;
        uint256 numberChosen;
    }
    
    //TO MAP THE ADDRESS WITH PLAYER DETAILS
    mapping (address => Player) public playerChoice;
    
    //THIS EVENT INDICATES THAT A RANDOM NUMBER IS GENERATED
    event NumberGenerated(uint number);
    
    //THIS EVENT INDICATES THAT USER HAS BEEN REWARDED
    event rewardGenerated();
    
    
    function checkTotalbets() public returns(bool){
        if( (numberOfBets < maxBets) && (numberOfBets != maxBets))
            return true;
        else
            {   
                return false;
            }
    }
    
    //TO PLACE THE BET
    function placeBet(uint256 _betNumber, uint bet_price) public payable { //playerExists(msg.sender)
        
            //require(checkTotalbets());
                //require(checkTotalbets(),"Total bets completed");
                if( checkTotalbets())
                {
                    require(_betNumber >=1 && _betNumber<=10,"Number selected is not in range 1-10.");
                    require(bet_price >= minimumBet,"Bet value is less than Minimum bet value.");
                    
                    playerChoice[msg.sender].betAmount = bet_price;
                    playerChoice[msg.sender].numberChosen = _betNumber;
                    
                    numberOfBets++;     // increase the number of bets 
                    players.push(msg.sender);
                    totalBetAmount += bet_price;
                }
                else  generateNumber();

        
    }
    
    //GENERATE A RANDOM NUMBER
    function generateNumber() public{
        uint256 win_number = uint(uint256(keccak256(abi.encodePacked(block.timestamp,block.difficulty))) % 10);
        emit NumberGenerated(win_number);
        awardPrize(win_number);
       // awardPrize(win_number);
    } 
    
    //TO DISTRIBUTE PRIZES
    function awardPrize(uint winner_number) public  payable {
        address payable[20] memory winners;
        uint count=0;
        address payable playerAddress;
        
        
        for(uint i=0; i<players.length; i++){
            
            playerAddress = players[i];
            if(playerChoice[playerAddress].numberChosen == winner_number)
            {   
                winners[count] = playerAddress;
                count++;
            }
            
            delete playerChoice[playerAddress]; //delete the player from the mapping
        }
        
       delete players;        //*******clear players array
        
        //DISTRIBUTE ETHER AMONG PLAYERS        
        uint finalAmount = totalBetAmount/ winners.length;
        for(uint i=0; i<count;i++)
        {
            if(winners[i] != address(0)) // Check that the address in this fixed array is not empty
            winners[i].transfer(finalAmount);
            emit rewardGenerated();
        }

        totalBetAmount = 0;
        numberOfBets = 0;
    }
    
    
}