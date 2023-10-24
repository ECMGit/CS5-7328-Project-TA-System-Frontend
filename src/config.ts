const backendURL =
  process.env.NODE_ENV === 'production'
    ? 'https://your-production-backend-url.com'
    : 'http://localhost:9000';

export { backendURL };