const express = require('express')
const PORT = 3000
const app = express()
const fs = require('fs')
app.use(express.json())
app.use(express.static("./static"))
const {verifyEmail,middleWareVerfication} = require("./utils")
app.get("/emails",(req,res)=>{
    let {image,contact, message,name,email} = req.body
    fs.readFile("./db/emails.json",(err,dataFile)=>{
        let emails = JSON.parse(dataFile.toString()).emails
        if(err)
            return res.status(404).send("Eroor on the server ")
        res.status(200).json(emails)
    })
})

app.post("/emails",middleWareVerfication,(req,res)=>{
    let {image,contact, message,name,email} = req.body
    fs.readFile("./db/emails.json",(err,dataFile)=>{
        let data = JSON.parse(dataFile.toString())
        let emails =  data.emails
        let emailsToSave = {
            id:data.lastId,
            image,
            contact,
            message,
            name,
            email
        }
        emails.push(emailsToSave)
        data.lastId++
        fs.writeFile("./db/emails.json",JSON.stringify(data,null,4),(err)=>{
            if(err)
                return res.status(500).send("Eroor on the server ")
            res.status(201).json(emailsToSave)
        })
    })
})

app.delete("/emails/:id",(req,res)=>{
    let {id} = req.params
    fs.readFile("./db/emails.json",(err,dataFile)=>{
        if(err)
            return res.status(500).send("Error on the server ")
        let data = JSON.parse(dataFile.toString())
        let emails = data.emails
        let emailsIndex = emails.findIndex(ele=>ele.id == id )
        if(emailsIndex == -1 )
            return res.status(404).send("Question Not Found")
        data.emails = emails.filter(ele=>ele.id != id)
        fs.writeFile("./db/emails.json",JSON.stringify(data,null,4),(err)=>{
            if(err)
                return res.status(500).send("Error on the server ")            
            res.status(200).send("the email deleted successfully ! ")
        })  
        
    })
})

app.put("/emails/:id",middleWareVerfication,(req,res)=>{
   
})


app.listen(PORT,()=>{
    console.log("Server Started at :",PORT);
})