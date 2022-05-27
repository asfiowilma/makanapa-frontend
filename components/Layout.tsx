import React, { ReactNode } from 'react'
import { Navbar } from './Navbar'
import { CalorieCircle } from "@components/Dashboard";

type Props = {
  children: ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen">
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <Navbar />
          <div className="p-8 bg-gray-50">
            {children}
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu overflow-y-auto w-80 bg-base-100 border-r text-base-content text-center">
            <a className="w-full bg-primary-500 h-16 p-2">
              <div className="text-white text-xl font-extrabold">MakanApa?</div>
              <div className="text-white text-sm">#IniJargon</div>
            </a>
            <li className="my-2 overflow-y-auto w-full bg-base-100 flex justify-center items-center">
              <div className="text-black text-xl font-extrabold">Calories Remaining</div>
            </li>
            <CalorieCircle id={0} calories={1500} type="Remaining" />
            <CalorieCircle id={0} calories={300} type="Food" />
            <CalorieCircle id={0} calories={1000} type="Exercise" />
          </ul>

        </div>
      </div>
    </div>
  )
}