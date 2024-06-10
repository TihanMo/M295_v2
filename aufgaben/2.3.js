function simuliereVerzoegerung(ms){
    return new Promise(res => setTimeout(res, ms))
}

async function addiereNachVerzoegerung(num1, num2, ms){
    await simuliereVerzögerung(ms)
    return num1 + num2
}

addiereNachVerzoegerung(3, 7, 2000).then(result => {
    console.log(result)
})

