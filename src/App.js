import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import emblem from "./images/logo.png";
import Web3 from "web3";
import detectEtherumProvider from "@metamask/detect-provider";
import { loadContract } from "./utils/loadContract";
import ContractDep from "./components/ContractDep";
import Admin from "./components/Admin";
import UserProfile from "./components/UserProfile";

function App() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null,
  });

  const [account, setAccount] = useState(null);
  let navigate = useNavigate();

  const connectToEthereum = async () => {
    const provider = await detectEtherumProvider();
    const contract = await loadContract("PropertyRegistry", provider);

    if (provider) {
      // provider = metamask detected.
      console.log("provider:", provider);
      provider.request({ method: "eth_requestAccounts" }); // calling this method trigger a user interface(metamask)
      setWeb3Api({
        web3: new Web3(provider),
        provider,
        contract,
      });
    } else {
      console.error("Please install metamask!"); // metamask not detected.
    }
  };

  useEffect(() => {
    const getAccount = async () => {
      const { web3, contract } = web3Api;
      const accounts = await web3.eth.getAccounts(); // returns the list of accounts you can access.

      setAccount(accounts[0]);
    };
    web3Api.web3 && getAccount();
  }, [web3Api]);

  useEffect(() => {
    const checkAccount = async () => {
      const { web3, contract } = web3Api;
      const ContractDep = await contract.chairperson();
      console.log(account);
      if (account === ContractDep) {
        navigate("/ContractDep");
      } else if (await contract.isAdmin({ from: account })) {
        navigate("/admin");
      } else {
        navigate("./userprofile");
      }
    };
    account && checkAccount();
  }, [web3Api, account]);

  return (
    <Routes>
      <Route
        path="/ContractDep"
        element={<ContractDep myWeb3Api={web3Api} account={account} />}
      />
      <Route
        path="/admin/*"
        element={<Admin myWeb3Api={web3Api} account={account} />}
      />
      <Route
        path="/userprofile/*"
        element={<UserProfile myWeb3Api={web3Api} account={account} />}
      />
      <Route
        path="/"
        element={
          <div className="App">
            <div className="container mainDiv">
              <div className="landingPage-heading-div">
                <img src={emblem} alt="emblem" className="emblem" />
                <h1>Property Registration and Transfer Dapp</h1>
              </div>

              <p className="welcome-p">
                Welcome to Decentralized Property Registration System
              </p>
              <button className="landingPage-btn" onClick={connectToEthereum}>
                Connect to MetaMask
              </button>
            </div>
          </div>
        }
      />
    </Routes>
  );
}
export default App;
