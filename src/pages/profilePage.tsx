import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Row, Col} from 'antd';

import Menus from "../components/menu";
import Login from "../components/login";

const ProfilePage = () => {
    const { user, isAuthenticated } = useAuth0();

    if(isAuthenticated){
        // const img = new Image();
        // img.onload = function() {
        // alert(img.width + 'x' + img.height);
        // }
        // img.src = user.picture;
        

        return (
            <Row>
                <Col span={4}>
                    <Menus/>
                </Col>
                <Col span={20}>
                    <div id={'set'} style={{display: 'flex', margin: '2%', padding: '1%', border: '2px solid #ccc'}}>
                        <div style={{width: '30%'}}>
                            <img style={{width: '80%'}} src={user.picture} alt={user.name} />
                        </div>
                        <div>
                            <h2>{user.name}</h2>
                            <p>Email: {user.email}</p>
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }else{
        return(<Login />);
    }
};

export default ProfilePage;
