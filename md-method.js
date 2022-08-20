const fs = require('fs');
const path = require('path');


//funcion para convertir una ruta de relativa a absoluta.

const convertPathToAbsolut = (isPath) => {
  if (path.isAbsolute(isPath)) {
    console.log(' es absoluta')
    return isPath;

  } else {
      console.log('convirtiendo relativa a absoluta')
      return path.resolve(isPath).normalize();
  }
};

// funcion para verificar que la ruta existe.

const existPath = (isPath) => fs.existsSync(isPath);


// funcion para obtener array de rutas. md

const getMdFiles = (allMdFiles, isPath) => {
  const isDirRes = fs.statSync(isPath).isDirectory(); //Verifica si la ruta es directorio (true or False)
  if (isDirRes) { //Si es Directorio
      const allDirFiles = fs.readdirSync(isPath); //Array con el contenido del directorio
      allDirFiles.forEach((file) => {
          const absolutPath = path.join(isPath, file);
          getMdFiles(allMdFiles, absolutPath)
      })
  } else {
      const isMdFiles = path.extname(isPath); //Extencion del archivo
      if (isMdFiles === '.md') { //Si es archivo .md
          allMdFiles.push(isPath);
      }
  }
  return allMdFiles;  //Retorna array de Path .md
};





module.exports = { convertPathToAbsolut, existPath, getMdFiles};







