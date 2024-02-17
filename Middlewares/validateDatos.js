const jwt = require('jsonwebtoken')
const config = require('../Config/configuracion')

function validarToken(req, res, next){
    let token = req.get('x-token');

    if(!token){
        res.status(401).send("No autenticado")
        return
    }

    jwt.verify(token, config.jwtSecret, (error, decoded) =>{
        if(error){
            res.status(401).send({error: error.message})
            return
        }
        req.email = decoded.email
        req.validated = true
        next();
    })
}

function validateIsAdmin(req, res, next){
    let header = req.get("x-auth")
    if(header && header  == "12345"){
        req.isAdmin = true;
    }
    else{
        req.isAdmin = false;
    }
    next()
}


module.exports = {validateIsAdmin, validarToken}