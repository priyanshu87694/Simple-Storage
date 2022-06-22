const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main () {
    // http://127.0.0.1:7545
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    // const encryptedJsonKey = fs.readFileSync("./.encryptedKey.json");
    // let wallet = new ethers.Wallet.fromEncryptedJsonSync(
    //     encryptedJsonKey,
    //     process.env.PRIVATE_KEY_PASSWORD
    // );
    // wallet = await wallet.connect(provider)
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
    const bin = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf-8");
    const contractFactory = new ethers.ContractFactory(abi, bin, wallet);
    console.log("Deploying contract...");
    const contract = await contractFactory.deploy();
    await contract.deployTransaction.wait(1);
    console.log(`Contract address: ${contract.address}`);
    // const transactionReciept = await contract.deployTransaction.wait(1);
    // console.log("Here is the deployment transaction: ");
    // deployment transaction is what we get just after deploying a contract
    // console.log(contract.deployTransaction);
    // console.log("Here is the transaction reciept: ");
    // transaction receipt is what we get when transaction is completed
    // console.log(transactionReciept);

    // favourite number
    const favNumber = await contract.retrieve();
    console.log(`Current fav number: ${favNumber.toString()}`);
    const transactionResponse = await contract.store("1274");
    const transactionReciept = await contract.deployTransaction.wait(1);
    const updatedFavNum = await contract.retrieve();
    console.log(`Updated fav numb: ${updatedFavNum}`);

    // // deploying a contract by making a saction
    // const nonce = await wallet.getTransactionCount();
    // const tx = {
    //     nonce: nonce,
    //     gasPrice: 20000000000,
    //     gasLimit: 1000000,
    //     to: null,
    //     value: 0,
    //     data: "0x60806040526040518060400160405280600581526020017f68656c6c6f0000000000000000000000000000000000000000000000000000008152506000908051906020019061004f929190610062565b5034801561005c57600080fd5b50610166565b82805461006e90610105565b90600052602060002090601f01602090048101928261009057600085556100d7565b82601f106100a957805160ff19168380011785556100d7565b828001600101855582156100d7579182015b828111156100d65782518255916020019190600101906100bb565b5b5090506100e491906100e8565b5090565b5b808211156101015760008160009055506001016100e9565b5090565b6000600282049050600182168061011d57607f821691505b6020821081141561013157610130610137565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b610778806101756000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c806306c62c2c1461005c5780632e64cec11461008c5780636057361d146100aa5780636f760f41146100c65780639e7a13ad146100e2575b600080fd5b610076600480360381019061007191906103cf565b610113565b6040516100839190610561565b60405180910390f35b610094610141565b6040516100a19190610561565b60405180910390f35b6100c460048036038101906100bf9190610474565b61014b565b005b6100e060048036038101906100db9190610418565b610155565b005b6100fc60048036038101906100f79190610474565b6101eb565b60405161010a929190610531565b60405180910390f35b6002818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b6000600154905090565b8060018190555050565b60006040518060400160405280848152602001838152509050600381908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000190805190602001906101b69291906102a7565b50602082015181600101555050816002846040516101d4919061051a565b908152602001604051809103902081905550505050565b600381815481106101fb57600080fd5b906000526020600020906002020160009150905080600001805461021e90610645565b80601f016020809104026020016040519081016040528092919081815260200182805461024a90610645565b80156102975780601f1061026c57610100808354040283529160200191610297565b820191906000526020600020905b81548152906001019060200180831161027a57829003601f168201915b5050505050908060010154905082565b8280546102b390610645565b90600052602060002090601f0160209004810192826102d5576000855561031c565b82601f106102ee57805160ff191683800117855561031c565b8280016001018555821561031c579182015b8281111561031b578251825591602001919060010190610300565b5b509050610329919061032d565b5090565b5b8082111561034657600081600090555060010161032e565b5090565b600061035d610358846105a1565b61057c565b9050828152602081018484840111156103795761037861070b565b5b610384848285610603565b509392505050565b600082601f8301126103a1576103a0610706565b5b81356103b184826020860161034a565b91505092915050565b6000813590506103c98161072b565b92915050565b6000602082840312156103e5576103e4610715565b5b600082013567ffffffffffffffff81111561040357610402610710565b5b61040f8482850161038c565b91505092915050565b6000806040838503121561042f5761042e610715565b5b600083013567ffffffffffffffff81111561044d5761044c610710565b5b6104598582860161038c565b925050602061046a858286016103ba565b9150509250929050565b60006020828403121561048a57610489610715565b5b6000610498848285016103ba565b91505092915050565b60006104ac826105d2565b6104b681856105dd565b93506104c6818560208601610612565b6104cf8161071a565b840191505092915050565b60006104e5826105d2565b6104ef81856105ee565b93506104ff818560208601610612565b80840191505092915050565b610514816105f9565b82525050565b600061052682846104da565b915081905092915050565b6000604082019050818103600083015261054b81856104a1565b905061055a602083018461050b565b9392505050565b6000602082019050610576600083018461050b565b92915050565b6000610586610597565b90506105928282610677565b919050565b6000604051905090565b600067ffffffffffffffff8211156105bc576105bb6106d7565b5b6105c58261071a565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b6000819050919050565b82818337600083830152505050565b60005b83811015610630578082015181840152602081019050610615565b8381111561063f576000848401525b50505050565b6000600282049050600182168061065d57607f821691505b60208210811415610671576106706106a8565b5b50919050565b6106808261071a565b810181811067ffffffffffffffff8211171561069f5761069e6106d7565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b610734816105f9565b811461073f57600080fd5b5056fea26469706673582212206ba47bbb038972cd60f61719e0fbebb62eeb1b8b50d0e5d3a700095035c1adf864736f6c63430008070033",
    //     chainId: 1337,
    // }
    // const signedTxResponse = await wallet.signTransaction(tx);
    // const sentTxResponse = await wallet.sendTransaction(tx);
    // // console.log(signedTxResponse);
    // await sentTxResponse.wait(1);
    // console.log(sentTxResponse);
}

main ()
    .then(() => process.exit(0))
    .catch(error => {
        console.log(error);
        process.exit(1);
    })