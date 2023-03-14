const { User, Thought } = require('../models');

module.exports = {
    // get all users
    getAll(req, res) {
        User.find()
        .select('-__v')
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },

    //get one user
    getOne(req, res) {
        User.findOne({ _id: req.params.userId })
        .then((user) =>
        !user ? res.status(404).json({ message: 'No user found!' }) : res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    //create a user
    newUser(req, res) {
        User.create(req.body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(500).json(err));
    },

    //update a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { new: true, runValidators: true }
        )
        .then((dbUserData) =>
        !dbUserData ? res.status(404).json({ message: 'No user found!' }) : res.json(dbUserData))
        .catch((err) => res.status(500).json(err));
    },

    //delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) =>
        !user ? res.status(404).json({ message: 'No user found!' }) : res.json({ message: 'User deleted!' }))
        .catch((err) => res.status(500).json(err));
    },

    //adding a friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true, runValidators: true }
        )
        .select('-__v')
        .then((dbUserData) =>
        !dbUserData ? res.status(404).json({ message: 'No friend found!' }) : res.json(dbUserData));
    },

    //remove a friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true, runValidators: true }
        )
        .select('-__v')
        .then((dbUserData) => 
        !dbUserData ? res.status(400).json({ message: 'No friend found!' }) : res.json(dbUserData));
    },
};