import {IRole} from "./IRole";

export interface IUser {
    email: string;
    firstName: string;
    lastName: string;
    roles: IRole[]
}
