import React, {useState} from 'react'
import { Row, Col, Switch} from 'antd';

import Menus from '../components/menu';

interface Color {
    color: Colors | undefined
}

const SettingPage = () => {

    const dark = {
        background: '#051f38',
        color: '#F8F8FF',
        height: '100%'
    }

    const light = {
        background: '#F8F8FF',
        height: '100%'
    }

    const theme =  localStorage.getItem('bgColor') === 'dark' ? 'dark' : 'light';

    const initialColor: Color["color"] = {
        theme: theme,
        current: theme === 'dark' ? dark : light,
    }

    const [color, setColor] = useState(initialColor);
    
    const changeTheme = (value: any) => {
        localStorage.setItem('bgColor', value ? 'light' : 'dark');
        setColor({
            ...color,
            current: value ? light : dark,
            theme: value ? 'light' : ''
        });
    };

    return (
        <Row style={color.current}>
            <Col span={4}>
                <Menus />
            </Col>
            <Col span={20} style={{marginTop: '3%', paddingLeft: '3%'}}>
            <span>Dark Mode:</span>
            <Switch
                style={{position: "fixed", marginLeft: '3%'}}
                checked={color.theme === 'light'}
                onChange={changeTheme}
                checkedChildren="Light"
                unCheckedChildren="Dark"
            />
            </Col>
        </Row>
    )
}

export default SettingPage;
