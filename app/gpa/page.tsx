import { APIHandler } from "@/lib/APIHandler";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Fragment } from "react";

export default async function SchedulePage() {
	const token = (await cookies()).get("accessToken")?.value;
	const refreshToken = (await cookies()).get("refreshToken")?.value;
	if (!token) {
		redirect("/login");
	}
	
	const apiHandler = new APIHandler(token, refreshToken);
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
		<div>
			<h1>Kết quả học tập</h1>
			<p>Tổng kết học tập đến hiện tại: {gpaTongKet[gpaTongKet.length - 1].tongket.diemTrungBinhHe4_TichLuyDenHocKyHienTai}</p>
			<p>Tổng số tín chỉ đã tích lũy: {gpaTongKet[gpaTongKet.length - 1].tongket.tongSoTinChiTichLuy_TichLuyDenHocKyHienTai}</p>
			<h1>Chi tiết kết quả học tập</h1>
			<table border={1} style={{ borderCollapse: "collapse" }}>
				<thead>
					<tr>
						<th>Mã học phần</th>
						<th>Tên môn học</th>
						<th>Số tín chỉ</th>
						<th>Điểm hệ 10</th>
						<th>Điểm hệ 4</th>
						<th>Điểm chữ</th>
					</tr>
				</thead>
				<tbody>
					{gpaTongKet.map((hocKy) => (
						<Fragment key={hocKy.id}>
							<tr key={hocKy.id}>
								<td colSpan={6} style={{ backgroundColor: "#f0f0f0", fontWeight: "bold" }}>{hocKy.tenHocKy}</td>
							</tr>
							{hocKy.diemHocKy.map((monHoc) => (
								<tr key={monHoc.idHocPhan}>
									<td>{monHoc.maHocPhan}</td>
									<td>{monHoc.tenHocPhan}</td>
									<td>{monHoc.soTinChi}</td>
									<td>{monHoc.diemHe10}</td>
									<td>{monHoc.diemHe4}</td>
									<td>{monHoc.diemHeChu}</td>
								</tr>
							))}
							<tr key={hocKy.id + "-tongket"}>
								<p>
									Điểm hệ 10: {hocKy.tongket.diemTrungBinhHe10_HocKy}
									<br />
									Điểm hệ 4: {hocKy.tongket.diemTrungBinhHe4_HocKy}
									<br />
									Tín chỉ tích lũy: {hocKy.tongket.tongSoTinChiTichLuy_HocKy}
									<br />
									Tín chỉ trượt: {hocKy.tongket.tongSoTinChiTruot_HocKy}
								</p>
							</tr>
						</Fragment>
					))}
				</tbody>
			</table>
		</div>
	);
}