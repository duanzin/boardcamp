import { db } from "../config/database.js";

export async function showGames(req, res) {
  try {
    const games = await db.query("SELECT * FROM games");
    res.send(games.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function createGame(req, res) {
  const { name, image, stockTotal, pricePerDay } = req.body;

  try {
    const gameExiste = await db.query(`SELECT * FROM games WHERE name = $1`, [
      name,
    ]);
    if (gameExiste.rows.length !== 0) {
      return res.sendStatus(409);
    }
    await db.query(
      `INSERT INTO games (name,image,"stockTotal","pricePerDay") VALUES ($1,$2,$3,$4)`,
      [name, image, stockTotal, pricePerDay]
    );
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
