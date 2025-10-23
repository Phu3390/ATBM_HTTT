const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "maBang",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "nguoiCap",
				"type": "address"
			}
		],
		"name": "BangDuocCap",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "maBang",
				"type": "string"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "hoTen",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "gioiTinh",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "ngaySinh",
						"type": "string"
					}
				],
				"internalType": "struct QuanLyBangDaiHoc.ThongTinCaNhan",
				"name": "caNhan",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "tenTruong",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "loaiBang",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "nganhHoc",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "xepLoai",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "ngayCap",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "noiCap",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "nguoiKy",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "soHieuVanBang",
						"type": "string"
					},
					{
						"internalType": "bytes32",
						"name": "maHashTapTin",
						"type": "bytes32"
					},
					{
						"internalType": "string",
						"name": "maIPFS",
						"type": "string"
					}
				],
				"internalType": "struct QuanLyBangDaiHoc.ThongTinBang",
				"name": "bang",
				"type": "tuple"
			}
		],
		"name": "capBang",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "danhSachBang",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "hoTen",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "gioiTinh",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "ngaySinh",
						"type": "string"
					}
				],
				"internalType": "struct QuanLyBangDaiHoc.ThongTinCaNhan",
				"name": "caNhan",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "tenTruong",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "loaiBang",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "nganhHoc",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "xepLoai",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "ngayCap",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "noiCap",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "nguoiKy",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "soHieuVanBang",
						"type": "string"
					},
					{
						"internalType": "bytes32",
						"name": "maHashTapTin",
						"type": "bytes32"
					},
					{
						"internalType": "string",
						"name": "maIPFS",
						"type": "string"
					}
				],
				"internalType": "struct QuanLyBangDaiHoc.ThongTinBang",
				"name": "bang",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "layTatCaMaBang",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tatCaMaBang",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "maBang",
				"type": "string"
			},
			{
				"internalType": "bytes32",
				"name": "maHash",
				"type": "bytes32"
			}
		],
		"name": "xacMinhBang",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
export default abi;