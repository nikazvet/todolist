module.exports = (sequelize, Sequelize) => {
    const TaskList = sequelize.define("list", {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      pattern: {
        type: Sequelize.STRING
      },
      hours: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      bgcolor: {
        type: Sequelize.STRING
      },
      maincolor: {
        type: Sequelize.STRING
      }
    });
  
    return TaskList;
  };