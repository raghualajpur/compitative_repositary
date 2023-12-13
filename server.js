const express=require('express')
const app=express()
app.use(express.json())
const leetcode = require('./platforms/leetcode')
const codechef=require('./platforms/codechef')

app.listen(3004, () => {
    console.log("Server Started at http://localhost:3000/");
});

app.get("/leetcode",async (req,res)=>{
    const leetcodeDetails = async function(){
        return await leetcode('https://leetcode.com/alajpurraghu/')
    }
    leetcodeDetails().then((details)=>{
        res.send(details)
    })
})

app.get("/codechef", async (req,res)=>{
    const codechefDetails= async function(){
        return await codechef('https://www.codechef.com/users/raghualajpur')
    }
    codechefDetails().then((details)=>{
        res.send(details)
    })

})

