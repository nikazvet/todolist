module.exports = app =>{
    const lists = require("../controllers/tasklist.controller");
    var router = require("express").Router();

    router.post("/add", lists.create);

    router.get("/all", lists.findAll);

    router.get("/:id", lists.findOne);

  router.put("/:id", lists.update);

  router.delete("/:id", lists.delete);

  app.use('/api/lists', router);
}