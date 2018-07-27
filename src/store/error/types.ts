import {Iaction} from "../../config/app.config";

export interface IerrorAction extends Iaction{
    error?: string,
    id?: number,
}
export interface Ierror{
    id: number,
    msg: string,
    readed: boolean,
}