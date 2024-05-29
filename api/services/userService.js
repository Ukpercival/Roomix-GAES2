const User = require('../models/User');
const Counter = require('../models/Counter');

class UserService {
    async createUser(data) {
        const counter = await Counter.findByIdAndUpdate(
            { _id: 'userId' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );

        data.id = counter.seq;

        const user = new User(data);
        await user.save();
        return user;
    }

    async getUsers() {
        return await User.find();
    }

    async getUserById(id) {
        return await User.findOne({ id });
    }

    async updateUser(id, data) {
        return await User.findOneAndUpdate({ id }, data, { new: true });
    }

    async deleteUser(id) {
        return await User.findOneAndDelete({ id });
    }
}

module.exports = new UserService();
