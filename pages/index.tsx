import { Navbar } from "@components/Navbar";
import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      <Navbar />
      <div className="hero flex-1">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left p-8">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
              a id nisi.
            </p>
            <div className="form-control mt-6">
              <Link href="/auth/login">
                <button className="btn btn-primary">Login</button>
              </Link>
            </div>
            <div className="form-control mt-6">
              <Link href="/auth/register">
                <button className="btn btn-warning">Register</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
