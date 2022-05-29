import { Subject } from "./subject";
import { User } from "./user";

export class Offer {
    constructor(public id: number, public title: string, public start_time: string, public end_time: string, public date: string,
        public user: User, public subject: Subject, public state?: string, public description?: string, public student?: User, public user_id?: number, public subject_id?: number) { }
}
