// swagger.js

require('dotenv').config();
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'BlakBox API',
    description: 'Documentación de la API generada automáticamente con swagger-autogen'
  },
  host: `localhost:${process.env.PORT || 3007}`,
  basePath: '/blakbox',
  schemes: ['http'],
  definitions: {
    User: {
      firstName:   'Ana',
      lastName:    'García',
      email:       'ana@example.com',
      password:    'secret123',
      userType:    'customer',
      phoneNumber: '+593987654321'
    },
    Product: {
      name:        'Smartphone',
      description: 'Teléfono inteligente',
      brand:       'MarcaX',
      price:       699.99,
      stock:       50,
      categoryId:  '60d0fe4f5311236168a109ca',
      discount:    '10%',
      features:    ['Bluetooth', 'GPS', '4G'],
      sales:       120,
      ratings: [
        {
          rating:  5,
          comment: 'Excelente producto',
          date:    '2025-08-01T12:00:00Z'
        }
      ]
    },
    Order: {
      userId:    '60d0fe4f5311236168a109cb',
      orderDate: '2025-08-01T12:00:00Z',
      total:     699.99,
      status:    'pending'
    },
    Payment: {
      userId:        '60d0fe4f5311236168a109cb',
      orderId:       '60d0fe4f5311236168a109cc',
      amount:        699.99,
      paymentMethod: 'credit_card',
      paymentDate:   '2025-08-01T12:05:00Z',
      status:        'confirmed',
      transactionId: 'txn_123456'
    },
    Wishlist: {
      userId:      '60d0fe4f5311236168a109cd',
      createdDate: '2025-08-01T12:10:00Z'
    },
    Cart: {
      userId:      '60d0fe4f5311236168a109ce',
      createdDate: '2025-08-01T12:15:00Z'
    },
    Inventory: {
      productId:        '60d0fe4f5311236168a109ca',
      availableQuantity: 100,
      minimumQuantity:   5,
      lastRestockDate:   '2025-07-30T09:00:00Z'
    },
    Shipping: {
      orderId:               '60d0fe4f5311236168a109cc',
      shippingAddress:       'Av. Siempre Viva 123',
      shippingCompany:       'Envíos SA',
      trackingNumber:        'TRK123456',
      shippingDate:          '2025-08-02T08:00:00Z',
      estimatedDeliveryDate: '2025-08-09T08:00:00Z'
    }
  }
};

const outputFile     = './swagger.json';
const endpointsFiles = ['./index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('✅ swagger.json generado con éxito');
  // Si deseas arrancar el servidor inmediatamente tras generar la spec, descomenta la línea siguiente:
  // require('./index.js');
});
