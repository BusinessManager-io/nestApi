import mongoose, { model, Schema } from "mongoose";
import { UserInterface } from "../interfaces/user.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

interface UserModel extends UserInterface, mongoose.Document {
    comparePassword(password: string): Promise<boolean>;
    gerateToken(): string;
}

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: false,
    },
});

UserSchema.pre<UserModel>("save", async function cryptoPassword() {
    this.password = await bcrypt.hash(this.password as string, 8);
});

UserSchema.pre<UserModel>("save", function gerateAvatar() {
    this.avatar = `https://dog.ceo/api/breeds/image/random`;
});

UserSchema.methods.comparePassword = function (
    password: string
): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.gerateToken = function (): string {
    const decodedToken = {
        _id: String(this.id),
        name: this.name,
        avatar: this.avatar,
    };

    return jwt.sign(decodedToken, process.env.SECRETKEY as string, {
        expiresIn: "1d",
    });
};

export default model<UserModel>("User", UserSchema);
