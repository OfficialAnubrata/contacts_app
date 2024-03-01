const express = require("express");
const { 
    getContact, 
    CreateContact, 
    getContacts, 
    updateContact, 
    deleteContact 
} = 
require("../controllers/contact.controller.js");
const validateToken = require("../middlewares/validatetokenhandler.middleware.js");
const router = express.Router();
router.use(validateToken)
router.route("/").get(getContacts).post(CreateContact);
router.route("/:id").put(updateContact).get(getContact).delete(deleteContact);
module.exports = router;