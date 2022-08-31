const {
  convertPathToAbsolut,
  existPath,
  extPath,
  readDoc,
  readFile,
  getMdFiles,
  isDirectory,
  readFileContent,
  readLinks,
  httpPetition,
} = require("./md-method");
const fetch = require("node-fetch");
const linkStats = require('./stats');

//const fs = require("fs");

const ejemplo4 = "prueba";
const ejemplo = "C:/proyecto 4/LIM018-md-links/prueba"; // funciona como ejemplo de directorio
const ruta = "readme2.md";
const ejemplo2 = "C:/proyecto 4/LIM018-md-links/prueba2.md"; // este funciona como ejemplo para archivo
//console.log(__dirname)


const mdLinks = (ispath, option = { validate: false }) =>
  new Promise((resolve, reject) => {
    const absolutePath = convertPathToAbsolut(ispath);
    const validePath = existPath(absolutePath);
    //console.log(validePath)

    const arrayMdFile = [];
    if (validePath === false) {
      console.log("ruta no existe");
      reject("| INVALID PATH |");
    }
    if (validePath) {
      const filesMd = getMdFiles(arrayMdFile, absolutePath); //---Funcion recursiva que revisa el directorio--//
      //console.log(filesMd);
      if (filesMd.length === 0) {
        //---Si el directorio es vacio---//
        reject("| ✿ EMPTY DIRECTORY ✿ |");
        //console.log("directorio vacio");
      } else {
        readFileContent(arrayMdFile).then((objectLinks) => {
          //console.log(objectLinks)
          if (objectLinks.length === 0) {
            //---Si el documento no tiene links---//
            reject("|  EMPTY FILE |");
          } else {
            if (option.validate === true) {
              httpPetition(objectLinks).then((response) => {
                resolve(response);
              });
            } else {
              resolve(objectLinks);
            }
          }
        });
      }
    }
  });


//mdLinks(ejemplo2);
//mdLinks(ejemplo, { validate: false }).then((resolve) => {
  //console.log(linkStats(resolve))
//});

module.exports = mdLinks;
