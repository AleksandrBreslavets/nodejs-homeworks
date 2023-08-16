const express = require('express');

const router = express.Router();

const { contactCtrl: ctrl } = require("../../controllers");
const { validationBody, isValidId, authenticate } = require("../../middlewars");
const { contactModel:{schemas} } = require("../../models");   

router.get('/', authenticate, ctrl.getAll);

router.get('/:contactId', authenticate, isValidId, ctrl.getById);

router.post('/', authenticate, validationBody(schemas.validationJoiSchema, "Missing required name field"), ctrl.addContact);

router.delete('/:contactId', authenticate, isValidId, ctrl.deleteContact);

router.put('/:contactId', authenticate, isValidId, validationBody(schemas.validationJoiSchema, "Missing fields"), ctrl.updateContact);

router.patch('/:contactId/favorite', authenticate, isValidId, validationBody(schemas.favoriteUpdValidationSchema, "Missing field favorite"), ctrl.updateStatusContact);

module.exports = router;