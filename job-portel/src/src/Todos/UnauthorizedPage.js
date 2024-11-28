import React from 'react';

const UnauthorizedPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>403 - Unauthorized</h1>
      <p>You do not have permission to access this page.</p>
      <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
        Go back to Login
      </a>
    </div>
  );
};

export default UnauthorizedPage;
