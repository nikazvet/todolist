const db = require("../models");
const ListDB = db.tasklists;

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Create and Save a new List
exports.create = (req, res) => {
  // console.log(req.body);
  //Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "List needs a name!"
    });
    return;
  }

  //Create a Todo
  const list = {
    name: req.body.name,
    pattern: req.body.pattern,
    hours: req.body.hours,
    bgcolor: req.body.bgcolor,
    maincolor: req.body.maincolor
  };

  // Save Todo in the database
  ListDB.create(list)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the to-do list."
      });
    });
};

// Retrieve all Todos from the database.
exports.findAll = (req, res) => {
  
    ListDB.findAll()
    .then(data => {
      // console.log(data);
      res.send(data);
    })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving lists."
        });
      });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    ListDB.findByPk(id, {include: 'todos'})
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

    const list = {
      name: req.body.name,
      pattern: req.body.pattern,
      hours: req.body.hours
    };

    ListDB.update(list, {
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

    ListDB.destroy({
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
