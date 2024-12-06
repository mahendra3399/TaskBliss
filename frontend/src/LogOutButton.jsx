import React from 'react';
import { BiLogOut } from 'react-icons/bi';
import useLogout from '../src/hooks/useLogout.js';

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <div
      className="position-fixed bottom-0 end-0 m-4"
      style={{ cursor: 'pointer', zIndex: 1000, backgroundColor: 'red', padding: '8px', borderRadius: '4px'}}
      onClick={logout}
    >
      {!loading ? (
        <BiLogOut
          className="w-6 h-6 text-dark"
          style={{ width: '24px', height: '24px', color: '#fff' }}
        />
      ) : (
        <div className="spinner-border text-light" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default LogoutButton;
