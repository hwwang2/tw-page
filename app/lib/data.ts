import mysql from "mysql2/promise";
import {
  TvInfo,
} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore  } from 'next/cache';



export async function getTvInfo(page: number, size: number) {
    try {
        const db = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            port: Number(process.env.MYSQL_PORT),
            database: process.env.MYSQL_DATABASE,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD
        });
        const [result] = await db.execute("select * from tv_info where status='1' order by create_time desc limit ?, ?", [(page-1)*size,page*size]);
        await db.end();
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function getTvInfoCount() {
    try {
        const db = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            port: Number(process.env.MYSQL_PORT),
            database: process.env.MYSQL_DATABASE,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD
        });
        const [result] = await db.execute("select count(*) as cnt from tv_info where status='1'");
        await db.end();
        return result[0]["cnt"];
    } catch (error) {
        console.log(error);
        return error;
    }
}