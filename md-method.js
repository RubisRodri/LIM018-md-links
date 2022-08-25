const fs = require("fs");
const path = require("path");
const { extname } = require("path");

//funcion para convertir una ruta de relativa a absoluta.

const convertPathToAbsolut = (isPath) => {
  if (path.isAbsolute(isPath)) {
    console.log(" es absoluta");
    return isPath;
  } else {
    console.log("La ruta no es absoluta");
    return path.resolve(isPath).normalize();
  }
};

// funcion para verificar que la ruta existe.

const existPath = (isPath) => fs.existsSync(isPath);

// funcion para verificar la extencion del documento
const extPath = (isPath) => {
  const extName = path.extname(isPath);
  console.log(extName);

  if (extName === ".md") {
    return true;
  } else {
    return false;
  }
};

// funcion para verificar si es un directorio.

const isDirectory = (isPath) => {
  const isDirectory = fs.statSync(isPath).isDirectory();
  return isDirectory;
};


// funcion para leer archivo
const readDoc = (isPath) => fs.readFileSync(isPath, "UTF-8");

// LEER EL ARCHIVO MARKDOWN
//const readFile = (file) => fs.readFileSync(file, 'UTF-8');
//const fileContent = (pathAbsolute) => readFile(pathAbsolute);

// EXTRAER LOS LINKS DEL ARCHIVO MARKDOWN

const readLinks = (content, isPath) => new Promise ((resolve) => {
  const regExp1 = new RegExp (/\[(.*?)\]\(.*?\)/gm);//link
  const regExp2 = new RegExp (/\[[\w\s\d.()]+\]/);//texto
  const regExp3 = new RegExp (/\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg);//ruta
  const fileContent = content;//lee el archivo
  const links = fileContent.match(regExp1);/* extraigo los links que coincidan con mi expresion regular
      match() se usa para obtener todas las ocurrencias de una expresión regular dentro de una cadena.*/
      //console.log(links)
  //console.log('arrayLinks: ', arrayLinks);
  let arrayLinks;
  if (links) {
      arrayLinks = links.map((myLinks) => {

          const myhrefArray = myLinks.match(regExp3) ?? []          
          const myhref = myhrefArray.join().slice(1, -1);//URL ()

          const mytextArray = myLinks.match(regExp2) ?? []
          const mytext = mytextArray.join().slice(1, -1);//Texto []
          return {
              href: myhref,
              text: mytext,
              fileName: isPath,//Ruta del archivo donde se encontró el link.
          };
      });
      resolve (arrayLinks)        
  } else if (links === null){
      resolve ([]);
      console.log('el archivo no contiene links')
  }
});

    /*if (readDoc !== null) {
      const linksArray = readDoc.match(regxLink); // revisa content archivo para capturar links
    }
    if (linksArray === null) {
      // si no hay links en archivo retorna []
      resolve([]);
    }

    const turnedLinksArray = linksArray.map((myLinks) => {
      // transforma arr links y entrega objt
      const myhref = myLinks.match(regxUrl).join().slice(1, -1); // URL encontradas
      const mytext = myLinks.match(regxText).join().slice(1, -1); // texto que hace ref a URL
      return {
        href: myhref,
        text: mytext.substring(0, 50),
        fileName: path.basename(pathMd), // ruta de URL
      };
      resolve(turnedLinksArray);
    });
      reject(error);
     console.log(error)
  });
  */

//const fileContent = (pathAbsolute) => readFile(pathAbsolute);

module.exports = {
  convertPathToAbsolut,
  existPath,
  extPath,
  readLinks,
  readDoc,
  isDirectory
};
