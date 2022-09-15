const {
  convertPathToAbsolut,
  existPath,
  getMdFiles,
  readFileContent,
  httpPetition,
} = require("./md-method");
const fetch = require("node-fetch");
const linkStats = require('./stats');



const ejemplo6 = "prueba2.md";
const ruta = "readme2.md"; 
const ejemplo2 = "C:/proyecto 4/LIM018-md-links/prueba2.md"; // este funciona como ejemplo para archivo
const documents = "document";


const mdLinks = ( ispath, option = { validate: false }) =>
  new Promise((resolve, reject) => {
    const absolutePath = convertPathToAbsolut(ispath);
    const validePath = existPath(absolutePath);
  
    

    const arrayMdFile = [];
    if (validePath === false) {
      reject("ruta no existe");
    }
    if (validePath) {
      const filesMd = getMdFiles(arrayMdFile, absolutePath); //---Funcion recursiva que revisa el directorio--/
      if (filesMd.length === 0) {
        reject("| EMPTY DIRECTORY |");
      } else {
        readFileContent(arrayMdFile).then((objectLinks) => {
          if (objectLinks.length === 0) {
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




 //mdLinks( ejemplo6, { validate: true }).then((resolve) => {
  
  
  //console.log(resolve)
  //console.log(linkStats(resolve))
  //console.log(totalLink(resolve))
//});

module.exports = mdLinks;
