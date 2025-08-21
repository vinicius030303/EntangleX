import speakeasy from 'speakeasy';
export function verifyTotp(token:string){
  const secret = process.env.TOTP_SHARED_SECRET || 'BASE32SECRET';
  return speakeasy.totp.verify({ secret, encoding: 'base32', token, window: 1 });
}
