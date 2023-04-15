function convertErrorsArrayToMessage(initialMessage: string, errors: string[]): string {
    let message = initialMessage;

    if (errors.length === 1) {
        message = [message, ` ${errors[0]}`].join('');
    } else {
        errors.forEach((error, index) => {
            message = [message, '\n', `${index + 1}. ${error}`].join('');
        });
    }

    return message;
}

export { convertErrorsArrayToMessage };
