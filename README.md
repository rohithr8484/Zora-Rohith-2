# 🪙 Zora Coins - Creator Economy dApp

Welcome to **Zora Coins**, a next-gen dApp built to power the **creator economy** by allowing users to **launch, trade, and support creator coins** using the **Zora Protocol** and **Uniswap V4** liquidity hooks.

---

## 🎯 Description

Zora Coins is an experimental trading platform that lets creators launch custom coins and supporters trade them. It uses **Zora's coin primitives** and integrates **Uniswap V4**'s powerful custom liquidity hooks for advanced trading experiences.

This project demonstrates:
- Launching new creator coins on-chain
- Enabling supporters to trade coins using Uniswap V4 liquidity pools
- Deploying coins on the **Base network**
- Dashboard views for Portfolio, Analytics, and Discover sections

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + TailwindCSS + TypeScript |
| Smart Contracts | Zora Protocol, Uniswap V4 |
| Deployment | Netlify |
| Blockchain | Base Testnet |

---

## 💡 Sponsor Technology Integration

### ✅ Zora Protocol

- **Used for:** Minting & managing creator coins.
- **Where:** `src/hooks/zora.ts`, `components/CreateCoin.tsx`, and `ZoraCoinFactory.sol`.
- **Features Used:**
  - Zora Creator Coin contracts
  - Metadata APIs
  - Creator earnings hooks

### ✅ Uniswap V4

- **Used for:** Trading creator coins with custom liquidity hooks.
- **Where:** 
  - `contracts/UniswapV4Hook.sol`
  - `src/hooks/uniswap.ts`
- **Features Used:**
  - Custom hooks for fee control, creator reward splits
  - Time-based liquidity incentives
  - Hook contracts that reward creators on each swap

---

## ⚙️ Features

- 🎨 **Launch Your Own Coin**  
  Creators can mint their own tokenized coins using Zora Protocol.

- 🔄 **Uniswap V4 Liquidity Pools**  
  Coins are tradable using advanced Uniswap v4 hooks that route fees back to creators.

- 📊 **Creator Analytics Dashboard**  
  Track stats like volume, number of supporters, and liquidity.

- 🧳 **Supporter Portfolio**  
  View your holdings, earnings, and transaction history.

- 🌍 **Deploy on Base**  
  Creator coins live on the fast and low-cost Base L2 network.

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash

# 1. Clone the repository
git clone https://github.com/rohithr8484/Zora-Rohith-2.git

# 2. Navigate into the project directory
cd Zora-Rohith-2

# 3. Install dependencies
npm install
# or, if you prefer yarn:
# yarn install

# 4. Run the development server
npm run dev
# or
# yarn dev

