const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

//funcion para convertir una ruta de relativa a absoluta.

const convertPathToAbsolut = (isPath) => {
  if (path.isAbsolute(isPath)) {
    //console.log(" es absoluta");
    return isPath;
  } else {
    console.log("La ruta no es absoluta");
    return path.resolve(isPath).normalize();
  }
};

// funcion para verificar que la ruta existe.

const existPath = (isPath) => fs.existsSync(isPath);






// funcion para leer archivo de forma sincrona
//const readDoc = (isPath) => fs.readFileSync(isPath, "UTF-8"); // documentos
const readFile = (isPath) => fs.readdirSync(isPath, "UTF-8"); // archivos

//---Obtener Array de rutas .md---//
const getMdFiles = (allMdFiles, isPath) => {
  const isDirRes = fs.statSync(isPath).isDirectory(); //Verifica si la ruta es directorio (true or False)
  if (isDirRes) {
    //Si es Directorio
    const allDirFiles = fs.readdirSync(isPath); //busca las carpertas dentro del directorio
    //console.log(allDirFiles)
    allDirFiles.forEach((file) => {
      const absolutPath = path.join(isPath, file);
      getMdFiles(allMdFiles, absolutPath);
    });
  } else {
    const isMdFiles = path.extname(isPath); //Extencion del archivo
    if (isMdFiles === ".md") {
      //Si es archivo .md
      allMdFiles.push(isPath);
    }
  }
  return allMdFiles; //Retorna array de Path .md
};

// EXTRAER LOS LINKS DEL ARCHIVO MARKDOWN

const readLinks = (content, isPath) =>
  new Promise((resolve) => {
    const regExp1 = new RegExp(/\[(.*?)\]\(.*?\)/gm); //link
    const regExp2 = new RegExp(/\[[\w\s\d.()]+\]/); //texto
    const regExp3 = new RegExp(
      /\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/gm
    ); //ruta
    const fileContent = content; //lee el archivo
    //console.log(fileContent)
    const links =
      fileContent.match(
        regExp1
      ); /* extraigo los links que coincidan con mi expresion regular
      match() se usa para obtener todas las ocurrencias de una expresión regular dentro de una cadena.*/
  
    let arrayLinks;
    if (links) {
      arrayLinks = links.map((myLinks) => {
        const myhrefArray = myLinks.match(regExp3) ?? [];
        const myhref = myhrefArray.join().slice(1, -1); //URL ()

        const mytextArray = myLinks.match(regExp2) ?? [];
        const mytext = mytextArray.join().slice(1, -1); //Texto []
        return {
          href: myhref,
          text: mytext,
          fileName: isPath, //Ruta del archivo donde se encontró el link.
        };
      });
      resolve(arrayLinks);
    } else if (links === null) {
      resolve([]);
      console.log("el archivo no contiene links");
    }
  });

//-----Leer contenido de un archivo------//
const readFileContent = (arrayMds) =>
  new Promise((resolve, reject) => {
    const mdArray = [];
    arrayMds.forEach((element) => {
      fs.readFile(element, "utf8", function (err, data) {
        if (err) {
          const errorMessage = "| ✧ Empty File ✧  |";
          console.log(errorMessage);
        } else {
          readLinks(data, element).then((resArray) => {
            mdArray.push(resArray);
            //console.log(mdArray);
            if (mdArray.length === arrayMds.length) {
              resolve(mdArray.flat());
            }
          });
        }
      });
    });
  });

// Peticion con Fetch
const httpPetition = (arrObjLinks) => {
  // console.log('Desde node', arrObjLinks);
  const arrPromise = arrObjLinks.map((obj) =>
    fetch(obj)
      .then((res) => ({
        href: obj.href,
        text: obj.text,
        file: obj.fileName,
        status: res.status,
        ok: res.ok ? "OK" : "FAIL",
      }))
      .catch(() => ({
        href: obj.href,
        text: obj.text,
        file: obj.fileName,
        status: 404,
        ok: "FAIL",
      }))
  );
  return Promise.all(arrPromise);
};

module.exports = {
  convertPathToAbsolut,
  existPath,
  readLinks,
  getMdFiles,
  readFileContent,
  readFile,
  httpPetition,
};


