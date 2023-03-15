const { Thought, User } = require('../models');

module.exports = {

  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  getSingleThought(req, res) {
      Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  createThought(req, res) {
    Thought.create(req.body)
       .then((thought) => {
          return User.findOneAndUpdate(
            { _id: req.body.id },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
            );
        })
          .then((user) =>
            !user
              ? res.status(404).json({message: 'No user with that ID'})
              : res.json('Created')
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
    
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
  
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : User.findOneAndUpdate(
            { thoughts: req.params.id },
            { $pull: { thoughts: req.params.id } },
            { new: true }
          )
    )
      .then((user) =>
        !user
          ? res.status(404).json({message: 'Deleted'})
          : res.json({ message: 'Deleted' })
        )
      .catch((err) => res.status(500).json(err));
    },

  // localhost:3001/api/thoughts/:thoughtId/reactions/
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
        ? res.status(404).json({ message: 'No thought with that ID' })
        : res.json({ thought, message: 'Created' })
      )
      .catch((err) => res.status(500).json(err));
    },
    
  // localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: {reactionId: req.params.reactionId} } },
      { new: true }
        )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json({ thought, message: 'Deleted' })
        )
        .catch((err) => res.status(500).json(err));
     }
};