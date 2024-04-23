const dotenv = require('dotenv');
dotenv.config();

const express = require('express')
const path = require('path');

// const OpenAI = require('openai');

const port = process.env.PORT || 3000;

const StoryRouter = require('./Routes/Story-route.js')
const userRouter = require('./Routes/User-route')
const loginRouter = require('./Routes/login-route')

// let api = {
//     'apiKey': process.env.API_KEY
// };

// const openai = new OpenAI( api );

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'Public')));

app.use('/api/Stories', StoryRouter)
app.use('/user', userRouter)
app.use('/user/login', loginRouter)

app.post('/generate-story-and-image', express.json(), async (req, res) => {
    const { age, topics, genre } = req.body;
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant designed to output JSON.',
          },
          { role: 'user', content: `Genera un cuento para un ninio de ${age} 9 anios que le gusta ${topics} con un genero literario de ${genre}, manda de regreso solo titulo y el cuento sin separaciones de ningun tipo, solo texto` },
        ],
        model: 'gpt-3.5-turbo-1106',
        response_format: { type: 'json_object' },
      });
  
      const story = completion.choices[0].message.content;
  
      // Llamada a la función para generar la imagen con DALL-E usando el cuento como parte del prompt
      const imageUrl = await generateImage(`Crea una imagen para ilustrar la siguiente historia: ${story}`);
  
      res.json({ story, imageUrl });
    } catch (error) {
      console.error('Error al llamar a las APIs:', error.message);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

  async function generateImage(prompt) {
    try {
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt,
        n: 1,
        size: "1024x1024",
      });
  
      const imageUrl =  response.data[0].url;
  
      return imageUrl;
    } catch (error) {
      console.error('Error al llamar a DALL-E:', error.message);
      throw error;
    }
  }


app.listen(port, ()=> console.log("running on port " + port));
