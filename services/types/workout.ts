export interface Workout {
    id: number;
    name: string;
    target_time: number;
    estimated_calories: number;
}

export interface WorkoutHistory {
    id: number;
    user_id: number;
    timestamp: number;
    workouts: Workout[];
}

export interface WorkoutRequest {
    userId: number;
    time: number;
}

export interface WorkoutHistoryRequest {
    userId: number;
}
