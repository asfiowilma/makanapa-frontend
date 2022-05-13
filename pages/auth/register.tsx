import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Router from "next/router";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerAkun = async (content: any) => {
    console.log(JSON.stringify(content));
    try {
      const res = await fetch(
        "https://makanapa-be.herokuapp.com/auth/register/pengguna",
        {
          method: "POST",
          body: JSON.stringify(content),
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );
      alert("Register Successfully");
      Router.push("/auth/login");
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="w-screen p-20 mx-auto ">
      <div className="grid grid-cols-2 content-center  border rounded">
        <div className="mt-20 p-20">
          <p className="font-bold mb-10 text-2xl">Sign Up</p>
          <form onSubmit={handleSubmit(registerAkun)} method="post">
            <div className="mb-3">
              <label className="text-gray-700 text-sm font-bold">
                Nama Lengkap:
              </label>
              <input
                type="text"
                placeholder="Justin Bieber"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("namaLengkap", { required: true })}
              />
              {errors.namaLengkap && errors.namaLengkap.type == "required" && (
                <p className="text-red-500">Please fill your full name</p>
              )}
            </div>
            <div className="mb-3">
              <label className="text-gray-700 text-sm font-bold">
                ID LINE:
              </label>
              <input
                type="text"
                placeholder="Bieber222"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("idLine", { required: true })}
              />
              {errors.idLine && errors.idLine.type == "required" && (
                <p className="text-red-500">Please fill your Line ID</p>
              )}
            </div>
            <div className="mb-3">
              <label className="text-gray-700 text-sm font-bold">
                Username:
              </label>
              <input
                type="text"
                placeholder="Bieber222"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("username", { required: true })}
              />
              {errors.username && errors.username.type == "required" && (
                <p className="text-red-500">Please fill your username</p>
              )}
            </div>
            <div className="mb-3">
              <label className="text-gray-700 text-sm font-bold">
                Password:
              </label>
              <input
                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="**************"
                {...register("password", { required: true })}
              />
              {errors.password && errors.password.type == "required" && (
                <p className="text-red-500">Please fill your password</p>
              )}
            </div>
            <button
              type="submit"
              className="bg-[#EAB835]  hover:bg-[#C89101] text-white font-bold py-2 px-4 w-full border rounded"
            >
              Sign Up
            </button>
          </form>
          <div className="flex flex-row mt-5">
            <div>
              <p>Already have an account?</p>
            </div>
            <div className="ml-1 text-yellow-500">
              <Link href="/auth/login">Login</Link>
            </div>
          </div>
          <p className="mt-5 mb-5 grid justify-items-center">or</p>
          <button
            type="submit"
            className="mb-20 font-bold py-2 px-4 w-full border rounded"
          >
            <div>
              <Image src="/google.png" width={20} height={20} alt="" />
              <p>Authorize with Google</p>
            </div>
          </button>
        </div>
        <div className="bg-[#EAB835]">
          <p className="mt-20 text-5xl text-white font-bold grid justify-items-center">
            MakanApa
          </p>
          <div className="mt-5 flex justify-center content-end">
            <div>
              <Image src="/auth.png" width={400} height={610} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
