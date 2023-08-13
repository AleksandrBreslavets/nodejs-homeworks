const express = require('express');

const router = express.Router();

const { contactCtrl: ctrl } = require("../../controllers");
const { validationBody, isValidId } = require("../../middlewars");
const { contactModel:{schemas} } = require("../../models");   

router.get('/', ctrl.getAll);

router.get('/:contactId',isValidId, ctrl.getById);

router.post('/', validationBody(schemas.validationJoiSchema, "Missing required name field"), ctrl.addContact);

router.delete('/:contactId', isValidId, ctrl.deleteContact);

router.put('/:contactId', isValidId, validationBody(schemas.validationJoiSchema, "Missing fields"), ctrl.updateContact);

router.patch('/:contactId/favorite', isValidId, validationBody(schemas.favoriteUpdValidationSchema, "Missing field favorite"), ctrl.updateStatusContact);

module.exports = router;