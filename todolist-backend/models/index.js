const dbConfig = require("../db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.todos = require("./todo.model.js")(sequelize, Sequelize);
db.tasklists = require("./list.model")(sequelize, Sequelize)
db.timeslots = require("./timeslot.model")(sequelize, Sequelize)
db.users = require("./user.model")(sequelize, Sequelize)

//Connect lists and tasks
db.tasklists.hasMany(db.todos)
db.todos.belongsTo(db.tasklists)

//Create subtasks 
db.todos.belongsToMany(db.todos, {as: "Subtasks", through: "TaskSubtask"})

//Connect users and tasks
db.users.hasMany(db.todos)
db.todos.belongsTo(db.users)

//Connect users and lists
db.users.hasMany(db.tasklists, {as: "CreatedLists"})
db.tasklists.belongsTo(db.users, {as: "Creator"})

//Allow users to follow lists
db.users.belongsToMany(db.tasklists, {as: "Followers", through: "UserFollow"});
db.tasklists.belongsToMany(db.users, {as: "FolloweredLists", through: "UserFollow"})

//Connect timeslots and lists
db.tasklists.hasMany(db.timeslots)
db.timeslots.belongsTo(db.tasklists)

//Connect timeslots and users
db.users.hasMany(db.timeslots)
db.timeslots.belongsTo(db.users)

module.exports = db;
