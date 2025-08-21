import React from 'react';
import ConnectButton from './components/ConnectButton';
import PairPanel from './components/PairPanel';
import PrivateIntent from './components/PrivateIntent';
export default function App(){
  return (<div className='container'>
    <h1>EntangleX — Full</h1>
    <p className='small'>AI risk → challenge/allow → auto‑settle on-chain</p>
    <div className='card'><ConnectButton/></div>
    <div className='card'><PairPanel/></div>
    <div className='card'><PrivateIntent/></div>
  </div>);
}
