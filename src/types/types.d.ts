type LoginForm = (value: any ) => void;
type Register = (value: any) => void;
type CheckLogin = (value: any) => boolean;

type Colors = {
    theme: string,
    current: object,
}

type Menus = {
    name: string,
    to: string,
    icon: object,
    exact: boolean,
}

type Staff = {
    id: string,
    name: string,
    email: string,
    salary: number,
    dob: string,
}