import React, { useContext } from 'react';
import { UserContext } from '../../provider';
import { StudentBugReportPage } from './StudentBugReportpage';

export default function BugReportPage() {
  const user = useContext(UserContext);
  if (user?.user?.role === 'student') {
    return <StudentBugReportPage></StudentBugReportPage>;
  }
  return (
    <div style={{ padding: '80px' }}>
      <div>BUG REPORT PAGE</div>
      <div>
        Welcome to the bug report page where you can report any problems you encounter!
      </div>
      <div>
        Please use this page to report any bugs you encounter and our
        wonderful admins will be sure to take a look!
      </div>
      <button style={{ marginTop: '20px' }}>Add feedback</button>
      <br />
      <small>Note: the button is currently not functional</small>
      <div>{user?.user?.role}</div>
    </div>
  );
}
