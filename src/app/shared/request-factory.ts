import { Offer } from "./offer";
import { OfferFactory } from "./offer-factory";
import { Request } from "./request";
import { User } from "./user";
import { UserFactory } from "./user-factory";

export class RequestFactory {


    static empty(): Request {
        const offer: Offer = OfferFactory.empty();
        const user: User = UserFactory.empty();
        return new Request(0, offer, user, "Ausstehend", 0, 0);
    }

    static fromObject(rawRequest: any): Request {
        return new Request(
            rawRequest.id,
            rawRequest.offer,
            rawRequest.user,
            rawRequest.state,
            rawRequest.offer_id,
            rawRequest.user_id
        );
    }

}
