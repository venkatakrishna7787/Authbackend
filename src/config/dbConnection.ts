import mongoose from "mongoose";
import { env } from "./env";



function connectWithDB() {
    return mongoose.connect(env.DB_URL)
}

function disConnectWithDB() {
    return mongoose.disconnect()
}


export {
    connectWithDB,
    disConnectWithDB,
}