import Link from "next/link";
import Router from "next/router";

export default function home() {
  const logoutFunc = () => {
    localStorage.clear();
  };
  if (typeof window !== "undefined") {
    if (!localStorage.token) {
      Router.push("/");
    } else {
      return (
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left p-8">
              <h1 className="text-5xl font-bold">Hello World!</h1>
              <div className="form-control mt-6">
                <Link href="/">
                  <button onClick={logoutFunc} className="btn btn-primary">
                    Logout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
