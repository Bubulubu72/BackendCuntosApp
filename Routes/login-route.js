const router = require('express').Router();
const jwt = require('jsonwebtoken')
const config = require('../Config/configuracion')
const {User} = require('../DB/User');
const { validarToken } = require('../Middlewares/validateDatos');


router.get('/', validarToken, (req, res) => {
    let info = []

    let data = req.email
    let validated = req.validated
    
    info.push(data)
    info.push(validated)

    res.send(info)
})

// login
router.post('/', async (req, res) =>{
    let user = await User.getUsersByEmail(req.body.email);

    if (! user){
        res.status(401).send({error: "Usuario no existente"})
        return
    }

    if( !(user.password === req.body.password) || req.body.password === ''){
        res.status(401).send({error: "Usuario o contreaseña incorrectos"})
        return
    }

    let token = jwt.sign({email: user.email}, 
        config.jwtSecret, {expiresIn: 60 * 10})

    

    res.send({token})
})

module.exports = router