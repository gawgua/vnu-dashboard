import { logoutAction } from "@/app/actions";

export async function GET(): Promise<void> {
	await logoutAction();
}
