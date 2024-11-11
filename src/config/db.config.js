import mongoose from 'mongoose';

export const dbconnection = (next) => {
    try {
        mongoose.connect(process.env.MONGO_URI, ()=> console.log("Connected to mongo"));
    } catch (error) {
        next(error);
    }
}