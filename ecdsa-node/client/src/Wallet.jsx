import server from "./server";
import * as secp from 'ethereum-cryptography/secp256k1';
import {toHex} from 'ethereum-cryptography/utils';

/*
  send tx, a signed tx, to server, then server recovers pub key from
  that sig, and only goes through if that public key has those funds
*/


// const privateKey = secp.secp256k1.utils.randomPrivateKey()
// console.log("Private Key: ",toHex(privateKey))

// const publicKey = secp.secp256k1.getPublicKey(privateKey);
// console.log("Public Key: ",toHex(publicKey))

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    getPublicKey(privateKey);

    console.log(privateKey)


    const address = toHex(secp.secp256k1.getPublicKey(privateKey));
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
        <input placeholder="Type private key" value={privateKey} onChange={onChange}></input>
      </label>

      <div>
        Address: {address.slice(0,10)+'...'}
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;