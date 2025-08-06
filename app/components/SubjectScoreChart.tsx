"use client";

import { Pie, PieChart } from "recharts";
import { SubjectScore } from "@/types/SubjectTypes";
import { Card, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export default function SubjectScoreChart({ data }: { data: Record<SubjectScore, number> }) {
	const chartConfig: ChartConfig = {
		[SubjectScore.A_plus]: {
			label: "A+",
			color: "#2563eb",
		},
		[SubjectScore.A]: {
			label: "A",
			color: "#1d4ed8",
		},
		[SubjectScore.B_plus]: {
			label: "B+",
			color: "#f59e0b",
		},
		[SubjectScore.B]: {
			label: "B",
			color: "#f97316",
		},
		[SubjectScore.C_plus]: {
			label: "C+",
			color: "#fbbf24",
		},
		[SubjectScore.C]: {
			label: "C",
			color: "#facc15",
		},
		[SubjectScore.D_plus]: {
			label: "D+",
			color: "#84cc16",
		},
		[SubjectScore.D]: {
			label: "D",
			color: "#22c55e",
		},
		[SubjectScore.F]: {
			label: "F",
			color: "#dc2626",
		}
	};
	
	const chartData = Object.entries(data)
		.filter(([, value]) => value != 0)
		.map(([key, value]) => ({
			score: key as SubjectScore,
			count: value,
			fill: chartConfig[key as SubjectScore].color
		}));

	return (
		<Card>
			<CardContent>
				<ChartContainer config={chartConfig}>
						<PieChart>
							<ChartLegend content={<ChartLegendContent />} />
							<ChartTooltip content={<ChartTooltipContent />} />
							<Pie 
								data={chartData}
								nameKey="score" 
								dataKey="count"
							/>
						</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}