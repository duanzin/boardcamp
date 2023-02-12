import { db } from "../config/database.js";

export async function showRentals(req, res) {
  try {
    const rents = await db.query("SELECT * FROM rentals");
    res.send(rents.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function createRent(req, res) {
  const { customerId, gameId, daysRented } = req.body;

  try {
    const customerExists = await db.query(
      `SELECT * FROM customers WHERE id = $1`,
      [customerId]
    );
    const game = await db.query(`SELECT * FROM games WHERE id = $1`, [gameId]);
    if (game.rows.length !== 0 || customerExists.rows.length !== 0) {
      return res.sendStatus(400);
    }

    const gameRentals = await db.query(
      `SELECT * FROM rentals WHERE gameId=$1 AND returnDate=null`,
      [gameId]
    );
    if (gameRentals.rows.length >= game.rows[0].stockTotal) {
      return res.sendStatus(400);
    }

    await db.query(
      `INSERT INTO rentals (customedId,gameId,rentDate,daysRented,returnDate,originalPrice,delayFee) VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [customerId, gameId, dayjs().format("YYYY-MM-DD"), daysRented, null, daysRented*game.rows[0].pricePerDay, null]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function endRent(req, res) {}

export async function deleteRent(req, res) {}
