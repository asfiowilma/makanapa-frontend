import { Layout } from "@components/Layout";
import {Stomp} from "@stomp/stompjs";
import React, {useEffect, useRef, useState} from "react";
import {getCookie} from "cookies-next";
import axios from "axios";
import {loadUserProfile} from "@api/auth";
import toast from "react-hot-toast";
import {AUTH_URL} from "@constants/endpoints";

export default function WorkoutPage() {
    const client = Stomp.client('ws://infralabs.cs.ui.ac.id:55571/ws/');
    const [workoutMQData, setWorkoutMQData] = useState({
        name: '',
        time: 0,
        estimatedCalories: 0
    });

    const [userProfile, setUserProfile] = useState({id: null});
    const [connectedMq, setConnectedMq] = useState(false);

    useEffect(() => {
        const token_ = getCookie('token') as string
        axios.defaults.headers.common['Authorization'] = `Bearer ${token_}`
        loadUserProfile(token_).then((data) => {
            setUserProfile(data)
        }).catch((error) => {
            const errorMsg = error.response?.data.error
            toast.error(errorMsg)
        })
    }, [])

    const subscribeMq = function() {
        client.subscribe(`/exchange/user/${userProfile.id}`, function(message: any){
            setWorkoutMQData(JSON.parse(message.body))
        })
    };

    const connectMq = function() {
        setConnectedMq(true);
        client.connect('guest' , 'guest', subscribeMq)
    };

    const handleStartWorkoutButton = async function() {
        // dummy data pls change with workout service real API
        const res = await axios.post(
            'http://host-1806205571-port-55571.proxy.infralabs.cs.ui.ac.id/tk/workout-worker/receive-workout-data',
            {
                userId: userProfile.id,
                workouts: [
                    {
                        name: 'push up',
                        time: 5,
                        estimatedCalories: 200
                    },
                    {
                        name: 'pull up',
                        time: 5,
                        estimatedCalories: 200
                    },
                    {
                        name: 'plank',
                        time: 5,
                        estimatedCalories: 120
                    },
                    {
                        name: 'squad jump',
                        time: 5,
                        estimatedCalories: 200
                    }
                ]
            }
        );
        // please until here is dummy data
        if (res.status === 200 && !connectedMq) connectMq();
    }

    return (
        <Layout>
            <div>
                <div className="font-bold text-lg mb-4">Workout</div>
                <p className="btn btn-primary mb-8" onClick={handleStartWorkoutButton}>Start Workout</p>
                <div className='border-2 rounded-xl px-8 py-4 bg-primary-200'>
                    {
                        workoutMQData.name === '' && workoutMQData.time === 0 && workoutMQData.estimatedCalories === 0 ?
                        <div className='px-auto'>Mulai Workout Sekarang</div>
                        :
                        <div>
                            <p className='mb-8 font-bold text-lg'>{workoutMQData.name}</p>
                            <p className='mb-8'>Time Remaining: {workoutMQData.time}</p>
                            <p>Estimated Calories: {workoutMQData.estimatedCalories}</p>
                        </div>
                    }
                </div>
            </div>
        </Layout>
    )
}

