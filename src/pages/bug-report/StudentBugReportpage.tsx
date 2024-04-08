import React, { useContext, useState } from 'react';
import { UserContext } from '../../provider';

export const StudentBugReportPage = () => {
  const user = useContext(UserContext);
  const [BugReports, setBugReports] = useState<string[]>([]);
  const [content, setContent] = useState('');

  // Function to submit BugReport
  const submit = async (content: string) => {
    // Explicitly type the parameter

    const response = await fetch('http://localhost:9000/Feedback', {
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
    setBugReports((prevBugReports) => [...prevBugReports, content]);
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
      <h1>Student Bug Report Page</h1>
      <textarea
        style={{ width: '100%' }}
        value={content}
        rows={8}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Describe the bug you encountered here"
      ></textarea>
      <button onClick={() => submit(content)}>SUBMIT</button>
      <div style={{ marginTop: '80px' }}>
        {BugReports.map((BugReport, index) => (
          <div key={index}>
            <p>{BugReport}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
