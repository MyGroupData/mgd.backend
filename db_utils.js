"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pgHostIp = "192.168.99.100"; //for docker tool box
//pgHostIp = "127.0.0.1";//for docker for winodws
var myoptions = {
    client: 'pg',
    connection: {
        host: pgHostIp,
        user: 'postgres',
        password: 'postgres',
        database: 'pgdb'
    }
};
// const promise = new Promise((resolve, reject)=>{
//     resolve(123);
//     reject(321);
// })
var Users = "users";
var mgdXnex = /** @class */ (function () {
    function mgdXnex() {
        this.knex = require('knex')(myoptions);
    }
    mgdXnex.prototype.createUsersTable = function () {
        var _this = this;
        //check if table exists
        this.knex.schema.hasTable(Users).then(function (exists) {
            if (!exists) {
                _this.knex.schema.createTable(Users, function (table) {
                    table.increments('id');
                    table.string('name');
                    table.date('birthday');
                }).then(function () { return console.log("table created"); })
                    .catch(function (err) {
                    console.log(err);
                    throw err;
                })
                    .finally(function () {
                    console.log("finally of createTable called");
                });
            }
            else
                console.log(Users + " table exists, returing");
        });
    };
    mgdXnex.prototype.insertUser = function (userName, birthday) {
        this.knex(Users).insert({
            name: userName,
            birthday: birthday
        }).then(function () {
            console.log("insert user done");
        }).catch(function (err) {
            console.log(err);
        });
    };
    mgdXnex.prototype.getUsers = function (resFunc) {
        var res = this.knex.select('*').table(Users)
            .then(function (rows) {
            resFunc(JSON.stringify(rows));
        });
    };
    return mgdXnex;
}());
exports.mgdXnex = mgdXnex;
//# sourceMappingURL=db_utils.js.map