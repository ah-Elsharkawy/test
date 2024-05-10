const puppeteer = require('puppeteer');


(async () => {
    
        //let btechURL = "https://www.noon.com/egypt-en/electronics-and-mobiles/mobiles-and-accessories/mobiles-20905/?sort%5Bby%5D=popularity&sort%5Bdir%5D=desc";

        let noonURL = "https://www.noon.com/egypt-en/electronics-and-mobiles/mobiles-and-accessories/mobiles-20905/?sort%5Bby%5D=popularity&sort%5Bdir%5D=desc";
        let jumiaURL = "https://www.jumia.com.eg/ar/mobile-phones/#catalog-listing";
    
        const browser = await puppeteer.launch({headless: false, defaultViewport: null, args: ['--start-maximized']});
        const page = await browser.newPage();

        
        var amazonURL = 'https://www.amazon.eg/s?k=jumping+rope&&language=en_AE&%3Flanguage=en_AEs';
        await page.goto(jumiaURL);
        let betec="https://btech.com/ar/moblies/mobile-phones-smartphones/smartphones.html"

        let closeBtn = await page.waitForSelector("#pop > div > section > button");
        closeBtn.click();

        var lastPageBtn = 
        await page.waitForSelector("#jm > main > div.aim.row.-pbm > div.-pvs.col12 > section > div.pg-w.-ptm.-pbxl > a:nth-child(7)");


        

        
        
        await lastPageBtn.click();
        var knownElement = await page.waitForSelector("#jm > main > div.aim.row.-pbm > div.-pvs.col12 > section > div.pg-w.-ptm.-pbxl > a:nth-child(5)");
        let lastPageNumber = await knownElement.evaluate( ele => ele.innerText);
        console.log(lastPageNumber);
        const page2 = await browser.newPage();
        for(let i=1; i<lastPageNumber; i++){
                
                await page2.goto(`https://www.jumia.com.eg/ar/mobile-phones/?page=${i}#catalog-listing`);

                //await page.waitForTimeout(1000);
        }

        
        
        //let ele = await page.waitForSelector("#product_view_1 > a > div.plpContentWrapper > div.listviewLeft > h2");

        //let spans = await page.$$("span.sc-5c17cc27-0.eCGMdH.wrapper.productContainer");
        //let card = await page.waitForSelector("#productBox-N53339783A");
        /* for (let i = 0; i < cards.length; i++){
            let title = await cards[i].evaluate( ele => ele.querySelector("h2").innerHTML);
            console.log(title);
        } */
        //card.click();
        //console.log(spans.length);

        

        /* let articles = await page.$$("article.c-prd");

        let products = await articlesIntoProducts(articles);
        console.log(products); */

        async function articlesIntoProducts(articles){
                let products = [];
                for(let i = 0; i < articles.length; i++){
                        let product = await ExtractProductInfo(articles[i]);
                        products.push(product);
                }
                return products;
        }

        async function ExtractProductInfo(productCard){
                //console.log(productCard);
                let name = await productCard.evaluate( ele => ele.querySelector("a.core").getAttribute("data-gtm-name"));

                let price = await productCard.evaluate( ele => ele.querySelector(".prc").innerText);

                let discount = await productCard.evaluate( ele => ele.querySelector("div.bdg._dsct._sm").innerText);

                let brand = await productCard.evaluate( ele => ele.querySelector("a.core").getAttribute("data-gtm-brand"));

                let product = {
                        name: name,
                        price: price,
                        discount: discount,
                        brand: brand
                };

                return product;
        }

        
})();
