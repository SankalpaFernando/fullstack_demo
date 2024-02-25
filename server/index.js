const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./db');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.get('/user', async(req,res)=>{

    const data = await db.execute("SELECT*FROM users");
    const users = data[0];
    res.json(
        {
            msg:"Success",
            data: users
        }
    )
});

app.post('/user',async (req,res)=>{
    const {id,name} = req.body;
    const data = await db.execute(`INSERT INTO users(id, name) VALUES (${id},'${name}')`);
    res.json({
        msg:'success'
    })
})

app.put('/user',async (req,res)=>{
    const {id,name} = req.body;
    const data = await db.execute(`Update users SET name='${name}' where id=${id} `)
    res.json({
        msg:"updated"
    })
})


app.delete('/user/:id',async(req,res)=>{
    const {id} = req.params;
    const data = await db.execute(`Delete from users where id=${id}`);
    res.json({
        msg:'deleted'
    })
})

app.listen(5000,(err)=>{
    if(err){
        console.log(err)
        return
    }
    console.log("Server  Port 5000")
})