import sha256 from 'sha256';

type PendingTransactionType = {
  amount: number;
  sender: string;
  recipient: string;
};

type BlockType = {
  index: number;
  timestamp: number;
  transactions: PendingTransactionType[];
  nonce: number;
  prevBlockHash: string;
  hash: string;
};

class Blockchain {
  chain: BlockType[];
  pendingTransactions: PendingTransactionType[];

  constructor() {
    this.chain = [];
    this.pendingTransactions = [];
    // init a genesis block
    this.createNewBlock(1, 'dummy-000-block-genesis', 'dummy-000-hash-genesis');
  }

  /**
   * @description create a new block in the chain & clear all pending transactions,
   * assign all pending transactions to that new block created
   *
   * @param nonce
   * @param prevBlockHash
   * @param hash
   * @returns {BlockType}
   */
  createNewBlock = (nonce: number, prevBlockHash: string, hash: string) => {
    const newBlock: BlockType = {
      index: this.chain.length + 1,
      timestamp: Date.now(),
      transactions: this.pendingTransactions,
      nonce,
      prevBlockHash,
      hash,
    };
    this.pendingTransactions = [];
    this.chain.push(newBlock);
    return newBlock;
  };

  /**
   * @description get last block in the chain
   *
   * @returns {BlockType}
   */
  getLastBlock = (): BlockType => this.chain[this.chain.length - 1];

  /**
   * @description create a new transaction & push it to pending
   * transactions, also ensure that it returns a new index
   * incremented based on the last blocks index
   *
   * @param amount
   * @param sender
   * @param recipient
   * @returns
   */
  createNewTransaction = (amount: number, sender: string, recipient: string) => {
    const newTransaction = {
      amount,
      sender,
      recipient,
    };

    this.pendingTransactions.push(newTransaction);

    return this.getLastBlock().index + 1;
  };

  /**
   * @description generate a hash based on the params given
   *
   * @param prevBlockHash
   * @param currBlockData
   * @param nonce
   * @returns
   */
  hasBlock = (prevBlockHash: string, currBlockData: PendingTransactionType[], nonce: number) => {
    const dataAsString = prevBlockHash + nonce.toString() + JSON.stringify(currBlockData);
    const hash = sha256(dataAsString);
    return hash;
  };

  /**
   * @description create a PoW that returns a nounce which matches our PoW condition
   *
   * @param prevBlockHash
   * @param currBlockData
   * @returns
   */
  proofOfWork = (prevBlockHash: string, currBlockData: any) => {
    let nonce = 0;
    let hash = this.hasBlock(prevBlockHash, currBlockData, nonce);

    while (hash.substring(0, 4) !== '0000') {
      nonce = nonce + 1;
      hash = this.hasBlock(prevBlockHash, currBlockData, nonce);
    }

    return nonce;
  };
}

export default Blockchain;
