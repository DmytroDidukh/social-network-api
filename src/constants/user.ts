enum USER_RELATIONSHIPS {
    SINGLE = 'SINGLE',
    MARRIED = 'MARRIED',
    DIVORCED = 'DIVORCED',
    SEARCHING = 'SEARCHING',
    IN_A_RELATIONSHIP = 'IN_A_RELATIONSHIP',
}

enum USER_ACCESS_TYPES {
    USER = 'USER',
    ADMIN = 'ADMIN',
    SUPER_ADMIN = 'SUPER_ADMIN',
    BANNED = 'BANNED',
}

enum USER_FIELDS_NAMES {
    ID = 'id',
    EMAIL = 'email',
    USERNAME = 'username',
    PASSWORD = 'password',
    PASSWORD_CONFIRMATION = 'passwordConfirmation',
    DESCRIPTION = 'description',
    CITY = 'city',
    HOMETOWN = 'hometown',
    RELATIONSHIPS = 'relationships',
    BIRTH_DATE = 'birthDate',
    PROFILE_PICTURE = 'profilePicture',
    COVER_PICTURE = 'coverPicture',
    FOLLOWERS = 'followers',
    FOLLOWINGS = 'followings',
    ACCESS_TYPE = 'accessType',
    EMAIL_OR_USERNAME = 'emailOrUsername',
    IS_ACTIVE = 'isActive',
    HASH = 'hash',
    SALT = 'salt',
}

export { USER_RELATIONSHIPS, USER_ACCESS_TYPES, USER_FIELDS_NAMES };
