import express from 'express'
import leetcode from './platforms/leetcode.mjs';
import codechef from './platforms/codechef.mjs';
import cors from 'cors';
const app=express()
app.use(express.json())
app.use(cors())
app.listen(3004, () => {
    console.log("Server Started at http://localhost:3004/");
});

app.get("/", (request,response)=>{
    response.send("this is the root page")
})

app.get("/leetcode",async (request,response)=>{
    try {
        const leetcodeDetails = await leetcode('https://leetcode.com/alajpurraghu/');
        response.json(leetcodeDetails)
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
})

app.get("/codechef", async (request, response) => {
    try {
        const codechefDetails = await codechef('https://www.codechef.com/users/raghualajpur');
        response.json(codechefDetails);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});




