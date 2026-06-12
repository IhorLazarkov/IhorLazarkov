Drop table if exists queries;

create table queries ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    body varchar(100) NOT NULL, 
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP);

INSERT INTO queries (body) VALUES('Is this AI?');

INSERT INTO queries (body) VALUES('How does this agent work?');

INSERT INTO queries (body) VALUES('asdf');
