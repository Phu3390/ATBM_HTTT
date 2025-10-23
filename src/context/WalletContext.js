import React, { createContext, useContext, useState, useEffect } from "react";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(() => {
    return localStorage.getItem("walletAddress") || null;
  });

  // 🧠 Hàm kết nối MetaMask
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Vui lòng cài đặt MetaMask trước!");
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const address = accounts[0];
      setAccount(address);
      localStorage.setItem("walletAddress", address);
      return address;
    } catch (err) {
      console.error("Lỗi kết nối MetaMask:", err);
    }
  };

  // 🔌 Lắng nghe khi người dùng đổi ví
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length === 0) {
          // Ngắt kết nối
          setAccount(null);
          localStorage.removeItem("walletAddress");
        } else {
          setAccount(accounts[0]);
          localStorage.setItem("walletAddress", accounts[0]);
        }
      });
    }
  }, []);

  const disconnectWallet = () => {
    setAccount(null);
    localStorage.removeItem("walletAddress");
  };

  return (
    <WalletContext.Provider value={{ account, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
