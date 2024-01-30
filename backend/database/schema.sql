CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pseudo VARCHAR(150) NOT NULL,
  email VARCHAR(250) NOT NULL UNIQUE,
  password VARCHAR(250) NOT NULL,
  city VARCHAR(150),
  country VARCHAR(150),
  adress VARCHAR(250),
  registration_date DATETIME NOT NULL DEFAULT NOW(),
  isAdmin BOOLEAN DEFAULT 0
);

CREATE TABLE todo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  note VARCHAR(250) NOT NULL,
  creation_date DATETIME NOT NULL DEFAULT NOW(),
  user_id INT NOT NULL,
  CONSTRAINT FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE contact (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(250) NOT NULL,
  phone_number VARCHAR(50),
  user_id INT NOT NULL,
  CONSTRAINT FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE rdv (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  scheduled_date DATETIME NOT NULL,
  start_hour_time INT NOT NULL,
  start_minute_time INT NOT NULL,
  end_hour_time INT NOT NULL,
  end_minute_time INT NOT NULL,
  description TEXT,
  user_id INT NOT NULL,
  CONSTRAINT FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE rdv_contact (
  id INT AUTO_INCREMENT PRIMARY KEY,
  contact_id INT NOT NULL,
  rdv_id INT NOT NULL,
  CONSTRAINT FOREIGN KEY (rdv_id) REFERENCES rdv(id),
  CONSTRAINT FOREIGN KEY (contact_id) REFERENCES contact(id)
);

INSERT INTO user (pseudo, email, password) VALUES ('Toto', 'toto@toto.fr', '$argon2id$v=19$m=19456,t=2,p=1$68LocxlqXJHuGHSC+ZZJJQ$509Az27f75To7qepOediWrt3fIYUmixGzB6w+n+9zzc');