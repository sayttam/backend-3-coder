import Users from "../../src/dao/Users.dao.js";
import { expect } from "chai";
import { dbconnection } from "../../src/config/db.config.js";

dbconnection();

describe('Tests UserDao', () => {
    const userDao = new Users;

    it('Debería retornar todos los usuarios', async () => {
      const users = await userDao.get();
      expect(users).to.be.an('array');
    });

});