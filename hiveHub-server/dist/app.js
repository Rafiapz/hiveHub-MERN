"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = require("./presentation/routes/authRoutes");
const postRoutes_1 = require("./presentation/routes/postRoutes");
const dependencies_1 = require("./_boot/dependencies");
const dependencies_2 = require("./_boot/dependencies");
const dependencies_3 = require("./_boot/dependencies");
const database_1 = require("./_boot/database");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const session = require("express-session");
const cookieParser = require("cookie-parser");
const nocache_1 = __importDefault(require("nocache"));
const networkRoutes_1 = require("./presentation/routes/networkRoutes");
const commentRoutes_1 = require("./presentation/routes/commentRoutes");
const likesRoutes_1 = require("./presentation/routes/likesRoutes");
const reportRoutes_1 = require("./presentation/routes/reportRoutes");
const http_1 = __importDefault(require("http"));
const socket_1 = require("./_boot/socket");
const chatRoutes_1 = require("./presentation/routes/chatRoutes");
const adminRoutes_1 = require("./presentation/routes/adminRoutes");
const storyRoutes_1 = require("./presentation/routes/storyRoutes");
const notificationsRoutes_1 = require("./presentation/routes/notificationsRoutes");
const premiumRoutes_1 = require("./presentation/routes/premiumRoutes");
const config_1 = require("./_boot/config");
const pollRoutes_1 = require("./presentation/routes/pollRoutes");
const PORT = config_1.config.http.port;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const secret = process.env.SESSION_SECRET || 'Q3UBzdH9GEfiRCTKbi5MTPyChpzXLsTD';
app.use(session({ secret: secret, resave: true, saveUninitialized: true }));
const corsOptions = {
    origin: ['https://hivehub.shop', 'https://www.hivehub.shop'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(cookieParser());
app.use((0, nocache_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, database_1.connect)();
(0, socket_1.initializeSocketIO)(server);
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
app.use('/api/auth', (0, authRoutes_1.authRoutes)(dependencies_1.authDependencies));
app.use('/api/post', (0, postRoutes_1.postRoutes)(dependencies_2.postDependencies));
app.use('/api/networks', (0, networkRoutes_1.networksRoutes)(dependencies_3.networkDependencies, dependencies_1.notificationsDependencies));
app.use('/api/comments', (0, commentRoutes_1.commentsRoutes)(dependencies_1.commentsDependencies, dependencies_1.notificationsDependencies));
app.use('/api/likes', (0, likesRoutes_1.likesRoutes)(dependencies_1.likesDependencies, dependencies_1.notificationsDependencies));
app.use('/api/reports', (0, reportRoutes_1.reportsRoutes)(dependencies_1.reportsDependencies));
app.use('/api/chats', (0, chatRoutes_1.chatRoutes)(dependencies_1.chatsDependencies));
app.use('/api/admin', (0, adminRoutes_1.adminRoutes)(dependencies_1.adminDependencies));
app.use('/api/story', (0, storyRoutes_1.storyRoutes)(dependencies_1.storyDependencies));
app.use('/api/notifications', (0, notificationsRoutes_1.notificationsRoutes)(dependencies_1.notificationsDependencies));
app.use('/api/premium', (0, premiumRoutes_1.premiumRoutes)());
app.use('/api/polls', (0, pollRoutes_1.pollRoutes)(dependencies_1.pollsDependencies));
app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
});
server.listen(PORT, () => console.log(`server running on the port ${PORT}`));
