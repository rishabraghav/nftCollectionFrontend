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
      const provider = new ethers.providers.Web3Provider(window.ethereum);
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
      param: 'handleMint("https://gateway.pinata.cloud/ipfs/QmTrmLSpBFNvowVMBsFmNgCzEbJRnyzb5uoznKoXsVxcCu/1")',
    },
    {
      url: "https://gateway.pinata.cloud/ipfs/QmenM5Fj4VBojcfJvYAGr8UMx9tHykWD4cDyGxZXa6V2D3/Cartoonify%20%282%29.png",
      param: 'handleMint("https://gateway.pinata.cloud/ipfs/QmTrmLSpBFNvowVMBsFmNgCzEbJRnyzb5uoznKoXsVxcCu/2")',
    },
    {
      url: "https://gateway.pinata.cloud/ipfs/QmenM5Fj4VBojcfJvYAGr8UMx9tHykWD4cDyGxZXa6V2D3/Cartoonify%20%283%29.png",
      param: 'handleMint("https://gateway.pinata.cloud/ipfs/QmTrmLSpBFNvowVMBsFmNgCzEbJRnyzb5uoznKoXsVxcCu/3")',
    },
    {
      url: "https://gateway.pinata.cloud/ipfs/QmenM5Fj4VBojcfJvYAGr8UMx9tHykWD4cDyGxZXa6V2D3/Cartoonify%20%284%29.png",
      param: 'handleMint("https://gateway.pinata.cloud/ipfs/QmTrmLSpBFNvowVMBsFmNgCzEbJRnyzb5uoznKoXsVxcCu/4")',
    },
    {
      url: "https://gateway.pinata.cloud/ipfs/QmenM5Fj4VBojcfJvYAGr8UMx9tHykWD4cDyGxZXa6V2D3/Cartoonify.png  ",
      param: 'handleMint("https://gateway.pinata.cloud/ipfs/QmTrmLSpBFNvowVMBsFmNgCzEbJRnyzb5uoznKoXsVxcCu/5")',
    },

  ];

  const data2 = [
    {
      url: "https://gateway.pinata.cloud/ipfs/Qmefy1wREWkXcDqLuFpXtmdu1zPrQ2S9oFyJLWwqrpRRco/1.png",
      param: "handleMint('https://gateway.pinata.cloud/ipfs/QmTyKMNxzyuipPpxf2KUZqm24hrYZNTsyh9mCiAmW3Yyoe/1')",
    },
    {
      url: "https://gateway.pinata.cloud/ipfs/Qmefy1wREWkXcDqLuFpXtmdu1zPrQ2S9oFyJLWwqrpRRco/2.png",
      param: "handleMint('https://gateway.pinata.cloud/ipfs/QmTyKMNxzyuipPpxf2KUZqm24hrYZNTsyh9mCiAmW3Yyoe/2')",
    },
    {
      url: "https://gateway.pinata.cloud/ipfs/Qmefy1wREWkXcDqLuFpXtmdu1zPrQ2S9oFyJLWwqrpRRco/3.png",
      param: "handleMint('https://gateway.pinata.cloud/ipfs/QmTyKMNxzyuipPpxf2KUZqm24hrYZNTsyh9mCiAmW3Yyoe/3')",
    },
    {
      url: "https://gateway.pinata.cloud/ipfs/Qmefy1wREWkXcDqLuFpXtmdu1zPrQ2S9oFyJLWwqrpRRco/4.png",
      param: "handleMint('https://gateway.pinata.cloud/ipfs/QmTyKMNxzyuipPpxf2KUZqm24hrYZNTsyh9mCiAmW3Yyoe/4')",
    },
    {
      url: "https://gateway.pinata.cloud/ipfs/Qmefy1wREWkXcDqLuFpXtmdu1zPrQ2S9oFyJLWwqrpRRco/5.png",
      param: "handleMint('https://gateway.pinata.cloud/ipfs/QmTyKMNxzyuipPpxf2KUZqm24hrYZNTsyh9mCiAmW3Yyoe/5')",
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
      alert(err,"this is handlemint");
    } finally {
      setIsMinting(false);
    }
  }

  if(account == null) {
    return (
      <div className="container">
        <br/>
        <div className="headings">
        <h1>NFT MARKET PLACE</h1>
        <h2>by Rishabh</h2>
        <p>Buy an NFT from our market place</p>
        </div>
        {isWalletInstalled? 
        (<button className="connectAccount" onClick={connectWallet}>Connect Wallet</button>) 
        : (<p>Install MetaMask Wallet</p>) }
      </div>
    );
  }


  return (
    <div className="container">
      <br/>

      <div className="headings">
      <h1>Army of Demons</h1>
      <h2>Kibutsuji</h2>
      </div>

      <div className="nfts">
      {data.map((item, index) => (
        <div className="imgDiv">
          <img src={item.url} key={index} alt="img" width={250} height={250}/>
          <button isloading={isMinting} onClick={() => {
            eval(item.param);
          }} >Mint - 0.01 eth</button>
        </div>
      ))}
      </div>

      <div className="headings">
      <h2>female Kibutsuji</h2>
      </div>
      
      <div className="nfts">
      {data2.map((item, index) => (
        <div className="imgDiv">
          <img src={item.url} key={index} alt="img" width={250} height={250}/>
          <button isLoading={isMinting} onClick={() => {
            eval(item.param);
          }} >Mint - 0.01 eth</button>
        </div>
      ))}
      </div>
      
      <div className="withdraw">
      <button onClick={withdrawMoney} >Withdraw Money from Contract</button>
      </div>
      
      
    </div>
  );
}

export default App;
// import "./App.css";
// import { Contract, ethers } from "ethers";
// import { useEffect, useState } from "react";
// import contractABI from "./contractABI.json";
 
// const contractAddress = "<your_contract_address_here>";
 
// function App() {
 
//   const [account, setAccount] = useState(null);
//   const [isWalletInstalled, setIsWalletInstalled] = useState(false);
//   const [NFTContract, setNFTContract] = useState(null);
//   // state for whether app is minting or not.
//   const [isMinting, setIsMinting] = useState(false);
 
//   useEffect(() => {
//     if (window.ethereum) {
//       setIsWalletInstalled(true);
//     }
//   }, []);
 
//   useEffect(() => {
//       function initNFTContract() {
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const signer = provider.getSigner();
//         setNFTContract(new Contract(contractAddress,contractABI.abi,signer));
//       }
//       initNFTContract();
//   }, [account]);
 
 
//   async function connectWallet() {
//     window.ethereum
//       .request({
//         method: "eth_requestAccounts",
//       })
//       .then((accounts) => {
//         setAccount(accounts[0]);
//       })
//       .catch((error) => {
//         alert("Something went wrong");
//       });
//   }

//   const data = [
//     {
//       url: "./assets/images/1.png",
//       param: "handleMint('<your_metadata_pinata_link_here>')",
//     },
//     {
//       url: "./assets/images/2.png",
//       param: "handleMint('<your_metadata_pinata_link_here>')",
//     },
//     {
//       url: "./assets/images/3.png",
//       param: "handleMint('<your_metadata_pinata_link_here>')",
//     },
//     {
//       url: "./assets/images/4.png",
//       param: "handleMint('<your_metadata_pinata_link_here>')",
//     },
//     {
//       url: "./assets/images/5.png",
//       param: "handleMint('<your_metadata_pinata_link_here>')",
//     },
//   ];
 
//   async function withdrawMoney(){
//     try {
//       const response = await NFTContract.withdrawMoney();
//       console.log("Received: ", response);
//     } catch (err) {
//       alert(err);
//     }
//   }
 
//   async function handleMint(tokenURI) {
//     setIsMinting(true);
//       try {
//         const options = {value: ethers.utils.parseEther("0.01")};
//         const response = await NFTContract.mintNFT(tokenURI, options);
//         console.log("Received: ", response);
//       } catch (err) {
//         alert(err);
//       }
//       finally {
//         setIsMinting(false);
//       }
//   }
 
//   if (account === null) {
//     return (
//       <>
//         <div className="container">
//           <br/>
//           <h1>🔮 metaschool</h1>
//           <h2>NFT Marketplace</h2>
//           <p>Buy an NFT from our marketplace.</p>

//           {isWalletInstalled ? (
//             <button onClick={connectWallet}>Connect Wallet</button>
//           ) : (
//             <p>Install Metamask wallet</p>
//           )}
//         </div>
//       </>
//     );
//   }
 
//   return (
//     <>
//       <div className="container">
//         <br/>
//         <h1>🔮 metaschool</h1>
      
//         <h2>NFT Marketplace</h2>
//           {data.map((item, index) => (
//             <div className="imgDiv">
//               <img
//                 src={item.url}
//                 key={index}
//                 alt="images"
//                 width={250}
//                 height={250}
//               />
//               <button isLoading={isMinting}
//                 onClick={() => {
//                   eval(item.param);
//                 }}
//               >
//                 Mint - 0.01 eth
//               </button>
//             </div>
//           ))}
//             <button 
//               onClick={() => {
//                 withdrawMoney();
//               }}
//             >
//               Withdraw Money from Contract
//             </button>
//       </div>
//     </>
//   );
// }
 
// export default App;