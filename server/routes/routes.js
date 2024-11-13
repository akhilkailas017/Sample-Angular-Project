// routes/routes.js
const express = require("express");
const router = express.Router();
const Person = require("../models/Person");
const verifyToken = require("../middleware/authMiddleware"); // Import the verifyToken middleware

// Create a new person (protected route)
router.post("/person", verifyToken, async (req, res) => {
  const { id, name, age, phone } = req.body;
  try {
    const newPerson = new Person({ id, name, age, phone });
    await newPerson.save();
    res.status(201).json({ message: "Person added successfully", newPerson });
  } catch (error) {
    console.log("Error adding person:", error);
    res.status(500).json({ error: "Failed to add person" });
  }
});

// Get all persons (protected route)
router.get("/persons", verifyToken, async (req, res) => {
  try {
    const persons = await Person.find();
    res.status(200).json(persons);
  } catch (error) {
    console.log("Error fetching persons:", error);
    res.status(500).json({ error: "Failed to fetch persons" });
  }
});

// Get a specific person by ID (protected route)
router.get("/person/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const person = await Person.findOne({ id });
    if (!person) {
      return res.status(404).json({ error: "Person not found" });
    }
    res.status(200).json(person);
  } catch (error) {
    console.log("Error fetching person:", error);
    res.status(500).json({ error: "Failed to fetch person" });
  }
});

// Update a person's details by ID (protected route)
router.put("/person/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { name, age, phone } = req.body;
  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { id },
      { name, age, phone },
      { new: true }
    );
    if (!updatedPerson) {
      return res.status(404).json({ error: "Person not found" });
    }
    res.status(200).json({ message: "Person updated successfully", updatedPerson });
  } catch (error) {
    console.log("Error updating person:", error);
    res.status(500).json({ error: "Failed to update person" });
  }
});

// Delete a person by ID (protected route)
router.delete("/person/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPerson = await Person.findOneAndDelete({ id });
    if (!deletedPerson) {
      return res.status(404).json({ error: "Person not found" });
    }
    res.status(200).json({ message: "Person deleted successfully" });
  } catch (error) {
    console.log("Error deleting person:", error);
    res.status(500).json({ error: "Failed to delete person" });
  }
});

module.exports = router;
