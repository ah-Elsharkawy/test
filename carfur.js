const puppeteer = require('puppeteer');


(async () => {
    
        let carfur= 'https://www.carrefouregypt.com/mafegy/en/c/NFEGY1220200';

        

    
        const browser = await puppeteer.launch({headless: true, defaultViewport: null, args: ['--start-maximized']});
        const page = await browser.newPage();
        // await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36');
        await page.goto(carfur);
       
 
        let productsCards = await page.$$(".css-yqd9tx");
        console.log(productsCards.length);

        let products = await articlesIntoProducts(productsCards);
        console.log(products);
        // single product info
        async function ExtractProductInfo(productCard){
   
            let mehref = await productCard.evaluate( ele => ele.querySelector("a").getAttribute("href"));
            let name = await productCard.evaluate( ele => ele.querySelector("a>img").getAttribute('alt'));
            let price = await productCard.evaluate( ele => ele.querySelector(".css-14zpref").innerText);
            let discount = await productCard.evaluate( ele => {
                let discountElement = ele.querySelector(".css-bc0emj");
            return discountElement ?  discountElement.innerText : null;
            }
        );
            let product = {
                    href: mehref,
                    name:name,
                    price:price,
                    discount:discount,
            }
                
            return product;
    }
    // loop all products
        async function articlesIntoProducts(productsCards){
                let products = [];
                for(let i = 0; i < productsCards.length; i++){
                        let product = await ExtractProductInfo(productsCards[i]);
                        products.push(product);
                }
                return products;
        }
          
  

        
})();
