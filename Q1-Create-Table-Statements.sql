-- Table: clients
CREATE TABLE clients (
  _id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255),
  dateOfBirth DATE,
  businessDetailsId VARCHAR(255),
  FOREIGN KEY (businessDetailsId) REFERENCES business_details (_id)
);

-- Table: addresses
CREATE TABLE addresses (
  id VARCHAR(255) PRIMARY KEY,
  formattedAddress VARCHAR(255),
  streetNumber INT,
  street VARCHAR(255),
  suburb VARCHAR(255),
  state VARCHAR(255),
  postCode VARCHAR(255),
  isCurrent BOOLEAN,
  clientId VARCHAR(255),
  FOREIGN KEY (clientId) REFERENCES clients (_id)
);

-- Table: business_details
CREATE TABLE business_details (
  _id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255),
  abn VARCHAR(255)
);

-- Table: client_associates (self-referencing table for associates)
CREATE TABLE client_associates (
  clientId VARCHAR(255),
  associateId VARCHAR(255),
  FOREIGN KEY (clientId) REFERENCES clients (_id),
  FOREIGN KEY (associateId) REFERENCES clients (_id)
);