const router = require('express').Router();

//all routes
const {
    getAll,
    getOne,
    newThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');

// route to get all thoughts or post a new one
router.route('/').get(getAll).post(newThought);

//route to get single, update, or delete thought
router.route('/:id').get(getOne).put(updateThought).delete(deleteThought);

//route to delete reactions
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

//route to add reaction
router.route('/:thoughtId/reactions').post(addReaction);

module.exports = router;