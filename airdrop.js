// npm init -y
// npm install --save @solana/web3.js

const { 
  Connection, 
  LAMPORTS_PER_SOL, 
  clusterApiUrl, 
  Keypair
} = require("@solana/web3.js");

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

(async ()=> {

  const keypair = Keypair.generate();//generates public and private key

  const airdropSignature = await connection.requestAirdrop(
    keypair.publicKey,
    LAMPORTS_PER_SOL// 1 billion lamports = 1 sol
  );
  
  const latestBlockHash = await connection.getLatestBlockhash();
  
  const txn = await connection.confirmTransaction({
    blockhash: latestBlockHash.blockhash,
    lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
    signature: airdropSignature,
  });

  console.log({
    publicKey: keypair.publicKey,
    privateKey: keypair.secretKey,
    signature: airdropSignature,
    txn
  })
})()


/* Steps to do to generate a solana token
(After getting the code of airdrop.js)
1. In Terminal run
npm init -y
or
npm install --save @solana/web3.js
2. Change the developer settings in Phantom wallet
- 'Change network', change mainnet beta to devnet
3. Run the code => we get a private key and signature.
4. Open explorer.solana.com 
- change the cluster from mainnet to devnet
- copy paste the signature in the tab
5. Open the phantom wallet
- add a new wallet
- select import private key => paste the generated private key
=> we get 1 SOL token!!!!!!
*/
