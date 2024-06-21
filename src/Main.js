import './App.css';
import { ethers } from "ethers";
import React, { useState, useCallback, useEffect } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Button from '@mui/material/Button';

const Web3Utils = require('web3-utils');


function createData(name, calories, fat) {
  return { name, calories, fat};
}

const rows = [
  createData('송유진', '0x9f78B3C0aeBC2206f6936B758728216F432C2Db9', 6.0, 24, 4.0)
];

const theme = createTheme({
  palette: {
    primary: {main: '#A50034',contrastText: '#FFFFFF'},
    secondary: purple,
    contrastThreshold: 4.5
  },
});


function Main(props) {

  
    const abi = [
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "initialSupply",
            "type": "uint256"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Approval",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          }
        ],
        "name": "allowance",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "subtractedValue",
            "type": "uint256"
          }
        ],
        "name": "decreaseAllowance",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "addedValue",
            "type": "uint256"
          }
        ],
        "name": "increaseAllowance",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [],
        "name": "symbol",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "transfer",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "transferFrom",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "decimals",
        "outputs": [
          {
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      }
    ]


  const CA_ADDRESS = "0x20109020b0D9ebDBE0a7a5c5780E170e7DE69C6C";
  const INITIAL_SUPPLY = 1000000000000000000;


  const [receiver, setRecevier] = useState({
    toAddress: "",
    toTokenAmount:""
  });

  const [owner, setOwner] = useState({
    mintTokenAmount: 0 
  });

  const [balanceResult,setBalanceResult] = useState(0);
  const [balanceResult2,setBalanceResult2] = useState(0);
  const [transferResult, setTransferResult] = useState(false);
  const [isState, setIsState] = useState(false);

  useEffect(()=>{
    setBalanceResult(balanceResult);
    setTransferResult(transferResult);
    setIsState(isState);

    setBalanceResult2(balanceResult2);


  }, []);



  //change
  const onClickChange = (e) => {
    setRecevier({ ...receiver, [e.target.name]: e.target.value });

  }

  const onClickChange2 = (e) => {
    setOwner({ ...receiver, [e.target.name]: e.target.value });
  }

  //버튼 눌렀을 때 balanceOf 컨트랙트 함수 호출
  const onClickBalance = async () => {

    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log("signer", signer);
      const contract = new ethers.Contract(CA_ADDRESS, abi, signer);  
      const result = await contract.balanceOf(        
        "0xe8258c61EDb90C48f2A634D0a9B2787733bA2f4c"   
      );
      setBalanceResult(result);
      //var q = Math.floor(result / 1000000);
      var lhaResult = Math.round(result) / INITIAL_SUPPLY;
      setBalanceResult2(lhaResult)


    }

  };


    //버튼 눌렀을 때 mint컨트랙트 함수 호출
    const onClickMint = async () =>{
      var tokenLha = owner.mintTokenAmount * INITIAL_SUPPLY;

      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum); //provider == metamask
        const signer = provider.getSigner(); //?
        const contract = new ethers.Contract(CA_ADDRESS, abi, signer);  
        const result = await contract.mint(        
          "0xe8258c61EDb90C48f2A634D0a9B2787733bA2f4c",
          Web3Utils.toBigInt(tokenLha)
        );

        console.log("result", result);
        if(result !== null){
          alert(`${owner.mintTokenAmount}LHA 만큼 발행이 되었습니다.`);
        }
        setOwner(0);

      }
    }

    //버튼 눌렀을 때 transfer컨트랙트 함수 호출
    const onClickTransfer = async () => {

      var tokenLha2 = receiver.toTokenAmount * INITIAL_SUPPLY;

      alert(`송유진(${receiver.toAddress})에게 ${receiver.toTokenAmount}만큼 보내시겠습니까?`);

      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum); //provider == metamask
        const signer = provider.getSigner(); //?
        const contract = new ethers.Contract(CA_ADDRESS, abi, signer);  
        const result = await contract.transfer(       
          tokenLha2
        );

        if(result !== null){
          alert(`전송되었습니다!`)
        }

        setTransferResult(result);
      }
  
    };


  return (
    <div>
      <p>
        LG님!(0xe8258c61EDb90C48f2A634D0a9B2787733bA2f4c) 환영합니다.
      </p>
      <br></br><br></br>
        
      <div>
        [LHA보유현황] <br></br>
        <span>
          {`${balanceResult2}LHA`}
        </span> &nbsp; &nbsp; 
        <ThemeProvider theme={theme}>
          <Button variant="outlined" size="small" onClick={onClickBalance}>
            LHA 보유량 확인
          </Button>
      </ThemeProvider>
      </div>
      <br></br><br></br>

        <div>
          <form>
            <span>[LHA발행]</span><br></br>
            <input type="text" name="mintTokenAmount" value={owner.mintTokenAmount} placeholder='원하는 발행 토큰량 입력' onChange={onClickChange2}></input>&nbsp;  
            <ThemeProvider theme={theme}>
              <Button variant="outlined" size="small" onClick={onClickMint}>발행요청</Button>
            </ThemeProvider>
          </form>
        </div> 
        <br></br><br></br>

        <div>
        <form>
          <span>[LHA토큰 전송]</span><br></br>
          <input type="text" name="toAddress" value={receiver.toAddress} placeholder='toAddress' onChange={onClickChange}/><br></br>
          <input type="text" name="toTokenAmount" value={receiver.toTokenAmount} placeholder='toTokenAmount' onChange={onClickChange}/><br></br>
          <ThemeProvider theme={theme}>
            <Button variant="outlined" size="small" onClick={onClickTransfer}>토큰 전송</Button>
          </ThemeProvider>
        </form>
        </div>
        <br></br><br></br><br></br><br></br>


    </div>
  );
}

export default Main;