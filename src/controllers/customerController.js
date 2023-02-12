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
  const { id } = req.params;
  try {
    const customer = await db.query(`SELECT * FROM customers WHERE id = $1;`, [
      id,
    ]);
    res.send(customer.rows[0]);
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

export async function updateCustomer(req, res) {}
