const express = require("express");
const cors = require("cors");

const app = express();

const localOrigins = new Set(
    [
        process.env.FRONTEND_URL,
        "http://localhost:1234",
        "http://localhost:3000",
        "http://localhost:8080",
        "http://127.0.0.1:1234",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:8080"
    ].filter(Boolean)
);

const corsOptions = {
    origin(origin, callback) {
        if (!origin) {
            callback(null, true);
            return;
        }

        const isLocalhost = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
        if (localOrigins.has(origin) || isLocalhost) {
            callback(null, true);
            return;
        }

        callback(new Error(`CORS blocked origin: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

// Enable CORS with credentials support
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.use(express.json());

// Log all requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`, req.body);
    next();
});

let nextUserId = 1;
let nextFavId = 1;
const users = []; // { id, email, password, username }
const favorites = []; // { id, user_id, movie_id }

app.post("/api/auth/signup", (req, res) => {
    const { email, password, username } = req.body;
    if (!email || !password)
        return res.status(400).json({ message: "email and password required" });
    if (users.find((u) => u.email === email))
        return res.status(409).json({ message: "User exists" });
    const user = { id: String(nextUserId++), email, password, username: username || "" };
    users.push(user);
    res.json({
        user: { id: user.id, email: user.email, username: user.username },
        token: `token-${user.id}`
    });
});

app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    res.json({
        user: { id: user.id, email: user.email, username: user.username },
        token: `token-${user.id}`
    });
});

app.post("/api/auth/logout", (req, res) => {
    res.json({ ok: true });
});

app.get("/api/auth/me", (req, res) => {
    // Very simple: return first user if exists
    if (users.length === 0) return res.status(404).json({ message: "No user" });
    const u = users[0];
    res.json({ user: { id: u.id, email: u.email, username: u.username } });
});

app.put("/api/users/:id", (req, res) => {
    const { id } = req.params;
    const updates = req.body || {};
    const user = users.find((u) => u.id === id);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.username = updates.username ?? user.username;
    user.avatar_url = updates.avatar_url ?? user.avatar_url;
    res.json({
        id: user.id,
        email: user.email,
        username: user.username,
        avatar_url: user.avatar_url
    });
});

app.delete("/api/users/:id", (req, res) => {
    const { id } = req.params;
    const idx = users.findIndex((u) => u.id === id);
    if (idx === -1) return res.status(404).json({ message: "User not found" });
    users.splice(idx, 1);
    // remove favorites
    for (let i = favorites.length - 1; i >= 0; i--) {
        if (favorites[i].user_id === id) favorites.splice(i, 1);
    }
    res.json({ ok: true });
});

app.get("/api/favorites/:userId", (req, res) => {
    const { userId } = req.params;
    const favs = favorites.filter((f) => f.user_id === userId);
    res.json(favs);
});

app.post("/api/favorites", (req, res) => {
    const { user_id, movie_id } = req.body;
    if (!user_id || !movie_id)
        return res.status(400).json({ message: "user_id and movie_id required" });
    const existing = favorites.find(
        (f) => f.user_id === user_id && f.movie_id === movie_id.toString()
    );
    if (existing) return res.status(200).json(existing);
    const fav = { id: String(nextFavId++), user_id: user_id, movie_id: movie_id.toString() };
    favorites.push(fav);
    res.json(fav);
});

app.delete("/api/favorites", (req, res) => {
    const { user_id, movie_id } = req.body;
    const idx = favorites.findIndex(
        (f) => f.user_id === user_id && f.movie_id === String(movie_id)
    );
    if (idx === -1) return res.status(404).json({ message: "Favorite not found" });
    const removed = favorites.splice(idx, 1)[0];
    res.json(removed);
});

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
    console.log(`Mock API server running on http://localhost:${port}`);
});

server.on("error", (err) => {
    console.error("Server error:", err);
    process.exit(1);
});

process.on("SIGINT", () => {
    console.log("Server shutting down...");
    server.close(() => {
        console.log("Server closed");
        process.exit(0);
    });
});
