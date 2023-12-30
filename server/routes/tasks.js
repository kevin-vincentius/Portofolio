const router = require("express").Router();
const Task = require("../models/Task");
const verify = require("../middleware/verifyToken");

router.get("/", verify, async (req, res) => {
  try {
    const taskList = await Task.find({ userId: req.user.id });
    return res.status(201).json(taskList);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/:id", verify, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id });
    return res.status(201).json(task);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/", verify, async (req, res) => {
  const newTask = new Task({
    title: req.body.title,
    description: req.body.description,
    dueDate: new Date(req.body.dueDate),
    priority: req.body.priority,
    status: req.body.status,
    userId: req.user.id,
  });

  try {
    const taskExists = await Task.findOne({ title: req.body.title });
    if (taskExists) {
      return res.status(400).json({ message: "Task already exists" });
    }

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", verify, async (req, res) => {
  try {
    // const taskExist = await Task.findOne({ title: req.body.title });
    // console.log(taskExist)

    // if (taskExist && req.body.title === taskExist.title) {
    //   return res.status(400).json({ message: "Title already exists" });
    // }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).json(updatedTask);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", verify, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id });

    if (task) {
      await Task.findByIdAndDelete(req.params.id);
      return res.status(201).json("Task has been deleted");
    } else {
      return res.status(400).json({ message: "Task not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
