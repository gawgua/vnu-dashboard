import { 
	Card, 
	CardContent 
} from "@/components/ui/card";
import { 
	Table, 
	TableBody, 
	TableCell, 
	TableHead, 
	TableHeader, 
	TableRow 
} from "@/components/ui/table";
import { Fragment } from "react";
import { APIHandler } from "@/lib/APIHandler";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DesireGPACal from "./components/DesireGPACal";
import SubjectRow from "./components/SubjectRow";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Điểm"
}

export default async function GPAPage() {
	const token = (await cookies()).get("accessToken")?.value;
	const refreshToken = (await cookies()).get("refreshToken")?.value;
	if (!token) {
		redirect("/login");
	}
	
	const apiHandler = new APIHandler(token, refreshToken);
	const { diemTrungBinhHe4TichLuy, tongSoTinChiTichLuy } = (await apiHandler.getTongKetDenHienTai())[0];
	const danhSachHocKy = await apiHandler.getDanhSachHocKyTheoDiem();
	const gpaTongKet = [];

	for (const hocKy of danhSachHocKy) {
		const tongket = (await apiHandler.getDiemTrungBinhHocKy(hocKy.id))[0];
		const diemHocKy = await apiHandler.getDiemThiHocKy(hocKy.id);
		gpaTongKet.push({
			id: hocKy.id,
			tenHocKy: `Học kỳ ${hocKy.ten} năm học ${hocKy.nam}`,
			tongket,
			diemHocKy
		});
	}
	gpaTongKet.sort((a, b) => Number(a.id) - Number(b.id));
	
	return (
		<div className="w-full space-y-4 mr-2 mt-2.25 mb-2.25">
			<DesireGPACal credit={Number.parseInt(tongSoTinChiTichLuy)} gpa={Number.parseFloat(diemTrungBinhHe4TichLuy)}/>
			<Card>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow className="bg-gray-500/40 hover:bg-gray-500/40">
								<TableHead>Mã học phần</TableHead>
								<TableHead>Tên môn học</TableHead>
								<TableHead>Số tín chỉ</TableHead>
								<TableHead>Điểm hệ 10</TableHead>
								<TableHead>Điểm hệ 4</TableHead>
								<TableHead>Điểm hệ chữ</TableHead>
							</TableRow>
						</TableHeader>
						{gpaTongKet.map((hocKy) => (
						<Fragment key={hocKy.id}>
							<TableHeader>
								<TableRow className="bg-gray-500/20 hover:bg-gray-500/20">
									<TableHead colSpan={6}>{hocKy.tenHocKy}</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{hocKy.diemHocKy.map((monHoc) => (
									<SubjectRow 
										key={monHoc.maHocPhan}
										monHoc={monHoc}
										hocKyId={hocKy.id}
									/>
								))}
								<TableRow className="border-b-0">
									<TableCell colSpan={3}>Điểm trung bình học kỳ</TableCell>
									<TableCell>{hocKy.tongket.diemTrungBinhHe10_HocKy}</TableCell>
									<TableCell colSpan={2}>{hocKy.tongket.diemTrungBinhHe4_HocKy}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell colSpan={2}>Tổng số tín chỉ tích lũy: {hocKy.tongket.tongSoTinChiTichLuy_HocKy}</TableCell>
									<TableCell colSpan={4}>Tổng số tín chỉ trượt: {hocKy.tongket.tongSoTinChiTruot_HocKy}</TableCell>
								</TableRow>
							</TableBody>
						</Fragment>
						))}
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}