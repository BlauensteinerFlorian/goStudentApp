import { Offer } from "./offer";

export class OfferFactory {

    static empty(): Offer {
        return new Offer(0, '', '', '', new Date(), {
            id: 0, firstname: '', lastname: '', biography: '', phone: '',
            email: '', password: '', role: 0
        }, { id: 0, title: '', description: '' }, '', '', {
            id: 0, firstname: '', lastname: '',
            biography: '', phone: '', email: '', password: '', role: 0
        });
    }

    static fromObject(rawOffer: any): Offer {
        return new Offer(
            rawOffer.id,
            rawOffer.title,
            rawOffer.start_time,
            rawOffer.end_time,
            typeof (rawOffer.date) === 'string' ?
                new Date(rawOffer.date) : rawOffer.date,
            rawOffer.user_id,
            rawOffer.subject_id,
            rawOffer.state,
            rawOffer.description,
            rawOffer.student_id,
        );
    }

}
