import { APIHandler } from "@/lib/APIHandler";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { donVi, heDaoTao, nganhDaoTao } from "@/lib/constants";
import GPAChart from "./components/GPAChart";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default async function HomePage() {
	const token = (await cookies()).get("accessToken")?.value;
	const refreshToken = (await cookies()).get("refreshToken")?.value;
	if (!token) {
		redirect("/login");
	}

	const apiHandler = new APIHandler(token, refreshToken);

	const tongket = (await apiHandler.getTongKetDenHienTai())[0];
	const svInfo = await apiHandler.getInfoSinhVien();
	const classData = (await apiHandler.getDataLopDaoTao(
		svInfo.idLopDaoTao,
		svInfo.guidDonVi,
		svInfo.idBacDaoTao,
		svInfo.idHeDaoTao,
		svInfo.idNganhDaoTao,
		svInfo.idNienKhoaDaoTao,
		svInfo.idChuongTrinhDaoTao
	))[0];

	const danhSachHocKy = await apiHandler.getDanhSachHocKyTheoDiem();
	const gpaTongKet = [];

	for (const hocKy of danhSachHocKy) {
		const tongket = (await apiHandler.getDiemTrungBinhHocKy(hocKy.id))[0];
		gpaTongKet.push({
			id: hocKy.id,
			tenHocKy: `Học kỳ ${hocKy.ten} năm học ${hocKy.nam}`,
			tongket: Number.parseFloat(tongket.diemTrungBinhHe4_HocKy),
			tichluy: Number.parseFloat(tongket.diemTrungBinhHe4_TichLuyDenHocKyHienTai)
		});
	}
	gpaTongKet.sort((a, b) => Number(a.id) - Number(b.id));

	return (
		<div className="w-full space-y-4 mr-2 mt-2.25 mb-2.25">
			<Card className="gap-3">
				<CardHeader className="text-xl font-bold">Thông tin người học</CardHeader>
				<CardContent className="space-y-1">
					<div><span className="font-bold">Họ tên:</span> {svInfo.hoVaTen}</div>
					<div><span className="font-bold">Đơn vị:</span> {donVi.find((dv) => dv.guid === svInfo.guidDonVi)!.tenDonVi}</div>
					<div><span className="font-bold">Ngành học:</span> {nganhDaoTao.find((ndt) => ndt.id === svInfo.idNganhDaoTao && ndt.guidDonVi === svInfo.guidDonVi)!.ten}</div>
					<div><span className="font-bold">Lớp khóa học:</span> {classData.ten} ({classData.tenVietTat})</div>
				</CardContent>
			</Card>
			<Card className="bg-primary text-white font-semibold p-1.5 border-0">
				<CardContent className="flex items-center justify-center space-x-20">
					<div>Số kỳ đã học: {tongket.soKyDaHoc}</div>
					<Separator orientation="vertical" className="min-h-10" />
					<div>Điểm trung bình tích lũy: {tongket.diemTrungBinhHe4TichLuy}</div>
					<Separator orientation="vertical" className="min-h-10"/>
					<div>Tín chỉ tích lũy: {tongket.tongSoTinChiTichLuy}</div>
				</CardContent>
			</Card>
			<GPAChart data={gpaTongKet} />
		</div>
	);
}