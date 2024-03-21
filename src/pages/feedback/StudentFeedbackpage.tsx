import React, { useContext, useState } from 'react';
import { UserContext } from '../../provider';

export const StudentFeedbackPage = () => {
  const user = useContext(UserContext);

  const [content, setContent] = useState("");
  const submit = async(content: string) => {
    const response = await fetch('http://localhost:9000/feedback', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: content,
        userId: user?.user?.id
      })
    })

    const data = await response.json();
    console.log(data);

  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "2px",
      padding: "30px"
    }}>
      <h1>student feedback page</h1>
      <textarea
        style={{width: "100%"}}
        value={content}
        rows={8}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter feedback here"
      ></textarea>
      <button onClick={() => {
        submit(content);
      }}>SUBMIT</button>
      <div style={{marginTop: "80px"}}>list of issues here myabe</div>
    </div>
  );

};
