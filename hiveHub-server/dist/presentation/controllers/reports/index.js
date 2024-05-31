"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const fetchAllReports_1 = require("./fetchAllReports");
const rejectReport_1 = require("./rejectReport");
const reportPost_1 = require("./reportPost");
const resolveReport_1 = require("./resolveReport");
const controllers = (dependencies) => {
    return {
        reportPost: (0, reportPost_1.reportPostController)(dependencies),
        fetchAllReports: (0, fetchAllReports_1.fetchAllReportsController)(dependencies),
        resolveReport: (0, resolveReport_1.resolveReportController)(dependencies),
        rejectReport: (0, rejectReport_1.rejectReportController)(dependencies)
    };
};
exports.controllers = controllers;
