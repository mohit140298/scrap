const puppeteer = require('puppeteer');

exports.puppeteerFunction =  (link) => {
    return new Promise( async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch({headless: false});
            const page = await browser.newPage()
            await page.goto(link)
            await page.click("#reviewtab>a")
            const data = []
            const reviews = await page.$$('.review')
            if(reviews.length > 0) {
                for(let i=1 ; i<reviews.length ; i++) {
                    const review = {}
                    const rating = await reviews[i].$(".itemRating")
                    review['Rating'] = await page.evaluate(el => el.innerText,rating);
                    const reviewer = await reviews[i].$(".reviewer")
                    const reviewerInnerText =  await page.evaluate(el => el.innerText,reviewer);
                    const reviewerInnerTextArr = reviewerInnerText.split('\n')
                    review['Reviewer Name'] = reviewerInnerTextArr[1]
                    review['Review Date'] = reviewerInnerTextArr[3]
                    const commentBlock = await reviews[i].$(".rightCol")
                    const comment =  await page.evaluate(el => el.innerText,commentBlock);
                    const commentArr = comment.split('\n')
                    review['Review Comment'] = {
                        'heading' : commentArr[0],
                        'comment' : commentArr[2]
                    }
                    if(Object.keys(review).length>0)
                    {
                        data.push(review)
                    }
                }
            }
            await browser.close()
            resolve(data)
            
        } catch (error) {
            reject({status:"failed",message:"something went wrong while scraping"})
        }

    })
}