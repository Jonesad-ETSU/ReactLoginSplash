import { Link, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import loginContext from '../../store/loginContext';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const loginCtx = useContext(loginContext);
  const history = useHistory();
  const loggedIn = loginCtx.isLoggedIn;
  const logoutHandler = () => {
    loginCtx.logout();
    history.replace('/');
  };
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          { !loggedIn && <li>
            <Link to='/auth'>Login</Link>
          </li> }
          {loggedIn && <li>
            <Link to='/profile'>Profile</Link>
          </li>}
          {loggedIn && <li>
             <button onClick={logoutHandler}>Logout</button>
          </li>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
