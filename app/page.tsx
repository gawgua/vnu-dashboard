import { APIHandler } from "@/lib/APIHandler";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image, { StaticImageData } from "next/image";
import { donVi, nganhDaoTao } from "@/lib/constants";
import GPAChart from "./components/GPAChart";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import HSB from "@/public/hsb.png";
import HUS from "@/public/hus.png";
import IS from "@/public/is.png";
import SIS from "@/public/sis.png";
import UEB from "@/public/ueb.png";
import UEd from "@/public/ued.png";
import UET from "@/public/uet.png";
import UL from "@/public/ul.png";
import ULIS from "@/public/ulis.png";
import UMP from "@/public/ump.png";
import USSH from "@/public/ussh.png";
import VJU from "@/public/vju.png";

const donViLogo: Record<string, StaticImageData> = {
	"1852a7e7-76b1-45ee-b04a-917179316777": SIS,
	"1201964a-3805-4e20-9827-4acff1b3eaf5": VJU,
	"ad4dfd9d-98d2-49c2-8a86-fdfcc2c5f1ea": UMP,
	"6dcfe8c0-67df-4496-a724-98427f0dd131": HSB,
	"9931d594-52fa-41d0-b029-ba8a6208fcb7": UL,
	"2a1ac6ac-0592-411d-ad25-3bae99f96480": IS,
	"83bfa49f-d454-43c2-9e05-7541e1dfd12b": UEd,
	"13cab74f-2162-4fe4-ad9b-f378fc3e15d5": UEB,
	"9457b76b-8472-41b3-a67f-8fd66fa2e3e1": UET,
	"3afe52a1-dcd5-45e3-b607-9efcb8d56289": ULIS,
	"6f27667c-1b50-4a23-895b-ab491c743340": USSH,
	"f88a778b-0a4d-4a3b-a8fa-d94a6b5ce6f8": HUS
}

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
				<CardContent className="flex items-start justify-between">
					<div className="space-y-1 flex-grow">
						<div><span className="font-bold">Họ tên:</span> {svInfo.hoVaTen}</div>
						<div><span className="font-bold">Đơn vị:</span> {donVi.find((dv) => dv.guid === svInfo.guidDonVi)!.tenDonVi}</div>
						<div><span className="font-bold">Ngành học:</span> {nganhDaoTao.find((ndt) => ndt.id === svInfo.idNganhDaoTao && ndt.guidDonVi === svInfo.guidDonVi)!.ten}</div>
						<div>
							<span className="font-bold">Lớp khóa học: </span> 
							{classData.ten} {classData.ten != classData.tenVietTat && <>({classData.tenVietTat})</>}
						</div>
					</div>
					<Image src={donViLogo[svInfo.guidDonVi]} width={110} height={110} alt="Logo" className="flex-shrink-0"/>
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