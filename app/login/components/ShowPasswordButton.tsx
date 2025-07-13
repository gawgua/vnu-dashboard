"use client";

import { useState } from "react";
import { VisibilityRounded, VisibilityOffRounded } from "@mui/icons-material";
import { Button } from "@/components/ui/button";

interface ShowPasswordProps {
	onToggle: (showPassword: boolean) => void;
}

export default function ShowPasswordButton({ onToggle }: ShowPasswordProps) {
	const [showPassword, setShowPassword] = useState(false);

	const togglePassword = () => {
		setShowPassword(!showPassword);
		onToggle(!showPassword);
	};

	return (
		<Button
			type="button"
			variant="ghost"
			size="sm"
			className="h-7 w-7 p-0 hover:bg-transparent"
			onClick={togglePassword}
		>
			{showPassword ? (
				<VisibilityOffRounded fontSize="small" className="text-muted-foreground" />
			) : (
				<VisibilityRounded fontSize="small" className="text-muted-foreground" />
			)}
		</Button>
	);
}
