import { cookies } from "next/headers";
import { loginAction } from "./actions";
import { redirect } from "next/navigation";
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

export default async function LoginPage() {
	const token = (await cookies()).get("accessToken")?.value;
	if (token) {
		redirect("/");
	}

	return (
		<form action={loginAction}>
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle>Login to your account</CardTitle>
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
							/>
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
							</div>
							<Input name="password" id="password" type="password" required />
						</div>
					</div>
				</CardContent>
				<CardFooter className="flex-col gap-2">
					<Button type="submit" className="w-full">
						Login
					</Button>
				</CardFooter>
			</Card>
		</form>
	);
}
