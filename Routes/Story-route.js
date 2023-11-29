const router = require('express').Router()
const { Story } = require('../DB/Story');
const nanoid = require('nanoid');
const { validateIsAdmin } = require('../Middlewares/validateDatos');

//aqui validaba admin
router.get('/', async (req, res) =>{
    let stories = []

    let data = await Story.getStory(req.query)
    //stories.push(data)
    //let admon = req.isAdmin
    //stories.push(admon)

    res.send(data);
})

router.post('/', async (req, res) => {
    let {title, description, publicationDate, imageUrl, uuidUser} = req.body

    let newStory = {
        uuid: nanoid.nanoid(), 
        title, 
        description,
        publicationDate,
        imageUrl,
        uuidUser
    };

    if(imageUrl == ''){
        newStory.imageUrl = undefined;
    }

    if(uuidUser == ''){
        newStory.uuidUser = undefined;
    }

    Story.addStory(newStory)
    res.status(201).send("Creado Completo")
})

router.put('/:uuid', async (req, res) => {
    
    let story = await Story.getStoryById(req.params.uuid);

    if(!story){
        res.status(404).send({error: "Story not found"})
        return
    }

    let uuid = req.params.uuid
    let {title, description, publicationDate, imageUrl} = req.body;

    let updateStory = {
        title, 
        description, 
        publicationDate,
        imageUrl,
    }

    let changeStory = await Story.updateStory(uuid, updateStory);
    //console.log(updateBook);
    res.send(changeStory);
})

router.delete('/:uuid', async (req, res) => {
    let uuid = req.params.uuid
    let story = await Story.deleteStory(uuid);

    if(story){
        res.send(story)
    }else{
        res.status(404).send({error: "No existe"})
    }
})

module.exports = router
