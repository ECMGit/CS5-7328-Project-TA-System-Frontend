import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, TextField } from '@mui/material';

import CourseService from '../../services/course';
import { courseData } from './courseData';

const EditCourse: React.FC = () => {
    const [course, setCourse] = useState<courseData>({ id: 0, title: '', courseCode: '', description: '' });
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchCourseDetails = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const courseDetails: courseData = await CourseService.getOneCourse(id);
                setCourse(courseDetails);
            } catch (error) {
                console.error('Error fetching course details:', error);
                setMessage('Failed to load course details.');
            }
            setLoading(false);
        };

        fetchCourseDetails();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            await CourseService.editCourse(course.id.toString(), course);
            setMessage('Course updated successfully.');
            navigate('/view-courses');
        } catch (error) {
            console.error('Error updating course:', error);
            setMessage('Failed to update course. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCourse(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
                <Typography component="h1" variant="h5">
                    Edit Course
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        name="title"
                        margin="normal"
                        required
                        fullWidth
                        label="Title"
                        value={course.title}
                        onChange={handleChange}
                        autoFocus
                    />
                    <TextField
                        name="courseCode"
                        margin="normal"
                        required
                        fullWidth
                        label="Course Code"
                        value={course.courseCode}
                        onChange={handleChange}
                    />
                    <TextField
                        name="description"
                        margin="normal"
                        required
                        fullWidth
                        label="Course Description"
                        value={course.description}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update Course'}
                    </Button>
                    <Button variant="outlined" color="primary" onClick={() => navigate(-1)} fullWidth>
                        Cancel
                    </Button>
                    {message && (
                        <Typography color={message.includes('successfully') ? 'primary' : 'error'} sx={{ mt: 2 }}>
                            {message}
                        </Typography>
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default EditCourse;
