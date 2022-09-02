const {
  convertPathToAbsolut,
  existPath,
  getMdFiles,
  readFileContent,
  httpPetition,
} = require("./md-method");
const fetch = require("node-fetch");
const linkStats = require('./stats');
const totalLink  = require('./stats');



const ejemplo4 = "prueba";
const ejemplo = "C:/proyecto 4/LIM018-md-links/prueba"; // funciona como ejemplo de directorio
const ruta = "readme2.md"; // no contiene link
const ejemplo2 = "C:/proyecto 4/LIM018-md-links/prueba2.md"; // este funciona como ejemplo para archivo
const documents = "document";


const mdLinks = ( ispath, option = { validate: false }) =>
  new Promise((resolve, reject) => {
    const absolutePath = convertPathToAbsolut(ispath);
    const validePath = existPath(absolutePath);
    console.log(absolutePath)
    

    const arrayMdFile = [];
    if (validePath === false) {
      reject("ruta no existe");
    }
    if (validePath) {
      const filesMd = getMdFiles(arrayMdFile, absolutePath); //---Funcion recursiva que revisa el directorio--//
      //console.log(filesMd);
      if (filesMd.length === 0) {
        //---Si el directorio es vacio---//
        reject("| EMPTY DIRECTORY |");
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


//mdLinks(documents);
mdLinks( ejemplo, { validate: true }).then((resolve) => {
  
  console.log(resolve)
  //console.log(linkStats(resolve))
  //console.log(totalLink(resolve))
});

module.exports = mdLinks;
