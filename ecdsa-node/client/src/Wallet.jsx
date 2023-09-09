import server from "./server";

import * as secp from 'ethereum-cryptography/secp256k1';

import { sha256 } from "ethereum-cryptography/sha256.js";

// import {toHex} from 'ethereum-cryptography/utils';



import { secp256k1 } from "ethereum-cryptography/secp256k1";
import {toHex, utf8ToBytes} from "ethereum-cryptography/utils";


function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const privateKey = evt.target.value
    setPrivateKey(privateKey);
    console.log(privateKey)

    const address = toHex(secp.secp256k1.getPublicKey(privateKey));
    // const address = secp256k1.getPublicKey(sha256(utf8ToBytes(privateKey)))
    // const address = evt.target.value;

    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type private key" value={privateKey} onChange={onChange}>

        </input>
      </label>

      <div>
        Address: {address.slice(0,5)+'...'+address.slice(60,66)}
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
