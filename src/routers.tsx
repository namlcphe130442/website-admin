import React from 'react';

import Menu from './components/menu';
import HomePage from './pages/homePage';
import ProfilePage from './pages/profilePage';
import SettingPage from './pages/settingPage';

const routers = [
    {
        path: '/',
        exact: true,
        main : () => <Menu />
    },
    {
        path: '/home',
        exact: false,
        main: () => <HomePage />
    },
    {
        path: '/setting',
        exact: false,
        main: () => <SettingPage />
    },
    {
        path: '/profile',
        exact: false,
        main: () => <ProfilePage />
    }

];

export default routers;