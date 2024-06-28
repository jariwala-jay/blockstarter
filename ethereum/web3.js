import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(process.env.NEXT_PUBLIC_ETH_API);
  web3 = new Web3(provider);
}

export default web3;

export const requestAccount = async () => {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }
};
