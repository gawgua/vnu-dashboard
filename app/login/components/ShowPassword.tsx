"use client";

import { useState } from "react";
import { VisibilityRounded, VisibilityOffRounded } from "@mui/icons-material";
import { Button } from "@/components/ui/button";

interface ShowPasswordProps {
	onToggle: (showPassword: boolean) => void;
}

export default function ShowPassword({ onToggle }: ShowPasswordProps) {
	const [showPassword, setShowPassword] = useState(false);

	const togglePassword = () => {
		const newState = !showPassword;
		setShowPassword(newState);
		onToggle(newState);
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
				<VisibilityOffRounded className="h-4 w-4 text-muted-foreground" />
			) : (
				<VisibilityRounded className="h-4 w-4 text-muted-foreground" />
			)}
		</Button>
	);
}
