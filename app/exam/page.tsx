import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { APIHandler } from "@/lib/APIHandler";

export default async function ExamPage() {
	const token = (await cookies()).get("accessToken")?.value;
	const refreshToken = (await cookies()).get("refreshToken")?.value;
	if (!token) {
		redirect("/login");
	}
	
	const apiHandler = new APIHandler(token, refreshToken);
	const danhSachHocKy = await apiHandler.getDanhSachHocKyTheoLichThi();
	const lichThiTheoHocKy = [];
	for (const hocKy of danhSachHocKy) {
		const lichThi = await apiHandler.getLichThiHocKy(hocKy.id);
		if (lichThi.length > 0) {
			lichThiTheoHocKy.push({
				id: hocKy.id,
				tenHocKy: `Học kỳ ${hocKy.ten} năm học ${hocKy.nam}`,
				lichThi: lichThi,
			});
		}
	}

	lichThiTheoHocKy.sort((a, b) => -(Number(a.id) - Number(b.id)));

	return (
		<div>
			<h1>Lịch thi</h1>
			{lichThiTheoHocKy.length > 0 ? (
				lichThiTheoHocKy.map((hocKy) => (
					<div key={hocKy.id}>
						<h2>{hocKy.tenHocKy}</h2>
						<ul>
							{hocKy.lichThi.map((lichThi) => (
								<li key={lichThi.idLichThi}>
									{lichThi.tenHocPhan} - {lichThi.ngayThi} {lichThi.gioBatDauThi}
								</li>
							))}
						</ul>
					</div>
				))
			) : (
				<p>Không có lịch thi cho học kỳ này.</p>
			)}
		</div>
	);
}