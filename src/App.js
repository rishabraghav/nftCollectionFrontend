import './App.css';
import { Contract, contract, ethers } from 'ethers';
import { useState, useEffect } from 'react';
import contractABI from './contractABI.json';

const contractAddress = "0x51E46AB4e9BBb73468a9d39b2898FB0e252BA8C1";

function App() {
  const [isWalletInstalled, setIsWalletInstalled] = useState(false);
  const [NFTContract, setNFTContract] = useState(null);
  const [isMinting, setIsMinting] = useState(false);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    if(window.ethereum) {
      setIsWalletInstalled(true);
    }
  }, []);

  useEffect(() => {
    function initNFTContract() {
      const provider = await ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();

      setNFTContract(new Contract(contractAddress, contractABI.abi, signer));
    }
    initNFTContract()
  }, [account]);

  async function connectWallet() {
    window.ethereum.request({
      method: "eth_requestAccounts",
    }).then((accounts => {
      setAccount(accounts[0]);
    })).catch((error) => {
      alert("Something went wrong!");
    });
  }

  const data = [
    {
      url: "./assests/kibutsuji/1.png",
      param: handleMint("https://gateway.pinata.cloud/ipfs/QmTrmLSpBFNvowVMBsFmNgCzEbJRnyzb5uoznKoXsVxcCu/1"),
    },
    {
      url: "./assests/kibutsuji/2.png",
      param: handleMint("https://gateway.pinata.cloud/ipfs/QmTrmLSpBFNvowVMBsFmNgCzEbJRnyzb5uoznKoXsVxcCu/2"),
    },
    {
      url: "./assests/kibutsuji/3.png",
      param: handleMint("https://gateway.pinata.cloud/ipfs/QmTrmLSpBFNvowVMBsFmNgCzEbJRnyzb5uoznKoXsVxcCu/3"),
    },
    {
      url: "./assests/kibutsuji/4.png",
      param: handleMint("https://gateway.pinata.cloud/ipfs/QmTrmLSpBFNvowVMBsFmNgCzEbJRnyzb5uoznKoXsVxcCu/4"),
    },
    {
      url: "./assests/kibutsuji/5.png",
      param: handleMint("https://gateway.pinata.cloud/ipfs/QmTrmLSpBFNvowVMBsFmNgCzEbJRnyzb5uoznKoXsVxcCu/5"),
    },

  ];
  async function withdrawMoney() {
    try {
      const response = await NFTContract.withdrawMoney();
      console.log("Received:", response);
    } catch(err) {
      alert(err);
    }
  }

  async function handleMint(tokenURI) {
    setIsMinting(true);
    try{
      const options = {value: ethers.utils.parseEther("0.01")};
      const response = await NFTContract.mintNFT(tokenURI, options);
      console.log("Recieved:", response);
    } catch (err) {
      alert(err);
    } finally {
      setIsMinting(false);
    }
  }

  if(account == null) {
    return (
      <div className="container">
        <br/>
        <h1>NFT MARKET PLACE</h1>
        <h2>by Rishabh</h2>
        <p>But an NFT from our market place</p>

        {isWalletInstalled? 
        (<button className="connectAccount" onClick={connectWallet}>Connect Wallet</button>) 
        : (<p>Install MetaMask Wallet</p>) }
      </div>
    );
  }


  return (
    <div className="container">
      <br/>
      <h1>NFT MARKET PLACE</h1>
      <h2>by Rishabh</h2>
      {data.map((item, index) => (
        <div className="imgDiv">
          <img src={item.url} key={index} alt="img" width={250} height={250}/>
          <button isLoading={isMinting} onClick={() => {
            eval(item.param);
          }} >Mint - 0.01 eth</button>
        </div>
      ))}
      <button onClick={withdrawMoney} >Withdraw Money from Contract</button>
    </div>
  );
}

export default App;
