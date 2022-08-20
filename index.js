const md = require('./md-method')
//const path = require('path');
//import { existPath, convertPathToAbsolut } from './md-method.js'


let rutacompleta ='C:\proyecto 4\LIM018-md-links'
let firname = "\rubis\videos";





console.log(path.isAbsolute(__dirname))
console.log(__dirname)

//console.log(path.extname(rutacompleta))

//console.log(md.getMdFiles(rutacompleta));

// LEER EL ARCHIVO MARKDOWN
//const readFile = (file) => fs.readFileSync(file, 'UTF-8');
//const fileContent = (pathAbsolute) => readFile(pathAbsolute);




//console.log(path.isAbsolute('C:\proyecto 4\LIM018-md-links')); false
//console.log(method.convertPathToAbsolut('C:\proyecto 4\LIM018-md-links\isPath'));  es absoluta C:proyecto 4LIM018-md-linksisPath
//console.log(md.existPath('/proyecto 4/LIM018-md-links'))
//console.log(method.existPath('C:\proyecto 4\LIM018-md-links')) la ruta no existe undefined
//console.log(path.isAbsolute('C:/proyecto 4/LIM018-md-links'))   
//console.log(path.isAbsolute('C:\proyecto 4\LIM018-md-links'))  false
//console.log(__dirname)

//console.log(path.normalize('C:\proyecto 4\LIM018-md-links'))  C:proyecto 4LIM018-md-links
//console.log(path.isAbsolute('C:proyecto 4LIM018-md-links'))  false
//console.log(path.join('C:\proyecto 4\LIM018-md-links'))
//console.log(path.normalize('C:proyecto 4LIM018-md-links'))





/*const mdLinks = (path, options = { validate: false }) => new Promise((resolve, reject) => {
  // invoca funcion converterPath
  const absolutePath = converterPath(path);

  // invoca funcion mdsArraysValidation con el resultado de pathValidation CALLBACK
  mdsArraysValidation(options, pathValidation(absolutePath))
    .then((result) => {
      resolve(result);
    })
    .catch((error) => {
      reject(error);
    });
});
*/
// se exporta funcion mdLinks
//module.exports = mdLinks;













