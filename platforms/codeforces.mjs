import fetch from 'node-fetch';
import cheerio from 'cheerio';


const getDetails= async (html1,html2)=>{
    const codeForcesDetails={}
    let $ = cheerio.load(html1);
    let listOfNumbers=[]
    $('div._UserActivityFrame_counterValue').each(function(){
        listOfNumbers.push($(this).text().trim().slice(0,-1))
        
    })
    codeForcesDetails["problemsSolved"]=listOfNumbers[0].split(" ")[0]
    listOfNumbers=[]
    $('div.info ul li span.user-gray').each(function(){
        listOfNumbers.push($(this).text())
    })
    codeForcesDetails["rating"]=listOfNumbers[0]
    codeForcesDetails["highestRating"]=listOfNumbers[2]
    $ = cheerio.load(html2)
    listOfNumbers=[]
    $('table.user-contests-table tbody tr td').each(function(){
        listOfNumbers.push($(this).text())
    })
    codeForcesDetails['contestAttended']=listOfNumbers[0]

    return codeForcesDetails
}

const codeForces= async (url1,url2)=>{
    const response1 = await fetch(url1);
    const response2 = await fetch(url2)
    const htmlCode1 = await response1.text();
    const htmlCode2 = await response2.text();
    const details=await getDetails(htmlCode1,htmlCode2)
    return details
}

export default codeForces;

//contest-rating:- text-label-1.dark\\:text-dark-label-1.flex.items-center.text-2xl
//name:- text-label-1.dark\\:text-dark-label-1.break-all.text-base.font-semibold