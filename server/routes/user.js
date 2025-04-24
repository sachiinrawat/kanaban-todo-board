
const express = require('express');
const { authenticateJwt, SECRET } = require("../middleware/index");
const { User, Task } = require("../db/index");
const jwt=require('jsonwebtoken')
const router = express.Router();



router.post('/signup', async (req, res) => {
    try {
      const { username, password } = req.body;
      
      const user = await User.findOne({ username });
  
      if (user) {
        return res.json({ message: 'User already exists' });
      }
  
      const newUser = new User({ username, password });
      await newUser.save();
      const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '20d' });
      res.json({ message: 'User created successfully', token });
    } catch (error) {
      console.error('Error during user signup:', error.message);
      res.status(500).json({ message: 'Server error during user signup' });
    }
  });
  
  router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user =  await User.findOne({ username, password });
  
      if (user) {
        const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '20d' });
        res.json({ message: 'Logged in successfully', token });
      } else {
        res.status(403).json({ message: 'Invalid username or password' });
      }
    } catch (error) {
      console.error('Error during user login:', error.message);
      res.status(500).json({ message: 'Server error during user login' });
    }
  });

  router.get('/tasks', async (req, res) => {
    try {
      const taskses = await Task.find({ published: true });
      res.json({ taskses });
    } catch (error) {
      console.error('Error fetching courses:', error.message);
      res.status(500).json({ message: 'Server error during course fetch' });
    }
  });


  
  router.post('/create', authenticateJwt, async (req, res) => {
    try {
        const { title, description, status, published, deadline } = req.body;
        const Id = req.user.username;

        const tasks = new Task({
            title,
            description,
            status,
            published,
            deadline, // Include the deadline field
            Id
        });

        await tasks.save();
        res.json({ message: 'Task created successfully', taskId: tasks.id });
    } catch (error) {
        console.error('Error creating task:', error.message);
        res.status(500).json({ message: 'Server error during task creation' });
    }
});

  


  router.delete('/delete/:id', async (req, res) => {
    Task.findByIdAndDelete(req.params.id)
    .then(deletedDocument => {
      res.send('Document deleted successfully');
    })
    .catch(error => {
      console.log('Error:', error);
      res.status(500).send('An error occurred');
    });
  
  });


  router.put('/tasks/:id', async (req, res) => {
    try {
      const taskId = req.params.id;
      let newStatus;
  
      // Determine new status based on destination column
      switch (parseInt(req.body.status)) {
        case 1:
          newStatus = 0; // TO DO
          break;
        case 2:
          newStatus = 1; // IN REVIEW
          break;
        case 3:
          newStatus = 2; // DONE
          break;
        default:
          throw new Error('Invalid status');
      }
  
      // Update the task status in the database
      await Task.findByIdAndUpdate(taskId, { status: newStatus });
  
      res.json({ message: 'Task status updated successfully' });
    } catch (error) {
      console.error('Error updating task status:', error.message);
      res.status(500).json({ message: 'Server error during task status update' });
    }
  });
  

  module.exports = router
