#!/usr/bin/env node
const mdLinks = require('./index')
const process = require('process');
const arguments = process.argv.slice(2);
const linkStats = require('./stats');
//console.log(process);
//console.log(arguments);

const path = arguments[0];

//console.log(linkStats)

mdLinks(path).then((objectLinks)=>{
    //console.log(objectLinks)
    objectLinks.forEach(link=> {
        console.log(link.fileName, link.href, link.text)
        
    });
})
    
