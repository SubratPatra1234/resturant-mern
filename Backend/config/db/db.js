const mongoose=require("mongoose")

const connectDB=async(attempt = 5 , delay = 5000)=>{
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("DB connected")
  } catch (error) {
    console.log("connection failed")

    if(attempt<=0){
      console.log("we can't connect DB so we are closing")
      process.exit(1)
    }
    setTimeout(() => {
      connectDB(attempt - 1 , delay + 5000)
    }, delay);
  }
}

module.exports=connectDB