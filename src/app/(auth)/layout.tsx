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
      <div className="flex h-full w-full rounded-lg bg-white shadow-sm">
        <div className="w-[34%] px-4">{children}</div>

        <div className="w-[66%] rounded-r-md bg-gradient-to-r from-blue-700 to-indigo-800"></div>
      </div>
    </div>
  );
}
