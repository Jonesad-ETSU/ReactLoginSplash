import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import loginContext from '../../store/loginContext';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const newPasswordRef = useRef();
  const history = useHistory();
  const loginCtx = useContext(loginContext);
  const submitHandler = (event) => {
    event.preventDefault();
    const newPassword = newPasswordRef.current.value;
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:" +
    'update?key=AIzaSyDWis5lUlyd8zSfvOlpWu0B5uYfCBnD67g',
    {
      method: 'POST',
      body: JSON.stringify({
        idToken: loginCtx.token,
        password: newPassword,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(data=>{
      history.replace('/');
    });
    
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input ref={newPasswordRef} type='password' id='new-password' />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
