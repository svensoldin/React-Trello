import * as React from 'react';
import LoginForm from '@components/login-form/LoginForm.component';
import RegisterForm from '@components/register-form/RegisterForm.component';

import './LoginRegister.styles.css';

const LoginRegisterPage = () => {
  const [isRegister, setIsRegister] = React.useState(false);
  return (
    <div className='login-page'>
      {!isRegister ? <LoginForm /> : <RegisterForm />}
      <p>
        Want to {!isRegister ? 'register' : 'login'} ?{' '}
        <span onClick={() => setIsRegister(!isRegister)}>Click here</span>
      </p>
    </div>
  );
};

export default LoginRegisterPage;
