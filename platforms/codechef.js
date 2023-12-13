const puppeteer=require('puppeteer')
const cheerio=require('cheerio')

const getDetails=async function(html){
    const codechefDetails={}
    const $ = cheerio.load(html)
    codechefDetails['user_name']=$('span.m-username--link').text()
    codechefDetails['rating']=$('div.rating-number').text()
    codechefDetails['highest_rating']=$('div.rating-header.text-center small').text().slice(1,-1).split(' ')
    codechefDetails['highest_rating']=codechefDetails['highest_rating'][codechefDetails['highest_rating'].length-1]
    codechefDetails['rankings']=$('div.rating-ranks ul.inline-list li').text().split('\n')
    for(let i=0;i<codechefDetails['rankings'].length;i++){
        codechefDetails['rankings'][i]=codechefDetails['rankings'][i].trim()
    }
    codechefDetails['rankings']={global_rank:codechefDetails['rankings'][1],country_rank:codechefDetails['rankings'][4]}
    
    codechefDetails['contest_attended']=[]
    $('section.rating-data-section.problems-solved h5').each(function(){
        codechefDetails['contest_attended'].push($(this).text().trim().slice(0,-1))
    })
    codechefDetails['contest_attended']=codechefDetails['contest_attended'].slice(1,-3)

    codechefDetails['problems_solved']=[]
    $('section.rating-data-section.problems-solved div.content p span a').each(function(){
       codechefDetails['problems_solved'].push({problem_name:$(this).text(), problem_link: `https://www.codechef.com${$(this).attr('href')}`})
    })
    codechefDetails['problems_solved_count']=codechefDetails['problems_solved'].length
    return codechefDetails
}

const codechef=async function(url){
    let details;
    let browser;
    try{
        browser=await puppeteer.launch({headless:'new'})
        const page=await browser.newPage()
        await page.goto(url)
        const html=await page.content()
        details=await getDetails(html)
    }catch(err){
        console.log(err);
    }finally{
        if(browser){
            await browser.close()
        }
    }
    return details
}

module.exports=codechef