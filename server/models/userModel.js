import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: "username",
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    bio: {
      type: String,
      default: "I am available to chat!",
    },

    profilePic: {
      type: String,
      default: "https://static.thenounproject.com/png/354384-200.png",
    },

    contacts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },

  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  try {
      if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
  } catch (err) {
    console.log (err);
  }
});

userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign(
    { id: this._id, email: this.email },
    process.env.SECRET,
    {
        expiresIn: '24h',
    }
    );

    return token;
  } catch (error) {
    console.log('error while generating token');
  }
};

const userModel = mongoose.model('User', userSchema);
export default userModel;