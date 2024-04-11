import axios from 'axios';
const BASE_URL = 'http://localhost:9000';
const token = localStorage.getItem('token');

export type FeedbackItem = {
  id: number;
  leftById: number;
  content: string;
  complete: boolean;
  timeSubmitted: Date;
  type: string;
};

const submitFeedback = async (content: string, type: string) => {
  const CREATE_FEEDBACK = `${BASE_URL}/feedback`;
  const response = await axios.post(
    CREATE_FEEDBACK,
    { content, type },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error('Failed to submit feedback');
  }
  const data = response.data;
  return data as FeedbackItem;
};

const getAllFeedback = async () => {
  const GET_ALL_FEEDBACK = `${BASE_URL}/feedback`; // Endpoint to fetch all feedback
  const response = await axios.get(GET_ALL_FEEDBACK, {
    headers: {
      Authorization: `Bearer ${token}`, // Assuming token is defined somewhere in the scope
    },
  });

  if (response.status !== 200) {
    throw new Error('Failed to fetch feedback');
  }

  const data = response.data;
  return data as FeedbackItem[]; // Assuming the response is an array of FeedbackItem objects
};
const FeedbackService = {
  submitFeedback,
  getAllFeedback,
};

export default FeedbackService;
