import React, { createContext, useState } from 'react';

export const MarketContext = createContext();

export const MarketProvider = ({ children }) => {
  const [selectedMarket, setSelectedMarket] = useState(null);

  const setMarket = (marketName) => {
    setSelectedMarket(marketName);
    console.log(marketName);
    window.sessionStorage.setItem('market', marketName);
    console.log(window.sessionStorage.getItem('market'));
  };

  const value = {
    selectedMarket,
    setMarket
  }

  return (
    <MarketContext.Provider value={value}>
      {children}
    </MarketContext.Provider>
  );
};
