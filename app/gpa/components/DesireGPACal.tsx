"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
	Card, 
	CardContent, 
	CardHeader 
} from "@/components/ui/card";
import { useState } from "react";

function calculateRequiredGPA(credit: number, gpa: number, totalCredit: number, targetGPA: number): number {
	const requiredGPA = ((targetGPA * totalCredit) - (gpa * credit)) / (totalCredit - credit);
	return Number.parseFloat(requiredGPA.toFixed(2));
}

export default function DesireGPACal({credit, gpa}: {
	credit: number;
	gpa: number;
}) {
	const [targetGPA, setTargetGPA] = useState<number>(0);
	const [totalCredit, setTotalCredit] = useState<number>(0);
	const [requiredGPA, setRequiredGPA] = useState<number>(0);
	const [remainingCredits, setRemainingCredits] = useState<number>(0);

	function handleClick() {
		const result = calculateRequiredGPA(credit, gpa, totalCredit, targetGPA);
		setRequiredGPA(result);
		setRemainingCredits(totalCredit - credit);
	}

	return (
		<Card className="gap-3">
			<CardHeader className="text-xl font-bold">Tính GPA cần đạt</CardHeader>
			<CardContent>
				<div className="grid grid-cols-2 gap-6">
					<div className="space-y-1.5 pr-6">
						<div className="flex items-center space-x-2">
							<Label>Số tín chỉ đã đạt:</Label>
							<span>{credit}</span>
						</div>
						<div className="flex items-center space-x-2">
							<Label>Tổng số tín chỉ:</Label>
							<Input
								className="w-15 h-8"
								onInput={(e) =>
									setTotalCredit(Number.parseInt(e.currentTarget.value)) 
								}
							/>
						</div>
						<div className="flex items-center space-x-2">
							<Label>Điểm trung bình tích lũy:</Label>
							<span>{gpa}</span>
						</div>
						<div className="flex items-center space-x-2">
							<Label>Điểm trung bình cần đạt:</Label>
							<Input
								className="w-15 h-8"
								onInput={(e) =>
									setTargetGPA(Number.parseFloat(e.currentTarget.value.replaceAll(",", ".")))
								}
							/>
						</div>
					</div>
					<div className="relative h-full">
						<Separator orientation="vertical" className="absolute left-[-45] h-full" />
						<div className="flex flex-col h-full">
							<div className="flex-1 flex items-center justify-center">
								<div className="text-xl font-medium text-center">
									Bạn cần đạt {isNaN(requiredGPA) ? "--" : requiredGPA} cho {remainingCredits} tín chỉ còn lại.
								</div>
							</div>
							<div className="mt-auto">
								<Button className="w-full" onClick={handleClick}>Tính GPA cần thiết</Button>
							</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}