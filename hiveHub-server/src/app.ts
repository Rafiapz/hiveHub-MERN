import express, { Application } from 'express'
import { authRoutes } from './presentation/routes/authRoutes'
import { postRoutes } from './presentation/routes/postRoutes'
import { adminDependencies, authDependencies, chatsDependencies, commentsDependencies, likesDependencies, notificationsDependencies, pollsDependencies, reportsDependencies, storyDependencies } from './_boot/dependencies'
import { postDependencies } from './_boot/dependencies'
import { networkDependencies } from './_boot/dependencies'
import { connect } from './_boot/database'
import cors from 'cors'
import path from 'path'
import session = require('express-session')
import { Request, Response } from 'express'
import cookieParser = require('cookie-parser')
import nocache from 'nocache'
import { networksRoutes } from './presentation/routes/networkRoutes'
import { commentsRoutes } from './presentation/routes/commentRoutes'
import { likesRoutes } from './presentation/routes/likesRoutes'
import { reportsRoutes } from './presentation/routes/reportRoutes'
import http from 'http'
import { initializeSocketIO } from './_boot/socket'
import { chatRoutes } from './presentation/routes/chatRoutes'
import { adminRoutes } from './presentation/routes/adminRoutes'
import { storyRoutes } from './presentation/routes/storyRoutes'
import { notificationsRoutes } from './presentation/routes/notificationsRoutes'
import { premiumRoutes } from './presentation/routes/premiumRoutes'
import { config } from './_boot/config'
import { pollRoutes } from './presentation/routes/pollRoutes'



const PORT = config.http.port

const app: Application = express()

const server = http.createServer(app)

const secret: string = process.env.SESSION_SECRET || 'Q3UBzdH9GEfiRCTKbi5MTPyChpzXLsTD'

app.use(session({ secret: secret, resave: true, saveUninitialized: true }));

const corsOptions = {
    origin: ['https://hivehub.shop', 'www.https://hivehub.shop'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}

app.use(cors(corsOptions));
app.use(cookieParser())
app.use(nocache())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connect()

initializeSocketIO(server)


app.use(express.static(path.join(__dirname, '..', 'public')))

app.use('/api/auth', authRoutes(authDependencies))

app.use('/api/post', postRoutes(postDependencies))

app.use('/api/networks', networksRoutes(networkDependencies, notificationsDependencies))

app.use('/api/comments', commentsRoutes(commentsDependencies, notificationsDependencies))

app.use('/api/likes', likesRoutes(likesDependencies, notificationsDependencies))

app.use('/api/reports', reportsRoutes(reportsDependencies))

app.use('/api/chats', chatRoutes(chatsDependencies))

app.use('/api/admin', adminRoutes(adminDependencies))

app.use('/api/story', storyRoutes(storyDependencies))

app.use('/api/notifications', notificationsRoutes(notificationsDependencies))

app.use('/api/premium', premiumRoutes())

app.use('/api/polls', pollRoutes(pollsDependencies))

app.use((req: Request, res: Response) => {
    res.status(404).json({ message: 'Not found' })
})

server.listen(PORT, () => console.log(`server running on the port ${PORT}`))

