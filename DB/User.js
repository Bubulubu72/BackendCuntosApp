const {mongoose} = require('./connectDB')
const { Book } = require('./Story')

const nanoid = require('nanoid')

let userSchema = mongoose.Schema({
    uuid: {
        type: String,
        unique:true,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

//User.getUsers({}, true)
userSchema.statics.getUsers = async (params) =>{
    let projection = {_id: 0, uuid: 1, username: 1, email:1, password:1 }

    const query = {};

    if(params.username){
        query.username = { $regex: params.username, $options: 'i' }
    }

    if(params.email){
        query.email = { $regex: params.email, $options: 'i' }
    }

    let data = await User.find(query, projection)
    //console.log("Funcion getUsers");
    return data
}

userSchema.statics.getUsersById = async (uuid) =>{
    let doc = await User.findOne({uuid}, 
        {_id:0, uuid: 1, email:1, username:1, password:1})
    //console.log(doc);
    return doc
}

userSchema.statics.getUsersByEmail = async (email) =>{
    let doc = await User.findOne({email}, 
        {_id:0, uuid: 1, email:1, username:1, password:1})
    //console.log(doc);
    return doc
}

userSchema.statics.addUser = async (newUser) => {
    let newUserDb = User(newUser);
    //console.log("Funcion addUser");
    return await newUserDb.save();
}

userSchema.statics.upadteUser = async function(uuid, userdata){
    let data = await User.findOneAndUpdate({uuid}, {$set: userdata}, {new: true})
    //console.log("Funcion UpdateUser");
    return data
}

userSchema.statics.deleteUser = async (uuid) =>{
    let user = await User.findOneAndDelete({uuid})
    //console.log("deleteUser");
    return user;
}

let User = mongoose.model('user', userSchema);

module.exports = {User}