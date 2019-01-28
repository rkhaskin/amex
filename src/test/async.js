const utils = require('./utils/func');
async function test() {

    console.log("aaaa");
    await utils.sleep(3000);
    console.log("inside async")
    
}



test();
console.log("after test");