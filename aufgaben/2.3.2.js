function simuliereVerzoegerung(ms){
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, ms)
        // alternative Syntax: setTimeout(resolve, ms)
    })
}

async function addiereNachVerzoegerung(a,b,ms){
    await simuliereVerzoegerung(ms)
    console.log(a+b)
}

addiereNachVerzoegerung(3,7,1500)