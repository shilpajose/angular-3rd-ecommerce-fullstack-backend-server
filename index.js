require('dotenv').config()

const express=require('express')

const server=express()
const cors=require('cors')

const port=3000 || process.env.port
server.listen(port,()=>{
    console.log(`Server started at port no ${port}`);
})


server.use(express.json())
server.use(cors())

require('./database/connections')

const router=require('./router/router')
server.use(router)