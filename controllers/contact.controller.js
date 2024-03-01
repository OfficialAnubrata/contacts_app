const asyncHandler = require("express-async-handler");
const Contact = require("../models/contact.model.js")

//@desc Get all contacts
// @route GET /api/contacts
// @access private
const getContacts = asyncHandler(async(req,res)=>{
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});

//@desc Create contacts
// @route POST /api/contacts/
// @access private 
const CreateContact = asyncHandler(async(req,res)=>{
    console.log("the request body is", req.body);

    const {name, email, phone} = req.body
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandotory!")
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    res.status(200).json(contact);
});
//@desc update contacts
// @route put /api/contacts
// @access private 
const updateContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found")
    }
if(contact.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("user don't have permisson to update other user contacts")
}

    const updatecontact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    );
    res.status(200).json(updatecontact);
});

//@desc get contacts
// @route get /api/contacts
// @access private
const getContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found")
    }
    res.status(200).json(contact);
});

//@desc delete contacts
// @route delete /api/contacts
// @access private
const deleteContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found")
    }
    await Contact.deleteOne({_id: req.params.id});
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("user don't have permisson to update other user contacts")
    }
    res.status(200).json({ message: "Contact deleted successfully"});
});

module.exports = { 
    getContacts,
    CreateContact,
    updateContact,
    getContact,
    deleteContact
 };