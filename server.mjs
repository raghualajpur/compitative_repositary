import express from 'express'
import leetcode from './platforms/leetcode.mjs';
import codechef from './platforms/codechef.mjs';
import codeForces from './platforms/codeforces.mjs';
import cors from 'cors';
const app=express()
app.use(express.json())
app.use(cors());
app.listen(3010, () => {
    console.log("Server Started at http://localhost:3004/");
});

app.get("/", (request,response)=>{
    response.send("this is the root page")
})

app.post("/codeforces", async (request,response)=>{
    const {username} = request.body
    try {
        const codeForceDetails = await codeForces(`https://codeforces.com/profile/${username}`,`https://codeforces.com/contests/with/${username}`);
        response.send(codeForceDetails)
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
})

app.post("/leetcode",async (request,response)=>{
    const {username}=request.body  
    try {
        const leetcodeDetails = await leetcode(`https://leetcode.com/${username}/`);
        response.send(leetcodeDetails)   
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
})

app.post("/codechef", async (request, response) => {
    const {username}=request.body
    try {
        const codechefDetails = await codechef(`https://www.codechef.com/users/${username}`);
        response.send(codechefDetails);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});




