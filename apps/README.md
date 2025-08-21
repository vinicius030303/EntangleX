# 🚀 EntangleX 

---

EntangleX é um protocolo de última geração para eliminar as maiores barreiras nos pagamentos em blockchain: taxas altas, liquidações lentas e vazamentos de privacidade

Avaliação de risco com tecnologia de IA.

Liquidação sem gás via retransmissores e Paymasters ERC-4337.

Endereços furtivos e pools protegidos para transferências que priorizam a privacidade .

Design de razão inspirado no quantum para movimentação segura de valores .

Da intenção à liquidação em segundos — instantâneo, sem gás e privado.

---

📖 Sobre o Projeto

O cenário atual das criptomoedas ainda enfrenta três desafios:

💸 Taxas altas – Os custos do gás impedem a adoção generalizada.

🐌 Liquidações lentas – As transações demoram muito para serem confirmadas.

🔓 Vazamentos de privacidade – Endereços de carteiras são totalmente expostos.

A EntangleX resolve esses problemas com:

AI Risk Guard para bloquear phishing e drenadores.

Modo furtivo para ocultar endereços de destinatários.

ERC-4337 Paymasters para UX sem gás.

Piscinas blindadas com ZK-Proofs para transferências privadas.

Da intenção → avaliação de risco → liquidação automática , tudo acontece em segundos .

---

## ✨ Visão Geral


- **Gasless UX** – O usuário não paga gás; o sistema subsidia via Paymaster/tesouro DeFi.
- **Entangled Ledger** – Saldos entre pares atualizados instantaneamente, como partículas entrelaçadas.
- **Relayer Inteligente** – IA avalia risco, aplica políticas anti-drainer e decide auto-settle.
- **Privacidade v1** – Endereços stealth efêmeros para pagamentos “sem rastro direto”.
- **Cross-Chain (stub)** – Inbox para mensagens entre redes, base para liquidação futura.
- **Shielded Pool (stub)** – Compromissos + nullifier com Merkle/ZK para transferências privadas.
- **Dev Experience** – SDK em TypeScript, Subgraph, apps web demo e painel de métricas.
- **Arquitetura Modular** – Cada camada pode ser evoluída ou trocada (Ledger, Paymaster, Router, ZK).

---

##  Tecnologias utilizadas

![Solidity](https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white)
![Hardhat](https://img.shields.io/badge/Hardhat-FCC43E?style=for-the-badge&logo=hardhat&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![Ethers.js](https://img.shields.io/badge/Ethers.js-3C3C3D?style=for-the-badge&logo=ethereum&logoColor=white)
![ERC-4337](https://img.shields.io/badge/ERC--4337-AA00FF?style=for-the-badge&logo=ethereum&logoColor=white)
![ZK-Proofs](https://img.shields.io/badge/ZK--Proofs-5C2D91?style=for-the-badge&logo=zero&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)

---

## 📂 Estrutura do Projeto

```
entanglex/
├─ contracts/              # Solidity smart contracts
│  ├─ EntangledLedger.sol  # MVP: criar pares, depositar, ajustar, sacar
│  ├─ SettlementHub.sol    # Stub – batching/netting de intents
│  ├─ Paymaster.sol        # Stub – ERC-4337, subsidia taxas de gás
│  ├─ CrossChainInbox.sol  # Stub – base para liquidação entre redes
│  ├─ ShieldedPool.sol     # Stub – privacidade ZK (árvore Merkle + nullifier)
│  └─ mocks/TestToken.sol  # ERC-20 simples para testes
│
├─ services/
│  ├─ relayer/             # Relayer Node/TS + IA integrada
│  │  ├─ batching.ts       # Junta intents em lote para eficiência
│  │  ├─ policies/         # Rate-limit, velocity check, risco
│  │  ├─ stealth.ts        # Endereços stealth efêmeros
│  │  ├─ risk-score.ts     # IA (OpenAI) avaliando anomalias/risco
│  │  └─ wallet.ts         # Envia transações (2771 hoje, 4337 depois)
│  ├─ bundler/             # Stub de bundler ERC-4337
│  └─ intent-router/       # Stub de motor de netting/compensação
│
├─ apps/
│  ├─ web/                 # Frontend demo (React + Vite)
│  │  ├─ StealthPayForm.tsx   # Pagamento privado v1
│  │  ├─ PairPanel.tsx        # Criar/ajustar pares
│  │  ├─ ActivityFeed.tsx     # Feed de liquidações
│  │  └─ SettingsSafe.tsx     # Contatos confiáveis + limites
│  └─ dashboard/           # Stub – métricas (custo/tx, runway)
│
├─ packages/
│  ├─ sdk/                 # SDK TS para dApps integrarem
│  └─ schema/              # Schemas EIP-712 (intents)
│
├─ zk/                     # Provas de conhecimento zero (stubs)
│  ├─ circuits/            # Circom – rate limit, shielded pool
│  ├─ prover/              # Scripts de compilação/prova
│  └─ verifier/            # Contratos Verifier on-chain
│
├─ subgraph/               # The Graph – indexação de eventos
├─ ops/                    # Infra/Docker/CI
└─ docs/                   # Whitepaper + Developer Guide
```

---

## ⚙️ Funcionalidades MVP

✅ **EntangledLedger**  
- Criar pares de contas (A ↔ B)  
- Depositar ETH  
- Ajustar saldos via intents  
- Sacar fundos  
- Eventos emitidos para subgraph  

✅ **Relayer com IA**  
- Recebe intents assinadas EIP-712  
- IA (OpenAI) analisa memo/fluxo → classifica risco  
- Políticas aplicadas: rate-limit, velocity check, dust/spikes  
- Se seguro → auto-ajuste no contrato  
- Se suspeito → `challenge`, pedindo segunda assinatura (stub TOTP)  

✅ **Frontend Demo**  
- Conectar carteira (Metamask)  
- Criar par/ajustar/retirar  
- Enviar valor para endereço stealth efêmero  
- Feed de atividades em tempo real  

✅ **SDK TS**  
- Assinatura de intents  
- Chamada ao relayer  
- Helpers para stealth addresses  

---

## 🔒 Segurança e Privacidade

- **Gasless Paymaster (stub)** – subsidia taxas de rede com tesouro DeFi.  
- **Stealth Mode v1** – derivação de endereço stealth com `viewTag`.  
- **Shielded Pool (planejado)** – transferências privadas via commitments/nullifier.  
- **IA Risk Guard** – bloqueia drenos automáticos, phishing patterns e spam.  
- **2-Step Challenge (planejado)** – autenticação extra para intents de risco médio.  

---

## 🚀 Roadmap

- [x] MVP Ledger + Relayer com IA básica  
- [x] Frontend demo (React/Vite)  
- [ ] Paymaster ERC-4337 (subsídio gas real)  
- [ ] Shielded Pool ZK  
- [ ] Intent Router + Netting cross-chain  
- [ ] Dashboard de métricas  
- [ ] Whitepaper completo + Publicação GitHub  

---

## 🔧 Como Rodar

```bash
# Instalar dependências
npm install

# Deploy + Relayer + Web juntos
npm run dev:all

# Acessar:
# Relayer: http://localhost:8787/health
# Web:     http://localhost:5173
```

---

## 📜 Licença

MIT – Uso livre para pesquisa e experimentação.


---
## 👨‍💻 Autor

**Vinicius S.**  
📧 vinicius__santos@live.com   
🔗 [LinkedIn](https://linkedin.com/in/vinicius-front)

---

*Tenho disciplina, autonomia, foco em solução e total interesse em crescer com projetos reais.*  