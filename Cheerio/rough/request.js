#!/usr/bin/env node
const request=require('request');
const cheerio=require('cheerio');
const fs=require('fs');
let processData=process.argv;
if(processData.includes("help")){
    console.log("Enter scrapper country name player last name to cmd");
    console.log("press enter ⤵️");
}
else{
    request("https://www.espncricinfo.com/ci/content/player/",callback);
    function isCountry(countryName,countryArray){
        if(countryName.includes(" ")){
            let index=countryName.indexOf(" ");
            countryName=countryName[0].toUpperCase()+countryName.substring(1,index)+countryName[index]+countryName[index+1].toUpperCase()+countryName.substring(index+2);
        }
        else
           countryName=countryName[0].toUpperCase()+countryName.substring(1).toLowerCase();
        if(countryArray.includes(countryName))return true;
        return false;
    }
    function callback(err,res,html){
        if(!err){
            let $=cheerio.load(html);
            let country=$(".nav_teams .subnav_grpitm .sub_nav_item").find('a');
            let countryArray=[],index=[];
            for(let i=0;i<country.length;i++){
                let length=$(country[i]).attr("href").length;
                index.push($(country[i]).attr("href").substring(length-2));
                countryArray.push($(country[i]).text());
            }
            if(processData.length>2){
                let countryName=processData[2];
                if(isCountry(countryName,countryArray)){
                    countryName=countryName[0].toUpperCase()+countryName.substring(1).toLowerCase();
                    let countryIndex=countryArray.indexOf(countryName);
                    let number=0;
                    if(index[countryIndex][0]==='-'){
                        number=index[countryIndex][1];
                    }
                    else{
                        number=index[countryIndex][0]*10+index[countryIndex][1];
                    }
                    countryName=countryName.toLowerCase();
                    request("https://www.espncricinfo.com/"+countryName+"/content/player/index.html?country="+number,PlayerData);
                }
                
                else{
                    countryName=processData[2]+" "+processData[3];
                    if(isCountry(countryName,countryArray)){
                        let value=countryName.indexOf(" ");
                        countryName=countryName[0].toUpperCase()+countryName.substring(1,value)+countryName[value]+countryName[value+1].toUpperCase()+countryName.substring(value+2);
                        let countryIndex=countryArray.indexOf(countryName);
                        let number=0;
                        
                        if(index[countryIndex][0]==='-'){
                            number=index[countryIndex][1];
                        }
                        else{
                            number=index[countryIndex][0]*10+index[countryIndex][1];
                        }
                        countryName=countryName.toLowerCase();
                        request("https://www.espncricinfo.com/ci/content/player/country.html?country="+number,PlayerData);
                    }
                    else     
                    console.log("country doesn't exist in cricket team");
                }
            }
        }
    }
    function PlayerData(err,res,html){
        if(!err){
            let $=cheerio.load(html);
            let player=$(".playersTable a");
            let playerlinklist=[],playerNamelist=[];
            for(let i=0;i<player.length;i++){
                if(!playerNamelist.includes($(player[i]).text()))
                    playerNamelist.push($(player[i]).text());
                if(!playerlinklist.includes($(player[i]).attr('href'))){
                    playerlinklist.push($(player[i]).attr('href'));
                }
            }
            if(processData.length>3){
                let val=processData.length>4?4:3;
                let playerName=processData[val];
                playerName=playerName[0].toUpperCase()+playerName.substring(1).toLowerCase();
                let isPresent=false;
                for(let i=0;i<playerNamelist.length;i++){
                    if(playerNamelist[i].includes(playerName)){
                        isPresent=true;
                        request("https://www.espncricinfo.com"+playerlinklist[i],printPlayerData);
                    }
                }
                if(!isPresent){
                    console.log("player doesn't exist");
                }
            }
            else{
                console.log("please enter player name");
            }
        }
    }
    function printPlayerData(err,res,html){
        if(!err){
            // fs.writeFileSync("hello.html",html);
            let $=cheerio.load(html);
            let player=$(".player-card-heading");
            let desc=$('.player-card-description');
            let playerDesc=[];
            let content=[];
            for(let i=0;i<player.length;i++){
                content.push($(player[i]).text());
            }
            for(let i=0;i<desc.length;i++){
                playerDesc.push($(desc[i]).text());
            }
            let obj={};
            let j=0;
            for(let i=0;i<content.length-1;i++){
               obj[content[i]]=playerDesc[j++];
            }
            let keys=Object.keys(obj);
            
            for(let i=0;i<keys.length;i++){
                if(keys[i]=='Born' || keys[i]=='Age')
                    console.log(keys[i]+"               "+obj[keys[i]]);
                else  
                   console.log(keys[i]+"        "+obj[keys[i]]);
            }
            console.log();
        }
    }
}
// let max_wicket=0,playerName;
// let $=cheerio.load(html);
// let row=$(".table.bowler tbody tr");
// console.log("Player Name      ","   Wicket Taken ")
// for(let i=0;i<row.length;i++){
//     let column=$(row[i]).find("td");
//     console.log($(column[0]).text(),"             ",$(column[4]).text());
//     if(parseInt($(column[4]).text())>max_wicket){
//         playerName=$(column[0]).text();
//         max_wicket=parseInt($(column[4]).text());
//     }
// }
// console.log("Most Wicket Taken By:-",playerName,max_wicket);
