"use client";

import {
	Card,
	CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ThoiKhoaBieuResponse } from "@/types/ResponseTypes";

const days = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"];
const timeSlots = [
	"06:00",
	"07:00",
	"08:00",
	"09:00",
	"10:00",
	"11:00",
	"12:00",
	"13:00",
	"14:00",
	"15:00",
	"16:00",
	"17:00",
	"18:00",
	"19:00",
];
const periodToTime = [
	{ start: "07:00", end: "07:50" },
	{ start: "07:55", end: "08:45" },
	{ start: "08:50", end: "09:40" },
	{ start: "09:50", end: "10:40" },
	{ start: "10:45", end: "11:35" },
	{ start: "11:40", end: "12:30" },
	{ start: "13:00", end: "13:50" },
	{ start: "13:55", end: "14:45" },
	{ start: "14:50", end: "15:40" },
	{ start: "15:50", end: "16:40" },
	{ start: "16:45", end: "17:35" },
	{ start: "17:40", end: "18:30" },
	{ start: "18:35", end: "19:25" },
];

function getCurrDayOfWeek(): number {
	const today = new Date();
	const day = today.getDay();

	return day === 0 ? 7 : day;
} 

function getPeriodTime(start: number, end: number): { startTime: string; endTime: string } {
	return {
		startTime: periodToTime[start - 1].start,
		endTime: periodToTime[end - 1].end,
	}
}

function getEventPosition(event: ThoiKhoaBieuResponse): { top: string; height: string } {
	const {startTime, endTime} = getPeriodTime(Number.parseInt(event.tietBatDau), Number.parseInt(event.tietKetThuc));

	const startHour = Number.parseInt(startTime.split(":")[0]);
	const startMinute = Number.parseInt(startTime.split(":")[1]);
	const endHour = Number.parseInt(endTime.split(":")[0]);
	const endMinute = Number.parseInt(endTime.split(":")[1]);

	const startPosition = ((startHour - 6) * 60 + startMinute) / 60;
	const duration =
		((endHour - 6) * 60 + endMinute - (startHour - 6) * 60 - startMinute) /
		60;

	return {
		top: `${startPosition * 60}px`,
		height: `${duration * 60}px`,
	};
}


export default function Timetable({data}: {data: ThoiKhoaBieuResponse[]}) {
	function getEventsForDay(day: number) {
		return data.filter(event => Number.parseInt(event.ngayTrongTuan) === day);
	}

	return (
		<div className="w-full max-w-7xl mx-auto p-4 bg-white">
			<div className="grid grid-cols-8 gap-0 border border-gray-200">
				{/* Header Row */}
				<div className="border-r border-gray-200 relative">
          			<div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"></div>
        		</div>
				{days.map((day, dayIndex) => (
					<div key={day} className="border-r border-gray-200 text-center py-3">
						<Label className={`text-sm font-medium block text-center ${getCurrDayOfWeek() == dayIndex + 1 ? "text-red-500" : "text-gray-900"}`}>{day}</Label>
					</div>
				))}

				{/* Time Slots and Events */}
				{timeSlots.map((time, timeIndex) => (
					<div key={time} className="contents">
						{/* Time Column */}
						<div className="border-r border-t border-gray-200 relative min-h-[60px]">
							<Label className="text-sm text-gray-600 absolute -top-2 left-3">{time}</Label>
						</div>

						{/* Day Columns */}
						{days.map((day, dayIndex) => (
						<div key={`${day}-${time}`} className="border-r border-t border-gray-200 relative min-h-[60px]">
							{timeIndex === 0 && (
							<div className="absolute inset-0 overflow-visible">
								{getEventsForDay(dayIndex + 1).map((event) => {
								const position = getEventPosition(event)
								return (
									<Card
									key={`${event.maHocPhan}-${event.ngayTrongTuan}-${event.tietBatDau}`}
									className="absolute left-1 right-1 bg-primary border-0 shadow-sm z-10 py-0"
									style={{
										top: position.top,
										height: position.height,
										minHeight: "80px",
									}}
									>
										<CardContent className="p-2 h-full flex flex-col justify-start">
											<div className="text-white text-xs font-medium leading-tight">
											<div className="mb-1">{event.tenHocPhan}</div>
											<div className="opacity-90">
												{(() => {
													const { startTime, endTime } = getPeriodTime(Number.parseInt(event.tietBatDau),	Number.parseInt(event.tietKetThuc));
													return `${startTime} - ${endTime}`;
												})()}
											</div>
											<div className="opacity-90">{event.tenPhong}</div>
											</div>
										</CardContent>
									</Card>
								)
								})}
							</div>
							)}
						</div>
						))}
					</div>
				))}
			</div>
		</div>
	)
}