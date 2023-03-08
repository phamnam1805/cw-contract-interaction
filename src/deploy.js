require("dotenv").config();
const { Wallet, BaseProvider } = require("@tovchain/cosms");
const Cosm = require("@tovchain/cosms").default;
const fs = require("fs");

const env = process.env;

async function main() {
    const provider = await BaseProvider.fromRpcUrl(
        env.ORAI_TESTNET_RPC_URL,
        env.ORAI_PREFIX,
        env.ORAI_DENOM
    );
    const wallet = await Wallet.getWalletFromMnemonic(provider, env.MNEMONIC);
    const cosm = new Cosm(provider);
    cosm.setWallet(wallet);
    // console.log(cosm.wasm.wallet);

    // console.log(await wallet.address);
    // console.log(await wallet.getBalance(env.ORAI_DENOM));

    // const wasmCode = fs.readFileSync(
    //     __dirname + "/../wasm/PTrans-smart-contracts.wasm"
    // );

    // const uploadResult = await cosm.wasm.uploadWasm(wasmCode);
    // console.log(uploadResult);

    const initMsg = {
        codeId: 5489,
        instantiateMsg: { denomination: '6', levels: 20 },
        label: "Deploy Ptrans smart contract",
        options: {
            memo: "contract deployment",
            admin: "orai1aeamw40c5tm3gy475qw8q73hu8kda72seqfyzx",
        },
    };

    const initResult = await cosm.wasm.initContract(initMsg);
    console.log(initResult);
}
main();
