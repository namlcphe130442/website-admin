import React, { useEffect, useState, } from 'react';
import { Row, Col, Button , Drawer, Table, Input } from 'antd';
import { connect } from 'react-redux';
import { UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth0 } from "@auth0/auth0-react";

import Menus from '../components/menu';
import AddStaffForm from '../components/addStaffForm';
import * as action from '../actions/index';
import Login from '../components/login';

const HomePage = (props: any) => {

    const { isAuthenticated } = useAuth0();
    const [visible, setVisible] = useState(false);
    const [staffEdit, setStaffEdit] = useState('');
    const [title, setTitle] = useState('');
    const [staffSearch, setStaffSearch] = useState('');
    const [idSelect, setIdSelect] = useState(0)


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
    
    var staffs: any = null;

    useEffect(() => {
        setStaffSearch(staffs);
    }, [staffs])

    if(isAuthenticated){

        staffs = props.staffs;

        const button = {
            background: '#D4EDDA',
            padding: '5px',
            borderRadius: '10px',
            border: '2px solid #ccc',
            cursor: 'pointer'
        };

        const columns: any = [
            { 
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                sorter: (a: any, b: any) => a.id.localeCompare(b.id),
                sortDirections: ['descend', 'ascend'],
            },
            { 
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
                sorter: (a: any, b: any) => a.email.localeCompare(b.email),
                sortDirections: ['descend', 'ascend'],
            },
            { 
                title: 'Name',
                dataIndex: 'name',
                key: 'name', 
                sorter: (a: any, b: any) => a.name.localeCompare(b.name),
                sortDirections: ['descend', 'ascend'],
            },
            { 
                title: 'Salary',
                dataIndex: 'salary',
                key: 'salary', 
                sorter: (a: any, b: any) => a.salary - b.salary,
                sortDirections: ['descend', 'ascend'],
            },
            { 
                title: 'Date of birth',
                dataIndex: 'dob',
                key: 'dob', 
                sorter: (a: any, b: any) => (new Date(a.dob).getTime() - new Date(b.dob).getTime()),
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Delete Staff', dataIndex: '', key: 'x',
                render: (text: any, record: any) => (
                    <Button
                        style={button}
                        onClick={(e) => { onDelete(record.id, e); }}
                    >
                    Delete
                    </Button>
                ),
            },
            {
                title: 'Edit Staff', dataIndex: '', key: 'x',
                render: (text: any, record: any) => (
                    <Button
                        style={button}
                        onClick={(e) => { onEdit(record, e); }}
                    >
                        Edit
                    </Button>
                ),
            },
        ];

        const showStaff = () => {
            var results: any = [];
            var resultData = staffSearch === '' ? staffs : staffSearch;
            resultData.forEach((staff: any, index: number) => {
                staff.key = index;
                results.push(staff);
            });    
            let rowStyle = 'clickRowStyle';
            return (
                <Table
                    dataSource={results}
                    columns={columns}
                    onRow={(record) => {
                        return {
                            onClick: () => {setIdSelect(record.id)},
                            onDoubleClick: () => {setIdSelect(-1)},
                        };
                    }}
                    rowClassName={(record) => {
                        return record.id === idSelect ? rowStyle : '';
                    }}
                />
            );
        }

        const onClose = () => {
            setVisible(false);
        };

        const handleAddEdit = (value: any) => {
            if(staffEdit === ''){
                props.onAddStaff(value)
            }else{
                props.onEditStaffs(value);
            }
            setVisible(false);
            setStaffSearch('');
        }

        const onDelete = (key: any, e: any) => {
            e.preventDefault();
            if (window.confirm('Are you sure you wish to delete this item?'))
            props.onDeleteStaff(key);
        }

        const onEdit = (key: any, e:any) => {
            setStaffEdit(key);
            setTitle("EDIT STAFF");
            setVisible(true);
            e.preventDefault();
        }

        const onAddClick = () => {
            setStaffEdit('');
            setTitle("ADD STAFF");
            setVisible(true);
        }

        const onSearchChange = (event: any) => {
            var resultSearch: any = [];
            staffs.forEach((staff: Staff) => {
                if(staff.name.toLocaleLowerCase().indexOf(event.target.value.toLocaleLowerCase()) !== -1){
                    resultSearch.push(staff);
                }
            });
            setStaffSearch(resultSearch);
            
        }

        return (        
            <Row style={color}>
                <Col span={4}>
                    <Menus/>
                </Col>
                <Col span={20}>
                    <div style={{display:'flex', padding: '2%'}}>
                        <Input 
                            style={{marginRight: '10%'}}
                            size="large" 
                            placeholder="input search text" 
                            prefix={<UserOutlined />} 
                            onChange={event => onSearchChange(event)}
                        />
                        <Button 
                            type="primary" 
                            icon={<UserAddOutlined />} 
                            size='large' 
                            onClick={onAddClick}
                        >
                            Add Staff
                        </Button>
                    </div>
                    <div style={{margin: '2%', padding: '1%', border: '2px solid #ccc'}}>
                        {showStaff()}
                    </div>
                    <Drawer
                        title={title}
                        placement="right"
                        closable={false}
                        onClose={onClose}
                        visible={visible}
                        width={650}
                    >
                        <AddStaffForm 
                            staffEdit={staffEdit} 
                            onClickStaff={handleAddEdit}
                        />
                    </Drawer>
                </Col>
            </Row>
        );
    }
    else{
        return(
            <Login color={color}/>       
        );
    }
}

const mapStateToProps = (state:any) => {
    return {         
        staffs: state.staffs
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAddStaff : (staff: Staff) => {
            dispatch(action.addStaff(staff));
        },
        onEditStaffs : (staff: Staff) => {
            dispatch(action.editStaff(staff));
        },
        onDeleteStaff: (id: any) => {
            dispatch(action.deleteStaff(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);