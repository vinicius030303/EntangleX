import { ethers } from 'ethers';

export async function getSigner(){
  const rpc = process.env.RPC_URL!;
  const provider = new ethers.JsonRpcProvider(rpc);
  const pk = process.env.RELAYER_PRIVATE_KEY;
  if (pk) return new ethers.Wallet(pk, provider);
  // fallback to unlocked account #0 (Hardhat local)
  const signer = await provider.getSigner(0);
  return signer;
}

const LEDGER_ABI = [
  { "inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bool","name":"fromAToB","type":"bool"}], "name":"relayerAdjust", "outputs":[], "stateMutability":"nonpayable", "type":"function" }
];

export async function settleAdjust(pairId:string, amountEth:string, fromAToB:boolean){
  const signer = await getSigner();
  const contractAddr = process.env.CONTRACT_ADDRESS!;
  const c = new ethers.Contract(contractAddr, LEDGER_ABI, signer);
  const tx = await c.relayerAdjust(pairId, ethers.parseEther(amountEth), fromAToB);
  const rc = await tx.wait();
  return { hash: tx.hash, block: rc?.blockNumber };
}
