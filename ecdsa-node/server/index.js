const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");
const {toHex, utf8ToBytes} = require("ethereum-cryptography/utils");
const {keccak256} = require("ethereum-cryptography/keccak");

app.use(cors());
app.use(express.json());

const balances = {
    "0x102412d065381e9ec8d980b7212fb57b93c4746bbddbc117f5071670144f4281": 101,
    "0xdb7f53b8e1e91e2570f91ee517887e39ebe483f58df2a4cb51cafd39f967f804": 50,
    "0x5ee3568eb50135c4b8b6720379cb5cf68f2515be50e7d26463b93102a67f3e94": 75,
};
let address;

app.get("/balance/:address", (req, res) => {
    address = req.params.address;
    const balance = balances[address] || 0;
    res.send({balance});
});

app.post("/send", (req, res) => {
    if (address == undefined || address == null) {
        res.status(400).send({message: "No address provided, need to get balance first !"});
    }
    const {recipient, amount, signature, recoveryBit, publicKey} = req.body;
    console.log("Sender : ", address);
    console.log("Recipient : ", recipient);
    console.log("Amount : ", amount);
    console.log("Signature : ", signature);
    console.log("Recovery Bit : ", recoveryBit);

    let message = {
        from: address,
        to: recipient,
        amount: amount,
    };
    const messageHash = keccak256(utf8ToBytes(JSON.stringify(message)));
    const recoverKey = secp.secp256k1.getPublicKey(messageHash, signature, recoveryBit);
    setInitialBalance(address);
    setInitialBalance(recipient);
    if (toHex(recoverKey) === publicKey) {
        if (balances[address] < amount) {
            res.status(400).send({message: "Not enough funds in " + address + " wallet !"});
        } else {
            balances[address] -= amount;
            balances[recipient] += amount;
            res.send({balance: balances[address]});
        }
    } else {
        res.status(400).send({message: "Not the right signature !"});
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
    if (!balances[address]) {
        balances[address] = 0;
    }
}