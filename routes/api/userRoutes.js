const router = require('express').Router();

//all routes
const{
    getAll,
    getOne,
    newUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');

// route to find all users or create one
router.route('/').get(getAll).post(newUser);

//route to find one, update, or delete
router.route('/:id').get(getOne).put(updateUser).delete(deleteUser);

//routes to add or delete friends
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;