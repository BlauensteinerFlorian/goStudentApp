export class ErrorMessage {
    constructor(
        public forControl: string,
        public forValidator: string,
        public text: string
    ) { }
}

export const OfferFormErrorMessages = [
    new ErrorMessage('title', 'required', 'Ein Titel muss angegeben werden'),
    new ErrorMessage('title', 'minlength', 'Ein Titel muss mindestens 4 Zeichen lang sein!'),
    new ErrorMessage('title', 'maxlength', 'Ein Titel darf maximal 250 Zeichen lang sein!'),
    new ErrorMessage('start_time', 'required', 'Es muss eine Startzeit angegeben werden.'),
    new ErrorMessage('start_time', 'minlength', 'Die Startzeit muss dem Format HH:MM entsprechen!.'),
    new ErrorMessage('start_time', 'maxlength', 'Die Startzeit muss dem Format HH:MM entsprechen!.'),
    new ErrorMessage('end_time', 'required', 'Es muss eine Endzeit angegeben werden.'),
    new ErrorMessage('end_time', 'minlength', 'Die Endzeit muss dem Format HH:MM entsprechen!.'),
    new ErrorMessage('end_time', 'maxlength', 'Die Endzeit muss dem Format HH:MM entsprechen!.'),
    new ErrorMessage('state', 'required', 'Es muss ein Status angegeben werden'),
    new ErrorMessage('date', 'required', 'Es muss ein Datum (Tag) angegeben werden'),
];

