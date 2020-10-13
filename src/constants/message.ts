import {message } from 'antd';

export const ERROR = () =>{
    message.error('Username or Password Error!');
};

export const RGT_SUCCESS = () =>{
    message.success('Register Success!');
};

export const RGT_FAIL = () =>{
    message.error('Account already exist!');
};

export const LOGIN = () =>{
    message.error('Please login before using Website !');
};
