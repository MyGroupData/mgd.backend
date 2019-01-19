import { promisify } from "util";

const pgHostIp = "192.168.99.100";//for docker tool box
//pgHostIp = "127.0.0.1";//for docker for winodws

const myoptions = {
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

const Users = "users";

export class mgdXnex {
    constructor() { }

    knex = require('knex')(myoptions);

    public createUsersTable() {

        //check if table exists
        this.knex.schema.hasTable(Users).then((exists) => {
            if (!exists) {
                this.knex.schema.createTable(Users, (table) => {
                    table.increments('id')
                    table.string('name')
                    table.date('birthday')
                }).then(() => console.log("table created"))
                    .catch((err) => {
                        console.log(err); throw err
                    })
                    .finally(() => {
                        console.log("finally of createTable called")
                    });
            }
            else
                console.log(Users + " table exists, returing")
        })
    }

    public insertUser(userName: String, birthday: Date) {
        this.knex(Users).insert({
            name: userName,
            birthday: birthday
        }).then(function () {
            console.log("insert user done");
        }).catch(function (err) {
            console.log(err);
        })
    }

   
    public getUsers(resFunc){
        var res =  this.knex.select('*').table(Users)
        .then((rows) => {
            resFunc(JSON.stringify(rows));
        })
    }
}


