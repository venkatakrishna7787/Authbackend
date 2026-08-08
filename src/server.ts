
import app from './app';
import { connectWithDB, disConnectWithDB } from './config/dbConnection';
import { env } from './config/env';

async function startServer() {
    try {
        await connectWithDB();
        app.listen(env.PORT, () => {
            console.log("Server Started")
        })
    } catch (error) {
        await disConnectWithDB();
        process.exit(1) // 1 indicates the application terminated due to an error.
    }
}

process.on("SIGINT", async () => {
    await disConnectWithDB();
    process.exit(0); //0 indicates the application terminated successfully.
})

startServer();

