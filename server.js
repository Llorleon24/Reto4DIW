const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

let puntosDeInteres = [];

app.get("/puntos", (req, res) => {
    res.json(puntosDeInteres);
});

app.post("/puntos", (req, res) => {
    const { lat, lng, title, description, category } = req.body;
    puntosDeInteres.push({ lat, lng, title, description, category });
    res.json({ message: "Punto guardado correctamente" });
});

app.put("/puntos", (req, res) => {
    const { lat, lng, newTitle, newDescription } = req.body;
    let punto = puntosDeInteres.find(p => p.lat === lat && p.lng === lng);
    if (punto) {
        punto.title = newTitle;
        punto.description = newDescription;
        res.json({ message: "Punto actualizado correctamente" });
    } else {
        res.status(404).json({ error: "Punto no encontrado" });
    }
});

app.delete("/puntos", (req, res) => {
    const { lat, lng } = req.body;
    puntosDeInteres = puntosDeInteres.filter(p => p.lat !== lat || p.lng !== lng);
    res.json({ message: "Punto eliminado correctamente" });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
