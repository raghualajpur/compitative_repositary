import fetch from 'node-fetch';
import cheerio from 'cheerio';

const getDetails= async (html)=>{
    const leetcodeDetails={}
    const $ = cheerio.load(html);
    try{
    let lst=[]
    $('body div.hidden div.text-label-1').each(async function(){
        lst.push($(this).text())  
    })
    leetcodeDetails["rating"]=lst[0]
    leetcodeDetails["ranking"]=lst[1]
    leetcodeDetails["contest_attended"]=lst[2]
    await new Promise(resolve => setTimeout(resolve, 5000));
    lst=[]
    $('body div.space-y-4 span.text-base').each(async function(){
        lst.push($(this).text())
    })
    if(lst){
        leetcodeDetails["problems_solved"]=0   
    }
    for(let i of lst){
        if(i!==''){
            leetcodeDetails["problems_solved"]+=parseInt(i)
        }
    }
    return leetcodeDetails
    }catch(error){
        return {}
    }
}

const leetcode= async (url)=>{
    const response = await fetch(url);
    const htmlCode = await response.text();
    const details=await getDetails(htmlCode)
    return details
}

export default leetcode;

//contest-rating:- text-label-1.dark\\:text-dark-label-1.flex.items-center.text-2xl
//name:- text-label-1.dark\\:text-dark-label-1.break-all.text-base.font-semibold