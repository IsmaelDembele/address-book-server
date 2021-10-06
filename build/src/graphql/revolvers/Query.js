"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../../utils");
const dotenv_1 = __importDefault(require("dotenv"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
dotenv_1.default.config();
exports.Query = {
    login: (parent, { email, password }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (email.length === 0 || password.length < 5)
            return "";
        const user = yield (0, utils_1.findUserByEmail)(email);
        if (!user || ((_a = user[0]) === null || _a === void 0 ? void 0 : _a.email) !== email)
            return "";
        let token = "";
        let err = [];
        if (yield bcryptjs_1.default.compare(password, user[0].password)) {
            // the username, password combination is successful
            try {
                token = jsonwebtoken_1.default.sign({
                    email: user[0].email,
                    firstname: user[0].firstname,
                    lastname: user[0].lastname,
                }, process.env.JWT_SECRET, { expiresIn: 24 * 60 * 60 * 1000 });
            }
            catch (error) {
                err.push(error);
            }
        }
        if (err.length > 0) {
            throw new Error("can't generate a sign in token");
        }
        return token;
    }),
    getContacts: (parent, { useremail }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const contacts = yield (0, utils_1.getContact)(useremail);
        if (contacts.length > 0 && contacts[0].id === -1) {
            throw new Error("error trying to get contact list");
        }
        return contacts;
    }),
    verifyToken: (parent, { token, useremail }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        if (token.length === 0 || useremail.length === 0) {
            return false;
        }
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        }
        catch (error) {
            console.log("Invalid token");
            return false;
        }
        const { email } = decoded;
        return email === useremail;
    }),
};
