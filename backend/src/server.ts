import argon2 from 'argon2';
import cors from 'cors';
import express, { Request, Response } from 'express'
import { connectToDB, sequelize } from './db';
import { User } from './User';

const app = express();
const PORT = 5050;
app.use(express.json());
app.use(cors())


app.get('/health-check', (request: Request, response: Response) => {
    response.send('Everything is good :)')
})

app.post('/signup', async (request: Request, response: Response) => {
    const {username, email, password} = request.body;
    const user = await User.findOne({
        where: {
            username: username
        }
    });
    if(user){
        response.status(409).json({message: "User already exists"});
        return ;
    } 
    const encryptedPassword = await argon2.hash(password);
    await User.create({
        username: username,
        email: email,
        password: encryptedPassword
    });
    response.status(201).json({message: 'Successfully Registered!!'});
});

app.post('/login', async (request: Request, response: Response) => {
    const {username, password} = request.body;
    const user = await User.findOne({
        where: {
            username: username
        }
    });
    if(!user){
        response.status(404).json({message: "User does not exists"});
        return ;
    } 
    const validPassword = await argon2.verify(user.dataValues.password, password);
    if(!validPassword){
        response.status(401).json({message: "Invalid Password"});
        return ;
    }
    response.status(200).json({message: 'Login Successfull!! '});
});

const startServer = async() => {
    try{
        
        await connectToDB();
        await sequelize.sync({alter: true});
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:5050/`);
        });
    } catch (error) {
        console.error("Error: ", error);
    }
    
}

startServer();