import React from 'react';
import UserLayout from './user';
import MyButon from '../utils/Button';

const Dashboard = ({ user }) => {
  return (
    <UserLayout>
      <div>
        <div className='user_nfo_panel'>
          <h1>User information</h1>
          <div>
            <span>{user.userData.name} </span>
            <span>{user.userData.lastname} </span>
            <span>{user.userData.email}</span>
          </div>
          <MyButon
            type='default'
            title='Edit account info'
            linkTo='/user/user_profile'
          ></MyButon>
        </div>

        <div className='user_nfo_panel'>
          <h1>History Purchases</h1>
          <div className='user_product_block_wrapper'>{user.history}</div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Dashboard;
