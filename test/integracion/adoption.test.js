import supertest from 'supertest';
import { expect } from 'chai';

const request = supertest('http://localhost:8080');

describe('Tests funcionales para los endpoints de adopción', () => {
  it('Debería obtener todas las adopciones', async () => {
    const response = await request.get('/api/adoptions');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body.status).to.equal("success");
    expect(response.body.payload).to.be.an('array');
  });

  it('Debería obtener una adopción por ID', async () => {
    const adoptionId = '6714799e3f9676d7f295e345'; 
    const response = await request.get(`/api/adoptions/${adoptionId}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body.status).to.equal("success");
    expect(response.body.payload).to.have.property('_id', adoptionId);
  });

  it('Debería devolver un error 404 si la adopción no existe', async () => {
    const invalidAdoptionId = '000000000000000000000000';
    const response = await request.get(`/api/adoptions/${invalidAdoptionId}`);
    expect(response.status).to.equal(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('error', 'Adopción no encontrada');
  });

  it('Debería crear una nueva adopción', async () => {
    const userId = '670acbe23a896852f0570004'; 
    const petId = '671480bbc15182fedc314349'; 
    const response = await request.post(`/api/adoptions/${userId}/${petId}`);
    expect(response.status).to.equal(201);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status', 'success');
    expect(response.body).to.have.property('message', 'Mascota adoptada!');
  });

  it('Debería devolver un error 404 si el usuario no existe al crear una adopción', async () => {
    const invalidUserId = '000000000000000000000000';
    const petId = '671480bbc15182fedc314349';
    const response = await request.post(`/api/adoptions/${invalidUserId}/${petId}`);
    expect(response.status).to.equal(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('error', 'Usuario no encontrado');
  });

  it('Debería devolver un error 404 si la mascota no existe al crear una adopción', async () => {
    const userId = '670acbe23a896852f0570004';
    const invalidPetId = '000000000000000000000000';
    const response = await request.post(`/api/adoptions/${userId}/${invalidPetId}`);
    expect(response.status).to.equal(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('error', 'Mascota no encontrada');
  });

  it('Debería devolver un error si la mascota ya ha sido adoptada', async () => {
    const userId = '670acbe23a896852f0570004'; 
    const alreadyAdoptedPetId = '670aa0f5b444ed61bd3f9c13';
    const response = await request.post(`/api/adoptions/${userId}/${alreadyAdoptedPetId}`);
    expect(response.status).to.equal(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('error', 'La mascota ya ha sido adoptada');
  });
});
