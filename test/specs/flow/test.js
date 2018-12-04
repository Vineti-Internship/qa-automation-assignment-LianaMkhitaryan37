const assert = require('assert');

describe('Amazon', () => {
    describe('Search functionality', () =>{
        it('redirecting to search url', () => {
            browser.url("/");
            browser.element("#twotabsearchtextbox").click();
            browser.element("#twotabsearchtextbox").keys("tablet");
            browser.element("//input[@type = 'submit']").click();
            const url =browser.getUrl();
            assert.equal(url, 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=tablet');
        })
        it('Specifying search results', () =>{
            // browser.url('/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=tablet');
            let counter=0;
            while(counter<15){
                const fractional = browser.elements(".sx-price-fractional").getText();
                const arr=browser.elements(".sx-price-whole").getText();
                const title=browser.elements(".s-access-title").getText();
                for(let i=0;i<arr.length && counter<16;i++){
                    const price = parseFloat(`${arr[i]}.${fractional[i]}`);
                    if(price<70){
                        console.log(`${title[i]} price -> ${price}$`);
                        ++counter;
                    }
                };
                browser.element("#pagnNextString").click();
            }
            assert.equal(counter,16);
        })

    })
})