import { SubjectScore } from "./SubjectTypes";

export interface SigninResponse {
	accessToken: string;
	refreshToken: string;
}

export interface SinhVienResponse {
	// This is shortened what necessary for the context
    maSinhVien: string;
    hoVaTen: string;
    gioiTinh: string;
    guidDonVi: string;
    idBacDaoTao: string;
    idChuongTrinhDaoTao: string;
    idHeDaoTao: string;
    idLopDaoTao: string;
    idNganhDaoTao: string;
    idNienKhoaDaoTao: string;
}

export interface LopDaoTaoResponse {
    id: string;
    ten: string;
	guidDonVi: string | null;
    idBacDaoTao: string;
    idChuongTrinhDaoTao: string;
    idHeDaoTao: string;
    idNganhDaoTao: string;
    idNienKhoaDaoTao: string;
    kieuLopDaoTao: string | null;
    tenVietTat: string;
}
export interface DanhSachHocKyResponse {
	id: string;
	ten: string;
	nam: string;
}

export interface ThoiKhoaBieuResponse {
	tenHocPhan: string;
	soTinChi: string;
	maHocPhan: string;
	nhom: string;
	tietBatDau: string;
	tietKetThuc: string;
	ngayTrongTuan: string;
	diaChi: string;
	tenPhong: string;
	giangVien1: string;
	giangVien2: string;
	giangVien3: string | null;
	giangVien4: string | null;
}

export interface LichThiResponse {
	idLichThi: string;
	tenHocPhan: string;
	maHocPhan: string;
	soTinChi: string;
	maLichThi: string;
	phongThi: string;
	diaChi: string;
	hinhThucThi: string;
	ngayThi: null | string;
	gioBatDauThi: null | string;
	caThi: null | string;
	thoiLuong: null;
}

export interface DiemThiHocKyResponse {
    idHocPhan: string;
    tenHocPhan: string;
    maHocPhan: string;
    soTinChi: string;
    diemHe10: string;
    diemHeChu: SubjectScore;
    diemHe4: string;
    ketQua: string;
    idHocKy: string;
}

export interface DiemHocPhanResponse {
	trongSo: string;
	diemHe10: string;
	loaiDiemHocPhan: string;
}

export interface DiemTrungBinhHocKyResponse {
    diemTrungBinhHe4_HocKy: string;
    diemTrungBinhHe4_TichLuyDenHocKyHienTai: string;
    diemTrungBinhHe10_HocKy: string;
    diemTrungBinhHe10_TichLuyDenHocKyHienTai: string;
    tongSoTinChiTichLuy_HocKy: string;
    tongSoTinChiTichLuy_TichLuyDenHocKyHienTai: string;
    tongSoTinChiTruot_HocKy: string;
    tongSoTinChiTruot_TichLuyDenHocKyHienTai: string;
}

export interface TongKetResponse {
    soKyDaHoc: number;
    diemTrungBinhHe4TichLuy: string;
    tongSoTinChiTichLuy: string;
}
