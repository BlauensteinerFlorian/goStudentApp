import { Message } from "./message";
import { OfferFactory } from "./offer-factory";
import { UserFactory } from "./user-factory";


export class MessageFactory {

    static empty(): Message {
        return new Message(0, "", UserFactory.empty(), OfferFactory.empty(), 0, 0);
    }

    static fromObject(rawMessage: any): Message {
        return new Message(
            rawMessage.id,
            rawMessage.text,
            rawMessage.user,
            rawMessage.offer,
            rawMessage.user_id,
            rawMessage.offer_id
        );
    }
}
