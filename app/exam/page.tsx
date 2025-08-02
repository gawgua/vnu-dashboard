import { withAuth } from "@/lib/APIHandler";
import { 
	Card, 
	CardTitle,
	CardContent
} from "@/components/ui/card";
import ExamList from "./components/ExamList";
import { Label } from "@/components/ui/label";
import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
	title: "Lịch thi"
}

export default async function ExamPage() {
	const { lichThiGroups, hocKy } = await withAuth(async (apiHandler) => {
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

		return {
			lichThiGroups,
			hocKy
		};
	});

	return (
		<div className="w-full mt-2.25 mb-2.25 mr-2">
			<Card className="gap-3">
				<CardTitle className="text-xl font-bold px-6">
					Lịch Thi {`Học kỳ ${hocKy.ten} năm học ${hocKy.nam}`}
				</CardTitle>
				<CardContent>
					{lichThiGroups["upcoming"] && (
					<>
						<Label className="mb-0.5">Sắp thi:</Label>
						<ExamList data={lichThiGroups["upcoming"]} className="m-3"/>
					</>
					)}
					{lichThiGroups["upcoming"] && lichThiGroups["past"] && <Separator />}
					{lichThiGroups["past"] && (
					<>
						<Label className="mt-5 mb-0.5">Đã thi:</Label>
						<ExamList data={lichThiGroups["past"]} className="m-3"/>
					</>
					)}
				</CardContent>
			</Card>
		</div>
	);
}