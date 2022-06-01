export class ErrorMessage {
    constructor(
        public forControl: string,
        public forValidator: string,
        public text: string
    ) { }
}

export const MessageFormErrorMessages = [
    new ErrorMessage('text', 'required', 'Es muss eine Nachricht eingegeben werden!'),
];

