import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Row, Col} from 'antd';

import Menus from "../components/menu";
import Login from "../components/login";

const ProfilePage = () => {

    const { user, isAuthenticated } = useAuth0();
    const dark = {
        background: '#051f38',
        color: '#F8F8FF',
        height: '100%'
    }

    const light = {
        background: '#F8F8FF',
        height: '100%'
    }

    const color = localStorage.getItem('bgColor') === 'dark' ? dark : light;

    if(isAuthenticated){
        
        return (
            <Row style={color}>
                <Col span={4}>
                    <Menus/>
                </Col>
                <Col span={20}>
                    <div id={'set'} style={{display: 'flex', margin: '2%', padding: '1%', border: '2px solid #ccc'}}>
                        <div style={{width: '30%'}}>
                            <img style={{width: '80%'}} src={user.picture} alt={user.name} />
                        </div>
                        <div>
                            <span>{user.name}</span>
                            <p>Email: {user.email}</p>
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }else{
        return(<Login color={color}/>);
    }
};

export default ProfilePage;
