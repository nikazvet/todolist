module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("todo", {
      text: {
        type: Sequelize.STRING,
        allowNull: false
      },
      notes: {
        type: Sequelize.STRING,
      },
      done: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      date: {
        type: Sequelize.DATE
      }
    });
  
    return Todo;
  };