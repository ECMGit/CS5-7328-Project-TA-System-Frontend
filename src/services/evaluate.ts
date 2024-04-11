import { FacultyCourseTAInfo } from '../../src/pages/user/FacultyProfile';
// evaluate.ts
//const API_URL = 'http://localhost:9000/api/ta-performance'; // Adjust the URL based on your environment
const API_URL = 'http://localhost:9000/api'; // Adjust the base URL based on your environment

export type EvaluationData = {
    taUserId: number;
    facultyUserId: number;
    courseId: number;
    teachingSkill: number;
    mentoringSkill: number;
    effectiveCommunication: number;
    comments: string;
};

export interface TAEvaluationData {
    taUserId: number;
    facultyUserId: number;
    courseId: number;
    teachingSkill: number;
    mentoringSkill: number;
    effectiveCommunication: number;
    comments: string;
}


export async function createTaEvaluation(evaluationData: EvaluationData): Promise<void> {
    const response = await fetch(`${API_URL}/ta-evaluation`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(evaluationData),
    });

    if (!response.ok) {
        const resJson = await response.json();
        throw new Error('Failed to submit evaluation: ' + resJson.message);
    }
}

export async function getAllTaEvaluations(): Promise<TAEvaluationData[]> {
    const response = await fetch(`${API_URL}/performance-results`);
    if (!response.ok) {
        throw new Error('Data fetch failed');
    }
    const data = await response.json();
    return data;
}

// evaluate.ts
export const getFacultyCoursesWithTAs = async (facultyId: number): Promise<FacultyCourseTAInfo[]> => {
    const response = await fetch(`${API_URL}/faculty/${facultyId}/courses-tas`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch faculty courses and TAs');
    }
    return response.json();
};
