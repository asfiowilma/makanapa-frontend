import { FoodCard, FoodColumn, FoodHeader, HeroCards, WorkoutCard } from "@components/Dashboard";
import { Navbar } from "@components/Navbar";
import useAuth from "@hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";

export default function DashboardPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated])

  return (
    <div className="min-h-screen">
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <Navbar />
          <div className="p-8 bg-gray-50">
            <HeroCards />
            <div className='flex justify-between items-center mb-4'>
              <div className="font-bold text-lg">Makanan Saya</div>
              <div className="btn btn-ghost">Lihat Semua</div>
            </div>            <div className="grid grid-cols-3 gap-4 mb-8">
              <FoodColumn>
                <FoodHeader category="Breakfast" />
                <FoodCard id={0} name="Bubur Ayam" calories={180} />
                <FoodCard id={0} name="Avocado Juice" calories={180} />
                <div className="btn btn-ghost text-primary-500">Lihat Semua<FiArrowRight className="h-5 w-5 ml-2" /></div>
              </FoodColumn>
              <FoodColumn>
                <FoodHeader category="Lunch" />
              </FoodColumn>
              <FoodColumn>
                <FoodHeader category="Dinner" />
              </FoodColumn>
            </div>
            <div className='flex justify-between items-center mb-4'>
              <div className="font-bold text-lg">Workout</div>
              <div className="btn btn-ghost">Lihat Semua</div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <WorkoutCard id={1} name="Plank" time={30} calories={12} />
              <WorkoutCard id={1} name="Push up" time={30} calories={12} />
            </div>
          </div>
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu overflow-y-auto w-full bg-base-100 border-r text-base-content text-center">
            <a className="w-80 bg-primary-500 h-16 p-2">
              <div className="text-white text-xl font-extrabold">MakanApa?</div>
              <div className="text-white text-sm">#IniJargon</div>
            </a>
            <li><a>Sidebar Item 1</a></li>
            <li><a>Sidebar Item 2</a></li>
          </ul>

        </div>
      </div>
    </div>
  );
}
