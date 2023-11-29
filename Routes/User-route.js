const router = require('express').Router();
const nanoid = require('nanoid')
const {User} = require('../DB/User');

router.get('/', async (req, res)=>{
    let users = await User.getUsers(req.query);
    res.send(users)
})

router.post('/', async (req, res) => {
    let {username, email, password} = req.body;
    
    let newUser = {
        uuid: nanoid.nanoid(),
        username,
        email,
        password
    }

    User.addUser(newUser)
    res.status(201).send(newUser)
})  

router.put('/:uuid', async (req, res) => {
    let user = await User.getUsersById(req.params.uuid)

    if(!user){
        res.status(404).send({error: "user not found"})
        return
    }

    let uuid = req.params.uuid
    let {username, password} = req.body

    let updateUser = {
        username,
        password
    }

    if(updateUser.username == ''){
        updateUser.username = user.username
    }

    if(updateUser.password == ''){
        updateUser.password = user.password
    }

    let chagedUser =  await  User.upadteUser(uuid, updateUser)
    res.send("Cambiado")
})

router.delete('/:uuid', async (req, res) => {
    let uuid = req.params.uuid
    let user = await User.deleteUser(uuid);
    if(user){
        res.send(user)
    }else{
        res.status(404).send({error: "No existe"})
    }
})

module.exports = router;
