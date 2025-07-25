"use client";

import { useState, useTransition } from "react";
import { loginAction } from "../actions";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Alert,
	AlertDescription,
} from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BadgeInfo } from "lucide-react";
import PasswordInput from "./PasswordInput";

export default function LoginForm() {
	const [error, setError] = useState<string | null>(null);
	const [isPending, startTransition] = useTransition();

	const handleSubmit = async (formData: FormData) => {
		setError(null);
		startTransition(async () => {
			try {
				await loginAction(formData);
			} catch {
				setError("Sai tài khoản hoặc mật khẩu");
			}
		});
	};

	return (
		<form action={handleSubmit} className="w-full">
			<Card className="min-w-xl max-w-max mx-auto">
				<CardHeader>
					<CardTitle className="text-center text-xl">Đăng nhập</CardTitle>
					<CardDescription>
						<Alert className="mt-2 w-full bg-yellow-200/50 border-yellow-300">
							<BadgeInfo color="#ffb900" strokeWidth={2.5} />
							<AlertDescription className="text-amber-400 font-medium">
								Đăng nhập bằng tài khoản OneVNU (idp.vnu.edu.vn) của bạn.
								<br />
								Hệ thống không có chức năng lưu lại thông tin đăng nhập.
							</AlertDescription>
						</Alert>
					</CardDescription>
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
							{error && !isPending && (
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
