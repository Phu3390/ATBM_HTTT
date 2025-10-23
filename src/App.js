import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import CapBang from "./page/CAP_BANG";
import TEST from "./page/TEST";
import TraCuuBang from "./page/TRACUUBANG";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { useState,useEffect } from "react";
import { BrowserProvider } from "ethers";
function App() {
  const [account, setAccount] = useState(null); // lưu địa chỉ ví

  // 🦊 Kết nối MetaMask
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("Vui lòng cài đặt MetaMask!");
        return;
      }

      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
    } catch (error) {
      console.error(error);
      alert("Kết nối ví thất bại!");
    }
  };

  // ❌ Ngắt kết nối ví
  const disconnectWallet = () => {
    setAccount(null);
  };
   useEffect(() => {
    if (!window.ethereum) return;

    // Khi user đổi ví
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length === 0) {
        console.log("User disconnected wallet ❌");
        setAccount(null); // => ẩn sidebar, logout
      } else {
        console.log("Wallet changed:", accounts[0]);
        setAccount(accounts[0]); // cập nhật ví mới
      }
    });

    // Khi user đổi network (chuỗi mạng)
    window.ethereum.on("chainChanged", (chainId) => {
      console.log("Chain changed:", chainId);
      window.location.reload(); // reload app cho chắc
    });

    // Dọn dẹp event khi component unmount
    return () => {
      window.ethereum.removeAllListeners("accountsChanged");
      window.ethereum.removeAllListeners("chainChanged");
    };
  }, []);

  return (
    <>{ account ? (
    
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <div className="content">
        <h2>Xin chào 🎉</h2>
        <p>Ví của bạn: <b>{account}</b></p>
        <button
              onClick={disconnectWallet}
              style={{
                background: "#e74c3c",
                color: "white",
                padding: "8px 16px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Ngắt kết nối
            </button>
          <Routes>
            <Route path="/" element={<h2>Trang chính</h2>}/>
            <Route path="/capbang" element={<CapBang />}/>
            <Route path="/kiemtra" element={<TEST />}/>
            <Route path="/TraCuuBang" element={<TraCuuBang />}/> 
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </div>
    </BrowserRouter>
  ) : (
        // ======= GIAO DIỆN KHI CHƯA ĐĂNG NHẬP =======
        <div
          style={{
            textAlign: "center",
            marginTop: "150px",
            background: "#f5f5f5",
            padding: "40px",
            borderRadius: "12px",
            width: "400px",
            margin: "100px auto",
          }}
        >
          <h2>🦊 Kết nối ví MetaMask</h2>
          <p>Vui lòng kết nối ví của bạn để tiếp tục.</p>
          <button
            onClick={connectWallet}
            style={{
              padding: "10px 20px",
              background: "#ff8f00",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Connect Wallet
          </button>
        </div>
      )}
    </>
  );
}

export default App;
