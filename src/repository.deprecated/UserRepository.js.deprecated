
import GenericRepository from "./GenericRepository.js";

export default class UserRepository extends GenericRepository {
    constructor(dao) {
        super(dao);
    }

    createMany(users) {
        return this.dao.insertMany(users);
    }

    getUserByEmail(email) {
        return this.getBy({ email });
    }

    getUserById(id) {
        return this.getBy({ _id: id });
    }
}