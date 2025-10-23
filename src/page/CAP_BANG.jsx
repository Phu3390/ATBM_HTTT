import React, { useRef, useState } from "react";
import { ethers, keccak256  } from "ethers";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/CAP_BANG.css";
import abi from "../ether_testnet/abi.js"; // sửa đường dẫn / kiểu export nếu cần

export default function CapBang() {
  const fileInputRef = useRef(null);
  const [file,setFile] = useState(null);
  // Mã bằng
  const [maBang, setMaBang] = useState("");
  // Thông tin cá nhân
  const [hoTen, setHoTen] = useState("");
  const [gioiTinh, setGioiTinh] = useState("");
  const [ngaySinh, setNgaySinh] = useState("");

  // Thông tin bằng
  const [tenTruong, setTenTruong] = useState("");
  const [loaiBang, setLoaiBang] = useState("");
  const [nganhHoc, setNganhHoc] = useState("");
  const [xepLoai, setXepLoai] = useState("");
  const [ngayCap, setNgayCap] = useState("");
  const [noiCap, setNoiCap] = useState("");
  const [nguoiKy, setNguoiKy] = useState("");
  const [soHieuVanBang, setSoHieuVanBang] = useState("");
  const [maHashTapTin, setMaHashTapTin] = useState(""); // bytes32 hoặc string tùy contract
  const [maIPFS, setMaIPFS] = useState("");

  const [loading, setLoading] = useState(false);

  // Validate form cơ bản
  const validate = () => {
    if(!maBang.trim()) return "Mã bằng không được để trống";  
    if (!hoTen.trim()) return "Họ tên không được để trống";
    if (!gioiTinh.trim()) return "Giới tính không được để trống";
    if (!ngaySinh.trim()) return "Ngày sinh không được để trống";
    if (!tenTruong.trim()) return "Tên trường không được để trống";
    if (!loaiBang.trim()) return "Loại bằng không được để trống";
    if (!nganhHoc.trim()) return "Ngành học không được để trống";
    if (!xepLoai.trim()) return "Xếp loại không được để trống";
    if (!ngayCap.trim()) return "Ngày cấp không được để trống";
    if (!nguoiKy.trim()) return "Người ký không được để trống";
    if (!soHieuVanBang.trim()) return "Số hiệu văn bằng không được để trống";
    if (!file) return "Vui lòng chọn file bằng tốt nghiệp";
    if (!maHashTapTin.trim()) return "vui lòng chờ mã hash file được tạo";
    if(!maIPFS.trim()) return "vui lòng chờ mã IPFS được tạo";
    // maHashTapTin, maIPFS có thể optional tùy bạn
    return null;
  };

  const resetForm = () => {
    setMaBang("");
    setHoTen("");
    setGioiTinh("");
    setNgaySinh("");
    setTenTruong("");
    setLoaiBang("");
    setNganhHoc("");
    setXepLoai("");
    setNgayCap("");
    setNoiCap("");
    setNguoiKy("");
    setSoHieuVanBang("");
    setMaHashTapTin("");
    setMaIPFS("");
    fileInputRef.current.value = "";
    setFile(null);
  };

  const resetFormFIle = () => {
    setMaHashTapTin("");
    setMaIPFS("");
    fileInputRef.current.value = "";
    setFile(null);
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
      resetFormFIle();
      return;
    }
    setFile(_file);
    const hash = await hashFile(_file);
    setMaHashTapTin(hash);
    const ipfs = await uploadToIPFS(_file);
    setMaIPFS(ipfs);
    
    console.log("✅ Mã IPFS của file:", maIPFS);
};

  const JWT = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlZDM2MjdlZi1jZjEyLTQyNzctOWQxZC0xMzRlYjJhZDNhNmQiLCJlbWFpbCI6InRyYW5taW5ocGh1MjkwOHF0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIzZmNlYWQ2ZDk2NGY3Njg2NmQ5NCIsInNjb3BlZEtleVNlY3JldCI6IjY2ZTViN2VjOWE0Yjc5NTY1OWYyOGM4OGU2MjBhNjExNzhhZWJmNjQzMWEwNjZhMmZkYTUzYjBmMjM0MDY3N2MiLCJleHAiOjE3OTIyNDE2NjN9.xTi0fnG-ffMih-kUeCgRl0Ay7zC738dryUJiFvu6xYI";
  async function uploadToIPFS(file) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": "multipart/form-data",
          Authorization: JWT,

      },
  });

  console.log("✅ IPFS CID:", res.data.IpfsHash);
  return res.data.IpfsHash; // => "QmExampleHash..."
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      toast.warning(err);
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
      const tx = await contract.connect(signer).capBang(
        maBang,
        [hoTen,
        gioiTinh,
        ngaySinh],
        [tenTruong,
        loaiBang,
        nganhHoc,
        xepLoai,
        ngayCap,
        noiCap,
        nguoiKy,
        soHieuVanBang,
        maHashTapTin,
        maIPFS]
      );

      toast.info("Đang gửi giao dịch... Vui lòng chờ xác nhận", { autoClose: 4000 });

      // chờ tx mined (tùy bạn có muốn chờ hay không)
      const receipt = await tx.wait();
      console.log("Receipt:", receipt);

      toast.success("Cấp bằng thành công!");
      resetForm();
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
      <h2 className="capbang-title">CẤP VĂN BẰNG</h2>

      <form className="capbang-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Mã Bằng</label>
          <input value={maBang} onChange={(e) => setMaBang(e.target.value)} placeholder="Ví dụ: PH123" />
        </div>
        <div className="form-row">
          <label>Họ và tên</label>
          <input value={hoTen} onChange={(e) => setHoTen(e.target.value)} placeholder="Ví dụ: Tran Minh Phu" />
        </div>

        <div className="form-grid">
          <div className="form-row">
            <label>Giới tính</label>
            <input value={gioiTinh} onChange={(e) => setGioiTinh(e.target.value)} placeholder="Nam / Nữ" />
          </div>
          <div className="form-row">
            <label>Ngày sinh</label>
            <input value={ngaySinh} onChange={(e) => setNgaySinh(e.target.value)} placeholder="DD/MM/YYYY" />
          </div>
        </div>

        <hr className="divider" />

        <h3 className="section-title">Thông tin bằng cấp</h3>

        <div className="form-row">
          <label>Tên trường</label>
          <input value={tenTruong} onChange={(e) => setTenTruong(e.target.value)} placeholder="Ví dụ: SGU" />
        </div>

        <div className="form-grid">
          <div className="form-row">
            <label>Loại bằng</label>
            <input value={loaiBang} onChange={(e) => setLoaiBang(e.target.value)} placeholder="KYSU" />
          </div>
          <div className="form-row">
            <label>Xếp loại</label>
            <input value={xepLoai} onChange={(e) => setXepLoai(e.target.value)} placeholder="KHA / TOT / TRUNG BINH" />
          </div>
        </div>

        <div className="form-row">
          <label>Ngành học</label>
          <input value={nganhHoc} onChange={(e) => setNganhHoc(e.target.value)} placeholder="Ví dụ: CNNTT" />
        </div>

        <div className="form-grid">
          <div className="form-row">
            <label>Ngày cấp</label>
            <input value={ngayCap} onChange={(e) => setNgayCap(e.target.value)} placeholder="DD/MM/YYYY" />
          </div>
          <div className="form-row">
            <label>Nơi cấp</label>
            <input value={noiCap} onChange={(e) => setNoiCap(e.target.value)} placeholder="TP. HCM" />
          </div>
        </div>

        <div className="form-row">
          <label>Người ký</label>
          <input value={nguoiKy} onChange={(e) => setNguoiKy(e.target.value)} placeholder="Ví dụ: HIEUTRUONG" />
        </div>

        <div className="form-grid">
          <div className="form-row">
            <label>Số hiệu văn bằng</label>
            <input value={soHieuVanBang} onChange={(e) => setSoHieuVanBang(e.target.value)} placeholder="DCT1221" />
          </div>
          {/* <div className="form-row">
            <label>Mã hash (bytes32)</label>
            <input value={maHashTapTin} onChange={(e) => setMaHashTapTin(e.target.value)} placeholder="0x..." />
          </div> */}
        </div>

        {/* <div className="form-row">
          <label>Mã IPFS</label>
          <input value={maIPFS} onChange={(e) => setMaIPFS(e.target.value)} placeholder="Qm..." />
        </div> */}

        <div className="form-group">
          <label>Chọn file bằng tốt nghiệp (PDF, PNG...):</label>
          <input type="file" ref={fileInputRef} onChange={handleFile} accept=".pdf,.png,.jpg,.jpeg" />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Đang gửi..." : "Cấp bằng"}
          </button>
          <button
            type="button"
            className="btn-reset"
            onClick={resetForm}
            disabled={loading}
          >
            Làm mới
          </button>
        </div>
      </form>
    </div>
  );
}