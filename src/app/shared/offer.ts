import { Subject } from "./subject";
import { User } from "./user";

export class Offer {
    constructor(public id: number, public title: string, public start_time: string, public end_time: string, public date: Date,
        public user: User, public subject: Subject, public state?: string, public description?: string, public student?: User) { }
}
