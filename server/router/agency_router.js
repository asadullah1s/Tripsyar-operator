// agency_router.js (updated)
const express = require('express');
const router = express.Router();
const agencyControllers = require('../controlers/agency-controler');
const validate = require('../middleware/validate-middleware');
const { agencySchema } = require("../validators/validators");

// RESTful endpoints
router.route("/")
  .get(agencyControllers.getAllAgencies)
  .post(validate(agencySchema), agencyControllers.createAgency);

router.route("/:id")
  .get(agencyControllers.getAgencyById)
  .put(validate(agencySchema), agencyControllers.updateAgency)
  .delete(agencyControllers.deleteAgency);

module.exports = router;