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

router.post('/addCampus', async (req, res, next) => {
  try {
    const { name, address } = req.body
    console.log("req.body: ", req.body);
    const newCampus = await Campus.create({name, address})
    console.log('new Campus: ', newCampus)
    res.json(newCampus);
  } catch (err) {
    next(err);
  }
});

module.exports = router
