const mdLinks = require("../index");
const convertPathToAbsolut = require("../md-method").convertPathToAbsolut;
const existPath = require("../md-method").existPath;
const getMdFiles = require("../md-method").getMdFiles;
const isDirRes = require("../md-method").isDirRes;
const statSync = require("../md-method").statSync;
const readLinks = require("../md-method").readLinks;
const httpPetition = require("../md-method").httpPetition;
const readFileContent = require("../md-method").readFileContent;
const fs = require("fs");
const readFile = require("../md-method").readFile;
const fetch = require("node-fetch");
const { resolve } = require("path");
//const testInvalid = require("./pruebaTest");

jest.mock("node-fetch");

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

it("recibe una ruta absoluta y retorna la ruta", () => {
  let userPathTest = "C:/proyecto 4/LIM018-md-links/prueba2.md";
  return expect(convertPathToAbsolut(userPathTest)).toEqual(userPathTest);
});

describe("existPath", () => {
  it("es una funcion", () => {
    expect(typeof existPath).toBe("function");
  });
});

it("exisPath Verifica si una ruta existe", () => {
  let routeTest = "C:/proyecto 4/LIM018-md-links/prueba2.md";
  return expect(existPath(routeTest)).toBeTruthy();
});

it("exisPath en caso que no exista la ruta", () => {
  let routeTestn = "C:/proyecto 4/LIM018-md-links/prueba5.md";
  return expect(existPath(routeTestn)).toBeFalsy();
});

describe("getMdFile", () => {
  it("es una funcion", () => {
    expect(typeof getMdFiles).toBe("function");
  });
});

it("getMdFile recibe una ruta lo recorre recursivamente, en busca de archivos ", () => {
  let arrayRutas = [];
  let doctTest = "document";
  let result = [
    "document\\prueba2.md",
    "document\\pruebita\\prueba3.md",
    "document\\pruebita\\test.md",
  ];
  return expect(getMdFiles(arrayRutas, doctTest)).toStrictEqual(result);
});

describe("isDirRes", () => {
  it("es una funcion", () => {
    expect(typeof isDirRes).toBeTruthy();
  });
});

it("verifica si es un directorio", () => {
  let direcTes = "C:/proyecto 4/LIM018-md-links/prueba2.md";
  return expect(fs.statSync(direcTes)).toBeTruthy();
});

describe("readLinks", () => {
  it("es una funcion", () => {
    expect(typeof readLinks).toBe("function");
  });
});

it("readLinks busca en los archivos y retorna un arreglo de promesas de los links encontrados", () => {
  const rutaLinks = "C:/proyecto 4/LIM018-md-links/prueba2.md";
  const contentSpect = `
    [Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
    ligero muy popular entre developers. herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos`;
  const resulrutaLinks = [
    {
      href: "https://es.wikipedia.org/wiki/Markdown",
      text: "Markdown",
      fileName: "C:/proyecto 4/LIM018-md-links/prueba2.md",
    },
    {
      href: "https://nodejs.org/",
      text: "Node.js",
      fileName: "C:/proyecto 4/LIM018-md-links/prueba2.md",
    },
  ];
  return expect(
    Promise.resolve(readLinks(contentSpect, rutaLinks))
  ).resolves.toEqual(resulrutaLinks);
});

it("readLinks busca en los archivos y cuando no consigue links retorna un array vacio []", () => {
  const rutaNoLinks = "readme2.md";
  const textSinLink = `En esta ocasión estarás trabajando en **NodeJS**, asegúrate
    de saber para qué sirve y sus consideraciones.`;
  const resultSp = [];
  return expect(
    Promise.resolve(readLinks(textSinLink, rutaNoLinks))
  ).resolves.toEqual(resultSp);
});

describe("readFile", () => {
  it("es una funcion", () => {
    expect(typeof readFile).toBe("function");
  });
});

it("readFile recibe una ruta de directorio y extrae todos los archivos", () => {
  const rutaDir = "document";
  const arrayLink = ["prueba1.txt", "prueba2.md", "pruebita"];
  return expect(readFile(rutaDir)).toEqual(arrayLink);
});

it("probando el caso en que readFile no tenga carpetas retorna []", () => {
  const rutaDoc = "documentnot";
  const doc = [];
  return expect(readFile(rutaDoc)).toEqual(doc);
});

describe("readFileContent", () => {
  it("es una funcion", () => {
    expect(typeof readFileContent).toBe("function");
  });
});

it("readFileContent recibe un array de archivos md, y retorna un array de objetos", () => {
  const rutaMd = ["C:\\proyecto 4\\LIM018-md-links\\prueba2.md"];
  const arrayObjet = [
    {
      href: "https://es.wiki123.org/wiki/Markdown",
      text: "Markdown",
      fileName: "C:\\proyecto 4\\LIM018-md-links\\prueba2.md",
    },
    {
      href: "https://nodejs.org/",
      text: "Node.js",
      fileName: "C:\\proyecto 4\\LIM018-md-links\\prueba2.md",
    },
  ];
  return expect(Promise.resolve(readFileContent(rutaMd))).resolves.toEqual(
    arrayObjet
  );
});

describe("httpPetition", () => {
  it("es una funcion", () => {
    expect(typeof httpPetition).toEqual("function");
  });
});

it("hace la consulta http con fecth y retorna un promesas", () => {
  const arrayPromise = [
    {
      href: "https://es.wikipedia.org/wiki/Markdown",
      text: "Markdown",
      file: undefined,
      status: 200,
      ok: "OK",
    },
  ];
  const arrayLinks = httpPetition([
    {
      href: "https://es.wikipedia.org/wiki/Markdown",
      text: "Markdown",
      file: "C:/proyecto 4/LIM018-md-links/prueba2.md",
    },
  ]);

  return arrayLinks.then((response) => {
    expect(response).toEqual(arrayPromise);
  });
});




it("Al haber un error en la peticion http se mostrará un error", () => {
  fetch.mockRejectedValue(new Error(" error message"));
  const objLinksMock = {
    href: "https://es.wikipedia.org/wiki/Markdown",
    text: "Markdown",
    file: "C:/proyecto 4/LIM018-md-links/prueba2.md",
  }

  return httpPetition([objLinksMock]).then((res) => {
    expect(res[0]).toEqual(expect.objectContaining({status: 404, ok: 'FAIL'}));
  });
});

describe('md-Links', () => {
  it('es una funcion', () => {
    expect(typeof mdLinks).toBe('function')
  })
});

it('Debe retornar una promesa', () => {
  const path = "C:/proyecto 4/LIM018-md-links/prueba2.md";
  expect(mdLinks(path)instanceof Promise).toBeTruthy()
});

it('Deberia retornar un arreglo de objetos validados', () => {
  const path = "C:/proyecto 4/LIM018-md-links/prueba2.md";
  const arrayLinkTest = [
    {
      href: 'https://es.wiki123.org/wiki/Markdown',
      text: 'Markdown',
      fileName: 'C:/proyecto 4/LIM018-md-links/prueba2.md'
    },
    {
      href: 'https://nodejs.org/',
      text: 'Node.js',
      fileName: 'C:/proyecto 4/LIM018-md-links/prueba2.md'
    }
  ]
  return (mdLinks(path, {validate : false })).then((e) =>{
    expect(e).toMatch(arrayLinkTest)
  })
  .catch((error) => {
    return error
  });
});

it('Deberia retornar un arreglo con validate peticion http', () => {
  const path = "C:/proyecto 4/LIM018-md-links/prueba2.md";
  const arrayHtpp = [
    {
      href: 'https://es.wiki123.org/wiki/Markdown',
      text: 'Markdown',
      file: 'C:/proyecto 4/LIM018-md-links/prueba2.md',
      status: 404,
      ok: 'FAIL'
    },
    {
      href: 'https://nodejs.org/',
      text: 'Node.js',
      file: 'C:/proyecto 4/LIM018-md-links/prueba2.md',
      status: 200,
      ok: 'OK'
    }
  ];
  return(mdLinks(path, { validate : true }).then((res) => {
    expect(e).toMatch(arrayHtpp)
  })).catch((error) => {
    return error
  })
});


// it('debe ser un array de objetos con peticion HTTP', () => mdLinks(path2, { validate: true })
// .then((data) => {
//     expect(data[0].value.statusText).toBe('ok');
// }));
// it('It should return an error message', () => {
// return mdLinks(testInvalid, { validate: true }).catch(e => expect(e).toMatch('| ✿ INVALID PATH ✿ |'))
// })


  