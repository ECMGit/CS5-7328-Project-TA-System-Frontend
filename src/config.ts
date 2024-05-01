const backendURL =
  process.env.NODE_ENV === 'production'
    ? 'https://your-production-backend-url.com'
    : 'http://localhost:9000';

const timeoutWaitTime = 600000; //Time in milliseconds before inactivity prompt appears
const timeoutDialogTime = 30000; //Time in milliseconds before inactivity prompt kicks user to log in
export { backendURL, timeoutWaitTime, timeoutDialogTime };