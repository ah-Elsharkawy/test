const puppeteer = require('puppeteer');


(async () => {
    
        let betech= 'https://btech.com/en/moblies/mobile-phones-smartphones/smartphones.html';
    
        const browser = await puppeteer.launch({headless: true, defaultViewport: null, args: ['--start-maximized']});
        const page = await browser.newPage();
        
        await page.goto(betech);
       
 
        let productshtml = await page.$$(".product-item-view>a");

        let products = await articlesIntoProducts(productshtml);
        console.log(products);
        // single product info
        async function ExtractProductInfo(productCard){
   
            let mehref = await productCard.evaluate( ele => ele.getAttribute("href"));
            let tittle = await productCard.evaluate( ele => ele.querySelector(".plpTitle").innerText);
            let price = await productCard.evaluate( ele => ele.querySelector(".price-wrapper").getAttribute('data-price-amount'));
            let discount = await productCard.evaluate( ele => {
                let discountElement = ele.querySelector(".savelabel-num");
            return discountElement ?  discountElement.innerText : null;
            }
        );
            let product = {
                    href: mehref,
                    tittle:tittle,
                    price:price,
                    discount:discount,
            }
                
            return product;
    }
    // loop all products
        async function articlesIntoProducts(productshtml){
                let products = [];
                for(let i = 0; i < productshtml.length; i++){
                        let product = await ExtractProductInfo(productshtml[i]);
                        products.push(product);
                }
                return products;
        }
          
  

        
})();
