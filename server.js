const express = require('express')
const reviewRoutes = require('./routes/review')

const app = express()
app.use(express.json())


app.use('/reviews',reviewRoutes)

app.use('*',(req,res)=>{
    res.status(404).send("not found")
})
app.listen(3000,()=>{
    console.log('server started listening on port 3000');
})