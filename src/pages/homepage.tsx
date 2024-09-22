import { Link } from 'react-router-dom';
import NavigationPage from '../components/navigation-page';

export default function Homepage() {
  return (
    <div>
      <NavigationPage />
      <h1>Homepage</h1>
      <Link to="/product">Product</Link>
    </div>
  );
}
