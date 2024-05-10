

const { headersArray } = require('puppeteer');
const puppeteer = require('puppeteer');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/s', async (req, res) => {
    (async () => {

        let btechURL = "https://btech.com/en/moblies/mobile-phones-smartphones/smartphones.html";
    
    
        const browser = await puppeteer.launch({headless: true, defaultViewport: null, args: ['--start-maximized', '--no-sandbox', '--disable-setuid-sandbox']});
        const page = await browser.newPage();

        var amazonURL = 'https://www.amazon.eg/s?k=jumping+rope&&language=en_AE&%3Flanguage=en_AEs';
        await page.goto(btechURL);

        const firstResult = await page.evaluate(() => {
            return document.querySelector('#product_view_1 > a > div.plpContentWrapper > div.listviewLeft > h2').innerText;
        });
        // console.log(firstResult);
    
        // let ele = await page.waitForSelector("#product_view_1 > a > div.plpContentWrapper > div.listviewLeft > h2");
        console.log("from the container");
        res.send(firstResult);
        // selectthat element #amasty-shopby-product-list > div.amscroll-load-button.btn-outline.primary.medium
    // while (true){
    //     try{
    
    //         let moreItemsBtn =  await page.waitForSelector('#amasty-shopby-product-list > div.amscroll-load-button.btn-outline.primary.medium');
        
    //         await moreItemsBtn.click();
    
    //     }catch(e){
    //          console.log("finished loading all items");
    //          break;
    //      }
    // }
        //await browser.close();
        
    }
    )();
    
});

app.listen(3002, () => {
    console.log('Server is running on port 3002');
});

