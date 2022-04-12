const express = require('express')
const router = express.Router()
const reviewController = require('../controller/reviewController')

router.get('/',reviewController.fetchReviews)

module.exports = router