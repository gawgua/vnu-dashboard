import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "./components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Đăng nhập",
}

export default async function LoginPage() {
	const token = (await cookies()).get("accessToken")?.value;
	if (token) {
		redirect("/");
	}

	return <LoginForm />;
}
