// Euan Chree
// 1912490

// Imports
import mongoose from "mongoose";
import crypto from "crypto";
import quoteSchema from "./quote.schema.js";

// Schema for a user
const UserSchema = new mongoose.Schema({
    // Name
    name: {
        type: String,
        trim: true,
        required: "Name is required"
    },

    // Email
    email: {
        index: true,
        type: String,
        trim: true,
        unique: true,
        match: [/.+\@.+\..+/, "Please fill a valid email address"],
        required: "Email is required"
    },

    // Password
    hashed_password: {
        type: String,
        required: "Password is required"
    },

    // Password salt
    salt: String,

    // Account Updated
    updated: Date,

    // Account Created
    created: {
        type: Date,
        default: Date.now
    },

    // User Quotes
    quotes: {
        type: [quoteSchema],
        required: "Quotes is required"
    }
});

// Encrypting the password
UserSchema
    .virtual("password")
    .set(function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    })

// Methods for the scheme
UserSchema.methods = {

    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function(password) {
        if (!password) return "";
        try {
            return crypto
            .createHmac("BLAKE2b512", this.salt)
            .update(password)
            .digest("hex");
        } catch (err) {
            return "";
        }
    },

    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + "";
    }
} 

// Password validation
UserSchema.path("hashed_password").validate(function(v) {
    if (this._password && this._password.length < 6) {
        this.invalidate("password", "Password must be at least 6 characters.");
    }
    if (this.isNew && !this._password) {
        this.invalidate("password", "Password is required");
    }
    }, null)
    
// Exporting schemas
const userModel = mongoose.model("User", UserSchema);
userModel.createIndexes();
export default userModel;