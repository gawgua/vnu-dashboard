"use client";

import { ShowPasswordButton } from "./ShowPasswordButton";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface PasswordInputProps {
	disabled?: boolean;
}

export function PasswordInput({ disabled }: PasswordInputProps) {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className="relative">
			<Input
				name="password"
				id="password"
				type={showPassword ? "text" : "password"}
				required
				className="pr-10"
				disabled={disabled}
			/>
			<div className="absolute inset-y-0 right-0 flex items-center pr-3">
				<ShowPasswordButton onToggle={setShowPassword} />
			</div>
		</div>
	);
}
