import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

interface User {
    id: number,
    username: string,
    email: string,
    password: string
}


async function encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

async function validatePassword(password: string, user: User): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
}


var prisma = new PrismaClient();


export const signup = async (req: Request, res: Response) => {

    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }
    })
    if (user) return res.send("Usuario ya registrado! Logueate!")

    else {
        const userCreado = await prisma.user.create({
            data: {
                username: req.body.username,
                email: req.body.email,
                password: await encryptPassword(req.body.googleId)
            }
        })
        return res.json(userCreado)
    }
};


export const signin = async (req: Request, res: Response) => {

    console.log(req.body)

    const userComplete = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }
    })


    console.log(userComplete, "userComplete")

    if (!userComplete) return res.status(200).json('Credencial invalida');

    const correctPassword: boolean = await validatePassword(req.body.googleId, userComplete);

    if (!correctPassword) return res.status(400).json('Credencial invalida');

    const token: string = jwt.sign({ username: userComplete.username }, "secretKey", { expiresIn: 60 * 60 * 24 })
    res.header('authToken', token).send("Toquen enviado")


};



export const profile = async (req: Request, res: Response) => {
    //Validacion de entrada a la ruta
    const username = req.username

    const user = await prisma.user.findUnique({ where: { username } })

    if (!user) return res.status(404).send("Acceso denegado")
    else {
        res.send("<div> Bienvenido a tu perfil!!!! </div>");
    }
};



export const wipe = async (req: Request, res: Response) => {
    //Validacion de entrada a la ruta
    await prisma.user.deleteMany({})

    res.send("Database wipeada");
};

