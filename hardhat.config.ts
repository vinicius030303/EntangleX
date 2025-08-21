import '@nomicfoundation/hardhat-toolbox';
import { HardhatUserConfig } from 'hardhat/types';

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.24',
    settings: { optimizer: { enabled: true, runs: 200 } },
  },
  networks: {
    hardhat: {},
    localhost: { url: 'http://127.0.0.1:8545' },
  },
};

export default config;
