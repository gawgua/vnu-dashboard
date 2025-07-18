import { 
	Card, 
	CardTitle,
	CardContent
} from "@/components/ui/card";
import { LichThiResponse } from "@/types/ResponseTypes";

export default function ExamDetail({ data, className="" }: { data: LichThiResponse, className?: string }) {
	return (
		<Card className={className}>
			<CardTitle className="font-bold pl-6">{data.tenHocPhan}</CardTitle>
			<CardContent>
				<p><strong>Ngày thi:</strong> {data.ngayThi || "Chưa xác định"}</p>
				<p><strong>Giờ bắt đầu:</strong> {data.gioBatDauThi || "Chưa xác định"}</p>
				<p><strong>Phòng thi:</strong> {data.phongThi || "Chưa xác định"}</p>
				<p><strong>Địa chỉ:</strong> {data.diaChi || "Chưa xác định"}</p>
				<p><strong>Hình thức thi:</strong> {data.hinhThucThi || "Chưa xác định"}</p>
			</CardContent>
		</Card>
	);
}