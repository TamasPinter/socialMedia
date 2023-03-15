const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} = require('../../controllers/thoughtController');

// localhost:3001/api/thoughts/
router.route('/').get(getThoughts).post(createThought);

// localhost:3001/api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// localhost:3001/api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction)

// localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;