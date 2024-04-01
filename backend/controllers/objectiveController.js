const Objective = require('../models/okrModel');

// Create: Save data to MongoDB
const createOkr = async (req, res) => {
  try {
    const { title, progress, keyResults } = req.body;
    const objective = new Objective({ title, progress, keyResults });
    await objective.save();
    res.status(201).json({ message: 'Objective created successfully', objective });
  } catch (err) {
    console.error('Error creating objective', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createObjective = async (req, res) => {
  const { title, timeframe } = req.body;

  try {
    // Create a new objective instance
    const objective = new Objective({ title, timeframe });
    
    // Save the objective to the database
    await objective.save();

    res.status(201).json({ message: 'Objective created successfully', objective });
  } catch (error) {
    console.error('Error creating objective:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Read: Retrieve data from MongoDB
const getAllObjectives = async (req, res) => {
  try {
    const objectives = await Objective.find();
    res.status(200).json(objectives);
  } catch (err) {
    console.error('Error fetching objectives', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Update: Update data in MongoDB
const updateObjective = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, progress, keyResults } = req.body;
    const updatedObjective = await Objective.findByIdAndUpdate(id, { title, progress, keyResults }, { new: true });
    if (!updatedObjective) {
      return res.status(404).json({ error: 'Objective not found' });
    }
    res.status(200).json({ message: 'Objective updated successfully', objective: updatedObjective });
  } catch (err) {
    console.error('Error updating objective', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete: Remove data from MongoDB
const deleteObjective = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedObjective = await Objective.findByIdAndDelete(id);
    if (!deletedObjective) {
      return res.status(404).json({ error: 'Objective not found' });
    }
    res.status(200).json({ message: 'Objective deleted successfully', objective: deletedObjective });
  } catch (err) {
    console.error('Error deleting objective', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { createObjective, getAllObjectives, updateObjective, deleteObjective };
