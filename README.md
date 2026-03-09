# Nombre o título de mi proyecto, app, servicio, o sistema

_Proyecto desarrollado para la asignatura de Sistemas Distribuidos. Consiste en la implementación de un servicio web REST capaz de realizar operaciones CRUD sobre una base de datos MongoDB. El servicio permite crear, consultar, modificar y eliminar documentos mediante peticiones HTTP, además de incorporar mecanismos de seguridad como autenticación mediante token, soporte CORS y comunicación segura mediante HTTPS._

_A continuación se muestran las rutas principales del API:_

Verbo HTTP | Ruta | Descripción

--------: | :------- | :--------
<span style="color:green">GET</span> || /api | Obtiene todas las colecciones existentes en la base de datos.
<span style="color:green">GET</span> |/api/{coleccion} | Obtiene todos los elementos de la colección indicada.
<span style="color:green">GET</span> | /api/{coleccion}/{id} | Obtiene un elemento concreto mediante su identificador.
<span style="color:yellow">POST</span> | /api/{coleccion} | Crea un nuevo documento en la colección indicada.
<span style="color:blue">PUT</span> | /api/{coleccion}/{id} | Modifica un documento existente.
<span style="color:red">DELETE</span> | | Elimina un documento de la base de datos.


## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._


### Pre-requisitos 📋

Para ejecutar este proyecto es necesario disponer de las siguientes herramientas:

- Node.js
- npm
- MongoDB
- Git
- Postman (para pruebas del API)

En sistemas basados en Linux o Ubuntu la instalación puede realizarse con los siguientes comandos:

```sh
sudo apt update
sudo apt install npm
sudo npm clean -f
sudo npm i -g n
sudo n stable
```sh
sudo apt update
sudo apt install npm
sudo npm clean -f
sudo npm i -g n
sudo n stable
```

_Igualmente se debe tener instalada la DB **MongoDB** y asegurarnos que está lanzada..._

```sh
sudo apt update
sudo apt install -y mongodb
sudo systemctl start mongodb
```

En macOS estas herramientas pueden instalarse mediante Homebrew.

### Instalación 🔧

_En esta sección veremos cómo instalar y configurar el entorno de desarrollo para trabajar con el proyecto._

_En primer lugar, debemos clonar el proyecto desde nuestro repositorio._

```sh
git clone https://github.com/ilaor/api-crud-ivan.git
```

_Una vez clonado el respositorio, debemos instalar y actualizar todas las bibliotecas de código y dependencias del proyecto._

```sh
cd api-crud-ivan
npm i
```

_Para poner el proyecto en marcha, ejecutaremos el siguiente comando:_

```sh
npm start
```

## Pruebas con Postman 📯

_El archivo `CRUD_postman_collection.json` contiene una colección de pruebas para todos los **endpoints** del API del servicio._

_Para poder emplearlo desde **Postman**, bastará con importar el archivo y, si fuera necesario, modificar el puerto de escucha del servidor._

El proyecto incluye una colección de pruebas para Postman con todos los endpoints del servicio.

Pasos para utilizarla:

1. Abrir Postman

2. Seleccionar Import

3. Importar el archivo:
postman_collection.json

Una vez importada la colección, se podrán ejecutar todas las operaciones CRUD del servicio.

## Despliegue 📦

El proyecto puede ejecutarse en cualquier entorno que disponga de:

-Node.js
-MongoDB

Para entornos de producción se recomienda utilizar:

-HTTPS
-variables de entorno
-contenedores Docker

## Construido con 🛠️

* [Express](https://expressjs.com/es/) - Infraestructura de aplicaciones web Node.js mÃ­nima y flexible que proporciona un conjunto sólido de caracterí­sticas para las aplicaciones web y móviles.
* [mongodb](https://www.mongodb.com/docs/drivers/node/current/) - official MongoDB Node.js driver. You can add the driver to your application to work with MongoDB in JavaScript.
* [mongojs](github.com/mongo-js/mongojs#readme) - Iofficial MongoDB Node.js driver. You can add the driver to your application to work with MongoDB in JavaScript.
* [cors](github.com/expressjs/cors#readme) - CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
* [helmet](helmetjs.github.io/) - IHelmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
* [morgan](github.com/expressjs/morgan#readme) - HTTP request logger middleware for node.js.
* [nodemon](https://www.npmjs.com/package/nodemon) - Herramienta que ayuda a desarrollar aplicaciones basadas en node.js reiniciando automáticamente la aplicación de node cuando se detectan cambios de archivos en el directorio.
* [jwt-simple](https://github.com/hokaccha/node-jwt-simple#readme) - JWT(JSON Web Token) encode and decode module for node.js.
* [moment](https://momentjs.com) - A JavaScript date library for parsing, validating, manipulating, and formatting dates.


## Versionado 📌

Usamos [SemVer](http://semver.org/) para el versionado. Para todas las versiones disponibles, mira los [tags en este repositorio](https://https://bitbucket.org/pmacia/api-rest/commits/).

En este respositorio se pueden encontrar la evolución del proyecto desde la estructura básica de un servicio, hasta un servicio CRUD completo con comunicación HTTPS, soporte para CORS, seguridad con Helmet y autorización tipo bearer basada en tokens tipo JWT:

tag     | Descripción
------- | ------------------------------------------
v1.0.0 | API REST básica.
v2.0.0  | CRUD sin base de datos.
v3.0.0  | CRUD con MongoDB.
v3.1.0  | Seguridad mediante token.
v3.2.0  | Comunicación segura HTTPS.

## Autores ✒️

_Todos aquellos que ayudaron a levantar el proyecto desde sus inicios:_


* **Paco Maciá** - _Trabajo Inicial_ - [pmacia](https://github.com/pmacia)
* **Ivan Lara ** - _Documentación y desarrollo_ - [ilaor](#https://github.com/ilaor)

También puedes mirar la lista de todos los [contribuyentes](https://github.com/your/project/contributors) quiénes han participado en este proyecto.

## Licencia 📄

Este proyecto está bajo la Licencia (Tu Licencia) - mira el archivo [LICENSE.md](LICENSE.md) para detalles

## Expresiones de Gratitud 🎁

* Comenta a otros sobre este proyecto 📢
* Invita una cerveza 🍺 o un café ☕ a alguien del equipo.
* Da las gracias públicamente 🤓.
* etc.
