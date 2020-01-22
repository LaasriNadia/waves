import React from 'react';

import MyButton from '../utils/Button';

import LoginForm from './Login';

const RegisterLogin = () => {
  return (
    <div className='page_wrapper'>
      <div className='container'>
        <div className='register_login_container'>
          <div className='left'>
            <h1>New Costumers</h1>
            <p>
              Lorem, ipsum. Lorem ipsum dolor, sit amet consectetur adipisicing
              elit. Esse impedit qui amet earum neque consequuntur, molestias
              explicabo ad ipsa eum?
            </p>
            <MyButton
              type='default'
              title='Create an account'
              linkTo='/register'
              addStyles={{
                margin: '10px 0 0 0'
              }}
            />
          </div>
          <div className='right'>
            <h2>Registered customers</h2>
            <p>If you have an account, Please log in.</p>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterLogin;
