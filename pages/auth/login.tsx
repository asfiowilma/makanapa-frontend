import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Router, { useRouter } from "next/router";
import { LoginRequestPayload } from "../../services/types/auth";
import useAuth from "@hooks/useAuth";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequestPayload>();
  const { useLogin, isLoadingLogin, isAuthenticated } = useAuth();
  const router = useRouter();

  if (isAuthenticated) {
    router.push('/dashboard')
  }

  return (
    <div className="w-full min-h-screen">
      <div className="grid grid-cols-2 content-center">
        <div className="flex flex-col justify-center items-center">
          <div className="max-w-lg w-full">
            <h1 className="font-bold mb-10 text-2xl">Login</h1>
            <form onSubmit={handleSubmit(useLogin)} method="post" className="flex flex-col gap-4">
              <div>
                <label className="text-gray-700 text-sm font-bold">Username</label>
                <input
                  className="input input-bordered w-full"
                  type="text"
                  placeholder="justin213"
                  {...register("username", { required: true })}
                />
                {errors.username && errors.username.type == "required" && (
                  <p className="text-error">Please fill your username</p>
                )}
              </div>
              <div>
                <label className="text-gray-700 text-sm font-bold">Password</label>
                <input
                  className="input input-bordered w-full "
                  type="password"
                  placeholder="*******"
                  {...register("password", { required: true })}
                />
                {errors.password && errors.password.type == "required" && (
                  <p className="text-error">Please fill your password</p>
                )}
              </div>
              <button
                type="submit"
                className={`btn btn-primary w-full ${isLoadingLogin && "loading"}`}
              >
                {isLoadingLogin ? "Logging in.." : "Login"}
              </button>
            </form>
            <div className="text-center mt-4">
              <span>Dont have an account?</span>
              <Link href="/auth/register">
                <a className="ml-1 text-primary-500 link">
                  Sign up
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-primary-400 h-screen flex flex-col items-center justify-end">
          <div className="h-24 text-5xl text-white font-bold text-center">
            MakanApa
          </div>
          <div className="w-[400px]">
            <Image src="/auth.png" width={538} height={698} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
