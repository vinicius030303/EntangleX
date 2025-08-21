import { ethers } from 'hardhat';
import fs from 'fs'; import path from 'path';
import 'dotenv/config';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deployer:', deployer.address);
  const F = await ethers.getContractFactory('EntangledLedger');
  const c = await F.deploy();
  await c.waitForDeployment();
  const address = await c.getAddress();
  console.log('EntangledLedger deployed at:', address);

  // Write addresses to envs
  const relayerEnvPath = path.resolve('services/relayer/.env');
  const webEnvPath = path.resolve('apps/web/.env.local');
  const relayerExample = fs.readFileSync(path.resolve('services/relayer/.env.example'), 'utf8');
  const webExample = fs.readFileSync(path.resolve('apps/web/.env.local.example'), 'utf8');

  const relayerEnv = relayerExample.replace(/CONTRACT_ADDRESS=.*/g, `CONTRACT_ADDRESS=${address}`);
  fs.writeFileSync(relayerEnvPath, relayerEnv, 'utf8');
  console.log('Updated services/relayer/.env');

  const webEnv = webExample.replace(/VITE_CONTRACT_ADDRESS=.*/g, `VITE_CONTRACT_ADDRESS=${address}`);
  fs.writeFileSync(webEnvPath, webEnv, 'utf8');
  console.log('Updated apps/web/.env.local');

  // Set relayer to deployer by default (relayer signer fallback uses signer(0))
  const tx = await c.setRelayer(deployer.address);
  await tx.wait();
  console.log('Relayer set to:', deployer.address);
}

main().catch((e)=>{ console.error(e); process.exit(1); });
