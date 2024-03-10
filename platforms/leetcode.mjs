import fetch from 'node-fetch';
import cheerio from 'cheerio';


const getDetails= async (html)=>{
    const leetcodeDetails={}
    const $ = cheerio.load(html);

    $('div').each(function () {
        if($(this)[0]['attribs']['class']==`text-label-1 dark:text-dark-label-1 flex items-center text-2xl`){
            leetcodeDetails['contest_rating']=$(this).text()
        }
        if($(this)[0]['attribs']['class']==`text-label-1 dark:text-dark-label-1 font-medium leading-[22px]`){
            if(!leetcodeDetails['global_ranking']){
            leetcodeDetails['global_ranking']=$(this).text()
            }else{
                leetcodeDetails['contests_attended']=$(this).text()
            }
        }
        if($(this)[0]['attribs']['class']==`text-[24px] font-medium text-label-1 dark:text-dark-label-1`){
            leetcodeDetails['problems_solved']=$(this).text()
        }
        if($(this)[0]['attribs']['class']==`flex flex-1 items-center`){
            if(!leetcodeDetails['easy_problems']){
                leetcodeDetails['easy_problems']=$(this).text()
            }else if(!leetcodeDetails['medium_problems']){
                leetcodeDetails['medium_problems']=$(this).text()
            }else if(!leetcodeDetails['hard_problems']){
                leetcodeDetails['hard_problems']=$(this).text()
            }
        }
        if($(this)[0]['attribs']['class']==`text-label-1 dark:text-dark-label-1 mt-1.5 text-2xl leading-[18px]`){
            if(!leetcodeDetails['no_of_badges']){
                leetcodeDetails['no_of_badges']=$(this).text()
                if(parseInt($(this).text())){
                    leetcodeDetails['badges_image_link']=[]
                    $('div.flex.items-center.justify-center img').each(function(){
                        leetcodeDetails['badges_image_link'].push($(this).attr('src'))
                    })
                }
            }
        }
        if($(this)[0]['attribs']['class']==`mr-4.5 space-x-1`){
            if(!leetcodeDetails['total_active-days']){
                leetcodeDetails['total_active_days']=$(this).text().split(':')[1]
            }
        }
        if($(this)[0]['attribs']['class']==`space-x-1`){
            if(!leetcodeDetails['max_streak']){
                leetcodeDetails['max_streak']=$(this).text().split(':')[1]
            }
        }
        if($(this)[0]['attribs']['class']==`flex flex-col space-y-1`){
            if(!leetcodeDetails['views_of_solutions']){
                leetcodeDetails['views_of_solutions']=$(this).text().split()
            }else if(!leetcodeDetails['solutions_posted']){
                leetcodeDetails['solutions_posted']=$(this).text().split()
            }else if(!leetcodeDetails['discuss_count']){
                leetcodeDetails['discuss_count']=$(this).text().split()
            }else if(!leetcodeDetails['reputations']){
                leetcodeDetails['reputations']=$(this).text().split()
            }
        }
        if($(this)[0]['attribs']['class']=='mt-4 flex flex-col space-y-3'){
            if(!leetcodeDetails['languages_wise_problems_count']){
                leetcodeDetails['languages_wise_problems_count']=[]
            }
            const $$=cheerio.load($(this).html())
            $$('div span').each(function(){
                leetcodeDetails['languages_wise_problems_count'].push($$(this).text())
            })
        }
        if($(this)[0]['attribs']['class']=='mt-3 flex flex-wrap'){
            if(!leetcodeDetails['problem_solving_skills']){
                leetcodeDetails['problem_solving_skills']={}
            }
            let tempList=[]
            const $$=cheerio.load($(this).html())
            $$('div span').each(function(){
                const object=$$(this).text().split(', ')
                tempList.push(object)
            })
            for(let i=0;i<tempList.length-1;i+=2){
                leetcodeDetails['problem_solving_skills'][new String(tempList[i])]=tempList[i+1][0]
            }
        }
        if($(this)[0]['attribs']['class']=='flex flex-1 items-end space-x-[5px] text-base'){
            if(!leetcodeDetails['rank']){
                leetcodeDetails['rank']=$(this).text().split('k')[1]
            }
        }

        
    });
    return leetcodeDetails
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