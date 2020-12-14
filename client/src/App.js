import React, { Component } from "react";
import MyCasinoContract from "./contracts/MyCasino.json";
import getWeb3 from "./getWeb3";
import "./App.css";

class App extends Component {

  state = { 
    storageValue: 0, web3: null, accounts: null, contract: null,
    numberOfBets: 0,
    minimumBet: 1,
    currentBet:0,
    totalBet: 0,
    maxAmountOfBets: 0 };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      console.log(accounts, "accounts");
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      console.log(networkId,"networkId");
      const deployedNetwork = MyCasinoContract.networks[networkId];
      console.log(deployedNetwork, "test");
      const instance = new web3.eth.Contract(
        MyCasinoContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      
      console.log(instance, "instance");
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  placeBet = async(number) => {
    console.log(this.state.accounts, "acc");
    console.log( await this.state.contract.methods.minimumBet().call(), "mininmum bet");
    let tx = await this.state.contract.methods.placeBet(number, this.state.currentBet).send({from:this.state.accounts[0], value:(this.state.currentBet)*10**18 });
    console.log(tx);
    let tb = await this.state.contract.methods.totalBetAmount().call();
    let numBets = await this.state.contract.methods.numberOfBets().call();
    this.setState({
        totalBet:tb,
        numberOfBets: numBets
    });
 }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
      <div>
                <h1>Ethereum Betting Game.</h1>
                        
                        
                        <div className="block">
                                    <b>Total ether bet:</b> &nbsp;
                                    <span>{this.state.totalBet} ether</span>
                                    </div>
                        <div className="block">
                                    <b>Minimum bet:</b> &nbsp;
                                    <span>{this.state.minimumBet} ether</span>
                                    </div>
                        <div className="block">
                                    <b>Max amount of bets: 100</b> &nbsp;
                                    {/* <span>{this.state.maxAmountOfBets} 100</span> */}
                                    </div>
                        <div className="block">
                                    <b>Total bets made:</b> &nbsp;
                                    <span>{this.state.numberOfBets} </span>
                                    </div>            
                        <hr/>
                        


                        <h2>Choose next number</h2>
                        <label>
                                <b>Stake 1ETH or more to participate.</b>
                                <br/>
                                <b>How much Ether do you want to bet?  <input className="bet-input" ref="ether-bet" type="number" placeholder={this.state.minimumBet} onChange={(e) => this.setState({currentBet: e.target.value})}/></b> ether
                                <br/>
                        </label>
                                    <ul ref="numbers">
                                        <li onClick={() => {this.placeBet(1)}}>1</li>
                                        <li onClick={() => {this.placeBet(2)}}>2</li>
                                        <li onClick={() => {this.placeBet(3)}}>3</li>
                                        <li onClick={() => {this.placeBet(4)}}>4</li>
                                        <li onClick={() => {this.placeBet(5)}}>5</li>
                                        <li onClick={() => {this.placeBet(6)}}>6</li>
                                        <li onClick={() => {this.placeBet(7)}}>7</li>
                                        <li onClick={() => {this.placeBet(8)}}>8</li>
                                        <li onClick={() => {this.placeBet(9)}}>9</li>
                                        <li onClick={() => {this.placeBet(10)}}>10</li>
                                    </ul>
            </div>
      </div>
    );
  }
}

export default App;