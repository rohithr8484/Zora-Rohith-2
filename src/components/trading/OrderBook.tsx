import React from 'react';

export function OrderBook() {
  const bids = [
    { price: 0.0449, amount: 1200, total: 1200 },
    { price: 0.0448, amount: 850, total: 2050 },
    { price: 0.0447, amount: 950, total: 3000 },
    { price: 0.0446, amount: 1100, total: 4100 },
  ];

  const asks = [
    { price: 0.0451, amount: 800, total: 800 },
    { price: 0.0452, amount: 950, total: 1750 },
    { price: 0.0453, amount: 1050, total: 2800 },
    { price: 0.0454, amount: 900, total: 3700 },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Order Book</h3>
      <div className="grid grid-cols-2 gap-4">
        {/* Bids */}
        <div>
          <div className="text-sm text-green-400 font-medium mb-2">Bids</div>
          <div className="space-y-1">
            {bids.map((bid, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 text-xs">
                <span className="text-green-400">{bid.price.toFixed(4)}</span>
                <span className="text-slate-300">{bid.amount}</span>
                <span className="text-slate-400">{bid.total}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Asks */}
        <div>
          <div className="text-sm text-red-400 font-medium mb-2">Asks</div>
          <div className="space-y-1">
            {asks.map((ask, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 text-xs">
                <span className="text-red-400">{ask.price.toFixed(4)}</span>
                <span className="text-slate-300">{ask.amount}</span>
                <span className="text-slate-400">{ask.total}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}