import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.less';
import Modals from 'modals';
import { routes } from 'routes';
import { Layout } from 'antd';
import Header from 'components/Header';
function App() {
  return (
    <>
      <Modals />
      <BrowserRouter>
        <Layout className="aelf-marketplace">
          <Header />
          <Layout.Content className="aelf-marketplace-content">
            <Routes>
              {routes.map((route) => {
                return <Route key={route.path} path={route.path} element={<route.element />} />;
              })}
            </Routes>
          </Layout.Content>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
