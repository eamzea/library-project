const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const mongoose = require('mongoose');

/* GET home page */
router.get('/', (req, res, next) => {
	Book.find().then((books) => {
		res.render('index', { books });
	});
});

router.get('/add-book', (req, res, next) => {
	res.render('add-book');
});

router.get('/reserve', (req, res, next) => {
	Book.find({ available: true }).then((books) => {
		res.render('reserve', { books });
	});
});

router.get('/return', (req, res, next) => {
	Book.find({ available: false }).then((books) => {
		res.render('reserve', { books });
	});
});

router.post('/add-book', (req, res, next) => {
	Book.create(req.body).then(() => {
		res.redirect('/');
	});
	console.log(req.body.books);
});

router.post('/reserve', (req, res, next) => {
	Book.findByIdAndUpdate(req.body.books, { available: false }).then(() => {
		res.redirect('/');
	});
	console.log(req.body.books);
});

router.post('/return', (req, res, next) => {
	Book.findByIdAndUpdate(req.body.books, { available: true }).then(() => {
		res.redirect('/');
	});
	console.log(req.body.books);
});

module.exports = router;
