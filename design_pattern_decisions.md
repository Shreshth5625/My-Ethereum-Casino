# Design Pattern Decisions

I have used the following design patterns :-

## Ownership pattern
The smart contract at the time of deployemnt runs the constructor in which the `msg.sender` (i.e. the deployer of the contract) is assigned the owner role.
Only owner can kill the contract.

## Maintaing States
The state of the contract is cleared once 100 bets are made. After 100 vets are made, the award is generated and user(s) are rewared.

## Restricted Access
No player can see the bet made by the other players.

## Maintaining Transparency
Every PLayer can see the total bet amount and the number of bets made.