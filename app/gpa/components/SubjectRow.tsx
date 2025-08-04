"use client";

import { useState } from "react";
import { 
	Dialog, 
	DialogContent, 
	DialogTitle, 
	DialogTrigger 
} from "@/components/ui/dialog";
import { 
	TableCell, 
	TableRow 
} from "@/components/ui/table";
import { 
	Tooltip, 
	TooltipTrigger, 
	TooltipContent 
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { DiemHocPhanResponse, DiemThiHocKyResponse } from "@/types/ResponseTypes";
import { getSubjectDetails } from "../actions";
import { Separator } from "@/components/ui/separator";

export default function SubjectRow({
	monHoc,
	hocKyId,
}: {
	monHoc: DiemThiHocKyResponse;
	hocKyId: string;
}) {
	const [subjectDetails, setSubjectDetails] = useState<DiemHocPhanResponse[] | null>(null);
	const [loading, setLoading] = useState(false);

	const handleDialogOpen = async () => {
		if (subjectDetails) return; // Already loaded

		setLoading(true);
		try {
			const scores = await getSubjectDetails(monHoc.idHocPhan, hocKyId);
			setSubjectDetails(scores);
		} catch (error) {
			console.error("Failed to load subject details:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog>
			<Tooltip delayDuration={700}>
				<TooltipTrigger asChild>
					<DialogTrigger asChild>
						<TableRow
							className="cursor-pointer"
							onClick={handleDialogOpen}
						>
							<TableCell>{monHoc.maHocPhan}</TableCell>
							<TableCell>{monHoc.tenHocPhan}</TableCell>
							<TableCell>{monHoc.soTinChi}</TableCell>
							<TableCell>{monHoc.diemHe10}</TableCell>
							<TableCell>{monHoc.diemHe4}</TableCell>
							<TableCell>{monHoc.diemHeChu}</TableCell>
						</TableRow>
					</DialogTrigger>
				</TooltipTrigger>
				<TooltipContent>Ấn để xem chi tiết</TooltipContent>
			</Tooltip>
			<DialogContent>
				<DialogTitle className="text-2xl">Điểm chi tiết</DialogTitle>
				<Separator className="bg-gray-300" />
				{loading ? (
					<div>Đang tải...</div>
				) : subjectDetails ? (
					subjectDetails.map((detail, index) => (
						<div key={`${monHoc.maHocPhan}-detail-${index}`}>
							<Label>
								<strong>{detail.loaiDiemHocPhan}:</strong>{" "}
								{detail.diemHe10}
							</Label>
						</div>
					))
				) : (
					<div>Không có dữ liệu chi tiết</div>
				)}
			</DialogContent>
		</Dialog>
	);
}