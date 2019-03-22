let forge = require('node-forge');
let fs = require('fs-extra');
console.log("Starting encryption example");

main().catch(console.error);

async function getMessage(publicKey) {
    let textFile = await fs.readFile("big.txt", "utf-8");
    return { cipher: textFile };
}

function decrypeMessage(privateKey, message) {
    return message.cipher;
}

async function main() {
    let keypair = await generateKeyPair();
    let payload = await getMessage(keypair.publicKey);
    let secretMessage = decrypeMessage(keypair.privateKey, payload);
    let result = await validateMessage(secretMessage);
    console.log(result);
}

async function validateMessage(secretMessage) {
    let result = await fs.readFile("big.txt", "utf-8");
    return secretMessage === result;
}

async function generateKeyPair() {
    return new Promise((resolve, reject) => {
        let rsa = forge.pki.rsa;
        rsa.generateKeyPair({ bits: 2048, workers: 2 }, function (err, keypair) {
            if (err) {
                reject(err);
            } else {
                resolve(keypair);
            }
        });
    });
}
