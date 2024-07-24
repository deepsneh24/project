var express=require("express");
var mysql2=require("mysql2");
var fileuploader=require("express-fileupload");
let app=express();
app.use(fileuploader());
app.use(express.static("public"));
app.use(express.urlencoded("true"));
app.listen(2024,function(){
    console.log("server Started :-)");
})
app.get("/",function(req,resp){
    let path=__dirname+"/public/index.html";
    resp.sendFile(path);
})
/*let config={
    host:"127.0.0.1",
    user:"root",
    password:"Sneh2006@#",
    database:"project",
    dateStrings:true
}*/
let config={
    host:"bopk06bclmsvmrj4a7w8-mysql.services.clever-cloud.com",
    user:"umziasadudoevctj",
    password:"LiQKtNUidjiPxEYnUDst",
    database:"bopk06bclmsvmrj4a7w8",
    dateStrings:true,
    keepAliveInitialDelay:10000,
    enableKeepAlive:true
}
var mysql=mysql2.createConnection(config);
mysql.connect(function(err){
        if(err==null)
                console.log("Connected To Database Successfulllyyyy");
            else
            console.log(err.message);
})
app.get("/signup-process",function(req,resp){
    console.log(req.query);
    mysql.query("insert into users values(?,?,?,?,?,1)",[req.query.txtName,req.query.txtEmail,req.query.txtPwd,req.query.txtAge,req.query.type],function(err)
    {
            if(err==null)
                    resp.send("Signed Up Successfully.....");
                else
                    resp.send(err.message);
    })
})
app.get("/login-process",function(req,resp){
    console.log(req.query);
    mysql.query("select * from users where email=? and pwd=?",[req.query.txtEmail2,req.query.txtPwd2],function(err,result){
            if(err!=null)
                {
                    resp.send(err.message); 
                    return;
                }
                if(result.length==0)
                {
                    resp.send("Invalid Id or Password");
                    return;
                }
                if(result[0].status==1)
                {
                    resp.send(result[0].typee);
                     return;
                }
                else
                {
                    resp.send("You have been blocked");
                     return;
                }
})
})
app.get("/influencer-dashboard",function(req,resp){
    let path=__dirname+"/public/influencer-dashboard.html";
    resp.sendFile(path);
})
app.get("/influencer-profile",function(req,resp){
    let path=__dirname+"/public/influencer-profile.html";
    resp.sendFile(path);
})
app.post("/influencer-profile-save",function(req,resp){
    console.log(req.body);
    let filename=req.files.ppic.name;
    if(req.files!=null) 
        {
            let path=__dirname+"/public/uploads/"+filename;
            req.files.ppic.mv(path);
        }
    mysql.query("insert into iprofile values(?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.txtEmail,filename,req.body.txtName,req.body.gen,req.body.txtDob,req.body.txtAdd,req.body.txtCity,req.body.txtState,req.body.txtField,req.body.txtInsta,req.body.txtSnap,req.body.txtYT],function(err){
        if(err==null)
        {
            resp.send("Saved Successfully");
        }
        else
        {
            resp.send(err);
        }
        
    })
})
app.post("/influencer-profile-delete",function(req,resp)
{
    let email=req.body.txtEmail;
    mysql.query("delete from iprofile where email=?",[email],function(err,result)
    {
        if(err==null)
            {
                if(result.affectedRows==1) 
                resp.send("Deleted  Successfulllyyyy....");
                else
                resp.send("Invalid Email ID");
            }
        else
            resp.send(err.message);

    })
})
app.post("/influencer-profile-update",function(req,resp)
{
    let fileName="";
    if(req.files!=null)
        {
             fileName=req.files.ppic.name;
            let path=__dirname+"/public/uploads/"+fileName;
            req.files.ppic.mv(path);
        }
        else
        {
            fileName=req.body.hdn;
        }
    mysql.query("update iprofile set ppic=?,iname=?,gender=?,dob=?,address=?,city=?,state=?,field=?,insta=?,snapchat=?,youtube=? where email=?",[fileName,req.body.txtName,req.body.gen,req.body.txtDob,req.body.txtAdd,req.body.txtCity,req.body.txtState,req.body.txtField,req.body.txtInsta,req.body.txtSnap,req.body.txtYT,req.body.txtEmail],function(err,result)
    {
        if(err==null)
        {
            if(result.affectedRows>=1) 
               resp.send("Updated  Successfulllyyyy..........");
            else
                resp.send("Invalid Email ID");
            }
            else
                resp.send(err.message);
            })
          
})
app.get("/find-iprofile-details",function(req,resp)
{
    let email= req.query.txtEmail;
   
    mysql.query("select * from iprofile where email=?",[email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
            else
            {
                console.log(resultJsonAry);
                resp.send(resultJsonAry);
            }
    })

})
app.get("/booking-process",function(req,resp){
    console.log(req.query);
    mysql.query("insert into eventss values(?,?,?,?,?,?)",[req.query.txtEmail,req.query.txtTitle,req.query.txtDoe,req.query.txtTos,req.query.txtCity,req.query.txtVenue],function(err)
    {
            if(err==null)
                    resp.send("Booked Successfully.....");
                else
                    resp.send(err.message);
    })
})
app.get("/change-password",function(req,resp){
    console.log(req.query);
    mysql.query("update users set pwd=? where email=? and pwd=?",[req.query.txtNPwd,req.query.txtEmail2,req.query.txtOPwd],function(err){
        if(err==null)
            resp.send("Password Changed Sucessfully.....");
        else
            resp.send(err.message);
    })
})
app.get("/check-password",function(req,resp){
    console.log(req.query);
    mysql.query("select * from users where email=?",[req.query.txtEmail2],function(err,JsonAry){
        if(err==null)
            resp.send(JsonAry);
        else
            resp.send(err.message);
    })
})
app.get("/admin-dashboard",function(req,resp){
    let path=__dirname+"/public/admin-dashboard.html";
    resp.sendFile(path);
})
app.get("/admin-users",function(req,resp){
    let path=__dirname+"/public/admin-users.html";
    resp.sendFile(path);
})
app.get("/admin-all-influencers",function(req,resp){
    let path=__dirname+"/public/admin-all-influencers.html";
    resp.sendFile(path);
})
app.get("/fetch-all-influencers",function(req,resp)
{
    mysql.query("select * from iprofile",function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;
            }
        resp.send(resultJsonAry);
    })

})
app.get("/fetch-all-users",function(req,resp)
{
    mysql.query("select * from users",function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;
            }
        resp.send(resultJsonAry);
    })

})
app.get("/delete-user",function(req,resp)
{
    mysql.query("delete from users where email=?",[req.query.email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;
            }
            resp.send("Deleted Successfully");
       })
})
app.get("/block-user",function(req,resp)
{
    req.query.status=0;
    mysql.query("update users set status=? where email=?",[req.query.status,req.query.email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;
            }
            resp.send("Blocked Successfully");
       })
})
app.get("/unblock-user",function(req,resp)
{
    req.query.status=1;
    mysql.query("update users set status=? where email=?",[req.query.status,req.query.email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;
            }
            resp.send("Unblocked Successfully");
       })
})
app.get("/influencer-finder",function(req,resp){
    let path=__dirname+"/public/influencer-finder.html";
    resp.sendFile(path);
})
app.get("/fetch-all-fields",function(req,resp)
{
    mysql.query("select distinct field from iprofile",function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;
            }
       resp.send(resultJsonAry);
    })

})
app.get("/fetch-cities",function(req,resp)
{
    mysql.query("select * from iprofile where field=?",[req.query.field],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;
            }
       resp.send(resultJsonAry);
    })

})
app.get("/fetch-influencers-cards",function(req,resp)
{
    mysql.query("select * from iprofile where field=? and city=?",[req.query.field,req.query.city],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;
            }
       resp.send(resultJsonAry);
    })

})
app.get("/fetch-influencers-cardsbyname",function(req,resp)
{
    let name="%"+req.query.iname+"%";
    mysql.query("select * from iprofile where iname like ?",[name],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send("Not Found");
                return;
            }
       resp.send(resultJsonAry);
    })

})
app.get("/event-manager",function(req,resp){
    let path=__dirname+"/public/event-manager.html";
    resp.sendFile(path);
})
app.get("/fetch-all-events",function(req,resp)
{
    mysql.query("select * from eventss where email=?",[req.query.email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;
            }
       resp.send(resultJsonAry);
    })

})
app.get("/delete-event",function(req,resp)
{
    mysql.query("delete from eventss where doe=? and tos=? and email=?",[req.query.doe,req.query.tos,req.query.email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;
            }
            resp.send("Deleted Successfully");
       })
})
app.get("/client-profile-save",function(req,resp){
    console.log(req.query);
    mysql.query("insert into cprofile values(?,?,?,?,?,?)",[req.query.txtEmail,req.query.txtName,req.query.txtCity,req.query.txtState,req.query.txtOrg,req.query.txtContact],function(err){
        if(err==null)
        {
            resp.send("Saved Successfully");
        }
        else
        {
            resp.send(err);
        }
        
    })
})
app.get("/client-profile-delete",function(req,resp)
{
    let email=req.query.txtEmail;
    mysql.query("delete from cprofile where email=?",[email],function(err,result)
    {
        if(err==null)
            {
                if(result.affectedRows==1) 
                resp.send("Deleted  Successfulllyyyy....");
                
            }
        else
            resp.send(err.message);
    })
})
app.get("/client-profile-update",function(req,resp)
{
    mysql.query("update cprofile set cname=?,city=?,state=?,org=?,mobile=? where email=?",[req.query.txtName,req.query.txtCity,req.query.txtState,req.query.txtOrg,req.query.txtContact,req.query.txtEmail],function(err,result)
    {
        if(err==null)
        {
            if(result.affectedRows>=1) 
               resp.send("Updated  Successfulllyyyy");
            }
            else
                resp.send(err.message);
            })    
})
app.get("/find-cprofile-details",function(req,resp)
{
    let email= req.query.txtEmail;
    mysql.query("select * from cprofile where email=?",[email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;
            }
            else
            {
                console.log(resultJsonAry);
                resp.send(resultJsonAry);
            }
    })
})
app.get("/checking-client",function(req,resp)
{
    mysql.query("select * from cprofile where email=?",[req.query.txtEmail],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;
            }
       resp.send(resultJsonAry);
    })

})
app.get("/checking-influencer",function(req,resp)
{
    mysql.query("select * from iprofile where email=?",[req.query.txtEmail],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;
            }
       resp.send(resultJsonAry);
    })

})
app.get("/client-profile",function(req,resp){
    let path=__dirname+"/public/client-profile.html";
    resp.sendFile(path);
})
app.get("/influencer-finder",function(req,resp){
    let path=__dirname+"/public/influencer-finder.html";
    resp.sendFile(path);
})
