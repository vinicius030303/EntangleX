import { openai, MODELS } from './client.js';
export async function scoreIntent(intent:any){
  const prompt = [
    'You are a crypto risk engine.',
    "Return compact JSON with keys: risk (0..1), action ('allow'|'challenge'|'block'), reasons (array of short strings).",
    'Consider phishing/drainers, new recipient, unusual amounts vs history, velocity, presence of URLs in memo.',
    'Be conservative on first-time interactions. JSON only.'
  ].join('\n');
  const input = JSON.stringify(intent);
  const resp = await openai.responses.create({ model: MODELS.mini, input: [{ role:'user', content: `${prompt}\nINPUT:\n${input}` }], temperature: 0.2 });
  let parsed:any = { risk:0.3, action:'allow', reasons:[] };
  try{ parsed = JSON.parse(resp.output_text||'{}'); }catch{}
  return parsed;
}