const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000; // Ganti sesuai kebutuhan

app.use(cors());
app.use(express.static("public")); // Jika ingin hosting file statis

app.get("/", (req, res) => {
    res.send("Server Berjalan di " + req.hostname);
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
