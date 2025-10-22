import mongoose from 'mongoose';
const connectdb= async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
console.log("database connected successfully");
    }
    catch(err){
        console.log("database connection failed");
    }
}
export default connectdb;