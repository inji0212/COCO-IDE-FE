import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import useAuthStore from '../state/AuthStore';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { memberId } = useParams<{ memberId: string }>();
  const storedMemberId = useAuthStore(state => state.memberId);

  if (!storedMemberId || storedMemberId != memberId) {
    console.log('다름');
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
