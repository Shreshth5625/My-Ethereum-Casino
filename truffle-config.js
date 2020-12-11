const path = require("path");
var HDWalletProvider = require("@truffle/hdwallet-provider");

//var apiKey = "https://rinkeby.infura.io/v3/c351742969a14f0397d971ac9ea06213" ||   process.env.API_KEY;
var mnemonic = "bleak property scissors piece wait river birth anger arrange energy aim where" || process.env.MNEMONIC;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
	
	development: {
			host: "127.0.0.1",
			port: 7545,
			network_id: "*",
		}
		,
		// rinkeby: {
		// 	provider: new HDWalletProvider(mnemonic, apiKey),
		// 	network_id: 4,
		// 	// networkCheckTimeout: 10
		// 	gas: 4500000,
		// 	gasPrice: 10000000000,
		// },
		rinkeby: {
			host : "localhost",
			provider: () => new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/c351742969a14f0397d971ac9ea06213'),
			network_id: 4,
			// networkCheckTimeout: 10,
		}
  }
};