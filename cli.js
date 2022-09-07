#!/usr/bin/env node
const mdLinks = require("./index");
const process = require("process");
const arguments = process.argv.slice(2);
const linkStats = require("./stats").linkStats;
const totalLink = require("./stats").totalLink;
const path = require("path");
//console.log(process);
//console.log(arguments);

switch (arguments.length) {
  case 0:
    console.log("Por favor ingresa una ruta");
    break;

  case 1:
    mdLinks(arguments[0], { validate : false })
      .then((objectLinks) => {
        objectLinks.forEach((link) => {
          console.log(link.fileName, link.href, link.text);
        });
      })
      .catch((error) => {
        console.log("ha ocurrido un error, deje un espacio despues de la ruta y coloque la linea de comando");
      });
    break;

  case 2:
    if (arguments[1] === "--validate") {
      mdLinks(arguments[0], { validate: true })
        .then((objectLinks) => {
            objectLinks.forEach((link) =>{
              console.log(link.href, link.ok, link.status, link.text )
            })
        })
        .catch((error) => {
          console.log("ha ocurrido un error");
        });
    } else if (arguments[1] === "--stats") {
      mdLinks(arguments[0], { validate: true })
            .then((resolve) => {
            const estadistica = linkStats(resolve);
            console.log(`Total : ${estadistica.Total}`);
            console.log(`UniqueLinks : ${estadistica.UniqueLinks}`)
            
      });
    }
    break;

  case 3:
    if (
      (arguments[1] === "--validate" && arguments[2] === "--stats") ||
      (arguments[1] === "--stats" && arguments[2] === "--validate")
    ){
      mdLinks(arguments[0], { validate: true })
      .then((resolve) => {
        const statusLinks= totalLink(resolve);
         console.log(`Total : ${statusLinks.Total}`);
         console.log(`Unique : ${statusLinks.Unique}`);
         console.log(`Broken : ${statusLinks.Broken}`);
      })
      .catch((err) =>{
        console.log('ha ocurrido un error')
      });  
    };
};

