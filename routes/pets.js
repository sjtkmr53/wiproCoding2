const express = require('express');
const Joi = require('@hapi/joi');

const Pets = require('../models/pets');
const { validateBody } = require('../middlewares/route');

const router = express.Router();

router.post(
  '/',
  validateBody(Joi.object().keys({
    name: Joi.string().required().description('name is required.'),
    age: Joi.number().integer().required().description('age is require.'),
    colour: Joi.string().required().description('colour is require.'),
  }),
  {
    stripUnknown: true,
  }),
  async (req, res, next) => {
    try {
      const pets = new Pets(req.body);
      await pets.save();
      res.status(201).json(pets);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  '/',
  async (req, res, next) => {
    try {
      const pets =await Pets.find({})
      res.status(200).json(pets);
    } catch (e) {
      next(e);
    }
  }
);

router.delete(
  '/',
  async (req, res, next) => {
    try {
    await Pets.findOneAndRemove(req.body.id);
      res.status(200).json(true);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;