import BlockChain from './blockchain';

const bitcoin = new BlockChain();

/** get all chain & pending transactions [GET] /blockchain */
console.log({
  note: `All blockchain data`,
  chain: [...bitcoin.chain],
  pendingTransactions: [...bitcoin.pendingTransactions],
});
/** create a new transaction [POST] /transaction */
const blockIndex = bitcoin.createNewTransaction(950, 'sender:address', 'recipienct:address');
console.log({ note: `This transaction will be added in block ${blockIndex}` });
/** mine [GET] /mine */
const lastBlock = bitcoin.getLastBlock();
const previousBlockHash = lastBlock.hash;
const currentBlockData = bitcoin.pendingTransactions;
const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
const hashBlock = bitcoin.hasBlock(previousBlockHash, currentBlockData, nonce);
// miner fees start
bitcoin.createNewTransaction(10, 'SENDER:OOOOOOOO', 'RECIPIENT:MINER');
// miner fees end
const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, hashBlock);
console.log({ note: `New block mined successfully`, block: newBlock });
console.log({
  note: `All blockchain data`,
  chain: [...bitcoin.chain],
  pendingTransactions: [...bitcoin.pendingTransactions],
});