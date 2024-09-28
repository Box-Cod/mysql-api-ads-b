#Pre Init

- install -> docker: https://docs.docker.com/compose/install/
- install -> node-js: https://nodejs.org/en

#Init

- create a folder
- open this folder created in vscode
- open terminal vscode
- run in terminal -> git clone https://github.com/Box-Cod/mysql-api-ads-b.git
- run in terminal -> cd ./mysql-api-ads-b
- run in terminal -> npm i
- open docker app in desktop
- run docker
- in terminal vscode run -> docker compose up -d
- in the file package.json update the session (sripts) to ->
    "scripts": {
      "start": "ts-node --transpile-only src/index.ts"
    },
- in terminal run -> npm start
- in the browser go to "localhost:8080/"
  
- Enter credentials:
    - user -> root;
    - password-> change123;
    - database-> unicesumar;

- create the "roles" table with the columns:
    id = automatic increment;
    name = varchar(127);

- create the "users" table with the columns:
    id = automatic increment;
    name = varchar(255);
    email = varchar(127);
    password = varchar(127);
    role = int NULL;
    registration_dt = datetime;
    active = int;
  
    "ps: “role” is a foreign key of the “roles” table".

- the "users" table has indexes:
    id = PRIMARY;
    email = UNIQUE;
    role = INDEX;
  and foreign key "role":
    destination table = "roles";
    origin = role;
    destination = id;
    ON DELETE = SET NULL;
    ON UPDATE = RESTRICT;

- create the "categories" table with the columns:
    id = automatic increment;
    name = varchar(255);
    created_at = varchar(127);
    updated_at = varchar(127);

- in the browser go to "localhost:3000/users/form"
- create a new user

rotes: 
 - http://localhost:3000/users/form
 - http://localhost:3000/users/
 - http://localhost:3000/categories
 - http://localhost:3000/categories/form
 - http://localhost:3000/login
 - http://localhost:3000/


