const express = require("express");
const router = express.Router();

const privateSchoolControllers = require("../controllers/privateSchool");

const privateSchoolAuth = require("../middelware/PrivateSchoolAuth");

router.post("/login", privateSchoolControllers.loginPrivateSchool);

router.get("/students/all", privateSchoolAuth, privateSchoolControllers.getAllStudents);
router.get("/forums/all", privateSchoolAuth, privateSchoolControllers.getAllForums);

router.get(
  "/students/:studentId",
  privateSchoolAuth,
  privateSchoolControllers.getStudent
);
router.get("/forums/:forumId", privateSchoolAuth, privateSchoolControllers.getForum);
router.put(
  "/student/password",
  privateSchoolAuth,
  privateSchoolControllers.updateStudentPassword
);

router.put(
  "/student/info",
  privateSchoolAuth,
  privateSchoolControllers.updateStudentInfo
);
router.put("/forum/info", privateSchoolAuth, privateSchoolControllers.updateForumInfo);

router.get(
  "/parent/request",
  privateSchoolAuth,
  privateSchoolControllers.getAllParentWaiting
);
router.get(
  "/parent/request/history",
  privateSchoolAuth,
  privateSchoolControllers.getAllParentWaitingHistory
);
router.put(
  "/parent/request/accept/:id",
  privateSchoolAuth,
  privateSchoolControllers.acceptParentRequest
);
router.put(
  "/parent/request/reject/:id",
  privateSchoolAuth,
  privateSchoolControllers.rejectParentRequest
);

module.exports = router;
