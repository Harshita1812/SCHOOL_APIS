import mysql from "mysql2/promise"
import dotenv from "dotenv";

dotenv.config();
// mySQL CONNECTION
const dataBase = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

export const addSchool = async(name, address, latitude, longitude) =>{
// INSERTING  NEW SCHOOL INTO THE DATABASE 
const query = `INSERT INTO  school (name, address, latitude, longitude) VALUES(?, ?, ?, ?)`
await dataBase.execute(query, [name, address, latitude, longitude]);
};

export const getSchools = async () =>{
    const [schools] = await dataBase.execute("SELECT * FROM school")
    return schools;
}