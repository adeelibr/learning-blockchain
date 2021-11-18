import sha256 from 'sha256';
const Blockchain = function () {
    this.chain = [];
    this.pendingTransactions = [];
    const createNewBlock = (nonce, prevBlockHash, hash) => {
        const newBlock = {
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
    const getLastBlock = () => this.chain[this.chain.length - 1];
    const createNewTransaction = (amount, sender, recipient) => {
        const newTransaction = {
            amount,
            sender,
            recipient,
        };
        this.pendingTransactions.push(newTransaction);
        console.log(sha256('hello'));
        return getLastBlock().index + 1;
    };
    const hasBlock = (prevBlockHash, currBlockHash, nonce) => {
    };
    return {
        chain: this.chain,
        pendingTransactions: this.pendingTransactions,
        getLastBlock,
        createNewBlock,
        createNewTransaction,
    };
};
export default Blockchain;
