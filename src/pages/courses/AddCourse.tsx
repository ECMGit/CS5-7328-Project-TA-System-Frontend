import React, { useState } from 'react';
import { Container, Typography, Button, Box, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CourseService from '../../services/course';
// 确保 courseData 类型正确导入，这里假设你已经正确地从后端类型定义中导入
import { courseData } from './courseData';

const AddCourse: React.FC = () => {
    const [title, setTitle] = useState('');
    const [courseCode, setCourseCode] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const newCourse: Omit<courseData, 'id'> = { // 假设id由后端生成，所以在这里省略id字段
                title,
                courseCode,
                description// 确保字段名称与后端模型一致
            };
            await CourseService.addCourse(newCourse);
            setMessage('Course added successfully.');
            setLoading(false);
            navigate('/view-courses');
        } catch (error) {
            console.error('Error adding course:', error);
            setMessage('Failed to add course. Please try again.');
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
                <Typography component="h1" variant="h5">
                    Add Course
                </Typography>
                <Box component="form" onSubmit={handleSubmit} mt={3}>
                    <TextField
                        label="Title"
                        margin="normal"
                        required
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        autoFocus
                    />
                    <TextField
                        label="Course Code"
                        margin="normal"
                        required
                        fullWidth
                        value={courseCode}
                        onChange={(e) => setCourseCode(e.target.value)}
                    />
                    <TextField
                        label="Course Description"
                        margin="normal"
                        required
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {loading ? 'Adding...' : 'Add Course'}
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

export default AddCourse;
