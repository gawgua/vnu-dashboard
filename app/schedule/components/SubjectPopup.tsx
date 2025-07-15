import { ReactNode } from "react";
import { ThoiKhoaBieuResponse } from "@/types/ResponseTypes";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Separator } from "@/components/ui/separator";

const days = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];

export default function SubjectPopup({ subject, children }: { subject: ThoiKhoaBieuResponse, children: ReactNode }) {
	return (
		<Dialog>
			<DialogTrigger className="cursor-pointer">
				{children}
			</DialogTrigger>
			<DialogContent>
				<DialogTitle className="text-2xl">
					Thông tin học phần
				</DialogTitle>
				<Separator className="bg-gray-300" />
				<DialogDescription>
					<p><strong>Tên học phần:</strong> {subject.tenHocPhan}</p>
					<p><strong>Mã học phần:</strong> {subject.maHocPhan}</p>
					<p><strong>Nhóm:</strong> {subject.nhom === "0" ? "Cả lớp" : subject.nhom}</p>
					<p><strong>Giảng viên:</strong> {subject.giangVien1}</p>
					<p><strong>Thời gian học:</strong> {days[Number.parseInt(subject.ngayTrongTuan) - 1]} {subject.tietBatDau} - {subject.tietKetThuc}</p>
					<p><strong>Phòng học:</strong> {subject.tenPhong}</p>
				</DialogDescription>
			</DialogContent>
		</Dialog>
	);
}