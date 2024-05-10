const puppeteer = require('puppeteer');


(async () => {
    
        let noonURL= 'https://www.noon.com/egypt-en/electronics-and-mobiles/mobiles-and-accessories/mobiles-20905/?sort%5Bby%5D=popularity&sort%5Bdir%5D=desc&gclid=CjwKCAjw3NyxBhBmEiwAyofDYR_kQC4ERfA2aYnim1lH_8vboKVIodkN_HBFdWY2qrqqTzR8RqldTBoCsfgQAvD_BwE&utm_campaign=C1000151427N_eg_ar_web_performancemaxxhomeappliancesxalwaysonx18082022_noon_web_c1000087l_remarketing_plassc_&utm_medium=cpc&utm_source=c1000087l'
    
        const browser = await puppeteer.launch({headless: false, defaultViewport: null, args: ['--start-maximized', '--disable-http2']});
        const page = await browser.newPage();
        
        await page.goto(noonURL);
       
 
        let productshtml = await page.$$("span.productContainer");
        console.log(productshtml.length);

        // let products = await articlesIntoProducts(productshtml);
        // console.log(products);
        // // single product info
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
