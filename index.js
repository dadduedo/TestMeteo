
require('dotenv').config();
const express = require('express');
const fetch = require("node-fetch");
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

    async function caricaDati(arrayCittà){
        var arrayPush = []
        try {
            for(let i=0;i<arrayCittà.length;i=i+2){
    
                const Meteo = await fetch("https://api.openweathermap.org/data/2.5/weather?lat="+arrayCittà[i]+"&lon="+arrayCittà[i+1]+"&appid="+process.env.APPID,{ 
                    method: 'get',
                })
                const Commerciale = await fetch("https://api.yelp.com/v3/businesses/search?latitude="+arrayCittà[i]+"&longitude="+arrayCittà[i+1]+"",{ 
                    method: 'get', 
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + process.env.APPKEY
                    }, 
                })
                arrayPush.push(JSON.parse(Meteo.body._readableState.buffer.head.data.toString()))
                arrayPush.push(Commerciale.body._readableState.buffer)
            }
        }
        catch(error){
            return error
        }
        return arrayPush
    }
    app.get('/Meteo', async(req, res) => {
            const jsonToSend = []
            const arrayCittà=[41.9027835, 12.4963655,45.070312,7.6868565,45.4654219,9.1859243,38.1156879,13.3612671,44.494887,11.3426163]
            
            const jsonData = await caricaDati(arrayCittà)

            for(let i=0;i<arrayCittà.length;i=i+2){
                var jsonCitta={}
                jsonCitta["Citta"+ i +"Meteo"] = jsonData[i]
                if (jsonData[i+1].head==null){
                    jsonCitta["Citta"+ i +"Commercio"] = "No info commerciali per la citta"+ i
                }
                else {
                    var datiCommerciali= jsonData[i+1].head.data.toString()+jsonData[i+1].head.next.data.toString()+jsonData[i+1].head.next.next.data.toString()+jsonData[i+1].head.next.next.next.data.toString()
                    var JsonDatiCommerciali = JSON.parse(datiCommerciali)
                    jsonCitta["Citta"+ i +"Commercio"] = JsonDatiCommerciali
                }
                jsonToSend.push(jsonCitta) 
            }
            res.json(jsonToSend)
        }
    )

    const port = 3000
    app.listen(port, () => {
        console.log(`Server running at `+ port+'/Meteo');
    });


