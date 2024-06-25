const express = require('express');
const router = express.Router();
const { 
  getAllCategories, 
  getCategoryById, 
  getCategoryByName, 
  getCategoryByGenre, 
  addCategory, 
  updateCategory, 
  deleteCategory 
} = require('../controllers/categoryController');

// GET all categories
router.route('/').get(getAllCategories);

// GET category by genre
router.route('/genre/:id').get(getCategoryByGenre);

// GET category by name
router.route('/name/:name').get(getCategoryByName);

// GET category by id
router.route('/:id').get(getCategoryById);

// POST add category
router.route('/').post(addCategory);

// PUT update category by id
router.route('/:id').put(updateCategory);

// DELETE category by id
router.route('/:id').delete(deleteCategory);

module.exports = router;
