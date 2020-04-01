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
    const newCampus = await Campus.create({name, address});
    res.json(newCampus);
  } catch (err) {
    next(err);
  }
});

router.delete('/:campusId', async (req, res, next) => {
  try {
    const campusId = req.params.campusId;
    const deleted = await Campus.destroy({where: { id: campusId}});
    res.json(deleted);
  } catch (err) {
    next(err);
  }
});

router.put('/:campusId/edit', async (req, res, next) => {
  try {
    const campusId = req.params.campusId;
    const { name, address } = req.body;
    const campusToUpdate = await Campus.findOne({
      where: { id: campusId }
    });
    const updated = await campusToUpdate.update({name, address});
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

module.exports = router
