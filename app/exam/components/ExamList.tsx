import { LichThiResponse } from "@/types/ResponseTypes";
import ExamDetail from "./ExamDetail";

export default function ExamList({
	data,
	className = "",
}: {
	data: LichThiResponse[];
	className?: string;	
}) {
	data.sort((a, b) => {
		if (a.ngayThi === null && b.ngayThi === null) return 0;
		if (a.ngayThi === null) return 1;
		if (b.ngayThi === null) return -1;

		const dateA = new Date(a.ngayThi.split("/").reverse().join("-"));
		const dateB = new Date(b.ngayThi.split("/").reverse().join("-"));

		if (dateA.getTime() === dateB.getTime()) {
			if (a.gioBatDauThi!.split(":")[0] < b.gioBatDauThi!.split(":")[0]) return -1;
			else return 1;
		}

		return dateA.getTime() - dateB.getTime();
	})

	return (
		<>
		{data.map((exam) => (
			<ExamDetail className={className} key={exam.maLichThi} data={exam} />
		))}
		</>
	)
}