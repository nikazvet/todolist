module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("todos", {
      text: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.STRING
      },
      done: {
        type: Sequelize.BOOLEAN
      },
      date: {
        type: Sequelize.DATE
      }
    });
  
    return Todo;
  };