
CREATE TABLE User (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    userType VARCHAR(20),
    address VARCHAR(255)
);

CREATE TABLE Admin (
    adminId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    FOREIGN KEY (userId) REFERENCES User(userId)
);

CREATE TABLE Category (
    categoryId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    description TEXT
);

CREATE TABLE Product (
    productId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    price DECIMAL(10,2),
    stock INT,
    categoryId INT,
    FOREIGN KEY (categoryId) REFERENCES Category(categoryId)
);

CREATE TABLE Inventory (
    inventoryId INT AUTO_INCREMENT PRIMARY KEY,
    productId INT,
    availableQuantity INT,
    minimumQuantity INT,
    lastRestockDate DATE,
    FOREIGN KEY (productId) REFERENCES Product(productId)
);

CREATE TABLE Cart (
    cartId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    createdDate DATE,
    FOREIGN KEY (userId) REFERENCES User(userId)
);

CREATE TABLE CartProduct (
    cartId INT,
    productId INT,
    quantity INT,
    PRIMARY KEY (cartId, productId),
    FOREIGN KEY (cartId) REFERENCES Cart(cartId),
    FOREIGN KEY (productId) REFERENCES Product(productId)
);

CREATE TABLE OrderTable (
    orderId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    orderDate DATE,
    total DECIMAL(10,2),
    status VARCHAR(50),
    FOREIGN KEY (userId) REFERENCES User(userId)
);

CREATE TABLE OrderProduct (
    orderId INT,
    productId INT,
    quantity INT,
    PRIMARY KEY (orderId, productId),
    FOREIGN KEY (orderId) REFERENCES OrderTable(orderId),
    FOREIGN KEY (productId) REFERENCES Product(productId)
);

CREATE TABLE Payment (
    paymentId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    orderId INT,
    amount DECIMAL(10,2),
    paymentMethod VARCHAR(50),
    paymentDate DATE,
    FOREIGN KEY (userId) REFERENCES User(userId),
    FOREIGN KEY (orderId) REFERENCES OrderTable(orderId)
);

CREATE TABLE Shipping (
    shippingId INT AUTO_INCREMENT PRIMARY KEY,
    orderId INT,
    shippingAddress VARCHAR(255),
    shippingCompany VARCHAR(100),
    trackingNumber VARCHAR(100),
    shippingStatus VARCHAR(50),
    shippingDate DATE,
    estimatedDeliveryDate DATE,
    FOREIGN KEY (orderId) REFERENCES OrderTable(orderId)
);

CREATE TABLE Wishlist (
    wishlistId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    createdDate DATE,
    FOREIGN KEY (userId) REFERENCES User(userId)
);

CREATE TABLE WishlistProduct (
    wishlistId INT,
    productId INT,
    PRIMARY KEY (wishlistId, productId),
    FOREIGN KEY (wishlistId) REFERENCES Wishlist(wishlistId),
    FOREIGN KEY (productId) REFERENCES Product(productId)
);
