const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1");
(async () => {
    const PRIVATE_KEY = "a0a8c5245f2028c3a05f0e3632070c6f83c2448fbf814a7160468c3ac7e36901";
    let message = {
        from: "0xdb7f53b8e1e91e2570f91ee517887e39ebe483f58df2a4cb51cafd39f967f804",
        to: "0x5ee3568eb50135c4b8b6720379cb5cf68f2515be50e7d26463b93102a67f3e94",
        amount: 20,
    };
    console.log("Message : ", message);

    const messageHash = toHex(keccak256(utf8ToBytes(JSON.stringify(message))));
    console.log("Hashed Message : ", messageHash);
    const signResult = secp.secp256k1.sign(PRIVATE_KEY, messageHash);
    // const r = signResult.r;
    // const s = signResult.s;
    // const recovery = signResult.recovery;
    // console.log("Signature : ", toHex(s));
    // console.log("Recovery Bit : ", recovery);
console.log(signResult);

})();