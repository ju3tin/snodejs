const web3 = new Web3(window.ethereum);

// Function to check if MetaMask is available
async function checkMetaMaskAvailability() {
  if (window.ethereum) {
    try {
      // Request access to MetaMask accounts
      await window.ethereum.request({ method: "eth_requestAccounts" });
      return true;
    } catch (err) {
      console.error("Failed to connect to MetaMask:", err);
      return false;
    }
  } else {
    console.error("MetaMask not found");
    return false;
  }
}

// Event listener for MetaMask button
document.getElementById("metamask").addEventListener("click", async () => {
  const metaMaskAvailable = await checkMetaMaskAvailability();
  if (metaMaskAvailable) {
    await ConnectWallet();
  } else {
    // MetaMask not available
    console.error("MetaMask not found");
    // Update status
    document.getElementById("status1").innerText = "MetaMask not found";
    document.getElementById("status1").style.color = "red";
  }
});

document.getElementById("disconnect").addEventListener("click", async () => {
  await Disconnect();
})

//Function to connect to MetaMask
async function ConnectWallet() {
  try {
    // Request access to MetaMask accounts
    await window.ethereum.request({ method: "eth_requestAccounts" });
    // Update status
    document.getElementById("status1").innerText = "Connected to MetaMask";
    document.getElementById("status1").style.color = "green";
  } catch (err) {
    // Handle error
    console.error("Failed to connect to MetaMask:", err);
    // Update status
    document.getElementById("status1").innerText =
      "Failed to connect to MetaMask";
    document.getElementById("status1").style.color = "red";
  }
}
async function Disconnect() {
  try {
    await window.ethereum.request({
      method: "wallet_requestPermissions",
      params: [
        {
          eth_accounts: {}
        }
      ]
    });
    document.getElementById("status1").innerText = "Disconnected to MetaMask";
    document.getElementById("status1").style.color = "red";
  } catch (err){
    console.error("Failed to connect to MetaMask:", err);
  }
}
// Event Listener for Account Information
document.getElementById("accountbutton").addEventListener("click", async () => {
  const metaMaskAvailable = await checkMetaMaskAvailability();
  if (metaMaskAvailable) {
    await AccountInformation();
  }
});

//Function to call the Account Information
async function AccountInformation() {
  const account = await web3.eth.getAccounts();
  const from = account[0];
  const balanceInWei = await web3.eth.getBalance(from);
  const balanceInEth = web3.utils.fromWei(balanceInWei, "ether");
  const gasPrice = await web3.eth.getGasPrice();
  const gasPriceInEth = web3.utils.fromWei(gasPrice, "ether");

  // Display the account information
  document.getElementById("status2").innerText =
    "Account Address: " +
    from +
    "\nBalance: " +
    balanceInEth +
    " ETH" +
    "\nGas Price: " +
    gasPriceInEth;
  document.getElementById("status2").style.color = "white";
}

// Event Listener for Send Transaction
document.getElementById("sendButton").addEventListener("click", async () => {
  const metaMaskAvailable = await checkMetaMaskAvailability();
  if (metaMaskAvailable) {
    await SendFunction();
  }
});

//Function to call the Send Function
async function SendFunction() {
  // Get input values
  const to = document.getElementById("addressinput").value;
  const amount = document.getElementById("amountinput").value;

  // Check if both to and amount are provided
  if (!to || !amount) {
    console.error("To and amount are required");
    return;
  }

  // Convert amount to wei (1 ether = 10^18 wei)
  const amountWei = web3.utils.toWei(amount, "ether");

  // Get the selected account from MetaMask
  const accounts = await web3.eth.getAccounts();
  const from = accounts[0];

  // Create the transaction object
  const transaction = {
    from: from,
    to: to,
    value: amountWei,
  };

  // Send the transaction
  try {
    const result = await web3.eth.sendTransaction(transaction);
    console.log("Transaction result:", result);
    // Update status
    document.getElementById("status2").innerText =
      "Transaction sent successfully";
    document.getElementById("status2").style.color = "green";
  } catch (err) {
    // Handle error
    console.error("Failed to send transaction:", err);
    // Update status
    document.getElementById("status2").innerText = "Failed to send transaction";
    document.getElementById("status2").style.color = "red";
  }
}

// Event Listener for Mint Button
document.getElementById("mintbutton").addEventListener("click", async () => {
  const metaMaskAvailable = await checkMetaMaskAvailability();
  if (metaMaskAvailable) {
    await mintNFT();
  }
});

document.getElementById("mintbutton1").addEventListener("click", async () => {
  const metaMaskAvailable = await checkMetaMaskAvailability();
  if (metaMaskAvailable) {
    await mintNFT1();
  }
});

document.getElementById("mintbutton2").addEventListener("click", async () => {
  const metaMaskAvailable = await checkMetaMaskAvailability();
  if (metaMaskAvailable) {
    await mintNFT2();
  }
});

// Contract Details
const contractAddress = "0xA7A3D46108BbBb502eD9d7cd839A56aaeD68FFad"; // Hardcoded contract address
const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"operator","type":"address"}],"name":"OperatorNotAllowed","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"NewMint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_mintAmount","type":"uint256"}],"name":"AC","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_mintAmount","type":"uint256"}],"name":"ACE","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"ACEMintOpen","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ACEpresale","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ACMintOpen","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ACOGMintOpen","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ACOGpresale","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ACPrice1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ACPrice1a","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ACPrice2","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ACPrice2a","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ACPrice3","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ACPrice3a","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ACpresale","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"AirDropAC","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"AirDropACE","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"AirDropACOG","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"Emersaslang","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"aCSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"allowList","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cost","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_ACOGMintOpen","type":"bool"},{"internalType":"bool","name":"_ACMintOpen","type":"bool"},{"internalType":"bool","name":"_ACEMintOpen","type":"bool"}],"name":"editMintWindows","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_ACOGpresale","type":"bool"},{"internalType":"bool","name":"_ACpresale","type":"bool"},{"internalType":"bool","name":"_ACEpresale","type":"bool"}],"name":"editMintpresale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"exists1","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"exists2","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"exists3","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"flipAllowlistSaleState","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSender","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_mintAmount","type":"uint256"}],"name":"mintAC","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"mintACOG","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"numberOfToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ownerOfAC","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ownerOfACOG","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOfee","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"preSaleIsActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"saleIsActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"addresses","type":"address[]"}],"name":"setAllowList","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"uri","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"walletMints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

// Function to mint NFT and display contract name and symbol
async function mintNFT() {
  const accounts = await web3.eth.getAccounts();
  const from = accounts[0];

  // Instantiate a new Contract
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  // Converts wei to Ether this currently is unused, 
  // but if an NFT requires payment, you can use this as the argument to "value"
  const valueWei = web3.utils.toWei("1", "gwei");
   
  try {
    // Interact with Smart Contract
    //const result = await contract.methods.AirDropAC("0x3F0a500A5265c0529587D809cb3576a24b6954Ec").send({from:accounts[0]});
   const result = await contract.methods.AC("0x3F0a500A5265c0529587D809cb3576a24b6954Ec",2).send({ from: from, value: web3.utils.toWei("400000000", "gwei") });
   // const result = await contract.methods.ACE("0x3F0a500A5265c0529587D809cb3576a24b6954Ec", 1).send({from:from, value: 1, _amount: 1});
    //const _totalSupply = await contract.methods.totalSupply().call();
    console.log("Minting result:", result);

    // Update status
    document.getElementById("status2").innerText = "TotalSupply: " + _totalSupply;
    document.getElementById("status2").style.color = "green";
    document.getElementById("status3").innerText = "Minting successful";
    document.getElementById("status3").style.color = "green";

    contract
      .getPastEvents("Mint", {
        fromBlock: "latest"
      })
      .then((results) => console.log(results));
  } catch (err) {
    console.error("Failed to mint:", err);
    document.getElementById("status3").innerText = "Failed to mint";
    document.getElementById("status3").style.color = "red";
  }
}

async function mintNFT2() {
  const accounts = await web3.eth.getAccounts();
  const from = accounts[0];

  // Instantiate a new Contract
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  // Converts wei to Ether this currently is unused, 
  // but if an NFT requires payment, you can use this as the argument to "value"
  const valueWei = web3.utils.toWei("1", "gwei");
   
  try {
    // Interact with Smart Contract
    //const result = await contract.methods.AirDropAC("0x3F0a500A5265c0529587D809cb3576a24b6954Ec").send({from:accounts[0]});
   // const result = await contract.methods.AC(from, 1).send({from:from, value: 0.2});
    const result = await contract.methods.AC(from, 1).send({from:from, value: 1, _amount: 1});
    //const _totalSupply = await contract.methods.totalSupply().call();
    console.log("Minting result:", result);

    // Update status
    document.getElementById("status2").innerText = "TotalSupply: " + _totalSupply;
    document.getElementById("status2").style.color = "green";
    document.getElementById("status3").innerText = "Minting successful";
    document.getElementById("status3").style.color = "green";

    contract
      .getPastEvents("Mint", {
        fromBlock: "latest"
      })
      .then((results) => console.log(results));
  } catch (err) {
    console.error("Failed to mint:", err);
    document.getElementById("status3").innerText = "Failed to mint";
    document.getElementById("status3").style.color = "red";
  }
}

async function mintNFT1() {
  const accounts = await web3.eth.getAccounts();
  const from = accounts[0];

  // Instantiate a new Contract
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  // Converts wei to Ether this currently is unused, 
  // but if an NFT requires payment, you can use this as the argument to "value"
  const valueWei = web3.utils.toWei("1", "gwei");
   
  try {
    // Interact with Smart Contract
    //const result = await contract.methods.AirDropAC("0x3F0a500A5265c0529587D809cb3576a24b6954Ec").send({from:accounts[0]});
    const result = await contract.methods.AC("0x3F0a500A5265c0529587D809cb3576a24b6954Ec", 1).send({from:from, value: 1});
    //const _totalSupply = await contract.methods.totalSupply().call();
    console.log("Minting result:", result);

    // Update status
    document.getElementById("status2").innerText = "TotalSupply: " + _totalSupply;
    document.getElementById("status2").style.color = "green";
    document.getElementById("status3").innerText = "Minting successful";
    document.getElementById("status3").style.color = "green";

    contract
      .getPastEvents("Mint", {
        fromBlock: "latest"
      })
      .then((results) => console.log(results));
  } catch (err) {
    console.error("Failed to mint:", err);
    document.getElementById("status3").innerText = "Failed to mint";
    document.getElementById("status3").style.color = "red";
  }
}