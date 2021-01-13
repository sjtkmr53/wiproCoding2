const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const app = require('../app');
const expect = chai.expect;

chai.use(chaiAsPromised);

describe('functional - Pets', () => {
    it('should fail to to create a pets record  name is required !', async () => {
        const res = await request(app).post('/pets').send({
            age: '16',
            colour: 'res',
        });
        expect(res.status).to.equal(400);
    });

    it('should fail to to create a pets record  age is required!', async () => {
        const res = await request(app).post('/pets').send({
            name: 'Tom',
            colour: 'res',
        });
        expect(res.status).to.equal(400);
    });

    it('should fail to to create a pets record  color is required !', async () => {
        const res = await request(app).post('/pets').send({
            name: 'Tom',
            age: '',
        });
        expect(res.status).to.equal(400);
    });

    it('should create a pets pass the  validation ', async () => {
        const pets = {
            name: 'Tom',
            age: 19,
            colour: 'res',
        };
        const res = await request(app).post('/pets').send(pets);
        expect(res.status).to.equal(201);
    });
});

