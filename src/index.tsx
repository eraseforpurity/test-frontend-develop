import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
const app = <App />;

root.render(app);
console.log('Index', 'Rendered');

reportWebVitals();
