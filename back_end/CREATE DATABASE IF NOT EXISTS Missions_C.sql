

CREATE DATABASE IF NOT EXISTS institut_beauteRomanna;
SHOW DATABASES;
USE institut_beauteRomanna;

DROP TABLE IF EXISTS certificats;
DROP TABLE IF EXISTS faq;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS type_services;
DROP TABLE IF EXISTS formulaire;
DROP TABLE IF EXISTS user;


-- TABLE: USER

CREATE TABLE user (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL
);


-- TABLE: FORMULAIRE 
CREATE TABLE formulaire (
    id_formulaire INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    telephone VARCHAR(20),
    sujet ENUM ('Manucure', 'Permanente','Formation', 'Autre') NOT NULL, 
    message TEXT NOT NULL,
    date_envoi DATETIME DEFAULT CURRENT_TIMESTAMP
);


-- TABLE: TYPE_SERVICES

CREATE TABLE type_services (
    id_type INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    description TEXT,
    img_url VARCHAR(255)
);


-- TABLE: SERVICES 

CREATE TABLE services (
    id_service INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    description TEXT,
    img_url VARCHAR(255),
    duree VARCHAR(50) NULL,            
    prix DECIMAL(10,2) NULL, 
    id_type INT,
    FOREIGN KEY (id_type) REFERENCES type_services(id_type)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- TABLE: pricelist 

-- CREATE TABLE  pricelist (
--     id_price INT AUTO_INCREMENT PRIMARY KEY,
--     titre VARCHAR(150),                
--     service_name VARCHAR(150),        
--     duree VARCHAR(50) NULL,            
--     prix DECIMAL(10,2) NULL,          
--         ON DELETE SET NULL
--         ON UPDATE CASCADE
-- );

-- TABLE: FAQ 

CREATE TABLE faq (
    id_faq INT AUTO_INCREMENT PRIMARY KEY,
    question TEXT NOT NULL,
    reponse TEXT NOT NULL
);


-- TABLE: CERTIFICATS

CREATE TABLE certificats (
    id_certificat INT AUTO_INCREMENT PRIMARY KEY,
    img_url VARCHAR(255)
);

DESCRIBE user;
DELETE FROM user
WHERE email = 'beauty.salon.tyrosse@gmail.com';