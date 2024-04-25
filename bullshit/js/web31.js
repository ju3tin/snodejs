async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      const accounts = await window.web3.eth.getAccounts();
      window.currentAccount = accounts[0]
    }
  }

  async function loadContract() {
    // set ABI
    var abi = [{"inputs":[],"name":"retrive_information","outputs":[{"internalType":"int256","name":"","type":"int256"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"int256","name":"_id","type":"int256"},{"internalType":"string","name":"_f_name","type":"string"},{"internalType":"string","name":"_last_name","type":"string"},{"internalType":"string","name":"_address","type":"string"},{"internalType":"string","name":"_mob_no","type":"string"}],"name":"store_information","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    //set contract address
    var contractAddress = '0xa9faE996828b9ACac5B5e069f479432A74769c06';

    return await new window.web3.eth.Contract(abi,contractAddress);
  }

  async function store_information() {
    const contract = await loadContract()
    await contract.methods
      .store_information(
        document.getElementById("id").value,
        document.getElementById("f_name").value,
        document.getElementById("l_name").value,
        document.getElementById("address").value,
        document.getElementById("mob_no").value,
      )
      .send({from: window.currentAccount})
      .then(function(receipt){
       // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
      });
  }

  async function retrive_information() {
    const contract = await loadContract()
    await contract.methods.retrive_information().call({from: window.currentAccount}).then(function(result){
      document.getElementById("id_1").innerHTML = "Your ID  is : " + result[0];
      document.getElementById("name_1").innerHTML = "Your First Name is : " + result[1];
      document.getElementById("last_name_1").innerHTML = "Your Last Name is : " + result[2];
      document.getElementById("address_1").innerHTML = "Your Address is : " + result[3];
      document.getElementById("mob_no_1").innerHTML = "Your Mobile No is : " + result[4];
   });
  }

  async function load() {
    await loadWeb3();
    window.contract = await loadContract();
  }
  
  load();