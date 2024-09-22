import { Link } from 'react-router-dom';
import NavigationPage from '../components/NavigationPage';

export default function Homepage() {
  return (
    <div>
      <NavigationPage />
      <h1>Homepage</h1>
      <Link to="/app">Go to the app</Link>
    </div>
  );
}
