import { Switch, Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import loginContext from './store/loginContext';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

function App() {
  const loginCtx = useContext(loginContext);
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        { !loginCtx.isLoggedIn && <Route path='/auth'>
          <AuthPage />
        </Route> }
        { loginCtx.isLoggedIn && <Route path='/profile'>
          <UserProfile />
        </Route>}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
