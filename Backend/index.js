let express=require("express");
let app=express();
let path=require("path");
const cors = require('cors');
let bodyParser=require('body-parser') 
let compiler=require("compilex")
let options={stats:true}
let mongoose=require("./database.js")
const { ObjectId } = require('mongodb');

compiler.init(options);
app.use(cors());
app.use("/codemirror-5.65.19",express.static("C:/Users/KK/Desktop/MERN code editor/code_editor_project/Backend/node_modules/codemirror"))
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname)));
app.use(express.json());




app.listen(3000,function(){
    console.log("server started on port 3000")
})  

app.post("/code/workplace/compile",function(req,res){
    let {code,language,input}=req.body;
    console.log(input) 
    if(language=="C++"){
        var envData = { OS : "windows" , cmd : "g++", options: { timeout: 5000 }};  
        if(input){
            compiler.compileCPPWithInput(envData , code , input , function (data) {
                if (res.headersSent) return;
                if (data.error) {
                    res.send({ error: data.error });
                    return;
                }
                res.send({ output: data.output });
                compiler.flush(function(){console.log("Deleted")});
            });
        }
        else{
            compiler.compileCPP(envData , code , function (data) {
                if (res.headersSent) return;
                if (data.error) {
                    res.send({ error: data.error });
                    return;
                }
                res.send({ output: data.output });
                compiler.flush(function(){console.log("Deleted")}); 
            });
        }
    } 
    else if(language=="Java"){
        var envData = { OS : "windows", options: { timeout: 5000 }};
        if(input){
            compiler.compileJavaWithInput( envData , code , input ,  function(data){
                if (res.headersSent) return;
                if (data.error) {
                    res.send({ error: data.error });
                    return;
                }
                res.send({ output: data.output });
                compiler.flush(function(){console.log("Deleted")});
            });
        }
        else {
            compiler.compileJava( envData , code , function(data){
                if (res.headersSent) return;
                if (data.error) {
                    res.send({ error: data.error });
                    return;
                }
                res.send({ output: data.output });
                compiler.flush(function(){console.log("Deleted")}); 
            }); 
        }
    }
    else if(language=="Python"){
        var envData = { OS : "windows", options: { timeout: 5000 }};
        if(input){
            compiler.compilePythonWithInput( envData , code , input ,  function(data){
                if (res.headersSent) return;
                if (data.error) {
                    res.send({ error: data.error });
                    return;
                }
                res.send({ output: data.output }); 
                compiler.flush(function(){console.log("Deleted")});      
            });
        }
        else{
            compiler.compilePython( envData , code , function(data){
                if (res.headersSent) return;
                if (data.error) {
                    res.send({ error: data.error });
                    return;
                }
                res.send({ output: data.output }); 
                compiler.flush(function(){console.log("Deleted")}); 
            });   
        }
    } 
    
})

app.get("/code/workplace/stroage/get",async function(req,res){
    let db=mongoose.connection.db;
    let Workspace=db.collection("workspace");
    let data=await Workspace.find({}).toArray();
    res.send({workspaces:data});
    return;
})

app.get("/code/workplace/stroage/get/:id",async function(req,res){
    let {id}=req.params;
    let db=mongoose.connection.db;
    let Workspace=db.collection("workspace");
    let data=await Workspace.findOne({_id:new ObjectId(id)})
    res.send({files:data});
    return; 
})

app.post("/code/workplace/stroage/create",async function(req,res){
    let {folder_name,folder_description}=req.body;
    let db=mongoose.connection.db;
    let Workspace=db.collection("workspace");
    let data=await Workspace.findOne({folder_name:folder_name});
    if(data){
        let AllData=await Workspace.find({}).toArray();
        res.send({message:"workspace already exists",workspaces:AllData});
        return;
    }
    else{ 
        let date=new Date();
        await Workspace.insertOne({folder_name:folder_name,folder_description:folder_description,folder_date:date.toLocaleString()});
        let AllData=await Workspace.find({}).toArray();
        res.send({message:"workplace created",workspaces:AllData});
    }
})

app.delete("/code/workplace/stroage/delete",async function(req,res){
    let {id}=req.body;
    let db=mongoose.connection.db; 
    let Workspace=db.collection("workspace");
    await Workspace.deleteOne({ _id: new ObjectId(id) });
    let AllData=await Workspace.find({}).toArray();
    res.send({message:"workplace deleted",workspaces:AllData});
}) 