const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../server'); //get the instance of your app
//import product model
const productModel = require('../database/model/productModel');
let mongoServer; 

//use the beforeAll hook to setup test database connection using an in-memory server
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri =  mongoServer.getUri();
    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

//use the afterAll hook to disconnect from the test database connection and stop the in-memory server
afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

//test cases
describe('Product Model', () => {
    it('should create a product', async () => {
        const productData = {
            name: 'Power Bank',
            quantity: 2,
            price: 50000,
            image: "https://www-konga-com-res.cloudinary.com/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/D/F/91633_1657108289.jpg"
        }

        const createdProduct = productModel.create(productData);

        //assert
        expect(createdProduct.name).toBe(productData.name);
        expect(createdProduct.quantity).toBe(productData.quantity);
        expect(createdProduct.price).toBe(productData.price);
        expect(createdProduct.image).toBe(productData.image);

    });
});