const {
  AccountId,
  PrivateKey,
  Client,
  Hbar,
  TokenCreateTransaction,
  TokenType,
  TokenSupplyType,
  TokenMintTransaction,
  TransferTransaction,
  AccountBalanceQuery,
  TokenAssociateTransaction,
  } = require("@hashgraph/sdk");
  const path = require("path")
require("dotenv").config({path:path.join(__dirname,'/.env')});
  
  async function main() {
    // Grab your Hedera testnet account ID and private key from your .env file
    const myAccountId = process.env.MY_ACCOUNT_ID;
    const myPrivateKey = process.env.MY_PRIVATE_KEY;
  
    // If we weren't able to grab it, we should throw a new error
    if (myAccountId == null || myPrivateKey == null) {
      throw new Error(
        "Environment variables myAccountId and myPrivateKey must be present"
      );
    }
  
    // Create our connection to the Hedera network
    // The Hedera JS SDK makes this really easy!
    const client = Client.forTestnet();
  
    client.setOperator(myAccountId, myPrivateKey);
  
    // Create new keys for first account
    const firstAccountPrivateKey = PrivateKey.generateED25519();
    const firstAccountPublicKey = firstAccountPrivateKey.publicKey;
    
    
    // Create a new account with 1,000 tinybar starting balance
    const firstAccountTransactionResponse = await new AccountCreateTransaction()
      .setKey(firstAccountPublicKey)
      .setInitialBalance(Hbar.fromTinybars(1000))
      .execute(client);
  
    // Get the new account ID
    const getFirstReceipt = await firstAccountTransactionResponse.getReceipt(client);
    const firstAccountId = getFirstReceipt.accountId;
  
    console.log("The first account ID is: " + firstAccountId);
    console.log(`The first account private key is:${firstAccountPrivateKey}`);
  
    // Verify the account balance
    const firstAccountBalance = await new AccountBalanceQuery()
      .setAccountId(firstAccountId)
      .execute(client);
  
    console.log(
      "The first account balance is: " +
        firstAccountBalance.hbars.toTinybars() +
        " tinybars."
    );
// Wait 5 seconds between consensus topic creation and subscription creation
await new Promise((resolve) => setTimeout(resolve, 5000));
// Create new keys for first account
const secondAccountPrivateKey = PrivateKey.generateED25519();
const secondAccountPublicKey = secondAccountPrivateKey.publicKey;


// Create a new account with 1,000 tinybar starting balance
const secondAccountTransactionResponse = await new AccountCreateTransaction()
  .setKey(secondAccountPublicKey)
  .setInitialBalance(Hbar.fromTinybars(1000))
  .execute(client);

// Get the new account ID
const getSecondReceipt = await secondAccountTransactionResponse.getReceipt(client);
const secondAccountId = getSecondReceipt.accountId;

console.log("The second account ID is: " + secondAccountId);
console.log(`The second account private key is ${secondAccountPrivateKey}`);

// Verify the account balance
const secondAccountBalance = await new AccountBalanceQuery()
  .setAccountId(secondAccountId)
  .execute(client);

console.log(
  "The first account balance is: " +
    secondAccountBalance.hbars.toTinybars() +
    " tinybars."
);

//Create the NFT
const nftCreate = await new TokenCreateTransaction()
	.setTokenName("Mystic Token")
	.setTokenSymbol("MSTC")
	.setTokenType(TokenType.NonFungibleUnique)
	.setInitialSupply(0)
	.setTreasuryAccountId(myAccountId)
    .setAdminKey(myPrivateKey)
	.setSupplyKey(firstAccountPrivateKey)
    .setCustomFees(0.05)
    .setTokenMemo("This is Mystic Token! ")
    .setFeeScheduleKey(secondAccountPrivateKey);

//Sign the transaction with the treasury key
const nftCreateTxSign = await nftCreate.sign(myPrivateKey);

//Submit the transaction to a Hedera network
const nftCreateSubmit = await nftCreateTxSign.execute(client);

//Get the transaction receipt
const nftCreateRx = await nftCreateSubmit.getReceipt(client);

//Get the token ID
const tokenId = nftCreateRx.tokenId;

//Log the token ID
console.log(`- Created NFT with Token ID: ${tokenId} \n`);


//Create the query
const query = new TokenInfoQuery();

//Sign with the client operator private key, submit the query to the network and get the token supply
const tokenMemo = (await query.execute(client)).tokenMemo;
const tokenAdminKey = (await query.execute(client)).tokenAdminKey;
const tokenSupplyKey = (await query.execute(client)).tokenSupplyKey;
const tokenCustomFees = (await query.execute(client)).tokenCustomFees;
const tokenFeeScheduleKey = (await query.execute(client)).tokenFeeScheduleKey;
console.log(`The token memo is ${tokenMemo}`);
console.log(`The token admin key is ${tokenAdminKey}`);
console.log(`The token supply key is ${tokenSupplyKey}`);
console.log(`The token custom fees is ${tokenCustomFees}`);
console.log(`The token fee schedule key is ${tokenFeeScheduleKey}`);



//v2.0.7






// Wait 5 seconds between consensus topic creation and subscription creation
await new Promise((resolve) => setTimeout(resolve, 5000));

}


    
// Call the async main function
main();  