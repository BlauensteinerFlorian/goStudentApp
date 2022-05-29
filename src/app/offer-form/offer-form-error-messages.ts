export class ErrorMessage {
    constructor(
        public forControl: string,
        public forValidator: string,
        public text: string
    ) { }
}

export const OfferFormErrorMessages = [
    new ErrorMessage('title', 'required', 'Ein Titel muss angegeben werden'),
    new ErrorMessage('state', 'required', 'Es muss ein Status angegeben werden'),
    new ErrorMessage('date', 'required', 'Es muss ein Datum (Tag) angegeben werden'),
    new ErrorMessage('authors', 'required', 'Es muss ein Autor angegeben werden'),
];

