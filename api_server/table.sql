-- Database booksell_keshe

CREATE TABLE PurchaseInventory (
  id INT PRIMARY KEY,
  book_number VARCHAR(50),
  book_name VARCHAR(100),
  purchase_price DECIMAL(10, 2),
  purchase_quantity INT,
  remark VARCHAR(200)
);

CREATE TABLE SalesInventory (
  id INT PRIMARY KEY,
  book_number VARCHAR(50),
  book_name VARCHAR(100),
  sale_price DECIMAL(10, 2),
  sale_quantity INT,
  remark VARCHAR(200)
);

CREATE TABLE users (
  id INT PRIMARY KEY,
  username VARCHAR(50),
  password VARCHAR(100)
);
