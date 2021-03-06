import { useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import Layout from "../components/Layout";
import { BlockchainContext } from "../contexts/BlockchainContext";

const CONTRACT_ADDRESS = "0x388256be6bdce27de101d592859a7205e58d0074";
const CONTRACT_ABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, {
  "anonymous": false,
  "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" },
  { "indexed": true, "internalType": "address", "name": "approved", "type": "address" },
  { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
  "name": "Approval", "type": "event"
}, {
  "anonymous": false, "inputs":
    [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" },
    { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event"
}, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" },

{
  "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }],
  "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "view", "type": "function"
},

{ "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },

{ "inputs": [], "name": "mint", "outputs": [], "stateMutability": "payable", "type": "function" },
{
  "inputs": [], "name": "mintPrice", "outputs": [
    { "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "view", "type": "function"
}, {
  "inputs": [], "name": "name", "outputs":
    [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function"
}, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
{
  "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
  "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function"
}, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "_data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
{
  "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }],
  "name": "tokenByIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "view", "type": "function"
}, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "tokenOfOwnerByIndex", "outputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
{
  "inputs": [], "name": "totalSupply", "outputs": [
    { "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "view", "type": "function"
}, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];

const ERC721Assignment = () => {
  const { currentAccount, provider, networkId, chainId } = useContext(BlockchainContext);
  const [contract, setContract] = useState();
  useEffect(() => {
    if (provider) {
      const signer = provider.getSigner();
      provider.getBlock().then(block => {
        const _contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider, {
          gasLimit: block.gasLimit
        });
        setContract(_contract.connect(signer));
      })
    }
  }, [provider]);

  const [totalSupply, setTotalSupply] = useState();
  const [mintPrice, setPrice] = useState();
  const [accountBalance, setAccountBalance] = useState();
  useEffect(() => {

    /*
     * ??????????????????:
     * ??? contract state ???????????????????????? contract state???????????????????????? totalSupply ??????
     * ????????????????????? totalSupply state ???
     * ????????????????????? <div>?????? Mint ??????: {totalSupply}</div> ??????????????? totalSupply ?????????
     * ??????: ?????? ethers.js ????????? counter ????????? bigNumber??????????????????????????????????????????
     */

    const getContractData = async () => {
      try {
        const totalSupply = await contract.totalSupply()
        const mintPrice = await contract.mintPrice()

        const balance = await contract.balanceOf(currentAccount)
        setTotalSupply(totalSupply.toString())
        setPrice(ethers.utils.formatEther(mintPrice))
        setAccountBalance(balance.toNumber())
      } catch (error) {
        console.error(error)
      }

    }

    if (contract) {
      getContractData()
    }
  }, [contract]);



  const onMint = async () => {
    if (mintPrice !== undefined) {
      try {
        const res = await contract.mint({
          value: ethers.utils.parseEther(mintPrice)
        })
      } catch (error) {
        console.error(error)
      }
    }

  };

  useEffect(() => {

    if (!contract) return
    let interval = window.setInterval(() => {
      contract.balanceOf(currentAccount).then(res => {
        setAccountBalance(res.toNumber())
      })

    }, 1000)

    return () => {
      clearInterval(interval)
    }

  }, [contract]);

  return (
    <Layout>
      <h1>????????????: NFT</h1>

      <div>
        <div>????????????:</div>
        <div className="my-3">
          <div className="mb-1">??????????????????: {currentAccount}</div>
          <div className="mb-1">????????? Mint ??????: {totalSupply}</div>
          <div className="mb-1">????????????????????????: {accountBalance}</div>
          <div className="mb-1">Mint ??????: {mintPrice} ETH</div>
          <button onClick={onMint}>Mint</button>
        </div>

        <div>
          <div>???????????????:</div>
          <ul>
            {totalSupply && contract ?
              [...new Array(+totalSupply)].map((el, i) => <OwnerListItem
                key={i}
                tokenId={i}
                contract={contract} />) : ""
            }
            {/* 
                ?????????????????? [...new Array(totalSupply)]???
                ????????? map ?????????
                ?????? OwnerListItem Component???
                ????????? map ?????? index ?????????
                ??? index ?????? OwnerListItem Component ??? tokenId ???????????? contract ??????
                ????????? map ?????????????????? key
                ??????: ?????? totalSupply ????????? undefined???????????? JSX ?????? condition (if / else)
                ????????????1: https://stackoverflow.com/questions/47287177/how-to-loop-over-a-number-in-react-inside-jsx
                ????????????2: https://zh-hant.reactjs.org/docs/lists-and-keys.html
             */}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

const OwnerListItem = ({ tokenId = "", contract }) => {
  const [ownerAddress, setOwnerAddress] = useState("");
  useEffect(() => {
    if (contract && tokenId !== undefined) {
      const getOwner = async () => {
        try {
          const addr = await contract.ownerOf(
            tokenId
          )
          setOwnerAddress(addr)
        } catch (error) {
          console.error(error)
        }
      }
      getOwner()
    }
    /*
     * ??????????????????:
     * ?????? contract ?????????????????????????????? ownerOf ??????
     * ???????????? tokenId ????????????
     * ????????????????????? ownerAddress state ???
     * ????????????????????? {ownerAddress} ??????????????? ownerAddress ?????????
     */
  }, [contract, tokenId]);

  return (
    <li>
      Token {tokenId} ????????? {ownerAddress}
    </li>
  );
};

export default ERC721Assignment;
