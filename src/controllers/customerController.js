import { db } from "../config/database.js";

export async function showCustomers(req, res) {
  try {
    const customers = await db.query("SELECT * FROM customers");
    res.send(customers.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function showCustomer(req, res) {
  try {
    const { id } = req.params;
    const customer = await db.query(`SELECT * FROM customers WHERE id = $1`, [
      id,
    ]);
    if (customer.rows.length == 0) return res.sendStatus(404);
    res.status(200).send(customer.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function createCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  try {
    const cpfExists = await db.query(`SELECT * FROM customers WHERE cpf = $1`, [
      cpf,
    ]);
    if (cpfExists.rows.length !== 0) {
      return res.sendStatus(409);
    }

    await db.query(
      `INSERT INTO customers (name,phone,cpf,birthday) VALUES ($1,$2,$3,$4)`,
      [name, phone, cpf, birthday]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function updateCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  const { id } = req.params;

  try {
    const cpfExists = await db.query(
      `SELECT * FROM customers WHERE cpf = $1 AND NOT id = $2`,
      [cpf, id]
    );
    if (cpfExists.rows.length !== 0) {
      return res.sendStatus(409);
    }

    await db.query(
      `UPDATE customers SET name=$1,phone=$2,birthday=$3,cpf=$4 WHERE id = $5;`,
      [name, phone, birthday, cpf, id]
    );
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
