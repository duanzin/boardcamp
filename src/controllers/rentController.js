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
    if (game.rows.length == 0 || customerExists.rows.length == 0) {
      return res.sendStatus(400);
    }

    const gameRentals = await db.query(
      `SELECT * FROM rentals WHERE "gameId"=$1 AND "returnDate" is null`,
      [gameId]
    );
    if (gameRentals.rows.length >= game.rows[0].stockTotal) {
      return res.sendStatus(400);
    }

    const rentDate = new Date();
    const originalPrice = daysRented * game.rows[0].pricePerDay;

    await db.query(
      `INSERT INTO rentals ("customerId","gameId","rentDate","daysRented","returnDate","originalPrice","delayFee") VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [customerId, gameId, rentDate, daysRented, null, originalPrice, null]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function endRent(req, res) {
  const { id } = req.params;

  try {
    const rentalExists = await db.query(`SELECT * FROM rentals WHERE id = $1`, [
      id,
    ]);

    if (rentalExists.rows.length !== 0) {
      return res.sendStatus(404);
    } else if (rentalExists.rows[0].returnDate !== null) {
      return res.sendStatus(400);
    }

    await db.query(`UPDATE rentals SET returnDate=$1 WHERE id = $2;`, [
      dayjs().format("YYYY-MM-DD"),
      id,
    ]);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function deleteRent(req, res) {
  const { id } = req.params;

  try {
    const rentalExists = await db.query(`SELECT * FROM rentals WHERE id = $1`, [
      id,
    ]);

    if (rentalExists.rows.length !== 0) {
      return res.sendStatus(404);
    } else if (rentalExists.rows[0].returnDate == null) {
      return res.sendStatus(400);
    }

    await db.query(`DELETE FROM rentals WHERE id = $1;`, [id]);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
