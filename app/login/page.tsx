import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "./components/LoginForm";

export default async function LoginPage() {
	const token = (await cookies()).get("accessToken")?.value;
	if (token) {
		redirect("/");
	}

	return <LoginForm />;
}
