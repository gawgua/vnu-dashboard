"use client";

import { useState, useTransition } from "react";
import { loginAction } from "../actions";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "./PasswordInput";

export function LoginForm() {
	const [error, setError] = useState<string | null>(null);
	const [isPending, startTransition] = useTransition();

	const handleSubmit = async (formData: FormData) => {
		setError(null);
		startTransition(async () => {
			try {
				await loginAction(formData);
			} catch (err) {
				setError("Sai tài khoản hoặc mật khẩu");
			}
		});
	};

	return (
		<form action={handleSubmit}>
			<Card className="min-w-xs max-w-sm mx-auto mt-20">
				<CardHeader>
					<CardTitle className="text-center text-xl">Đăng nhập</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col gap-6">
						<div className="grid gap-2">
							<Label htmlFor="username">Mã sinh viên</Label>
							<Input
								name="username"
								id="username"
								type="text"
								placeholder="240*****"
								required
								disabled={isPending}
							/>
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
							</div>
							<PasswordInput disabled={isPending} />
							{error && (
								<p className="text-red-500 text-sm">
									{error}
								</p>
							)}
						</div>
					</div>
				</CardContent>
				<CardFooter className="flex-col gap-2">
					<Button type="submit" className="w-full" disabled={isPending}>
						{isPending ? "Đang đăng nhập..." : "Login"}
					</Button>
				</CardFooter>
			</Card>
		</form>
	);
}
