"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { 
	LineChart, 
	Line, 
	XAxis, 
	CartesianGrid, 
	LabelList,
	YAxis,
} from "recharts";

export default function GPAChart({data}: {
	data: { id: string; tenHocKy: string; tongket: number; tichluy: number }[];
}) {
	const chartConfig: ChartConfig = {
		tongket: {
			label: "GPA Học kỳ",
			color: "#2563eb",
		},
		tichluy: {
			label: "GPA Tích lũy", 
			color: "#dc2626",
		},
	};

	return (
		<Card>
			<CardContent className="pb-0">
				<ChartContainer config={chartConfig}>
					<LineChart accessibilityLayer data={data} margin={{ right: 80, left: 25 }}>
						<CartesianGrid vertical={false} stroke="black" strokeDasharray="4 5" strokeWidth={0.5}/>
						<XAxis 
							dataKey="tenHocKy" 
							tickLine={false} 
							interval={0}
							/>
						<YAxis 
							domain={[0, 4]} 
							tickCount={6} 
							tickLine={false} 
							axisLine={false} 
							/>
						<ChartLegend content={<ChartLegendContent />} verticalAlign="bottom" />
						<Line type="linear" dataKey="tongket" stroke={chartConfig.tongket.color} strokeWidth={2}>
							<LabelList position="bottom" />
						</Line>
						<Line type="linear" dataKey="tichluy" stroke={chartConfig.tichluy.color} strokeWidth={2}>
							<LabelList position="top" />
						</Line>
					</LineChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}