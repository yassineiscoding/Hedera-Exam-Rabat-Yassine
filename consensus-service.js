const {
  Client,
  PrivateKey,
  AccountCreateTransaction,
  AccountBalanceQuery,
  Hbar,
  TransferTransaction,
} = require("@hashgraph/sdk");
require("dotenv").config();

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

  
  // Create a new topic
let txResponse = await new TopicCreateTransaction()
  .setTopicId(topicId)
  .setAdminKey(adminKey)
  .setsubmitKey(submitKey)
  .setTopicMemo("This is my topic memo!")
  .execute(client)
  ;

// Grab the newly generated topic ID

// Afficher topicID &  memo
let receipt = await txResponse.getReceipt(client);
let topicId = receipt.topicId;
let topicMemo = receipt.topicMemo;

console.log(`Your topic ID is: ${topicId}`);
console.log(`Your topic Memo is: ${topicMemo}` );
// Modifier le memo
const transaction = await new TopicUpdateTransaction()
    .setTopicId(topicId)
    .setSubmitKey(submitKey)
    .freezeWith(client);

//Sign the transaction with the admin key to authorize the update
transaction.setTopicMemo("Nouveau Memo");

const newTopicMemo = transaction.topicMemo;
console.log(`This is the new topic memo ${newTopicMemo}`);
// Soumettre un message

await new TopicMessageSubmitTransaction({
  topicId: createReceipt.topicId,
  message: "Wassup Hedera !",
}).execute(client);

// Afficher le contenu du message
const getMessage = transaction.getMessage();
console.log(`New message: ${getMessage}`);

//v2.0.0


// Wait 5 seconds between consensus topic creation and subscription creation
await new Promise((resolve) => setTimeout(resolve, 5000));




  


}

// Call the async main function
main();