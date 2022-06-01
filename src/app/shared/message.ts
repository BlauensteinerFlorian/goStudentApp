import { Offer } from "./offer";
import { User } from "./user";

export class Message {
    constructor(public id: number, public text: string, public user: User, public offer: Offer, public user_id?: number, public offer_id?: number) { }
}
