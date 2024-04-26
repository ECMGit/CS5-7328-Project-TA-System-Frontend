const backendURL =
  process.env.NODE_ENV === 'production'
    ? 'https://your-production-backend-url.com'
    : 'http://localhost:9000';

const timeoutWaitTime = 10000;
const timeoutDialogTime = 20000;
export { backendURL, timeoutWaitTime, timeoutDialogTime };