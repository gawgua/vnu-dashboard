import { withAuth } from "@/lib/APIHandler";
import Schedule from "./components/Schedule";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Thời khóa biểu"
};

export default async function SchedulePage() {
	const danhSachHocKy = await withAuth(async (apiHandler) => {
		const res = await apiHandler.getDanhSachHocKyTheoThoiKhoaBieu();
		const danhSachHocKy = [];
		for (const hocKy of res) {
			const thoiKhoaBieu = await apiHandler.getThoiKhoaBieuHocKy(hocKy.id);
			if (thoiKhoaBieu.length > 0) {
				danhSachHocKy.push({
					id: hocKy.id,
					tenHocKy: `Học kỳ ${hocKy.ten} năm học ${hocKy.nam}`,
				});
			}
		}
		danhSachHocKy.sort((a, b) => -(Number(a.id) - Number(b.id)));
		return danhSachHocKy;
	}); 


	return <Schedule data={danhSachHocKy} />;
}