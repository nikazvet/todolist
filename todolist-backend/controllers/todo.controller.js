const db = require("../models");
const TodoDB = db.todos;
const ListDB = db.tasklists;

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Create and Save a new Todo
exports.create = (req, res) => {
  console.log(req.body);
  // console.log(req.params);
  // console.log("HHHH");
  //console.log(req);
  //Validate request
  console.log("LIST", req.body.list)
  if (!req.body.task.text) {
    res.status(400).send({
      message: "Text can not be empty!"
    });
    return;
  }

  //Create a Todo
  const todo = {
    text: req.body.task.text,
    notes: req.body.task.notes,
    done: req.body.task.done,
    date: req.body.task.date,
    listId: req.body.task.list
  };
  console.log("TASK", req.body.task);

  // Save Todo in the database
  TodoDB.create(todo)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the to-do item."
      });
    });
    }

// Retrieve all Todos from the database.
exports.findAll = (req, res) => {
    const text = req.query.text;
    var condition = text ? { title: { [Op.like]: `%${text}%` } } : null;
  
    TodoDB.findAll({ where: condition, include: "list" },)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
};

exports.link = (req, res) => {
      // req.body.task.setList(req.body.list)
      var list = {
        name: req.body.list.name,
        id: req.body.list.id,
        pattern: req.body.list.pattern,
        hours: req.body.list.hours,
        bgcolor: req.body.list.bgcolor,
        maincolor: req.body.list.maincolor,
      }
      var todo =
        {
          text: req.body.task.text,
          notes: req.body.task.notes,
          done: req.body.task.done,
          date: req.body.task.date,
          id: req.body.task.id
        };
      list.setTodos(todo)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
}

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    TodoDB.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Todo with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Todo with id=" + id
        });
      });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    // console.log(id);
    // console.log(req.body);

    const todo = {
      text: req.body.text,
      notes: req.body.notes,
      done: req.body.done,
      date: req.body.date,
      listId: req.body.listId
    };

    TodoDB.update(todo, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Item was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update item with id=${id}. Maybe item was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating item with id=" + id
        });
      });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    TodoDB.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  TodoDB.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    TodoDB.findAll({ where: { done: false } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
