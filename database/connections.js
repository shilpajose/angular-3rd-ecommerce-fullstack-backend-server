const mongoose=require('mongoose')

mongoose.connect(process.env.BASE_URL,{
useUnifiedTopology:true,
useNewUrlParser:true
}).then(()=>{
    console.log("____Mongodb Atlas Connected___");
}).catch(()=>{
    console.log("___Mongodb Atlas Not Connected___");
})