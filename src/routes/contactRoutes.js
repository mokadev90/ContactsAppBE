const express = require('express')
const mongoose = require('mongoose')

const Contact = mongoose.model('Contact')

const router = express.Router()

router.get('/contacts', async (req, res) => {
  const contacts = await Contact.find()

  res.send(contacts)
})

router.post('/contacts', async (req, res) => {
  const {
    countryCode,
    phoneCode,
    firstName,
    lastName,
    phoneNumber,
    contactPicture,
    isFavorite,
  } = req.body

  let validations
  if (!countryCode) {
    validations = {
      ...validations,
      countryCode: 'You must provide a Country code',
    }
  }
  if (!firstName) {
    validations = {...validations, firstName: 'You must provide a First name'}
  }
  if (!lastName) {
    validations = {...validations, lastName: 'You must provide a Last name'}
  }
  if (!phoneNumber) {
    validations = {
      ...validations,
      phoneNumber: 'You must provide a Phone number',
    }
  }

  if (!countryCode || !phoneCode || !firstName || !lastName || !phoneNumber) {
    return res.status(422).send({...validations, body: req.body})
  }

  try {
    console.log('intenté guardar el contacto')
    const contact = new Contact({
      countryCode,
      phoneCode,
      firstName,
      lastName,
      phoneNumber,
      contactPicture,
      isFavorite,
      //   userId: req.user._id,
    })
    await contact.save()
    console.log(
      '🚀 ~ file: contactRoutes.js:42 ~ router.post ~ contact:',
      contact,
    )
    res.send(contact)
  } catch (error) {
    res.status(422).send({error: error.message})
  }
})

router.get('/contacts/:id', async (req, res) => {
  const contacts = await Contact.find()

  res.send(contacts)
})
router.put('/contacts/:id', async (req, res) => {
  const {id} = req.params

  try {
    const contact = await Contact.findByIdAndUpdate(id, req.body, {
      returnDocument: 'after',
    })
    console.log(
      '🚀 ~ file: contactRoutes.js:82 ~ router.put ~ contact:',
      contact,
    )
    await contact.save()
    res.send(contact)
  } catch (error) {
    res.status(422).send({error: error.message})
  }
})

router.delete('/contacts/:id', async (req, res) => {
  const {id} = req.params
  console.log(
    '🚀 ~ file: contactRoutes.js:113 ~ router.delete ~ req.params:',
    req.params,
  )

  if (!id) {
    return res.status(422).send({error: 'You must provide an id'})
  }

  try {
    const data = await Contact.findByIdAndRemove(id)
    if (!data) {
      res.status(404).send({
        message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
      })
    } else {
      res.send(id)
    }
  } catch (err) {
    res.status(500).send({
      message: 'Could not delete Tutorial with id=' + id,
    })
  }
})

module.exports = router
