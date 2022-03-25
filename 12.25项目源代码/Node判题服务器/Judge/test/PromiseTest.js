
function asyncTest() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("TimeOut");
            resolve();
        }, 1000);
    })

}
async function a (){

    console.log("Start!");
    
    await asyncTest();
    
    console.log("End!");
}

a();