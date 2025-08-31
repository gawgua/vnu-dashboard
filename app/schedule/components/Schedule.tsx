'use client';

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
import { 
	Dialog, 
	DialogClose, 
	DialogContent, 
	DialogFooter, 
	DialogTitle, 
	DialogTrigger 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DatePicker } from "@/components/ui/date-picker";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { BadgeQuestionMark } from "lucide-react";
import { useState } from "react";
import { toCalendar } from "@/lib/to_ical";
import Timetable from "./Timetable";
import { ThoiKhoaBieuResponse } from "@/types/ResponseTypes";
import { defaultPeriodTime, PeriodTime } from "@/lib/constants";
import { getScheduleFromSemester, saveCustomPeriodTime } from "../actions";

export default function Schedule({ data, customPeriodTime = defaultPeriodTime}: { data: { id: string, tenHocKy: string }[], customPeriodTime?: PeriodTime[] }) {
	const [loading, setLoading] = useState<boolean>(false);
	const [selectedId, setSelectedId] = useState<string>("");
	const [currentHocKy, setCurrentHocKy] = useState<ThoiKhoaBieuResponse[] | null>(null);
	const [periodTime, setPeriodTime] = useState<PeriodTime[]>(customPeriodTime);
	const [exportOpen, setExportOpen] = useState<boolean>(false);
	const [startDate, setStartDate] = useState<Date | undefined>(undefined);
	const [totalWeeks, setTotalWeeks] = useState<number>(1);
	const [exportError, setExportError] = useState<string | null>(null);
	const [save, setSave] = useState<CheckedState>(false);

	function handleCustomPeriodTime() {
		if (save) {
			saveCustomPeriodTime(periodTime);
		}
		console.log(periodTime)
	}
	
	function handleResetPeriodTime() {
		const newPeriodTime = defaultPeriodTime.map(period => ({ ...period }));
		setPeriodTime(newPeriodTime); // Create new objects to force re-render wtf!!!!!!!!!
		saveCustomPeriodTime(defaultPeriodTime);
	}

	function handleExport() {
		setExportError(null);
		if (!startDate) {
			setExportError("Vui lòng chọn ngày bắt đầu và kết thúc học kỳ hợp lệ.");
			return;
		}
		try {
			const icsContent = toCalendar(currentHocKy!, startDate, totalWeeks, periodTime);
			
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
							<Dialog>
								<DialogTrigger asChild>
									<Button>Đổi thời gian tiết học</Button>
								</DialogTrigger>
								<DialogContent className="max-w-md">
									<DialogTitle className="text-2xl">Đổi thời gian tiết học</DialogTitle>
									<Separator className="bg-gray-300" />
									<div className="space-y-4">
										<div className="grid grid-cols-3 gap-2 font-semibold text-sm">
											<Label></Label> {/* for alignment */}
											<Label>Bắt đầu</Label>
											<Label>Kết thúc</Label>
										</div>
										{periodTime.map((period, index) => (
											<div key={index} className="grid grid-cols-3 gap-2 items-center">
												<Label className="text-sm font-medium">
													Tiết {index + 1}
												</Label>
												<Input
													type="time"
													value={period.start}
													onChange={(e) => {
														const newPeriodTime = [...periodTime];
														newPeriodTime[index].start = e.target.value;
														setPeriodTime(newPeriodTime);
													}}
													className="px-2 py-1 border border-gray-300 rounded text-sm"
												/>
												<Input
													type="time"
													value={period.end}
													onChange={(e) => {
														const newPeriodTime = [...periodTime];
														newPeriodTime[index].end = e.target.value;
														setPeriodTime(newPeriodTime);
													}}
													className="px-2 py-1 border border-gray-300 rounded text-sm"
												/>
											</div>
										))}
									</div>
									<div className="flex items-center space-x-2">
										<Checkbox checked={save} onCheckedChange={setSave} className="border border-gray-300"/>
										<Label>Lưu thời gian biểu đã sửa</Label>
									</div>
									<DialogFooter>
										<Button className="bg-red-600 hover:bg-red-600/70" onClick={handleResetPeriodTime}>
											Đặt lại về mặc định
										</Button>
										<DialogClose asChild>
											<Button onClick={handleCustomPeriodTime}>
												Xác nhận
											</Button>
										</DialogClose>
									</DialogFooter>
								</DialogContent>
							</Dialog>
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
											<Label>Số tuần học</Label>
											<Input type="number" 
												min={1} max={99} step={1} 
												value={totalWeeks} 
												onChange={(e) => { setTotalWeeks(Number.parseInt(e.target.value)) }} 
											/>
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
					<Timetable data={currentHocKy!} periodTime={periodTime}/>
				</ScrollArea>
			) : loading && (
				<div className="flex items-center justify-center h-[calc(100vh-6.25rem)]">
					<span className="text-gray-500">Đang tải thời khóa biểu...</span>
				</div>
			)}
		</div>
	);
}