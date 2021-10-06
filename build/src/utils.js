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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.createContactTable = exports.createUserTable = exports.deleteUser = exports.findUserByEmail = exports.getContact = exports.deleteContact = exports.addContact = exports.addUser = exports.executeQueryWithParameters = exports.executeQuery = exports.executeMutation = void 0;
const db_1 = require("../db/db");
const executeMutation = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield db_1.pool.query(query);
        return "success";
    }
    catch (err) {
        console.error(err === null || err === void 0 ? void 0 : err.detail);
        return err.detail;
    }
});
exports.executeMutation = executeMutation;
const executeQuery = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield db_1.pool.query(query);
        return res.rows;
    }
    catch (err) {
        console.error(err);
    }
});
exports.executeQuery = executeQuery;
const executeQueryWithParameters = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield db_1.pool.query(query);
        return res.rows;
    }
    catch (err) {
        console.error(err);
    }
});
exports.executeQueryWithParameters = executeQueryWithParameters;
const addUser = (email, firstname, lastname, password) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {
        text: "INSERT INTO users(email, firstname, lastname, password) VALUES($1, $2, $3, $4)",
        values: [email, firstname, lastname, password],
    };
    return yield (0, exports.executeMutation)(query);
});
exports.addUser = addUser;
const addContact = (useremail, firstname, lastname, email, phone, address, note) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {
        text: "INSERT INTO contacts(useremail, firstname, lastname, email, phone, address, note) VALUES($1, $2, $3, $4,$5,$6,$7)",
        values: [useremail, firstname, lastname, email, phone, address, note],
    };
    return yield (0, exports.executeMutation)(query);
});
exports.addContact = addContact;
const deleteContact = (useremail, id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {
        text: "DELETE FROM contacts WHERE useremail = $1 AND id = $2",
        values: [useremail, id],
    };
    return yield (0, exports.executeMutation)(query);
});
exports.deleteContact = deleteContact;
const getContact = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {
        text: "SELECT * FROM contacts WHERE userEmail = $1",
        values: [userEmail],
    };
    try {
        const res = yield db_1.pool.query(query);
        return res.rows;
    }
    catch (err) {
        console.error("executeQuery", err);
        return [
            {
                id: -1,
                useremail: "",
                firstname: "",
                lastname: "",
                email: "",
                phone: "",
                address: "",
                note: "",
            },
        ];
    }
});
exports.getContact = getContact;
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {
        text: "SELECT * FROM users WHERE email = $1",
        values: [email],
    };
    return yield (0, exports.executeQueryWithParameters)(query);
});
exports.findUserByEmail = findUserByEmail;
//////////////////////////////////////////////////////////////////////////////////////////////////
//additional function not use in the code
const deleteUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {
        text: "DELETE FROM users WHERE email = $1",
        values: [email],
    };
    (0, exports.executeQueryWithParameters)(query);
});
exports.deleteUser = deleteUser;
const createUserTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    CREATE TABLE users (
        email varchar primary key,
        firstname varchar,
        lastname varchar,
        password varchar
    )
    `;
    return (0, exports.executeQuery)(query);
});
exports.createUserTable = createUserTable;
const createContactTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    CREATE TABLE contacts (
        id serial primary key,
        useremail varchar references users (email),
        firstname varchar,
        lastname varchar,
        email varchar,
        phone varchar,
        address varchar,
        note varchar
    )
    `;
    return (0, exports.executeQuery)(query);
});
exports.createContactTable = createContactTable;
const updateUser = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {
        text: `UPDATE users
           SET email = $1,
               firstname = $2,
               lastname = $3,
               password = $4  WHERE email = User.email`,
        values: [newUser.email, newUser.firstname, newUser.lastname, newUser.password],
    };
    (0, exports.executeQueryWithParameters)(query);
});
exports.updateUser = updateUser;
