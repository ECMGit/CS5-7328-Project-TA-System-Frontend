import React, { useState, useEffect } from 'react';
import { getAllTaEvaluations } from '../../services/evaluate';
import { useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Container,
  LinearProgress,
  Grid,
  Typography,
  IconButton
} from '@mui/material';
import useAutoLogout from '../../components/AutoLogOut';

type PerformanceResult = {
  taUserId: number;
  facultyUserId: number;
  courseId: number;
  teachingSkill: number;
  mentoringSkill: number;
  effectiveCommunication: number;
  comments: string;
};



const ratingToPercentage = (rating: number) => (rating / 10) * 100;

const PerformanceResultPage: React.FC = () => {
  const { Modal } = useAutoLogout();
  const [results, setResults] = useState<PerformanceResult[]>([]);
  const location = useLocation();
  const currentTaId = location.state?.user.id;
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentTaId) {
      console.error('No TA information available.');
      return;
    }
    const fetchResults = async () => {
      try {
        const data = await getAllTaEvaluations();
        const filteredResults = data.filter((result) => result.taUserId === currentTaId);
        setResults(filteredResults);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error:', error.message);
          alert('Failed to fetch performance results: ' + error.message);
        } else {
          console.error('An unexpected error occurred:', error);
          alert('An unexpected error occurred while fetching performance results');
        }
      }
    };

    fetchResults();
  }, []);

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <IconButton onClick={() => navigate(-1)} sx={{ mb: 2 }}>
          {' '}
          {/* Back button with navigate */}
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          style={{ textAlign: 'center' }}
        >
          TA Performance Results
        </Typography>
        {results.map((result) => (
          <Card
            variant="outlined"
            key={result.courseId}
            sx={{ marginBottom: 2 }}
          >
            <CardContent>
              <Typography variant="h6">TA: {result.taUserId}</Typography>
              <Typography color="textSecondary">
                Professor: {result.facultyUserId}
              </Typography>
              <Typography color="textSecondary" mb={2}>
                Course: {result.courseId}
              </Typography>

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <Typography>Teaching Skills:</Typography>
                </Grid>
                <Grid item xs={4}>
                  <LinearProgress
                    variant="determinate"
                    value={ratingToPercentage(result.teachingSkill)}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Typography>{result.teachingSkill}/10</Typography>
                </Grid>
              </Grid>

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <Typography>Mentoring Skills:</Typography>
                </Grid>
                <Grid item xs={4}>
                  <LinearProgress
                    variant="determinate"
                    value={ratingToPercentage(result.mentoringSkill)}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Typography>{result.mentoringSkill}/10</Typography>
                </Grid>
              </Grid>

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <Typography>Effective Communication:</Typography>
                </Grid>
                <Grid item xs={4}>
                  <LinearProgress
                    variant="determinate"
                    value={ratingToPercentage(result.effectiveCommunication)}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Typography>{result.effectiveCommunication}/10</Typography>
                </Grid>
              </Grid>

              <Typography variant="body1">
                Comment: {result.comments}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      {Modal}
    </Container>
  );
};

export default PerformanceResultPage;
