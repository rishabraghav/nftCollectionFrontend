import './App.css';
import { Contract, ethers } from 'ethers';
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
      const provider = new ethers.providers.JsonRpcProvider("https://restless-neat-choice.ethereum-goerli.discover.quiknode.pro/ff921f8bff1b23217b0f64cb240e830548b3617f/");
      const signer = provider.getSigner();

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
      url: "https://gateway.pinata.cloud/ipfs/QmenM5Fj4VBojcfJvYAGr8UMx9tHykWD4cDyGxZXa6V2D3/Cartoonify%20%281%29.png",
      param: "https://gateway.pinata.cloud/ipfs/QmTrmLSpBFNvowVMBsFmNgCzEbJRnyzb5uoznKoXsVxcCu/1",
    },
    {
      url: "https://gateway.pinata.cloud/ipfs/QmenM5Fj4VBojcfJvYAGr8UMx9tHykWD4cDyGxZXa6V2D3/Cartoonify%20%282%29.png",
      param: "https://gateway.pinata.cloud/ipfs/QmTrmLSpBFNvowVMBsFmNgCzEbJRnyzb5uoznKoXsVxcCu/2",
    },
    {
      url: "https://gateway.pinata.cloud/ipfs/QmenM5Fj4VBojcfJvYAGr8UMx9tHykWD4cDyGxZXa6V2D3/Cartoonify%20%283%29.png",
      param: "https://gateway.pinata.cloud/ipfs/QmTrmLSpBFNvowVMBsFmNgCzEbJRnyzb5uoznKoXsVxcCu/3",
    },
    {
      url: "https://gateway.pinata.cloud/ipfs/QmenM5Fj4VBojcfJvYAGr8UMx9tHykWD4cDyGxZXa6V2D3/Cartoonify%20%284%29.png",
      param: "https://gateway.pinata.cloud/ipfs/QmTrmLSpBFNvowVMBsFmNgCzEbJRnyzb5uoznKoXsVxcCu/4",
    },
    {
      url: "https://gateway.pinata.cloud/ipfs/QmenM5Fj4VBojcfJvYAGr8UMx9tHykWD4cDyGxZXa6V2D3/Cartoonify.png  ",
      param: "https://gateway.pinata.cloud/ipfs/QmTrmLSpBFNvowVMBsFmNgCzEbJRnyzb5uoznKoXsVxcCu/5",
    },

  ];

  const data2 = [
    {
      url: "https://gateway.pinata.cloud/ipfs/Qmefy1wREWkXcDqLuFpXtmdu1zPrQ2S9oFyJLWwqrpRRco/1.png",
      param: 'https://gateway.pinata.cloud/ipfs/QmTyKMNxzyuipPpxf2KUZqm24hrYZNTsyh9mCiAmW3Yyoe/1',
    },
    {
      url: "https://gateway.pinata.cloud/ipfs/Qmefy1wREWkXcDqLuFpXtmdu1zPrQ2S9oFyJLWwqrpRRco/2.png",
      param: 'https://gateway.pinata.cloud/ipfs/QmTyKMNxzyuipPpxf2KUZqm24hrYZNTsyh9mCiAmW3Yyoe/2',
    },
    {
      url: "https://gateway.pinata.cloud/ipfs/Qmefy1wREWkXcDqLuFpXtmdu1zPrQ2S9oFyJLWwqrpRRco/3.png",
      param: 'https://gateway.pinata.cloud/ipfs/QmTyKMNxzyuipPpxf2KUZqm24hrYZNTsyh9mCiAmW3Yyoe/3',
    },
    {
      url: "https://gateway.pinata.cloud/ipfs/Qmefy1wREWkXcDqLuFpXtmdu1zPrQ2S9oFyJLWwqrpRRco/4.png",
      param: 'https://gateway.pinata.cloud/ipfs/QmTyKMNxzyuipPpxf2KUZqm24hrYZNTsyh9mCiAmW3Yyoe/4',
    },
    {
      url: "https://gateway.pinata.cloud/ipfs/Qmefy1wREWkXcDqLuFpXtmdu1zPrQ2S9oFyJLWwqrpRRco/5.png",
      param: 'https://gateway.pinata.cloud/ipfs/QmTyKMNxzyuipPpxf2KUZqm24hrYZNTsyh9mCiAmW3Yyoe/5',
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
      if(NFTContract === null) {
        alert("this is null");
      }
      const response = await NFTContract.mintNFT(tokenURI, options);
      console.log("Recieved:", response);
    } catch (err) {
      alert(err,"this is handlemint");
    } finally {
      setIsMinting(false);
    }
  }

  if(account == null) {
    return (
      <div className="container home">
        <br/>
        <h1 className='grow-on-render maintitle'>NFT MARKET PLACE</h1>
        <div className="headings">        
        <h2 className='grow-on-render'>by Rishabh</h2>
        </div>
        <p style={{color: "#30E3DF",}}>Buy an NFT from our market place</p>
        {isWalletInstalled? 
        (<button className="connectAccount grow-on-render" onClick={connectWallet}>Connect Wallet</button>) 
        : (<p style={{color: "#30E3DF",}}>Install MetaMask Wallet <a href='https://metamask.io/'>Metamask.io</a></p>) }
      </div>
    );
  }


  return (
    <div className="container">
      <br/>
      <h1 className='grow-on-render maintitle'>Army of Demons</h1>
      <div className="headings">
      <h2 className='grow-on-render'>Kibutsuji</h2>
      </div>

      <div className="nfts">
      {data.map((item, index) => (
        <div className="imgDiv grow-on-render">
          <img src={item.url} key={index} alt="img" width={250} height={250}/>
          <button className='grow-on-render widthNormal' isloading={isMinting} onClick={() =>{handleMint(item.param)}} >Mint - 0.01 eth</button>
        </div>
      ))}
      </div>
  
      <div className="headings">
      <h2 className='grow-on-render'>female Kibutsuji</h2>
      </div>
      
      <div className="nfts">
      {data2.map((item, index) => (
        <div className="imgDiv grow-on-render">
          <img src={item.url} key={index} alt="img" width={250} height={250}/>
          <button className='grow-on-render' isLoading={isMinting} onClick={() =>{handleMint(item.param)}} >Mint - 0.01 eth</button>
        </div>
      ))}
      </div>

      <div className="withdraw">
      <button className='grow-on-render widthNormal' onClick={withdrawMoney} >Withdraw Money from Contract</button>
      </div>
      
      
    </div>
  );
}

export default App;