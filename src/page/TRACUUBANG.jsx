import React, { useState,useEffect  } from "react";
import { ethers } from "ethers";
import "../style/TRACUUBANG.css";
import { toast } from 'react-toastify';
import abi from "../ether_testnet/abi.js";
const TraCuuBang = () => {
  const [maBang, setMaBang] = useState("");
  const [loading, setLoading] = useState(false);
  const [thongTinCaNhan, setThongTinCaNhan] = useState(null);
  const [thongTinBang, setThongTinBang] = useState(null);
  const [error, setError] = useState("");

  const handleTraCuu = async () => {
    try {
      setLoading(true);
      setError("");
      setThongTinCaNhan(null);
      setThongTinBang(null);

      if (!window.ethereum) {
        setError("Vui lòng cài đặt MetaMask trước khi tra cứu!");
        setLoading(false);
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contractAddress = "0x7b386804092fd43A10818A5D4bEC20f9814140f8"; // ⚠️ thay địa chỉ smart contract của bạn
      const contract = new ethers.Contract(contractAddress, abi, signer);

      // Gọi hàm trên Smart Contract
      const data = await contract.danhSachBang(maBang);
      console.log("Dữ liệu từ blockchain:", data[0]);
      // Giả sử contract trả về: [hoTen, gioiTinh, ngaySinh, tenTruong, loaiBang, ...]

      
      
      const [
        hoTen,
        gioiTinh,
        ngaySinh,
      ] = data[0];

      const [
        tenTruong,
        loaiBang,
        nganhHoc,
        xepLoai,
        ngayCap,
        noiCap,
        nguoiKy,
        soHieuVanBang,
        maHashTapTin,
        maIPFS
      ] = data[1];
      if (hoTen === "" || gioiTinh==="" || ngaySinh==="") {
        toast.error("Không tìm thấy mã văn bằng!");
        setLoading(false);
        return;
      }

      toast.success("Tra cứu thành công!");
      setThongTinCaNhan({ hoTen, gioiTinh, ngaySinh });
      setThongTinBang({
        tenTruong,
        loaiBang,
        nganhHoc,
        xepLoai,
        ngayCap,
        noiCap,
        nguoiKy,
        soHieuVanBang,
        maHashTapTin,
        maIPFS,
      });
    } catch (err) {
      console.error(err);
      setError("Không tìm thấy thông tin văn bằng hoặc có lỗi xảy ra.");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    
  }, []);

  return (
    <div className="tra-cuu-container">
      <h2 className="title">TRA CỨU VĂN BẰNG</h2>

      <div className="form-container">
        <input
          type="text"
          placeholder="Nhập mã bằng..."
          value={maBang}
          onChange={(e) => setMaBang(e.target.value)}
          className="input-field"
        />
        <button onClick={handleTraCuu} disabled={loading || !maBang} className="btn">
          {loading ? "Đang tra cứu..." : "Tra cứu"}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {thongTinCaNhan && thongTinBang && (
        <div className="result-container">
          <h3>🧍 Thông tin cá nhân</h3>
          <div className="info-grid">
            <div><strong>Họ tên:</strong> {thongTinCaNhan.hoTen}</div>
            <div><strong>Giới tính:</strong> {thongTinCaNhan.gioiTinh}</div>
            <div><strong>Ngày sinh:</strong> {thongTinCaNhan.ngaySinh}</div>
          </div>

          <h3>🎓 Thông tin bằng cấp</h3>
          <div className="info-grid">
            <div><strong>Tên trường:</strong> {thongTinBang.tenTruong}</div>
            <div><strong>Loại bằng:</strong> {thongTinBang.loaiBang}</div>
            <div><strong>Ngành học:</strong> {thongTinBang.nganhHoc}</div>
            <div><strong>Xếp loại:</strong> {thongTinBang.xepLoai}</div>
            <div><strong>Ngày cấp:</strong> {thongTinBang.ngayCap}</div>
            <div><strong>Nơi cấp:</strong> {thongTinBang.noiCap}</div>
            <div><strong>Người ký:</strong> {thongTinBang.nguoiKy}</div>
            <div><strong>Số hiệu VB:</strong> {thongTinBang.soHieuVanBang}</div>
            <div><strong>Mã hash:</strong> {thongTinBang.maHashTapTin}</div>
            <div className="info-item full-width">
              <strong>Mã IPFS:</strong>{" "}
              <a href={`https://ipfs.io/ipfs/${thongTinBang.maIPFS}`} target="_blank" rel="noreferrer">
                {thongTinBang.maIPFS}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TraCuuBang;
