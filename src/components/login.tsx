import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Row, Col, Button } from 'antd';
import { LoginOutlined } from '@ant-design/icons';

import Menus from "../components/menu";


const Login = (props: any) => {

    const { loginWithRedirect} = useAuth0();
    const {color} = props;
    
    return(
        <Row style={color}>
            <Col span={4}>
                <Menus />
            </Col>
            <Col span ={20}>
                <div style={{textAlign: 'center', marginTop:'10%'}}>
                    <h4>Please login before using Website</h4>
                    <Button
                        type="primary" 
                        icon={<LoginOutlined />} 
                        size='large' 
                        onClick={() => loginWithRedirect()}
                    >
                        Login
                    </Button>
                </div>
            </Col>
        </Row>        
    );
};

export default Login;
