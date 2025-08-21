import 'dotenv/config';
import express from 'express';
import { evaluateRisk } from './policies/evaluate.js';
import { sanitizeMemo } from './ai/sanitize_memo.js';
import { settleAdjust } from './wallet.js';
import { verifyTotp } from './challenge.js';

const app = express();
app.use(express.json({ limit: '256kb' }));

app.get('/health', (_, res) => res.json({ ok: true }));

app.post('/intents', async (req, res) => {
  try {
    const intent = req.body || {};
    if (intent.memo) intent.memo = await sanitizeMemo(intent.memo);
    const decision = await evaluateRisk(intent);

    if (!decision.ok && decision.level === 'challenge') {
      return res.status(202).json({ decision, intent, challenge: 'TOTP_REQUIRED' });
    }
    if (!decision.ok) {
      return res.status(403).json({ decision, intent });
    }

    const settlement = await settleAdjust(String(intent.pairId), String(intent.amount), Boolean(intent.fromAToB));
    res.json({ decision, intent, settlement });
  } catch (e:any) {
    console.error('INTENT_ERROR', e);
    res.status(500).json({ error: 'internal_error', detail: String(e?.message||e) });
  }
});

app.post('/challenge/confirm', async (req, res) => {
  const { token, intent } = req.body || {};
  if (!verifyTotp(String(token||''))) return res.status(401).json({ ok:false, error:'INVALID_TOTP' });
  try {
    const settlement = await settleAdjust(String(intent.pairId), String(intent.amount), Boolean(intent.fromAToB));
    res.json({ ok:true, settlement });
  } catch (e:any) {
    res.status(500).json({ ok:false, error:String(e?.message||e) });
  }
});

const port = Number(process.env.PORT || 8787);
app.listen(port, () => console.log(`[relayer] listening on :${port}`));
