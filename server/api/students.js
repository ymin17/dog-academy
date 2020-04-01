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

router.post('/addStudent', async (req, res, next) => {
  try {
    const { firstName, lastName, email } = req.body
    console.log("req.body: ", req.body);
    const newStudent = await Student.create({firstName, lastName, email})
    console.log('new Student: ', newStudent)
    res.json(newStudent);
  } catch (err) {
    next(err);
  }
});

router.delete('/:studentId', async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    const deleted = await Student.destroy({where: { id: studentId}});
    res.json(deleted);
  } catch (err) {
    next(err);
  }
});

router.put('/:studentId/unregister', async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    console.log('studentId from router: ', studentId)
    // const studentToUpdate = await Student.findOne({where: { id: studentId}});
    const updated = await Student.update(
      { campusId: null }, { where: { id: studentId } }
      );
    console.log('updated from router: ', updated);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

router.put('/:studentId/edit', async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    const { firstName, lastName, email } = req.body;
    const studentToUpdate = await Student.findOne({
      where: { id: studentId }
    });
    const updated = await studentToUpdate.update({firstName, lastName, email});
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

module.exports = router
