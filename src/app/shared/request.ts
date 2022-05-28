import { Offer } from "./offer";
import { User } from "./user";

export class Request {
    constructor(public id: number, public offer: Offer, public user: User, public state: string) { }
}
