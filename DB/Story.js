const {mongoose} = require('./connectDB');

const storySchema = mongoose.Schema({
    uuid:{
        type: String,
        unique:true,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    publicationDate:{
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
        required: false,
        default: "https://elconta.mx/wp-content/uploads/2017/09/por-definir.png"
    },
    uuidUser:{
        type: String,
        required: true,
        default: "F3H0d1mGRIgJhSz6qLYqi"
    }
})

storySchema.statics.getStory = async function(params) {
    const query = {};

    if (params.publicationDate) {
            query.publicationDate = {$regex: params.publicationDate, $options: 'i' }
    }

    if (params.title) {
        query.title = { $regex: params.title, $options: 'i' };
    }
    
    if (params.description) {
        query.description = { $regex: params.description, $options: 'i' };
    }

    if (params.uuidUser) {
        query.uuidUser = { $regex: params.uuidUser, $options: 'i' };
    }

    let projection = {_id:0, uuid: 1, title:1, description:1, publicationDate:1, imageUrl:1,  uuidUser:1 };
    const story = await Story.find(query, projection);
    //console.log("Funcion GetBooks");
    return story;
}

storySchema.statics.getStoryById = async (uuid) =>{
    let doc = await Story.findOne({uuid})
    //console.log("Funcion get One Book");
    return doc
}

storySchema.statics.addStory = async (datos) =>{
    let newStory = Story(datos);
    //console.log("Funcion addBook");
    return await newStory.save()
}

storySchema.statics.updateStory = async (uuid, newData) =>{
    let updateStory = await Story.findOneAndUpdate({uuid}, {$set: newData}, {new: true})
    //console.log("Funcion Actualizar Libro");
    return updateStory
}

storySchema.statics.deleteStory = async (uuid) =>{
    let deleted = await Story.findOneAndDelete({uuid})
    //console.log("Funcion Delete Book");
    return deleted
}

const Story = mongoose.model('Story', storySchema);


// Story.addStory(
//     {
//         uuid: 'prueba',
//         title: "not my day",
//         description: 'algo',
//         publicationDate: '02/05/2023',
//         imageUrl: '',
//         uuidUser: "axyz-1533"
//     }
// )


module.exports = {Story};

