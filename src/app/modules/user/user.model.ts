import bcrypt from 'bcryptjs';
import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';

const userSchema = new Schema<TUser, UserModel>(
  {
    email: {
      type: String,
      required: [true, 'email is required'],
      trim: true,
      unique: true,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not a valid gender',
      },
    },
    dateOfBirth: { type: String },
    contactNo: { type: String },
    password: {
      type: String,
      required: [true, 'password is required'],
      select: 0,
    },
    imgUrl: { type: String },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['admin', 'user', 'superAdmin'],
      default: 'user',
    },
    passwordUpdatedAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  const password = this.password;
  const hashedPassword = await bcrypt.hash(password, 10);
  this.password = hashedPassword;
  next();
});

userSchema.pre('find', async function (next) {
  this.find({ isDeleted: false });
  next();
});

userSchema.pre('findOne', async function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

userSchema.statics.isUserExist = async function (id: string) {
  return await User.findById(id).select('+password');
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangeTimeStamps: Date,
  jwtIssuedTimeStamps: number,
) {
  const passwordChangedTime =
    new Date(passwordChangeTimeStamps).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimeStamps;
};

const User = model<TUser, UserModel>('User', userSchema);
export default User;
