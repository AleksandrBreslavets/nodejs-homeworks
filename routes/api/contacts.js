const express = require('express');

const router = express.Router();

const ctrl = require("../../controllers/contacts");
const { validationBody, isValidId } = require("../../middlewars");
const { schemas } = require("../../models/contacts");

router.get('/', ctrl.getAll);

router.get('/:contactId',isValidId, ctrl.getById);

router.post('/', validationBody(schemas.validationJoiSchema, "Missing required name field"), ctrl.addContact);

router.delete('/:contactId', isValidId, ctrl.deleteContact);

router.put('/:contactId', isValidId, validationBody(schemas.validationJoiSchema, "Missing fields"), ctrl.updateContact);

router.patch('/:contactId/favorite', isValidId, validationBody(schemas.favoriteUpdValidationSchema,"Missing field favorite"), ctrl.updateStatusContact)

module.exports = router;
