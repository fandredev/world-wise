import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? <>{children}</> : null;
}
