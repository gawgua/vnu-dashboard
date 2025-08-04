"use client";

import { Label } from "@/components/ui/label";
import { ThoiKhoaBieuResponse } from "@/types/ResponseTypes";
import SubjectCard from "./SubjectCard";
import { PeriodTime } from "@/lib/constants";

export interface EventInfo {
	event: ThoiKhoaBieuResponse;
	isOverlapped: boolean;
	isMainOverlap: boolean;
	isSameTime: boolean;
}

const daysAbbr = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
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

function getCurrDayOfWeek(): number {
	const today = new Date();
	const day = today.getDay();

	return day === 0 ? 7 : day;
} 

function detectOverlaps(events: ThoiKhoaBieuResponse[]): EventInfo[] {
	const result: EventInfo[] = [];
	
	for (let i = 0; i < events.length; i++) {
		const event1 = events[i];
		const start1 = Number.parseInt(event1.tietBatDau);
		const end1 = Number.parseInt(event1.tietKetThuc);
		
		let hasOverlap = false;
		let isMainOverlap = true;
		let isSameTime = false;
		
		// Find all overlapping events
		const overlappingEvents: { index: number; event: ThoiKhoaBieuResponse; duration: number; isSameTime: boolean }[] = [];
		
		for (let j = 0; j < events.length; j++) {
			if (i === j) continue;
			
			const event2 = events[j];
			const start2 = Number.parseInt(event2.tietBatDau);
			const end2 = Number.parseInt(event2.tietKetThuc);
			
			// Check if events have exactly the same start and end time
			if (start1 === start2 && end1 === end2) {
				hasOverlap = true;
				isSameTime = true;
				const duration2 = end2 - start2;
				overlappingEvents.push({ index: j, event: event2, duration: duration2, isSameTime: true });
			}
			// Check if events overlap (but not same time)
			else if (start1 <= end2 && start2 <= end1) {
				hasOverlap = true;
				const duration2 = end2 - start2;
				overlappingEvents.push({ index: j, event: event2, duration: duration2, isSameTime: false });
			}
		}
		
		if (hasOverlap && overlappingEvents.length > 0) {
			const duration1 = end1 - start1;
			
			// Check if any overlapping event has the same time
			const hasSameTimeOverlap = overlappingEvents.some(e => e.isSameTime);
			
			if (hasSameTimeOverlap) {
				// For same time events, use side-by-side layout
				// First event in array order goes to the left (isMainOverlap = false)
				const sameTimeEvents = overlappingEvents.filter(e => e.isSameTime);
				const firstSameTimeIndex = Math.min(...sameTimeEvents.map(e => e.index));
				isMainOverlap = i > firstSameTimeIndex; // Later event goes to the right
				isSameTime = true;
			} else {
				// For different duration overlaps, use stacked layout
				// Sort overlapping events by duration (shortest first) then by original index
				overlappingEvents.sort((a, b) => {
					if (a.duration !== b.duration) {
						return a.duration - b.duration;
					}
					return a.index - b.index;
				});
				
				// Current event gets left side if it's shorter than the shortest overlapping event
				// or if it has same duration but comes first in the original array
				const shortestOverlap = overlappingEvents[0];
				if (duration1 < shortestOverlap.duration || 
					(duration1 === shortestOverlap.duration && i < shortestOverlap.index)) {
					isMainOverlap = false; // This event goes to the left
				} else {
					isMainOverlap = true; // This event stays on the right
				}
			}
		}
		
		result.push({
			event: event1,
			isOverlapped: hasOverlap,
			isMainOverlap: isMainOverlap,
			isSameTime: isSameTime
		});
	}
	
	return result;
}

export default function Timetable({data, periodTime}: {data: ThoiKhoaBieuResponse[], periodTime: PeriodTime[]}) {
	function getEventsForDay(day: number): EventInfo[] {
		const dayEvents = data.filter(event => Number.parseInt(event.ngayTrongTuan) === day);
		return detectOverlaps(dayEvents);
	}

	return (
		<div className="w-full max-w-7xl mx-auto p-4 bg-white">
			<div className="grid grid-cols-8 gap-0 border border-gray-200">
				{/* Header Row */}
				<div className="border-r border-gray-200 relative">
          			<div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"></div>
        		</div>
				{daysAbbr.map((day, dayIndex) => (
					<div key={day} className="border-r border-gray-200 text-center py-3">
						<Label className={`text-sm font-bold block text-center ${getCurrDayOfWeek() == dayIndex + 1 ? "text-red-500" : "text-gray-900"}`}>{day}</Label>
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
						{daysAbbr.map((day, dayIndex) => (
						<div key={`${day}-${time}`} className="border-r border-t border-gray-200 relative min-h-[60px]">
							{timeIndex === 0 && (
							<div className="absolute inset-0 overflow-visible">
								{getEventsForDay(dayIndex + 1).map((overlapInfo) => 
									<SubjectCard 
									key={`${overlapInfo.event.maHocPhan}-${overlapInfo.event.ngayTrongTuan}-${overlapInfo.event.tietBatDau}`} 
									eventInfo={overlapInfo}
									periodTime={periodTime} />
								)}
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