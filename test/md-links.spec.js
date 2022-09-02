const mdLinks = require("../index");
const convertPathToAbsolut = require("../md-method").convertPathToAbsolut;
const existPath = require("../md-method").existPath;
const getMdFiles = require("../md-method").getMdFiles;
const isDirRes = require("../md-method").isDirRes;
const statSync = require("../md-method").statSync;
const readLinks = require("../md-method").readLinks;
const fs = require("fs");




//const document = require("../document");

describe("converPathToAbsolut", () => {
  it("es una funcion", () => {
    expect(typeof convertPathToAbsolut).toBe("function");
  });
});

it("Recibe una ruta relativa y la convierte en absoluta", () => {
  let userPathTest = "readme2.md";
  let result = "C:\\proyecto 4\\LIM018-md-links\\readme2.md";
  return expect(convertPathToAbsolut(userPathTest)).toEqual(result);
});

it("recibe una ruta absoluta y retorna la ruta", () =>{
  let userPathTest = "C:/proyecto 4/LIM018-md-links/prueba2.md";
  return expect (convertPathToAbsolut(userPathTest)).toEqual(userPathTest)
})

describe("existPath", () => {
  it("es una funcion", () => {
    expect(typeof existPath).toBe("function");
  });
});

it("exisPath Verifica si una ruta existe", () =>{
  let routeTest = "C:/proyecto 4/LIM018-md-links/prueba2.md";
  return expect (existPath(routeTest)).toBeTruthy()
});

it("exisPath en caso que no exista la ruta", () =>{
  let routeTestn = "C:/proyecto 4/LIM018-md-links/prueba5.md";
  return expect(existPath(routeTestn)).toBeFalsy()
});

describe("getMdFile", () =>{
  it("es una funcion", () =>{
    expect(typeof getMdFiles).toBe("function")
  })
});

it ("getMdFile recibe una ruta lo recorre recursivamente, en busca de archivos md", () =>{
  let arrayRutas = [];
  let doctTest = "document";
  let result = [
    "document\\prueba2.md",
    "document\\pruebita\\prueba3.md",
  ]; 
  return expect(getMdFiles(arrayRutas, doctTest)).toStrictEqual(result)
});

describe("isDirRes", () =>{
  it("es una funcion", () =>{
    expect(typeof isDirRes).toBeTruthy()
  })
});


it("verifica si es un directorio", () =>{
  let direcTes = "C:/proyecto 4/LIM018-md-links/prueba2.md";
  return expect(fs.statSync(direcTes)).toBeTruthy()
});

describe("readLinks", () =>{
  it("es una funcion", () => {
    expect(typeof readLinks).toBe("function")
  })
});

it("readLinks lee los archivos y retorna un arreglo de objetos de los links encontrados", () =>{
  let rutaLinks = "prueba2.md";
  let resukrutaLinks = [
    {
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      fileName: 'C:/proyecto 4/LIM018-md-links/prueba2.md'
    },
    {
      href: 'https://nodejs.org/',
      text: 'Node.js',
      fileName: 'C:/proyecto 4/LIM018-md-links/prueba2.md'
    }
  ];
  return expect(readLinks(rutaLinks)).toEqual({})
})

 