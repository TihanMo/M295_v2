const verdoppeln = (zahl, callback)=>{
    ergebnis = zahl*2
    callback(ergebnis)
}

verdoppeln(5, (ergebnis)=>{
    console.log(ergebnis)
})