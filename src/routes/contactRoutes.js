const express = require('express');
const mongoose = require('mongoose');

const Contact = mongoose.model('Contact');

const router = express.Router();

router.get('/contacts', async (req, res) => {
	const contacts = await Contact.find({ userId: req.user._id });

	res.send(contacts);
});

router.post('/contacts', async (req, res) => {
	const { name, locations } = req.body;

	if (!name || !locations) {
		return res
			.status(422)
			.send({ error: 'You must provide a name and locations' });
	}

	try {
		const contact = new Contact({ name, locations, userId: req.user._id });
		await contact.save();
		res.send(contact);
	} catch (error) {
		res.status(422).send({ error: error.message });
	}
});

router.get('/contacts/:id', async (req, res) => {
	const contacts = await Contact.find({ userId: req.user._id });

	res.send(contacts);
});
router.put('/contacts/:id', async (req, res) => {
	const { name, locations } = req.body;

	if (!name || !locations) {
		return res
			.status(422)
			.send({ error: 'You must provide a name and locations' });
	}

	try {
		const contact = new Contact({ name, locations, userId: req.user._id });
		await contact.save();
		res.send(contact);
	} catch (error) {
		res.status(422).send({ error: error.message });
	}
});

router.patch('/contacts/:id', async (req, res) => {
	const { name, locations } = req.body;

	if (!name || !locations) {
		return res
			.status(422)
			.send({ error: 'You must provide a name and locations' });
	}

	try {
		const contact = new Contact({ name, locations, userId: req.user._id });
		await contact.save();
		res.send(contact);
	} catch (error) {
		res.status(422).send({ error: error.message });
	}
});

router.delete('/contacts/:id', async (req, res) => {
	const { name, locations } = req.body;

	if (!name || !locations) {
		return res
			.status(422)
			.send({ error: 'You must provide a name and locations' });
	}

	try {
		const contact = new Contact({ name, locations, userId: req.user._id });
		await contact.save();
		res.send(contact);
	} catch (error) {
		res.status(422).send({ error: error.message });
	}
});

module.exports = router;
