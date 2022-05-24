import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Router, { useRouter } from "next/router";
import useAuth from "@hooks/useAuth";
import { RegisterRequestPayload } from "@typeDefs/auth";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequestPayload>();
  const router = useRouter();
  const { isAuthenticated, isLoadingRegister, useRegister } = useAuth()

  if (isAuthenticated) {
    router.push('/dashboard')
  }


  return (
    <div className="w-full min-h-screen">
      <div className="grid grid-cols-2 content-center">
        <div className="flex flex-col justify-center items-center">
          <div className="max-w-lg w-full">
            <p className="font-bold mb-10 text-2xl">Sign Up</p>
            <form onSubmit={handleSubmit(useRegister)} method="post" className="flex flex-col gap-4">
              <div>
                <label className="text-gray-700 text-sm font-bold">Nama Lengkap</label>
                <input
                  type="text"
                  placeholder="Justin Bieber"
                  className="input input-bordered w-full"
                  {...register("namaLengkap", { required: true })}
                />
                {errors.namaLengkap && errors.namaLengkap.type == "required" && (
                  <p className="text-error">Please fill your full name</p>
                )}
              </div>
              <div>
                <label className="text-gray-700 text-sm font-bold">ID LINE</label>
                <input
                  type="text"
                  placeholder="Bieber222"
                  className="input input-bordered w-full"
                  {...register("idLine", { required: true })}
                />
                {errors.idLine && errors.idLine.type == "required" && (
                  <p className="text-error">Please fill your Line ID</p>
                )}
              </div>
              <div>
                <label className="text-gray-700 text-sm font-bold">Username</label>
                <input
                  type="text"
                  placeholder="Bieber222"
                  className="input input-bordered w-full"
                  {...register("username", { required: true })}
                />
                {errors.username && errors.username.type == "required" && (
                  <p className="text-error">Please fill your username</p>
                )}
              </div>
              <div>
                <label className="text-gray-700 text-sm font-bold">Password</label>
                <input
                  className="input input-bordered w-full"
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
                className={`btn btn-primary w-full ${isLoadingRegister && "loading"}`}
              >
                {isLoadingRegister ? "Signing up.." : "Sign Up"}
              </button>
            </form>
            <div className="text-center mt-4">
              <span>Already have an account?</span>
              <Link href="/auth/login">
                <a className="ml-1 text-primary-500 link">
                  Login
                </a>
              </Link>
            </div>
            <div className="mb-2 text-center text-gray-400">or</div>
            <button
              type="submit"
              className="btn btn-outline gap-2 items-center w-full"
            >
              <div>
                <Image src="/google.png" width={16} height={16} alt="" />
              </div>
              <div>Authorize with Google</div>
            </button>
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
