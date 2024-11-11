import supertest from 'supertest';
import { expect } from 'chai';

const request = supertest('http://localhost:8080');

describe('Tests funcionales para los endpoints de mascotas', () => {

  it('Debería obtener todas las mascotas', async () => {
    const response = await request.get('/api/pets');
    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal("success");
    expect(response.body.payload).to.be.an('array');
  });

  it('Debería crear una nueva mascota', async () => {
    const newPet = { name: 'Firulais', specie: 'Perro', birthDate: '2020-01-01' };
    const response = await request.post('/api/pets').send(newPet);
    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal("success");
    expect(response.body.payload).to.have.property('name', 'Firulais');
  });

  it('Debería actualizar una mascota', async () => {
    const petId = '670c90848f479ad3a1218a10';
    const updates = { name: 'Firulais Actualizado', specie: 'Perro', birthDate: '2020-01-01' };
    const response = await request.put(`/api/pets/${petId}`).send(updates);
    if (response.status === 200) {
      expect(response.body.status).to.equal("success");
      expect(response.body.mensaje).to.equal("Mascota actualizada");
    } else {
      expect(response.status).to.equal(404);
    }
  });

  it('Debería eliminar una mascota', async () => {
    const petId = '670c90848f479ad3a1218a15';
    const response = await request.delete(`/api/pets/${petId}`);
    if (response.status === 200) {
      expect(response.body.status).to.equal("success");
      expect(response.body.mensaje).to.equal("Mascota eliminada");
    } else {
      expect(response.status).to.equal(404);
    }
  });
});
