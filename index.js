const { convertPathToAbsolut, existPath, extPath, readDoc, isDirectory, readLinks } = require("./md-method.js");
//const fs = require("fs");
//const { extname } = require("path");
//const path = require('path');

const ejemplo ='C:/proyecto 4/LIM018-md-links/prueba'; // funciona como ejemplo de directorio
const ruta = 'C:/proyecto 4/LIM018-md-links';   //ejemplo de no contiene link
const ejemplo2 = 'C:/proyecto 4/LIM018-md-links/prueba2.md';  // este funciona como ejemplo
//console.log(__dirname)

 const mdLinks = ( ispath, Option = {validate:false}) =>new Promise((resolve, reject) => {
    const absolutePath = convertPathToAbsolut(ispath);
    const validePath = existPath(absolutePath);
    let arrayLinks;
    if(validePath === false){
      //reject('la ruta no es valida');
      console.log('ruta no valida')
    } else if(validePath){
       console.log('ruta valida y es un directorio')
       const rutaDir = isDirectory(absolutePath); // devuelve un booleano

     } if (!isDirectory(absolutePath)){
        console.log('es un documento')
        let arrayFile = readDoc(absolutePath);
        let resultado = readLinks(arrayFile, absolutePath); // averiguar el desempaque de la promesa aqui
        resolve (resultado)
       }
    

 });



 mdLinks(ejemplo2).then( (res) =>{
  console.log(res)
 }).catch




  // console.log(readDoc(ejemplo2))



























const ejemplo3 =`[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...) y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional README.md).

Estos archivos Markdown normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato Markdown, para verificar los links que contengan y reportar
algunas estadísticas.

![md-links](https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg)

## 2. Resumen del proyecto`;

//console.log(readLinks( `[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado              
//ligero muy popular entre developers. Es usado en muchísimas plataformas que                                     
//manejan texto plano (GitHub, foros, blogs, ...) y es muy común usando [Node.js](https://nodejs.org/)` , ruta))  

//const links = ejemplo3.match(/\[(.*?)\]\(.*?\)/gm); esto funciona
//console.log(links)                                  me devuelve los link en un array


//console.log(readLinks( './.readme.md', ruta))





//mdLinks(ejemplo2)

module.exports = mdLinks;

