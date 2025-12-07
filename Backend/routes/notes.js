const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Notes')
const {body, validationResult} = require('express-validator')

router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    try {
        const notes = await Note.find({ user: req.user.id})
        res.json(notes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server issue")
    }
})

router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({min:3}),
    body('description', 'Description must atleast 5 character').isLength({min:5})
], async (req, res)=>{
    try {
        const {title, description, tag} = req.body
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save()
        res.json(saveNote)
    } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
    }
})
 router.put('/updatenotes/:id', fetchuser, async (req, res)=>{
   const { title, description, tag} = req.body
   try {
       const newnotes = {}
       if(title) {newnotes.title = title}
       if(description) {newnotes.description = description}
       if(tag) {newnotes.tag = tag}
       let note =  await Note.findById(req.params.id)
       if(!note) return res.status(404).send("Not found")
           if(note.user.toString() !== req.user.id){
               return res.status(401).send("Not Allowed")
           }
           note = await Note.findByIdAndUpdate(req.params.id, {$set : newnotes}, {new: true})
           res.json(note)
   } catch (error) {
            console.error(error.message)
        res.status(500).send("Internal Server Error")
   }

 })

 router.delete('/deletenote/:id', fetchuser, async(req, res)=>{
    try {
        let note = await Note.findById(req.params.id)
        if(!note) return res.status(404).send("Not found")
            if(note.user.toString() !== req.user.id){
                return res.status(401).send("Not Allowed")
            }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note })
    } catch (error) {
                console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
 })
 module.exports = router