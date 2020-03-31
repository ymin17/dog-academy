const router = require("express").Router();
const { Campus, Student } = require('../db/index');

router.get('/', async (req, res, next) => {
  try {
    const campuses = await Campus.findAll()
    res.json(campuses);
  } catch (err) {
    next(err)
  }
});

router.get('/:campusId', async (req, res, next) => {
  try {
    const campusId = req.params.campusId
    const findCampus = await Campus.findOne({
      where: {
        id: campusId
      },
        include: [{
          model: Student
        }]
    });
    res.json(findCampus)
  } catch (err) {
    next(err)
  }
});

module.exports = router
