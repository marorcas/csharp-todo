const apiBaseUrl = " http://localhost:5129/api/todotasks";

export interface TaskResponse {
    id: number;
    name: string;
    completed: boolean;
    priority: boolean;
}

export interface UpdateTaskRequest {
    // name?: string;
    completed?: boolean;
    priority?: boolean;
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

export const updateTaskById = async (id: number, data: UpdateTaskRequest ) => {
    const response = await fetch(`${apiBaseUrl}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Something went wrong');
    }

    return (await response.json()) as TaskResponse;
}