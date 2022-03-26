# Adogtame

Adogtame website:

https://adogtame-gps.herokuapp.com/

## Instalación

### Requerimientos

- NodeJs 
- Git 

### Pasos de la instalación

1. Clonar el repositorio:

    git clone https://github.com/chinataun/adogtame.git adogtame

2. Acceder a la carpeta del proyecto:

    cd adogtame

3. Instalar las librerias con el siguiente comando

    npm install

4. Iniciar aplicación con el siguiente comando:

    npm start


5. Acceder a la url en local: 

    - http://www.localhost:3000

## Testing

Si queremos ejecutar pruebas en local basta con ejecutar el comando **npm test**

Cuando abramos un Pull Request de una feature a dev, se ejecutarán las acciones de github para la ejecución de las pruebas y/o el deploy a staging 

Ejecucion de selenium: Ejecutar chrome driver y en la consola node ./utils/selenium.js

## Github Actions
https://github.com/chinataun/adogtame/actions/workflows/pipeline.yml
