clonar dentro de la misma carpeta donde se encuentra su proyecto node-experience. (misma jerarquia)

ej:

projects \
    |\
    |__excli\
    |\
    |__node_experience

instalar dependencias
cd excli
yarn


ejecutar este comando en la terminal dentro de la raiz de su proyecto node_experience

../excli/bin/run generate:crud --for=entity --entity=[NombreDeSuEntidad]
../excli/bin/run generate:crud --for=tenant_entity --entity=[NombreDeSuEntidad]