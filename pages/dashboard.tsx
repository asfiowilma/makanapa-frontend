import useAuth from "@hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function DashboardPage() {
  const { isAuthenticated, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated])

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left p-8">
          <h1 className="text-5xl font-bold">Hello World!</h1>
          <div className="form-control mt-6">
            <Link href="/">
              <button onClick={logout} className="btn btn-primary">
                Logout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
