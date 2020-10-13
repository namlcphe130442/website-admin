import React from 'react'
import { Row, Col} from 'antd';

import Menus from '../components/menu';

const SettingPage = (props: any) => {
    return (
        <Row>
            <Col span={4}>
                <Menus />
            </Col>
            <Col span={20}>
                <div>setting</div>
            </Col>
        </Row>
    )
}

export default SettingPage;
