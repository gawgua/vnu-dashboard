'use client';

import { useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DatePicker } from "@/components/ui/date-picker";
import Timetable from "./Timetable";
import { toCalendar } from "@/lib/to_ical";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { BadgeQuestionMark } from "lucide-react";
import { ThoiKhoaBieuResponse } from "@/types/ResponseTypes";
import { getScheduleFromSemester } from "../actions";

export default function Schedule({ data }: { data: { id: string, tenHocKy: string }[] }) {
	const [selectedId, setSelectedId] = useState<string>("");
	const [exportOpen, setExportOpen] = useState<boolean>(false);
	const [startDate, setStartDate] = useState<Date | undefined>(undefined);
	const [endDate, setEndDate] = useState<Date | undefined>(undefined);
	const [exportError, setExportError] = useState<string | null>(null);
	const [currentHocKy, setCurrentHocKy] = useState<ThoiKhoaBieuResponse[] | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	function handleExport() {
		setExportError(null);
		if (!startDate || !endDate || startDate >= endDate) {
			setExportError("Vui lòng chọn ngày bắt đầu và kết thúc học kỳ hợp lệ.");
			return;
		}
		try {
			const icsContent = toCalendar(currentHocKy!, startDate, endDate);
			
			// Create blob and download
			const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
			const link = document.createElement('a');
			link.href = URL.createObjectURL(blob);
			link.download = `thoikhoabieu_${selectedId}.ics`;
			document.body.appendChild(link);
			link.click();
			URL.revokeObjectURL(link.href);
			document.body.removeChild(link);
			
			setExportOpen(false);
		} catch {
			setExportError("Đã xảy ra lỗi khi xuất thời khóa biểu. Vui lòng thử lại sau.");
		}
	}

	// if i change id before fetching schedule, timetable will render first
	// while currentHocKy is null
	async function handleSemesterChange(id: string) {
		setLoading(true);
		setCurrentHocKy(null);
		setCurrentHocKy(await getScheduleFromSemester(id));
		setLoading(false);
		setSelectedId(id);
	}

	return (
		<div className="w-full mr-2 space-y-4">
			<Card className="py-3">
				<CardContent>
					<Select onValueChange={handleSemesterChange}>
						<SelectTrigger className="w-full bg-white">
							<SelectValue placeholder="Chọn học kỳ" />
						</SelectTrigger>
						<SelectContent>
							{data.map((hocKy) => (
								<SelectItem key={hocKy.id} value={hocKy.id}>
									{hocKy.tenHocKy}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					{currentHocKy && (
						<div className="flex items-center gap-2 mt-2">
							<Popover open={exportOpen} onOpenChange={setExportOpen}>
								<PopoverTrigger asChild>
									<Button>
										Xuất thời khóa biểu
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-full p-4 space-y-4" align="start">
									<div className="grid grid-cols-2 gap-4">
										<div className="space-y-2 w-full">
											<Label>Ngày bắt đầu học kì</Label>
											<DatePicker date={startDate} setDate={setStartDate} className="border-1 border-gray-200 text-black bg-transparent hover:bg-green-200 w-full justify-between" />
										</div>
										<div className="space-y-2 w-full">
											<Label>Ngày kết thúc học kì</Label>
											<DatePicker date={endDate} setDate={setEndDate} className="border-1 border-gray-200 text-black bg-transparent hover:bg-green-200 w-full justify-between" />
										</div>
									</div>
									{exportError && (
										<div className="text-red-500 text-sm">
											{exportError}
										</div>
									)}
									<Button onClick={handleExport} className="w-full">Xuất</Button>
								</PopoverContent>
							</Popover>
							<Tooltip>
								<TooltipTrigger>
									<BadgeQuestionMark className="hover:text-primary"/>
								</TooltipTrigger>
								<TooltipContent align="start" side="right">
									Xuất file .ics có thể import vào các ứng dụng lịch như Google Calendar, Apple Calendar, Outlook, etc...
								</TooltipContent>
							</Tooltip>
						</div>
					)}
				</CardContent>
			</Card>
			{currentHocKy ? (
				<ScrollArea className="h-[calc(100vh-9rem)] w-full rounded-3xl [&>[data-slot=scroll-area-scrollbar]]:hidden">
					<Timetable data={currentHocKy!}/>
				</ScrollArea>
			) : loading && (
				<div className="flex items-center justify-center h-[calc(100vh-6.25rem)]">
					<span className="text-gray-500">Đang tải thời khóa biểu...</span>
				</div>
			)}
		</div>
	);
}