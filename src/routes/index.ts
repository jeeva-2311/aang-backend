import { Router } from "express";
import { ProjectController } from "../controllers/project.controller";
import { ApiEndpointController } from "../controllers/apiEndpoint.controller";
import { TestCaseController } from "../controllers/testCase.controller";

const router = Router();

// Project routes
router.post("/projects", ProjectController.create);
router.get("/projects", ProjectController.getAll);
router.get("/projects/:id", ProjectController.getOne);
router.put("/projects/:id", ProjectController.update);
router.delete("/projects/:id", ProjectController.delete);

// ApiEndpoint routes
router.post("/endpoints", ApiEndpointController.create);
router.get("/projects/:projectId/endpoints", ApiEndpointController.getAllByProject);
router.get("/endpoints/:id", ApiEndpointController.getOne);
router.put("/endpoints/:id", ApiEndpointController.update);
router.delete("/endpoints/:id", ApiEndpointController.delete);

// TestCase routes
router.post("/testcases", TestCaseController.create);
router.get("/endpoints/:apiId/testcases", TestCaseController.getAllByApi);
router.get("/testcases/:id", TestCaseController.getOne);
router.put("/testcases/:id", TestCaseController.update);
router.delete("/testcases/:id", TestCaseController.delete);

export default router;
