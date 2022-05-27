import Avatar from 'boring-avatars'
import Link from 'next/link';
import React, { ReactNode } from 'react'
import { FiTrash } from 'react-icons/fi';



interface WorkoutCardProps {
  id: number
  time: number
  calories: number
  name: string
}


export const HeroCards = () => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <div className="col-span-2 card bg-base-100 shadow-xl image-full">
        <figure className="h-64"><img className="object-cover w-full object-top" src="https://images.unsplash.com/photo-1621291726769-86a0b3fc6357?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070" alt="Meal" /></figure>
        <div className="card-body">
          <h2 className="card-title">Bingung Mau Makan Apa?</h2>
          <p>Lihat rekomendasi kami untuk sarapan, makan siang, dan makan malam sekarang~</p>
          <div className="card-actions justify-end">
            <Link href='/meal'><a className="btn btn-primary">Lihat Rekomendasi</a></Link>
          </div>
        </div>
      </div>
      <div className="card bg-base-100 shadow-xl image-full">
        <figure><img src="https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070" alt="Workout" /></figure>
        <div className="card-body">
          <h2 className="card-title">Ayo Workout!</h2>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam magni error at modi, odio animi.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Workout</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const WorkoutCard = ({ id, name, time, calories }: WorkoutCardProps) => {
  return <div className="card card-side bg-base-100 shadow-lg">
    <figure>
      <Avatar
        size={80}
        name={name}
        variant="ring"
        colors={["#CC333F", "#00A0B0", "#E29A1E", "#EAB835", "#EDC951"]}
        square
      />
    </figure>
    <div className="card-body p-4">
      <h2 className="card-title">{name}</h2>
      <div className="text-gray-400 leading-tight">
        <div>{time} seconds</div>
        <div>{calories} calories</div>
      </div>
      <div className="card-actions justify-end">
        <button className="btn btn-ghost text-error btn-sm btn-circle"><FiTrash className="w-5 h-5" /></button>
      </div>
    </div>
  </div>
}
