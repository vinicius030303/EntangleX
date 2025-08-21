import React from 'react';
export default function ConnectButton(){
  const [acc,setAcc]=React.useState('');
  const connect=async()=>{const p=(window as any).ethereum;if(!p)return alert('No wallet');await p.request({method:'eth_requestAccounts'});const a=await p.request({method:'eth_accounts'});setAcc(a[0]||'');};
  return (<div className='row'><button onClick={connect}>Connect Wallet</button><span className='small'>{acc?`Connected: ${acc}`:'Not connected'}</span></div>);
}