module.exports = (sequelize, Sequelize) => {
    const Timeslot = sequelize.define("timeslot", {
      start: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  
    return Timeslot;
  };