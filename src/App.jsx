import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { routesDeveloper } from './routes/routesDeveloper';
import { StoreProvider } from './store/StoreContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <Router>
          <Routes>
            {routesDeveloper.map((routeProps, key) => (
              <Route key={key} {...routeProps} />
            ))}

            <Route path="*" element={<>page not found.</>} />
          </Routes>
        </Router>
      </StoreProvider>
    </QueryClientProvider>
  );
}

export default App;