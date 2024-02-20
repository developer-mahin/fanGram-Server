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
    password: {
      type: String,
      required: [true, 'password is required'],
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['manager', 'seller', 'superAdmin'],
    },
    passwordUpdatedAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
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
