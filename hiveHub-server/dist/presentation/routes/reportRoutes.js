"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportsRoutes = void 0;
const express_1 = require("express");
const reports_1 = require("../controllers/reports");
const currentUser_1 = require("../middlewares/currentUser");
const reportsRoutes = (dependencies) => {
    const { reportPost, fetchAllReports, resolveReport, rejectReport } = (0, reports_1.controllers)(dependencies);
    const router = (0, express_1.Router)();
    router.route('/report-post').post(currentUser_1.currentUser, reportPost);
    router.route('/fetch-all-reports').get(currentUser_1.currentUser, fetchAllReports);
    router.route('/resolve-report/:id').delete(currentUser_1.currentUser, resolveReport);
    router.route('/reject-report/:id').put(currentUser_1.currentUser, rejectReport);
    return router;
};
exports.reportsRoutes = reportsRoutes;
