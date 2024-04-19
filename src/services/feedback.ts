import axios from 'axios';
import { isTemplateExpression } from 'typescript';
const BASE_URL = 'http://localhost:9000';
const token = localStorage.getItem('token');

export type FeedbackItem = {
  id: number;
  leftById: number;
  content: string;
  complete: boolean;
  timeSubmitted: Date;
  status: 'Unread' | 'Pending' | 'In-Progress' | 'Complete';
  type: 'bug' | 'feedback' | 'comment'; 
};

export type FeedbackComment = {
  id: number;
  feedbackId: number;
  leftById: number;
  content: string;
  timeSubmitted: Date; 
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

const getMyFeedback = async () => {
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

const getAdminFeedback = async () => {
  const GET_ALL_FEEDBACK = `${BASE_URL}/feedback/admin`; // Endpoint to fetch all feedback
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

const submitComment = async (feedbackId: number, content: string) => {
  const CREATE_FEEDBACK = `${BASE_URL}/feedback/comment`;
  const response = await axios.post(
    CREATE_FEEDBACK,
    { feedbackId, content},
    {
      headers: {
        Authorization: `Bearer ${token}`, // Ensure token is defined or accessible in this context
      },
    }
  );

  if (response.status !== 200) {
    throw new Error('Failed to submit feedback');
  }
  const data = response.data;
  return data as FeedbackComment;
};

const getMyComment = async (feedbackId : number) => {
  const GET_ALL_FEEDBACK = `${BASE_URL}/feedback/comment`; // Endpoint to fetch all feedback
  const response = await axios.get(GET_ALL_FEEDBACK, {
    headers: {
      Authorization: `Bearer ${token}`, // Assuming token is defined somewhere in the scope
    },
  });

  if (response.status !== 200) {
    throw new Error('Failed to fetch feedback');
  }

  const data = response.data.filter((item: FeedbackComment) => item.feedbackId==feedbackId);
  return data as FeedbackComment[]; // Filtering to only include items of type "comment"
};

const getAdminComment = async () => {
  const GET_ALL_FEEDBACK = `${BASE_URL}/feedback/admin`; // Endpoint to fetch all feedback
  const response = await axios.get(GET_ALL_FEEDBACK, {
    headers: {
      Authorization: `Bearer ${token}`, // Assuming token is defined somewhere in the scope
    },
  });

  if (response.status !== 200) {
    throw new Error('Failed to fetch feedback');
  }

  const data = response.data;
  return data as FeedbackComment[]; // Assuming the response is an array of FeedbackItem objects
};

const FeedbackService = {
  submitFeedback,
  getMyFeedback,
  getAdminFeedback,
  submitComment,
  getMyComment,
  getAdminComment
};

export default FeedbackService;
