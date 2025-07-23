"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EyeClosed, Eye } from "lucide-react";

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
			className="h-8 w-8 p-0 hover:bg-transparent"
			onClick={togglePassword}
		>
			{showPassword ? (
				<EyeClosed className="text-muted-foreground" />
			) : (
				<Eye className="text-muted-foreground" />
			)}
		</Button>
	);
}
