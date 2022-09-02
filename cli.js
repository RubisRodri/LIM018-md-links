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
    console.log("por favor ingresa una ruta");
    break;

  case 1:
    mdLinks(arguments[0], { validate: false })
      .then((objectLinks) => {
        objectLinks.forEach((link) => {
          console.log(link.fileName, link.href, link.text);
        });
      })
      .catch((error) => {
        console.log("ha ocurrido un error");
      });
    break;

  case 2:
    if (arguments[1] === "--validate") {
      mdLinks(arguments[0], { validate: true })
        .then((resolve) => {
          console.log(resolve);
        })
        .catch((error) => {
          console.log("ha ocurrido un error");
        });
    } else if (arguments[1] === "--stats") {
      mdLinks(arguments[0], { validate: true }).then((resolve) => {
        console.log(linkStats(resolve));
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
        console.log(totalLink(resolve));
        //console.log(resolve)
      })
      .catch((err) =>{
        console.log('ha ocurrido un error')
      });
    
 };

};

