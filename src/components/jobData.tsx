//simplify code of faculty-job
export interface JobData {
    title: string;
    courseId: number;
    courseSchedule: string;
    totalHoursPerWeek: number;
    maxNumberOfTAs: number;
    requiredCourses: string;
    requiredSkills: string;
    TAStats: string;
    notes?: string;
    deadlineToApply: Date;
    facultyId: number;
}

export default JobData;