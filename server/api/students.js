const router = require("express").Router();
const { Student, Campus } = require('../db/index')

router.get('/', async (req, res, next) => {
  try {
    const students = await Student.findAll()
    res.send(students);
  } catch (err) {
    next(err)
  }
});

router.get('/:studentId', async (req, res, next) => {
  try {
    const studentId = req.params.studentId
    const findStudent = await Student.findOne({
      where: {
        id: studentId
      },
        include: [{
          model: Campus
        }]
    });
    res.json(findStudent)
  } catch (err) {
    next(err)
  }
});

module.exports = router
