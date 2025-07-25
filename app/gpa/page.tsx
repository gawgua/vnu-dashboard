import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Fragment } from "react";
import { APIHandler } from "@/lib/APIHandler";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DiemHocPhanResponse } from "@/types/ResponseTypes";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export default async function GPAPage() {
	const token = (await cookies()).get("accessToken")?.value;
	const refreshToken = (await cookies()).get("refreshToken")?.value;
	if (!token) {
		redirect("/login");
	}
	
	const apiHandler = new APIHandler(token, refreshToken);
	const danhSachHocKy = await apiHandler.getDanhSachHocKyTheoDiem();
	const gpaTongKet = [];
	const subjectDetails: Record<string, DiemHocPhanResponse[]> = {};

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

	for (const hocKy of gpaTongKet) {
		for (const monHoc of hocKy.diemHocKy) {
			const scores = await apiHandler.getDiemHocPhanHocKy(monHoc.idHocPhan, hocKy.id);
			scores.sort((a, b) => Number.parseFloat(a.trongSo) - Number.parseFloat(b.trongSo));
			subjectDetails[monHoc.maHocPhan] = scores;
		}
	}
	
	return (
		<div className="w-full mr-2 mt-2.25 mb-2.25">
			<Card>
				<CardContent>
					<Table>
						<TableHeader className="bg-gray-500/40">
							<TableHead>Mã học phần</TableHead>
							<TableHead>Tên môn học</TableHead>
							<TableHead>Số tín chỉ</TableHead>
							<TableHead>Điểm hệ 10</TableHead>
							<TableHead>Điểm hệ 4</TableHead>
							<TableHead>Điểm hệ chữ</TableHead>
						</TableHeader>
						{gpaTongKet.map((hocKy) => (
						<Fragment key={hocKy.id}>
							<TableHeader className="bg-gray-500/20">
								<TableHead colSpan={6}>{hocKy.tenHocKy}</TableHead>
							</TableHeader>
							<TableBody>
								{hocKy.diemHocKy.map((monHoc) => (
								<Dialog key={monHoc.maHocPhan}>
									<Tooltip delayDuration={700}>
										<TooltipTrigger asChild>
											<DialogTrigger asChild>
												<TableRow className="cursor-pointer">
													<TableCell>{monHoc.maHocPhan}</TableCell>
													<TableCell>{monHoc.tenHocPhan}</TableCell>
													<TableCell>{monHoc.soTinChi}</TableCell>
													<TableCell>{monHoc.diemHe10}</TableCell>
													<TableCell>{monHoc.diemHe4}</TableCell>
													<TableCell>{monHoc.diemHeChu}</TableCell>
												</TableRow>
											</DialogTrigger>
										</TooltipTrigger>
										<TooltipContent>
											Ấn để xem chi tiết
										</TooltipContent>
									</Tooltip>
									<DialogContent>
										<DialogTitle>Điểm chi tiết</DialogTitle>
										{subjectDetails[monHoc.maHocPhan].map((detail) => (
											<div key={`${monHoc.maHocPhan}-detail`}>
												<p><strong>{detail.loaiDiemHocPhan}:</strong> {detail.diemHe10}</p>
											</div>
										))}
									</DialogContent>
								</Dialog>
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