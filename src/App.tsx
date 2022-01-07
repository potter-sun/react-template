import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.less';
import Modals from 'modals';
import { routes } from 'routes';
import { Layout } from 'antd';
import Header from 'components/Header';
import { useMobile } from 'contexts/useStore/hooks';
import clsx from 'clsx';
import ItemsLayoutContext from 'contexts/useItemsLayout';
function App() {
  const isMobile = useMobile();
  return (
    <>
      <Modals />
      <BrowserRouter>
        <ItemsLayoutContext>
          <Layout className={clsx('aelf-marketplace', isMobile && 'aelf-marketplace-mobile')}>
            <Header />
            <Layout.Content className="aelf-marketplace-content">
              <Routes>
                {routes.map((route) => {
                  return <Route key={route.path} path={route.path} element={<route.element />} />;
                })}
              </Routes>
            </Layout.Content>
          </Layout>
        </ItemsLayoutContext>
      </BrowserRouter>
    </>
  );
}

export default App;
