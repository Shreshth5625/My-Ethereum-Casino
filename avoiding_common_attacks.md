# Ethereum Casino DApp

**Following are the measures used to avoid attacks :**


 
* ###  Race Conditions - Reentrancy
    * Appropriate checks have been made to avoid Reentrancy
 
* ###  Cross-function Race Conditions
    * use internal function appropriately

* ###  DoS with Block Gas Limit
    * There is loop of unknown size.
 
* ###  Forcibly Sending Ether to a Contract
    * This smart contract can receive any amount ether any time
 
* ###  Transaction-Ordering Dependence (TOD)
    * This contract's logic does not depend on the order of transactions and resets after every 100 bets placed.
 
* ###  Timestamp Dependence
    * The contract logic depends on the keccak256 hash of the blocks timestamp and block difficulty
 
* ###  DoS with (Unexpected) revert
    * The contract requires the bet above a minimum bet amount.Revert situation arises only if the bet price is less.


 