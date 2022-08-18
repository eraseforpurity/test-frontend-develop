import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { FC } from 'react';
import Home from '../Home/Home';
import RemixesPage from '../RemixesPage/RemixesPage';
import Layout from '../Layout/Layout';
import ScrollToTop from '../../shared/ScrollToTop/ScrollToTop';
import NotFound from '../NotFound/NotFound';

const AppRoutes: FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/remixes" element={<RemixesPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
};
export default AppRoutes;
