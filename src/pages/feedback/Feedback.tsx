import React, { useContext } from 'react';
import { UserContext } from '../../provider';
import { StudentFeatureRequestPage } from './StudentFeatureRequestpage';

export default function FeedbackPage() {
  const user = useContext(UserContext);
  if (user?.user?.role === 'student') {
    return <StudentFeatureRequestPage></StudentFeatureRequestPage>;
  }
  return (
    <div style={{ padding: '80px' }}>
      <div>FEEDBACK PAGE</div>
      <div>
        Welcome to the feedback page where all your hopes and dreams come true!
      </div>
      <div>
        On this page you are welcome to add any feedback you like and our
        wonderful admins will be sure to take a look!
      </div>
      <button style={{ marginTop: '20px' }}>Add feedback</button>
      <br />
      <small>Note: the button is currently not functional</small>
      <div>{user?.user?.role}</div>
    </div>
  );
}
