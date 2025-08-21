# 🚀 EntangleX  

**EntangleX** é um protocolo de próxima geração para pagamentos em blockchain.  
Ele elimina as três maiores barreiras de adoção: **taxas altas**, **liquidações lentas** e **exposição de privacidade**.  

-  Liquidação instantânea, sem gás  
-  IA para avaliação de risco e proteção contra drenos  
-  Privacidade garantida com endereços furtivos e pools blindados  
-  Arquitetura modular, pronta para cross-chain e evolução futura  

---

##  Problema & Solução

O cenário atual enfrenta desafios:  
-  **Taxas altas** – o custo de gás trava a adoção massiva.  
-  **Liquidações lentas** – confirmações demoradas comprometem UX.  
-  **Exposição total** – endereços de carteiras revelam todo o histórico.  

**EntangleX resolve com:**  
- **AI Risk Guard** → bloqueia phishing, drenadores e fluxos anômalos.  
- **Paymasters ERC-4337** → experiência gasless para o usuário.  
- **Stealth Mode** → endereços efêmeros e não rastreáveis.  
- **Shielded Pools com ZK-Proofs** → transferências privadas.  
- **Intents → Risco → Liquidação** → pipeline automático em segundos.  

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

## 🛠️ Tecnologias  


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

## 📂 Estrutura  

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

- **EntangledLedger** – pares, depósitos, ajustes, saques.  
- **Relayer com IA** – intents → risco → auto-settle ou challenge.  
- **Frontend Demo** – carteira, stealth pay, feed de liquidações.  
- **SDK TS** – integração simples para dApps.  

 **Relayer com IA**  
- Recebe intents assinadas EIP-712  
- IA (OpenAI) analisa memo/fluxo → classifica risco  
- Políticas aplicadas: rate-limit, velocity check, dust/spikes  
- Se seguro → auto-ajuste no contrato  
- Se suspeito → `challenge`, pedindo segunda assinatura (stub TOTP)  

 **Frontend Demo**  
- Conectar carteira (Metamask)  
- Criar par/ajustar/retirar  
- Enviar valor para endereço stealth efêmero  
- Feed de atividades em tempo real  

 **SDK TS**  
- Assinatura de intents  
- Chamada ao relayer  
- Helpers para stealth addresses
---

## 🔒 Segurança & Privacidade  

- **Gasless Paymaster (stub)** – subsidia taxas de rede com tesouro DeFi.  
- **Stealth Mode v1** – derivação de endereço stealth com `viewTag`.  
- **Shielded Pool (planejado)** – transferências privadas via commitments/nullifier.  
- **IA Risk Guard** – bloqueia drenos automáticos, phishing patterns e spam.  
- **2-Step Challenge (planejado)** – autenticação extra para intents de risco médio.  

---

## 🛤 Roadmap  

- [x] MVP Ledger + Relayer IA  
- [x] Frontend Demo  
- [ ] Paymaster ERC-4337 (real gas subsidy)  
- [ ] Shielded Pool ZK  
- [ ] Intent Router cross-chain  
- [ ] Dashboard de métricas  
- [ ] Whitepaper público  

---

## 🔧 Como Rodar  

```bash
# Instalar dependências
npm install

# Deploy + Relayer + Web
npm run dev:all

# Acessar:
# Relayer: http://localhost:8787/health
# Web:     http://localhost:5173
```

---

## 📜 Licença  

MIT – Livre para pesquisa e experimentação.  

---

## 👨‍💻 Autor  

**Vinicius S.**  
📧 vinicius__santos@live.com  
🔗 [LinkedIn](https://linkedin.com/in/vinicius-front)  
