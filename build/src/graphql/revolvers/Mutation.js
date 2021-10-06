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
exports.Mutation = void 0;
const utils_1 = require("../../utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.Mutation = {
    addUser: (parent, { firstname, lastname, email, password }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const encryptedPwd = yield bcryptjs_1.default.hash(password, 12);
        if (!encryptedPwd)
            return false;
        let result = "";
        result = yield (0, utils_1.addUser)(email, firstname, lastname, encryptedPwd);
        if (result !== "success") {
            throw new Error(result);
        }
        return result === "success";
    }),
    addContact: (parent, { useremail, firstname, lastname, email, phone, address, note }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, utils_1.addContact)(useremail, firstname, lastname, email, phone, address, note);
        if (result !== "success") {
            throw new Error(result);
        }
        return result !== "success";
    }),
    deleteContact: (parent, { token, id }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        }
        catch (error) {
            return false;
        }
        const { email } = decoded;
        const done = yield (0, utils_1.deleteContact)(email, id);
        if (done !== "success") {
            throw new Error(done);
        }
        return true;
    }),
};
