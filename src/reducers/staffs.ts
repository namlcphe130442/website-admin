import * as types from './../constants/actionTypes';
import JsonData from './../content/myContent.json'

const data :string|null = localStorage.getItem('staffs');

var dataStaffs: Array<Staff> = [];

dataStaffs = data !== null ? JSON.parse(data) : JsonData;

const  initialState: Array<Staff> = dataStaffs ? dataStaffs : [];

const s4 = () => {
    return Math.floor((1+ Math.random()) * 0x10000).toString(16).substring(1);
    
}

const generateId = () => {
    return s4() + s4() + '-' + s4() + '-' + s4() + s4() + '-' + s4()
}

var findIndex = (id: string, staffs: Array<Staff>) => {
    var result = -1;
    staffs.forEach((staff, index) => {
        if(staff.id === id){
            result = index;
        }
    });
    return result;
}

var index: number = -1;

const myReducer = (state = initialState, action :any) => {
    switch(action.type) {
        case types.LIST_ALL:
            return [...state];

        case types.ADD_STAFF:
            var newStaff = {
                id: generateId(),
                name: action.staff.name,
                email: action.staff.email,
                salary: action.staff.salary,
                dob: action.staff.dob,
            }
            state.push(newStaff);
            localStorage.setItem('staffs', JSON.stringify(state));
            return [...state];
        case types.EDIT_STAFF:
            var newStaf = {
                id: action.staff.id,
                name: action.staff.name,
                email: action.staff.email,
                salary: action.staff.salary,
                dob: action.staff.dob,
            }
            index = findIndex(newStaf.id,  state);
            state[index] = newStaf
            localStorage.setItem('staffs', JSON.stringify(state));            
            return [...state];

        case types.DELETE_STAFF:
            var staff_delete_id = action.id;
            index = findIndex(staff_delete_id,  state);
            state.splice(index, 1);
            localStorage.setItem('staffs', JSON.stringify(state));
            return [...state];

        default: return state;
    }
};

export default myReducer;