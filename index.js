



// configure

const express=require("express");
const path=require("path");
const nunjucks=require("nunjucks");
const app=express();


const request = require('request');
const cheerio=require('cheerio');


app.use(express.static(path.resolve(__dirname,'assets')));

// configure
nunjucks.configure(path.resolve(__dirname,'views'),{
    express:app,
    autoscape:true,
    noCache:false,
    watch:true
}); 
const items = [];
let tag = [];
let desc = [];
request("https://www.w3schools.com/TAGS/default.asp", (error, res, html) => {
    if (!error && res.statusCode == 200) {
        const $ = cheerio.load(html);

        const datarow = $("#htmltags");
        const output = datarow.find("td").text();
        $("td").each((a, data) => {

            const item = $(data).text();

            items.push(item);



        })



        for (let i = 0; i < items.length; i++) {
            if (i % 2 == 0) {
                tag.push(items[i]);
                
            } else {

                desc.push(items[i])
                
            }
        }
    }
    console.log(desc)
    app.get("/",(req,res)=>{
        res.render('1.html',{
        //    tags:tag,
        //    desc:desc
        items:items
        });
    });  
    app.listen(3000,()=>{
        console.log("express server running on ", 3000)
    })

})

  

