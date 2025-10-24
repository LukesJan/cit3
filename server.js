const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();


mongoose.connect("mongodb://localhost:27017/webnews")
    .then(() => console.log(" ^|^e P ^yipojeno k MongoDB"))
    .catch(err => console.error(" ^}^l Chyba p ^yipojen  :", err));

const Idnes = mongoose.model("idnes", new mongoose.Schema({
    Title: String,
    Content: String,
    Date: Date
}, { collection: "idnes" }));

// Statick   soubory (index.html)
app.use(express.static(path.join(__dirname, "public")));


app.get("/api/posts", async (req, res) => {
    try {
        // MongoDB vybere p ^y  mo jeden n  hodn   dokument
        const [post] = await Idnes.aggregate([{ $sample: { size: 1 } }]);

        if (!post) return res.status(404).json({ message: "    dn    ^ml  nky nenalezeny" });

        // Pos  l  me st  le pole, ale jen s jedn  m  ^ml  nkem
        res.json([post]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Chyba p ^yi  ^mten   z datab  ze" });
    }
});

// Spu  t ^{n   serveru
const PORT = 8080;
app.listen(PORT, () => console.log(` ^=^z^` `Server b ^{     na http://localhost:${PORT}`));
