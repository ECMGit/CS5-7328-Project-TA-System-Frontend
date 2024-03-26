import React from 'react';

interface Course {
    id: number;
    department: string;
    courseNumber: string;
    courseName: string;
    instructor: string;
}

interface CourseComponentProps {
    course: Course;
}

const CourseComponent: React.FC<CourseComponentProps> = ({ course }) => {
    return (
        <div>
            <h2>{course.courseName}</h2>
            <p>{course.department} {course.courseNumber}</p>
            <p>Instructor: {course.instructor}</p>
        </div>
    );
}

export default CourseComponent;