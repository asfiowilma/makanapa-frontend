import { WORKOUT_URL } from "@constants/endpoints";
import { WorkoutHistory, WorkoutRequest } from "@typeDefs/workout";
import axios from "axios";

// export const fetchWorkout = async (userId: number, time: number) => {
//     // const workoutRequest: WorkoutRequest = {
//     //     userId: userId,
//     //     time: time
//     // };

//     const res = await axios.post(`${LOCAL_URL}/api/workout/fetch-workout-by-time`, { "user_id": userId.toString(), "time": time });
//     if (res.status === 200) return res.data;
//     throw new Error("Request failed");
// }

// export const fetchWorkoutHistory = async (userId: number) => {
//     const res = await axios.post(`${LOCAL_URL}/api/workout/fetch-workout-history`, { "user_id": userId.toString() });
//     if (res.status === 200) return res.data.data;
//     throw new Error("Request failed");
// }

export const fetchWorkout = (userId: number, target_time: number) => 
    axios.post<string>(`${WORKOUT_URL}/api/workout/fetch-workout-by-time`, { "user_id": userId.toString(), "target_time": target_time });

export const fetchWorkoutHistory = () =>
    axios.get<WorkoutHistory[]>(`${WORKOUT_URL}/api/workout/fetch-workout-history`);