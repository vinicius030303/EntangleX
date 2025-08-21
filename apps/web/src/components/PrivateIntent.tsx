import React from 'react';
export default function PrivateIntent(){
  const [pairId,setPairId]=React.useState('1');
  const [fromAToB,setFromAToB]=React.useState(true);
  const [amount,setAmount]=React.useState('0.05');
  const [memo,setMemo]=React.useState('');
  const [resp,setResp]=React.useState<any>(null);
  const relayer=import.meta.env.VITE_RELAYER_URL||'http://localhost:8787';
  const sendIntent=async()=>{
    const body={ pairId, fromAToB, amount, memo, newAddress:true, timeDeltaSec:3, priorHistoryScore:0.5 };
    const r=await fetch(`${relayer}/intents`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});
    const j=await r.json(); setResp(j);
  };
  const confirmChallenge=async()=>{
    const token=prompt('Enter TOTP (for demo)')||'';
    const r=await fetch(`${relayer}/challenge/confirm`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({ token, intent:{ pairId, fromAToB, amount } })});
    const j=await r.json(); setResp(j);
  };
  const challenged = resp && resp.challenge==='TOTP_REQUIRED';
  return (<div>
    <h3>Private Mode — Intent (AI)</h3>
    <div className='row'><label>Pair ID:</label><input value={pairId} onChange={e=>setPairId(e.target.value)} /></div>
    <div className='row'><label>Direction:</label>
      <label><input type='radio' checked={fromAToB} onChange={()=>setFromAToB(true)}/> A → B</label>
      <label><input type='radio' checked={!fromAToB} onChange={()=>setFromAToB(false)}/> B → A</label>
    </div>
    <div className='row'><label>Amount (ETH):</label><input value={amount} onChange={e=>setAmount(e.target.value)} /></div>
    <div className='row'><label>Memo:</label><input value={memo} onChange={e=>setMemo(e.target.value)} placeholder='(optional)'/></div>
    <div className='row'><button onClick={sendIntent}>Send Intent</button>{challenged && <button onClick={confirmChallenge}>Confirm 2‑Step</button>}</div>
    {resp && <pre className='small'>{JSON.stringify(resp,null,2)}</pre>}
    <p className='small'>On allow: relayer calls contract automatically. On challenge: 2‑step (TOTP) demo.</p>
  </div>);
}
