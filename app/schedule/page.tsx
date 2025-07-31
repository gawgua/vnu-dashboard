import { APIHandler } from "@/lib/APIHandler";
import { ThoiKhoaBieuResponse } from "@/types/ResponseTypes";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Schedule from "./components/Schedule";
import { Metadata } from "next";

export interface ThoiKhoaBieuTheoHocKy {
	id: string;
	tenHocKy: string;
	thoiKhoaBieu: ThoiKhoaBieuResponse[];
}

export const metadata: Metadata = {
	title: "Thời khóa biểu"
};

export default async function SchedulePage() {
	const token = (await cookies()).get("accessToken")?.value;
	const refreshToken = (await cookies()).get("refreshToken")?.value;
	if (!token) {
		redirect("/login");
	}
	
	const apiHandler = new APIHandler(token, refreshToken);
	const danhSachHocKy = await apiHandler.getDanhSachHocKyTheoThoiKhoaBieu();
	const tkbTheoHocKy: ThoiKhoaBieuTheoHocKy[] = []; 
	for (const hocKy of danhSachHocKy) {
		const thoiKhoaBieu = await apiHandler.getThoiKhoaBieuHocKy(hocKy.id);
		if (thoiKhoaBieu.length > 0) {
			tkbTheoHocKy.push({
				id: hocKy.id,
				tenHocKy: `Học kỳ ${hocKy.ten} năm học ${hocKy.nam}`,
				thoiKhoaBieu: thoiKhoaBieu,
			});
		}
	}

	tkbTheoHocKy.sort((a, b) => -(Number(a.id) - Number(b.id)));

	return <Schedule data={tkbTheoHocKy} />;
}