import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { APIHandler } from "@/lib/APIHandler";
import { 
	Card, 
	CardTitle,
	CardContent
} from "@/components/ui/card";
import ExamList from "./components/ExamList";
import { Label } from "@/components/ui/label";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Lịch thi"
}

export default async function ExamPage() {
	const token = (await cookies()).get("accessToken")?.value;
	const refreshToken = (await cookies()).get("refreshToken")?.value;
	if (!token) {
		redirect("/login");
	}
	
	const apiHandler = new APIHandler(token, refreshToken);
	const danhSachHocKy = await apiHandler.getDanhSachHocKyTheoLichThi();
	const hocKy = danhSachHocKy.reduce((prev, curr) => {
		return curr.id > prev.id ? curr : prev;
	}, danhSachHocKy[0]);
	const lichThi = await apiHandler.getLichThiHocKy(hocKy.id);
	const lichThiGroups = Object.groupBy(lichThi, (item) => {
		if (item.ngayThi === null) return "upcoming";

		const now = new Date();
		const examDate = new Date(item.ngayThi.split("/").reverse().join("-"));
		if (examDate < now) return "past";
		else return "upcoming";
	});

	return (
		<div className="w-full mt-2.25 mb-2.25 mr-2">
			<Card>
				<CardTitle className="text-2xl font-bold p-6 pb-2 pt-0.5">
					Lịch Thi {`Học kỳ ${hocKy.ten} năm học ${hocKy.nam}`}
				</CardTitle>
				<CardContent>
					<Label className="mb-0.5">Sắp thi:</Label>
					{lichThiGroups["upcoming"] && (
					<ExamList data={lichThiGroups["upcoming"]} className="m-3"/>
					)}
					<Label className="mt-5 mb-0.5">Đã thi:</Label>
					{lichThiGroups["past"] && (
					<ExamList data={lichThiGroups["past"]} className="m-3"/>
					)}
				</CardContent>
			</Card>
		</div>
	);
}