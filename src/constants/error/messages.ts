const USER_VALIDATION_ERROR_MESSAGES = {
    EMAIL: 'Please provide a valid email',
    PASSWORD:
        // eslint-disable-next-line max-len
        'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character',
    PASSWORD_CONFIRMATION: 'Password confirmation does not match password',
    USERNAME_EMPTY: 'Please provide your username',
    USERNAME_INVALID: 'Username  must contain at least 2 characters',
};

export { USER_VALIDATION_ERROR_MESSAGES };
