import { db } from "../config/database.js";

export async function showRentals(req, res){
    try {
        const rents = await db.query("SELECT * FROM rentals");
        res.send(rents.rows);
      } catch (err) {
        res.status(500).send(err.message);
      }
}

export async function createRent(req, res) {
  
}

export async function endRent(req, res) {

}

export async function deleteRent(req, res) {
    
}