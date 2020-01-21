import React from 'react';
import DashboardLayout from '../../hoc/dashboardLayout';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className='dashboard_wrapper'>
        <h1 className='dashboard_header'>This is your dashboard</h1>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
