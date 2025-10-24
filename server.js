const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Připojení k MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/blogdb")
    .then(() => console.log("✅ Připojeno k MongoDB"))
    .catch(err => console.error("❌ Chyba připojení:", err));

// Definice modelu pro kolekci 'idnes'
const Idnes = mongoose.model("idnes", new mongoose.Schema({
    Title: String,
    Content: String,
    Date: Date
}, { collection: "idnes" }));

// Statické soubory (index.html)
app.use(express.static(path.join(__dirname, "public")));

// API pro získání článků
app.get("/api/posts", async (req, res) => {
    const posts = await Idnes.find().sort({ Date: -1 });
    res.json(posts);
});

// Spuštění serveru
const PORT = 8080;
app.listen(PORT, () => console.log(`🚀 Server běží na http://localhost:${PORT}`));
