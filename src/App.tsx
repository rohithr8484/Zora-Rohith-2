import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { Toaster } from 'react-hot-toast';
import { config } from './config/wagmi';
import { Navbar } from './components/layout/Navbar';
import { HomePage } from './pages/HomePage';
import { TradePage } from './pages/TradePage';
import { CreatePage } from './pages/CreatePage';
import { DiscoverPage } from './pages/DiscoverPage';
import { ZoraPage } from './pages/ZoraPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { AnalyticsPage } from './pages/AnalyticsPage';

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Router>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
              <Navbar />
              <main className="pt-20">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/trade" element={<TradePage />} />
                  <Route path="/create" element={<CreatePage />} />
                  <Route path="/discover" element={<DiscoverPage />} />
                  <Route path="/zora" element={<ZoraPage />} />
                  <Route path="/portfolio" element={<PortfolioPage />} />
                  <Route path="/analytics" element={<AnalyticsPage />} />
                </Routes>
              </main>
              <Toaster 
                position="bottom-right"
                toastOptions={{
                  className: 'bg-slate-800 text-white border border-slate-700',
                }}
              />
            </div>
          </Router>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;