import { APIHandler } from "@/lib/APIHandler";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomePage() {
	const token = (await cookies()).get("accessToken")?.value;
	const refreshToken = (await cookies()).get("refreshToken")?.value;
	if (!token) {
		redirect("/login");
	}

	const apiHandler = new APIHandler(token, refreshToken);

	const { soKyDaHoc, diemTrungBinhHe4TichLuy, tongSoTinChiTichLuy } = (await apiHandler.getTongKetDenHienTai())[0];

	return (
		<div>
			<h1>Trang chủ</h1>
			<p>Số kỳ đã học: {soKyDaHoc}</p>
			<p>Điểm trung bình hệ 4 tích lũy: {diemTrungBinhHe4TichLuy}</p>
			<p>Tổng số tín chỉ tích lũy: {tongSoTinChiTichLuy}</p>
		</div>
	);
}