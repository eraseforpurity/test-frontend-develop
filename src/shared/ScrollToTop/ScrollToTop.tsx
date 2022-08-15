import { FC, memo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const { pathname } = useLocation();
  useEffect(() => {
    if (window.scrollY > 100) {
      try {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      } catch {
        window.scrollTo(0, 0);
      } finally {
        console.log('Scrolling to the top...', window);
      }
    }
    return undefined;
  }, [pathname]);

  return children;
};

export default memo(ScrollToTop);
