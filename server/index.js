const express = require('express');
const cors = require('cors');
const { default: axios } = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({origin:true,credentials: true}));
const port = process.env.port || 5000;

app.post('/authenticate', async(req, res) => {
    const { username, secret, email, first_name, last_name } = req.body;
   try {
    const response = await axios.put('https://api.chatengine.io/users/',
    { username, secret, email, first_name, last_name },
    {headers: {"Private-Key": process.env.chat_engine_private_key}}
    );

    console.log(response.data)
    return res.status(response.status).json(response.data)
    
   } catch (error) {
    console.log(error)
    res.status(error.response.status).json({error: error.response.data})
   }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
