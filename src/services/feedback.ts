import axios from 'axios';
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

export type FeedbackItemWithName = FeedbackItem & {
  leftBy: {
    id: number;
    smuNo: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    resetToken: string | null;
    resetTokenExpiry: bigint | null;
    updatedAt: Date | null;
    userType: string | null;
  };
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

const setFeedbackStatus = async (id: number, status: string) => {
  const SET_FEEDBACK_STATUS = `${BASE_URL}/feedback/status/`;
  const response = await axios.post(
    SET_FEEDBACK_STATUS,
    { status, id },
    {
      headers: {
        Authorization: `Bearer ${token}`, // Assuming token is defined somewhere in the scope
      },
    }
  );

  if (response.status !== 200) {
    throw new Error('Failed to set feedback status');
  }

  const data = response.data;
  return data as FeedbackItem;
};

const getFeedbackById = async (id: number) => {
  const GET_FEEDBACK_BY_ID = `${BASE_URL}/feedback/single/${id}`; // Endpoint to fetch feedback by ID
  const response = await axios.get(GET_FEEDBACK_BY_ID, {
    headers: {
      Authorization: `Bearer ${token}`, // Assuming token is defined somewhere in the scope
    },
  });

  if (response.status !== 200) {
    throw new Error('Failed to fetch feedback');
  }

  const data = response.data as FeedbackItemWithName;
  return data;
};

const submitComment = async (feedbackId: number, content: string) => {
  const CREATE_FEEDBACK = `${BASE_URL}/feedback/comment`;
  const response = await axios.post(
    CREATE_FEEDBACK,
    { feedbackId, content },
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

const getMyComment = async (feedbackId: number) => {
  const GET_ALL_FEEDBACK = `${BASE_URL}/feedback/comment`; // Endpoint to fetch all feedback
  const response = await axios.get(GET_ALL_FEEDBACK, {
    headers: {
      Authorization: `Bearer ${token}`, // Assuming token is defined somewhere in the scope
    },
  });

  if (response.status !== 200) {
    throw new Error('Failed to fetch feedback');
  }

  const data = response.data.filter(
    (item: FeedbackComment) => item.feedbackId == feedbackId
  );
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
  getAdminComment,
  getFeedbackById,
  setFeedbackStatus,
};

export default FeedbackService;
