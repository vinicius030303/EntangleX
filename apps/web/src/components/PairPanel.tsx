import React from 'react';
declare global { interface Window { ethereum?: any; ethers?: any } }
const ABI=[
  {"inputs":[],"name":"createPair","outputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"stateMutability":"payable","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"joinPair","outputs":[],"stateMutability":"payable","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getPair","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"nextId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}
];
export default function PairPanel(){
  const [addr,setAddr]=React.useState<string>(import.meta.env.VITE_CONTRACT_ADDRESS||'');
  const [id,setId]=React.useState<string>('');
  const [amount,setAmount]=React.useState<string>('0.1');
  const [info,setInfo]=React.useState<any>(null);
  React.useEffect(()=>{const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/ethers@6.12.1/dist/ethers.umd.min.js';document.body.appendChild(s);},[]);
  const getC=async()=>{const p=window.ethereum; if(!p) throw new Error('No provider'); await p.request({method:'eth_requestAccounts'}); const w3=new window.ethers.BrowserProvider(p); const s=await w3.getSigner(); return new window.ethers.Contract(addr,ABI,s);}
  const createPair=async()=>{const c=await getC(); const tx=await c.createPair({value:window.ethers.parseEther(amount)}); await tx.wait(); const nid=await c.nextId(); setId(String(nid));}
  const joinPair=async()=>{const c=await getC(); const tx=await c.joinPair(id,{value:window.ethers.parseEther(amount)}); await tx.wait();}
  const refresh=async()=>{const p=window.ethereum; if(!p) return; const w3=new window.ethers.BrowserProvider(p); const s=await w3.getSigner(); const c=new window.ethers.Contract(addr,ABI,s); const r=await c.getPair(id); setInfo({a:r[0],b:r[1],balA:String(r[2]),balB:String(r[3]),active:r[4]});}
  return (<div>
    <h3>Pair Panel</h3>
    <div className='row'><label>Contract:</label><input value={addr} onChange={e=>setAddr(e.target.value)} style={{width:'480px'}}/></div>
    <div className='row'><label>Pair ID:</label><input value={id} onChange={e=>setId(e.target.value)} /></div>
    <div className='row'><label>Amount (ETH):</label><input value={amount} onChange={e=>setAmount(e.target.value)} /></div>
    <div className='row'><button onClick={createPair}>Create Pair</button><button onClick={joinPair}>Join Pair</button><button onClick={refresh}>Refresh</button></div>
    {info && <pre className='small'>{JSON.stringify(info,null,2)}</pre>}
  </div>);
}
