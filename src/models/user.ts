import { Schema, model } from 'mongoose';
import { IUserModel } from 'types/interfaces/user';
import { USER_ACCESS_TYPES, USER_FIELDS_NAMES } from 'constants/user';

const userSchema = new Schema<IUserModel>(
    {
        [USER_FIELDS_NAMES.USERNAME]: { type: String, required: true, unique: true },
        [USER_FIELDS_NAMES.EMAIL]: { type: String, required: true, unique: true },
        [USER_FIELDS_NAMES.DESCRIPTION]: { type: String, default: '' },
        [USER_FIELDS_NAMES.CITY]: { type: String, default: '' },
        [USER_FIELDS_NAMES.HOMETOWN]: { type: String, default: '' },
        [USER_FIELDS_NAMES.BIRTH_DATE]: { type: String, default: '' },
        [USER_FIELDS_NAMES.RELATIONSHIPS]: { type: String, default: null },
        [USER_FIELDS_NAMES.PROFILE_PICTURE]: { type: String, default: '' },
        [USER_FIELDS_NAMES.COVER_PICTURE]: { type: String, default: '' },
        [USER_FIELDS_NAMES.FOLLOWERS]: { type: [String], default: [] },
        [USER_FIELDS_NAMES.FOLLOWINGS]: { type: [String], default: [] },
        [USER_FIELDS_NAMES.ACCESS_TYPE]: { type: String, default: USER_ACCESS_TYPES.USER },
        [USER_FIELDS_NAMES.HASH]: { type: String, required: true },
        [USER_FIELDS_NAMES.SALT]: { type: String, required: true },
    },
    { timestamps: true },
);

const UserModel = model<IUserModel>('User', userSchema);

export { UserModel };
