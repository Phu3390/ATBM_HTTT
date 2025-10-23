import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import React from "react";
import { ethers, keccak256  } from "ethers";
import abi from "../ether_testnet/abi.js";
function TEST() {
  const [maBang, setMaBang] = useState("");
  const [maHashTapTin, setMaHashTapTin] = useState("");
  const fileInputRef = React.useRef(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);


  const validate = () => {
    if (maBang.trim() === "") return "Vui lòng nhập mã bằng!";
    if (!file) return "Vui lòng chọn file bằng tốt nghiệp";
    return null;
  }

    function hashFile(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const arrayBuffer = reader.result;
          const hash = keccak256(new Uint8Array(arrayBuffer));
          resolve(hash);
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
      });
  }
  
   const handleFile = async (e) => {
    const _file = e.target.files[0];
    if(!_file){
      setFile(null);
      return;
    }
    setFile(_file);
    const hash = await hashFile(_file);
    setMaHashTapTin(hash);
  }

   const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      toast.error(err);
      return;
    }

    if (!window.ethereum) {
      toast.error("Vui lòng cài MetaMask hoặc trình provider tương thích!");
      return;
    }

    setLoading(true);
    try {
      // provider + signer (ethers v6 style)
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();

      const contractAddress = "0x7b386804092fd43A10818A5D4bEC20f9814140f8"; // <-- thay bằng địa chỉ contract của bạn
      const contract = new ethers.Contract(contractAddress, abi, signer);

      // Gọi hàm capBang trên contract
      // LƯU Ý: Tham số truyền phải theo đúng thứ tự và kiểu hàm trên contract
      const tx = await contract.connect(signer).xacMinhBang(
        maBang,
        maHashTapTin
      );
      if(tx){
        toast.success("Bằng đã có trên hệ thống blockchain!");
      } else
        toast.error("Bằng chưa có trên hệ thống blockchain!");
    } catch (error) {
      console.error(error);
      // hiển thị thông tin lỗi rõ hơn nếu có revert message
      const message = error?.reason || error?.data?.message || error?.message || "Lỗi khi gọi hợp đồng";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="capbang-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="capbang-title">Kiểm tra Bằng</h2>
      <form className="capbang-form" onSubmit={handleSubmit}>

        <div className="form-row">
          <label>Mã Bằng</label>
          <input value={maBang} onChange={(e) => setMaBang(e.target.value)} placeholder="Ví dụ: PH123" />
        </div>

        <div className="form-group">
          <label>Chọn file bằng tốt nghiệp (PDF, PNG...):</label>
          <input type="file" ref={fileInputRef} onChange={handleFile} accept=".pdf,.png,.jpg,.jpeg" />

          <div className="form-actions">
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Đang gửi..." : "Xác minh Bằng"}
          </button>
          </div>
        </div>
      </form>
      </div>
  );
}

export default TEST;