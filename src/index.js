import BlockChain from './blockchain';
const bitcoin = new BlockChain();
// create new blocks
bitcoin.createNewBlock(54321, 'sdsadasds', 'non2');
bitcoin.createNewBlock(54322, 'dsadsadas', 'non2');
// create a transaction
bitcoin.createNewTransaction(750, 'sender:address:jane', 'recipient:address');
bitcoin.createNewTransaction(50, 'sender:address:adeel', 'recipient:address');
bitcoin.createNewTransaction(250, 'sender:address:john', 'recipient:address');
// create new blocks
bitcoin.createNewBlock(54323, 'dsadsadas', 'non2');
bitcoin.createNewTransaction(50, 'sender:address:frog', 'recipient:address');
bitcoin.createNewBlock(54323, 'dsadsadas2', 'non2');
console.log(bitcoin);
