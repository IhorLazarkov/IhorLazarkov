Drop table if exists queries;

create table queries ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    body varchar(100) NOT NULL, 
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP);
