import checkAuthStatus from "@/features/auth/services/checkAuthStatus";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = await checkAuthStatus();

  if (isAuthenticated) {
    redirect("/dashboard");
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300">
      <div className="flex min-h-[520px] w-7/12 rounded-lg bg-white p-2 shadow-sm">
        <div className="w-1/2">{children}</div>

        <div className="w-1/2 rounded-md bg-gradient-to-r from-blue-800 to-indigo-900"></div>
      </div>
    </div>
  );
}
