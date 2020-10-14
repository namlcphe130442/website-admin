import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Menu } from 'antd';
import { HomeOutlined , SettingFilled,ProfileOutlined  } from '@ant-design/icons';
import { useAuth0 } from "@auth0/auth0-react";
import 'antd/dist/antd.css';

const listMenu: Array<Menus> = [
    {
        name: "Home",
        to: '/home',
        icon: <HomeOutlined />,
        exact: false
    },
    {
        name: 'Profile',
        to: '/profile',
        icon: <ProfileOutlined/>,
        exact: false
    },
    {
        name: 'Setting',
        to: '/setting',
        icon: <SettingFilled/>,
        exact: false
    }
];

const Menus = (props:any) => {

    const history = useHistory();
    const [statusUser, setStatusUser] = useState('');
    const { isAuthenticated } = useAuth0();
    const theme =  localStorage.getItem('bgColor') === 'dark' ? 'dark' : 'light';

    useEffect(() => {
        const status = isAuthenticated === true ? 'Logout' : 'Login';
        setStatusUser(status);
    }, [isAuthenticated]) 

    const showMenu = () => {
        var result = null;
        
        if(listMenu.length > 0) { 
            result = listMenu.map((menu:Menus, index: number) => {               
                return (
                    <Menu.Item key={menu.to} icon={menu.icon}>{menu.name}</Menu.Item>
                )
            });
        }
        return result;
    }

    const handleMenuClick = (e: any) => {
        history.push(e.key);
    };
    const { logout, loginWithRedirect } = useAuth0();

    const handleClick = () => {
        if(isAuthenticated){
            logout({ returnTo: window.location.origin });
        }else{
            loginWithRedirect();            
        }
    }

    return (
        <>
            <Menu
                onClick={handleMenuClick}
                style={{ width: '100%', height: '100%', borderRight: '2px solid silver'}}
                defaultOpenKeys={['sub1']}
                theme={theme}
            >
                {showMenu()}
                <Menu.Item>
                    <Button onClick={handleClick}>{statusUser}</Button>
                </Menu.Item>
            </Menu>
        </>

    );
}

export default Menus;