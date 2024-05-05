import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link, Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Box, TextField, Button, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import FacultyJobService from '../../services/faculty-job';
import { UserContext } from '../../provider';

import { JobData } from '../../components/jobData';
import api from '../../services/faculty-job';
import AvatarWrapper from '../../components/AvatarWrapper';
import AdminDashboard from '../AdminDashboard';
import TAJobDisplayComponent from '../TAJobDisplayComponent';
import TopNav from '../../components/TopNav';
import useAutoLogout from '../../components/AutoLogOut';

const EditJobPage: React.FC = () => {
    const { Modal } = useAutoLogout();
    const { jobId } = useParams<{ jobId: string }>();
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    if (!userContext) {
        return <div>Loading...</div>; // or any other fallback UI
    }
    const [job, setJob] = useState<JobData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    // User state
    const { user, setUser } = userContext;
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    /**
     * Log out the user, delete user from localStorage
     */
    const handleLogout = function () {
        localStorage.removeItem('user');
        setUser(null);
        setIsLoggedIn(false);
        navigate('/home-default');
    };

    /**
     * Navigate to the corresponding user profile. 
     */
    const handleProfile = function () {
        // Guard clause.
        if (!user) { return; }

        // Navigate to student/faculty profile.
        if (user.role === 'student') { navigate('/student-profile'); }
        else if (user.role === 'faculty') { navigate('/faculty-profile'); }
        else if (user.role === 'admin') { navigate('/admin-profile'); }
    };

    const renderContent = () => {
        // When the user is an administrator, display the AdminDashboard component
        if (user && user.role === 'admin') {
            return <AdminDashboard />;
        } else {
            // Content displayed by non administrator users
            return (
                <>
                    {/* If the user is a student, display their work list */}
                    {user && user.role === 'student' && (
                        <Container maxWidth='sm' style={{ marginTop: '20px' }}>
                            <TAJobDisplayComponent />
                        </Container>
                    )}
                </>
            );
        }
    };

    useEffect(() => {
        async function fetchJob() {
            if (!jobId) {
                setMessage('Invalid job ID');
                return;
            }

            try {
                const fetchedJob = await FacultyJobService.getOneJob(parseInt(jobId));
                setJob(fetchedJob);
            } catch (error) {
                console.error('Error fetching job:', error);
                setMessage('Failed to fetch job details');
            }
        }

        fetchJob();
    }, [jobId]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof JobData) => {
        const inputElement = e.target as HTMLInputElement;
        let value: string | number = inputElement.value;
        if (field === 'courseId' || field === 'totalHoursPerWeek' || field === 'maxNumberOfTAs') {
            value = parseInt(value, 10);
            if (isNaN(value)) {
                value = 0;
            }
        }
        setJob((prev: JobData | null) => ({
            ...prev,
            [field]: value
        } as JobData));
    };


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!jobId || !job) {
            setMessage('Invalid job data');
            return;
        }

        setLoading(true);

        try {
            await FacultyJobService.updateJob(parseInt(jobId), job);
            setMessage('Job updated successfully');
            console.log('updated successfully');
            setTimeout(() => {
                navigate('/jobs');
            }, 2000);
        } catch (error) {
            console.error('Error updating job:', error);
            setMessage('Failed to update job');
            setLoading(false);
        }
    };

    if (!job) return <Typography>Loading...</Typography>;

    return (
        <div>
            {/* Navigation Bar division */}
            <TopNav />
            <div />
            <Container maxWidth="md">
                <Typography variant="h4" align="center" mt={5} mb={1}>Edit Job</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            label="Job Title"
                            sx={{ my: 1 }}
                            required
                            fullWidth
                            value={job.title || ''}
                            onChange={(e) => handleInputChange(e, 'title')}
                            autoFocus
                        />
                        <TextField
                            label="Course ID"
                            sx={{ my: 1 }}
                            required
                            fullWidth
                            type="number"
                            value={job.courseId || ''}
                            onChange={(e) => handleInputChange(e, 'courseId')}
                        />
                        <TextField
                            label="Required Courses"
                            sx={{ my: 1 }}
                            required
                            fullWidth
                            value={job.requiredCourses || ''}
                            onChange={(e) => handleInputChange(e, 'requiredCourses')}
                        />
                        <TextField
                            label="Required Skills"
                            sx={{ my: 1 }}
                            required
                            fullWidth
                            value={job.requiredSkills || ''}
                            onChange={(e) => handleInputChange(e, 'requiredSkills')}
                        />
                        <TextField
                            label="TA Stats"
                            sx={{ my: 1 }}
                            required
                            fullWidth
                            value={job.TAStats || ''}
                            onChange={(e) => handleInputChange(e, 'TAStats')}
                        />
                        <TextField
                            label="Notes"
                            sx={{ my: 1 }}
                            fullWidth
                            multiline
                            rows={4}
                            value={job.notes || ''}
                            onChange={(e) => handleInputChange(e, 'notes')}
                        />
                        <TextField
                            label="Deadline to Apply"
                            sx={{ my: 1 }}
                            required
                            fullWidth

                            value={job.deadlineToApply || ''}
                            onChange={(e) => handleInputChange(e, 'deadlineToApply')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        {/* Add other TextField components similarly */}
                        <LoadingButton type="submit" variant="contained" loading={loading} sx={{ mt: 4, mb: 3 }}>Update Job</LoadingButton>
                        <Button variant="text" onClick={() => navigate('/jobs')} sx={{ mt: 4, mb: 3 }}>Cancel</Button>
                        <FormHelperText>{message}</FormHelperText>
                    </Box>
                </Box>
                {Modal}
            </Container>
        </div>
    );

};
export default EditJobPage;
