import React, { useContext, useState } from 'react';
import { UserContext } from '../../provider';

export const StudentFeatureRequestPage = () => {
  const user = useContext(UserContext);
  const [feedbacks, setFeedbacks] = useState<string[]>([]);
  const [content, setContent] = useState('');

  // Function to submit feedback
  const submit = async (content: string) => {
    // Explicitly type the parameter
    const response = await fetch('http://localhost:9000/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: content,
        userId: user?.user?.id,
      }),
    });

    const data = await response.json();
    console.log(data);
    setFeedbacks((prevFeedbacks) => [...prevFeedbacks, content]);
    setContent(''); // Clear the textarea
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        padding: '30px',
      }}
    >
      <h1>Student Feedback Page</h1>
      <textarea
        style={{ width: '100%' }}
        value={content}
        rows={8}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter feedback here"
      ></textarea>
      <button onClick={() => submit(content)}>SUBMIT</button>
      <div style={{ marginTop: '80px' }}>
        {feedbacks.map((feedback, index) => (
          <div key={index}>
            <p>{feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
