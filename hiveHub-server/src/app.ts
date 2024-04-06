import express, { Application } from 'express'
import { authRoutes } from './presentation/routes/authRoutes'
import { postRoutes } from './presentation/routes/postRoutes'
import { authDependencies, commentsDependencies, likesDependencies, reportsDependencies } from './_boot/dependencies'
import { postDependencies } from './_boot/dependencies'
import { networkDependencies } from './_boot/dependencies'
import { connect } from './_boot/databse'
import cors from 'cors'
import { configDotenv } from 'dotenv'
import path from 'path'
import session = require('express-session')
import { Request, Response, NextFunction } from 'express'
import cookieParser = require('cookie-parser')
import nocache from 'nocache'
import { networksRoutes } from './presentation/routes/networkRoutes'
import { commentsRoutes } from './presentation/routes/commentRoutes'
import { likesRoutes } from './presentation/routes/likesRoutes'
import { reportsRoutes } from './presentation/routes/reportRoutes'



configDotenv()
const PORT = process.env.PORT || 7700
const app: Application = express()

const secret: string = process.env.SESSION_SECRET || 'Q3UBzdH9GEfiRCTKbi5MTPyChpzXLsTD'

app.use(session({ secret: secret, resave: true, saveUninitialized: true }));


const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}
app.use(cors(corsOptions));
app.use(cookieParser())
app.use(nocache())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connect()

app.use(express.static(path.join(__dirname, '..', 'public')))

app.use('/auth', authRoutes(authDependencies))

app.use('/post', postRoutes(postDependencies))

app.use('/networks', networksRoutes(networkDependencies))

app.use('/comments', commentsRoutes(commentsDependencies))

app.use('/likes', likesRoutes(likesDependencies))

app.use('/reports', reportsRoutes(reportsDependencies))

app.use((req: Request, res: Response) => {
    res.json({ message: 'not found' }).status(404)
})

app.listen(PORT, () => console.log(`server running on the port ${PORT}`))

