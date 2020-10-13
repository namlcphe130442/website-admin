import * as types from './../constants/actionTypes';

export const  listAll = () => {
    return {
        type: types.LIST_ALL
    }
}

export const addStaff = (staff: Staff) => {
    return  {
        type: types.ADD_STAFF,
        staff
    }
}

export const editStaff = (staff: Staff) => {
    return {
        type : types.EDIT_STAFF,
        staff
    }
}

export const deleteStaff = (id: any) => {
    return {
        type: types.DELETE_STAFF,
        id
    }
}