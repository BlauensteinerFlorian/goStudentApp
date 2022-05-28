export class User {
    constructor(public id: number, public firstname: string, public lastname: string, public password: string,
        public email: string, public role: number, public biography?: string, public phone?: string) { }
}
