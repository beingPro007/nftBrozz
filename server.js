import { app } from "./app.js";
import { connectDB } from "./db/index.js";

connectDB().then(() => {
    app.on('error', (error) => {
        console.log(`Error happened at app listening, ${error.message}`);
    })
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is listening on the Port ${process.env.PORT || 8000}`);
    })

}).catch((error) => {
    console.log('MONGO db connection failed !!! ', err);
})