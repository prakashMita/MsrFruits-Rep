-- create database msrfruits;
-- use msrfruits;
-- create table prodects (Id int primary key AUTO_INCREMENT,Fruit varchar(200), Quantity varchar(200), Price varchar(200), Amount varchar(200), TotalAmount varchar(200));
-- insert into prodects value (1,"Apple",2,100,200,200);
-- select * from prodects;
drop table prodects;
-- create table customer(Id int primary key AUTO_INCREMENT,Orderid int, CustomerName varchar(200), PhoneNumber varchar(200));
-- insert into customer value (1,504,"prakashs",9555586525);
-- select * from customer;
drop table customer;
-- select prodects.Id, customer.CustomerName, Customer.PhoneNumber, Customer.Orderid, prodects.Fruit, prodects.Quantity, prodects.Price, prodects.Amount, prodects.TotalAmount
-- from prodects
-- inner join customer
-- on prodects.Id=customer.Id;



-- --------------------------------------------- ------------------------------------------



-- Create the database
CREATE DATABASE msrfruits;

USE msrfruits;

-- Create the prodects table
CREATE TABLE prodects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  OrderId INT NOT NULL,
  Fruit VARCHAR(255) NOT NULL,
  Quantity INT NOT NULL,
  Price DECIMAL(10, 2) NOT NULL,
  Amount DECIMAL(10, 2) NOT NULL,
  TotalAmount DECIMAL(10, 2) NOT NULL
);


-- Insert sample data into prodects table
INSERT INTO prodects (OrderId, Fruit, Quantity, Price, Amount, TotalAmount ) VALUES
(504, "Apple", 2, 100.00, 200.00, 200.00);
select * from prodects;
drop table prodects;


-- user details ----

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  OrderId INT NOT NULL,
  UserName VARCHAR(255) NOT NULL,
  UserMobile VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select * from users;
drop table users;


-- status 
create table orderstatus(id INT AUTO_INCREMENT PRIMARY KEY,
OrderId INT NOT NULL,
OrderStatus VARCHAR(20) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select * from orderstatus;
drop table orderstatus;

-- commission
create table commission (id INT AUTO_INCREMENT PRIMARY KEY,
OrderId INT NOT NULL,
Comm VARCHAR(200) NOT NULL,
LorryRent VARCHAR(200) NOT NULL,
Cooly VARCHAR(200) NOT NULL,
NoteCash VARCHAR(200) NOT NULL,
CommTableTotal VARCHAR(200) NOT NULL,
OrderType VARCHAR(200) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

select * from commission;
drop table commission;


-- Customerlist
-- CREATE TABLE customerlist (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   OrderId INT NOT NULL,
--   UserName VARCHAR(255) NOT NULL,  -- Add UserName field
--   UserMobile VARCHAR(20) NOT NULL, -- Add UserMobile field
--   Fruit VARCHAR(255) NOT NULL,
--   Quantity INT NOT NULL,
--   Price DECIMAL(10, 2) NOT NULL,
--   Amount DECIMAL(10, 2) NOT NULL,
--   OrderStatus VARCHAR(20) NOT NULL DEFAULT 'Unpaid',
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   UNIQUE (id)  -- Ensure unique combination of OrderId and Fruit
-- );



CREATE TABLE customerlist (
  id INT AUTO_INCREMENT PRIMARY KEY,
  OrderId INT NOT NULL,
  UserName VARCHAR(255) NOT NULL,  -- Customer's name
  UserMobile VARCHAR(20) NOT NULL, -- Customer's mobile number
  Fruit VARCHAR(255) NOT NULL,     -- Fruit name or type
  Quantity INT NOT NULL,           -- Quantity of fruit
  Price DECIMAL(10, 2) NOT NULL,   -- Price of the fruit per unit
  Amount DECIMAL(10, 2) NOT NULL,  -- Total amount (Quantity * Price)
  OrderStatus VARCHAR(20) NOT NULL DEFAULT 'Unpaid', -- Status of the order
  Comm VARCHAR(200),               -- Commission related to the order
  LorryRent VARCHAR(200),          -- Lorry rent cost
  Cooly VARCHAR(200),              -- Labor cost (Cooly)
  NoteCash VARCHAR(200),           -- Cash notes
  CommTableTotal VARCHAR(200),     -- Total commission table cost
  OrderType VARCHAR(200) NOT NULL, -- Added column for order type
  OverAllAmount VARCHAR(200) NOT NULL, -- New column for overall amount
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Timestamp of the order creation
  UNIQUE (id)                      -- Ensures a unique ID for each entry
);



drop table customerlist;
SELECT * FROM customerlist;

INSERT INTO customerlist (OrderId, UserName, UserMobile, Fruit, Quantity, Price, Amount, OrderStatus) 
VALUES (268, 'prakashs', '9595955', 'Apple', 2, '2', '4.00', 'Unpaid');


SELECT u.OrderId, u.UserName, u.UserMobile, c.Fruit, c.Quantity, c.Price, c.Amount
FROM users u
JOIN customerlist c ON u.OrderId = c.OrderId;


SELECT cl.*, os.OrderStatus
FROM customerlist cl
LEFT JOIN orderstatus os ON cl.OrderId = os.OrderId;


UPDATE customerlist cl
JOIN orderstatus os ON cl.OrderId = os.OrderId
SET cl.OrderStatus = os.OrderStatus;



-- join customerlist and orderstatus 

SELECT 
    u.OrderId, 
    u.UserName, 
    u.UserMobile, 
    c.Fruit, 
    c.Quantity, 
    c.Price, 
    c.Amount,
    os.OrderStatus
FROM 
    users u
JOIN 
    customerlist c ON u.OrderId = c.OrderId
JOIN 
    orderstatus os ON u.OrderId = os.OrderId;


--  commission and customerlist

SELECT 
  c.id AS CustomerID,
  c.OrderId,
  c.UserName,
  c.UserMobile,
  c.Fruit,
  c.Quantity,
  c.Price,
  c.Amount,
  c.OrderStatus,
  c.created_at,
  com.Comm,
  com.LorryRent,
  com.Cooly,
  com.NoteCash,
  com.CommTableTotal
FROM 
  customerlist c
JOIN 
  commission com 
ON 
  c.OrderId = com.OrderId;
 


ALTER TABLE customerlist
ADD COLUMN Comm VARCHAR(200),
ADD COLUMN LorryRent VARCHAR(200),
ADD COLUMN Cooly VARCHAR(200),
ADD COLUMN NoteCash VARCHAR(200),
ADD COLUMN CommTableTotal VARCHAR(200);

UPDATE customerlist c
JOIN commission com 
ON c.OrderId = com.OrderId
SET 
  c.Comm = com.Comm,
  c.LorryRent = com.LorryRent,
  c.Cooly = com.Cooly,
  c.NoteCash = com.NoteCash,
  c.CommTableTotal = com.CommTableTotal;

-- --addordertypecolumn
ALTER TABLE customerlist 
ADD COLUMN OrderType VARCHAR(200) NOT NULL DEFAULT 'Sale Order';


UPDATE customerlist c
JOIN commission com ON c.OrderId = com.OrderId
SET c.OrderType = com.OrderType;


SELECT 
  c.id AS CustomerID,
  c.OrderId,
  c.UserName,
  c.UserMobile,
  c.Fruit,
  c.Quantity,
  c.Price,
  c.Amount,
  c.OrderStatus,
  c.OrderType,         -- OrderType from customerlist
  c.created_at,
  com.Comm,
  com.LorryRent,
  com.Cooly,
  com.NoteCash,
  com.CommTableTotal,
  com.OrderType        -- OrderType from commission
FROM 
  customerlist c
JOIN 
  commission com 
ON 
  c.OrderId = com.OrderId;

-- --addoverallamount

ALTER TABLE customerlist 
ADD COLUMN OverAllAmount VARCHAR(200) NOT NULL;


SELECT 
  c.id AS CustomerID,
  c.OrderId,
  c.UserName,
  c.UserMobile,
  c.Fruit,
  c.Quantity,
  c.Price,
  c.Amount,
  c.OrderStatus,
  c.OrderType,         -- OrderType from customerlist
  c.OverAllAmount,     -- New OverAllAmount column
  c.created_at,
  com.Comm,
  com.LorryRent,
  com.Cooly,
  com.NoteCash,
  com.CommTableTotal,
  com.OrderType        -- OrderType from commission
FROM 
  customerlist c
JOIN 
  commission com 
ON 
  c.OrderId = com.OrderId;











