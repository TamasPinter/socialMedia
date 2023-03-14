const { Thought, User } = require('../models');

module.exports = {
    //get all thoughts
    getAll(req, res) {
        Thought.find()
        .select('-__v')
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },

    //get one thought
    getOne(req, res) {
        Thought.findOne()
        .select('-__v')
        .then((thought) => !thought ? res.status(400).json({ message: 'No thought found!' }) : res.json(thought))
        .catch((err) => res.status(500).json(err));
    },

    //create a thought
    newThought(req, res) {
        Thought.create(req.body)
        .then((dbThoughtData) => !dbThoughtData ? res.status(404).json({ message: 'Failed to create a thought!' }) 
        : User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: dbThoughtData._id } },
            { new: true }
        )
        .select('-__v')
        .then((dbUserData) => !dbUserData ? res.status(400).json({ message: 'No user with this Id!' }) : res.json(dbUserData))
        .catch((err) => res.status(500).json(err))
        );
    },

    //update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true, runValidators: true }
        )
        .then((dbThoughtData) => !dbThoughtData ? res.status(404).json({ message: 'No thought found!' }) : res.json(dbThoughtData))
        .catch((err) => res.status(500).json(err));
    },

    //delete a thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .select('-__v')
        .then((dbThoughtData) => !dbThoughtData ? res.status(400).json ({ message: 'No thought found!' }) 
        : user.findOneAndUpdate(
            { username: dbThoughtData.username },
            { $pull: { thoughts: req.params.thoughtId } },
        )
        .then(() => res.json ({ message: 'Thought deleted!' }))
        .catch((err) => res.status(500).json(err))
        );
    },

    //add a reaction
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $addToSet: { reactions: {
                username: req.body.username,
                reactionContent: req.body.reactionContent,
            }}},
            { new: true, runValidators: true }
        )
        .select('-__v')
        .then((dbReactionData) => !dbReactionData ? res.status(400).json({ message: 'No thought found!' }) : res.json(dbReactionData));
    },

    //delete a reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.paramas.reactionId}}},
            { new: true, runValidators: true }
        )
        .then((dbReactionData) => !dbReactionData ? res.status(404).json({ message: 'No thought found!' }) : res.json({ message: 'Reaction deleted!' }))
    },
};