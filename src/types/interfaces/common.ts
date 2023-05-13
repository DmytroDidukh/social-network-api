interface IResponseMessage {
    message: string;
}

interface IResponseDateMessage extends IResponseMessage {
    irrevocablyDeletedAt?: string;
}

export { IResponseMessage, IResponseDateMessage };
