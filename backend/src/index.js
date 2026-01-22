import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './db/db.js';

dotenv.config({
    path: './.env'
})

connectDB()
.then(() => {
    console.log('Database connection established');
    const port = process.env.PORT || 8000;
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`);
    })
})
.catch((error) => {
    console.error('Failed to connect to the database', error);
});

