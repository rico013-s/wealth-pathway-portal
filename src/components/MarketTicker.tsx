import React, { useEffect, useRef } from 'react';

const MarketTicker: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear any existing content
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
        { proName: "FOREXCOM:NSXUSD", title: "US 100" },
        { proName: "FX_IDC:EURUSD", title: "EUR/USD" },
        { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
        { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
        { proName: "COMEX:GC1!", title: "Gold" },
        { proName: "NYMEX:CL1!", title: "Crude Oil" },
        { proName: "FX_IDC:GBPUSD", title: "GBP/USD" },
        { proName: "TVC:DXY", title: "US Dollar Index" },
        { proName: "NASDAQ:AAPL", title: "Apple" },
        { proName: "NASDAQ:TSLA", title: "Tesla" },
        { proName: "NASDAQ:NVDA", title: "NVIDIA" }
      ],
      showSymbolLogo: true,
      isTransparent: false,
      displayMode: "adaptive",
      colorTheme: "dark",
      locale: "ro"
    });

    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'tradingview-widget-container__widget';
    
    containerRef.current.appendChild(widgetContainer);
    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-800">
      <div 
        ref={containerRef} 
        className="tradingview-widget-container"
        style={{ height: '46px' }}
      />
    </div>
  );
};

export default MarketTicker;
