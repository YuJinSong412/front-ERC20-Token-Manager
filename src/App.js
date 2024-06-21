import './App.css';
import { ethers } from "ethers";
import React, { useState, useCallback, useEffect } from "react";
import Main from "./Main.js";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

import Button from '@mui/material/Button';

const theme = createTheme({
  palette: {
    primary: {main: '#A50034'},
    secondary: purple,
  },
});

function App() {
  //metamask connection
  const connectWallet = useCallback(async () => {
    const provider = await getProvider();
    try {
      if (typeof window.ethereum !== "undefined") {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        alert("로그인 완료");
        setIsState(true);


      } else alert("please install MetaMask");
    } catch (error) {
      console.log(error);
    }
  });


  const [provider, setProvider] = useState(undefined);
  const [isState, setIsState] = useState(false);

  useEffect(()=>{
    setIsState(isState);

  }, []);


  const getProvider = async () => {
    const provider = await new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    return provider;
  };

    if(isState == true){
      return <Main />
    }

  return (
    <div>
      <p>로그인을 하세요.</p>
      <ThemeProvider theme={theme}>
        <Button variant="contained" size="large" onClick={connectWallet}>
          지갑 연결하기
        </Button>

      </ThemeProvider>

    </div>

  );
}

export default App;
