import React from 'react';
import Navigation from '../pages/dashboard/components/navigation';

const DashboardLayout = ({ children }) => {
  return (
    <div className='dashboard'>
      <div className='dashboard_left'>
        <Navigation />
      </div>
      <div className='dashboard_right'>{children}</div>
    </div>
  );
};

export default DashboardLayout;
