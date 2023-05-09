function validateURL(value: string): boolean {
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

    return urlRegex.test(value);
}

export { validateURL };
