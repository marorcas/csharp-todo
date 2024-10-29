const apiBaseUrl = " http://localhost:5129/api/todotasks";

export interface TaskResponse {
    id: number;
    name: string;
    completed: boolean;
    priority: boolean;
}

export const getAllTasks = async () => {
    const response = await fetch(apiBaseUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch');
    }

    const data = await response.json();

    if (data === null) {
        return [];
    }

    return data as TaskResponse[];
}