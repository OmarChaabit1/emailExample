const verifyEmail = (image,contact, message,name,email)=>{
    if( !contact || !email || !message || !name  ||  !image )
        return {state:false , msg:"contact , image , msg , email and name are required"}
    if( contact.length <= 4)
        return {state:false , msg:"contact must contains at least 4 caracters "}
    if( message.length <= 10)
        return {state:false , msg:"message must contains at least 10 caracters "}
    if( name.length <= 6)
        return {state:false , msg:"name must contains at least 6 caracters "}
        
        return {state:true , msg:""}
}
const middleWareVerfication = (req,res,next)=>{
    let {image,contact, message,name,email} = req.body 
    let {state,msg} = verifyEmail(image,contact,message,name,email)
    if(state)
        return next()
    res.status(400).send(msg)
}
module.exports = {
    verifyEmail,middleWareVerfication
}