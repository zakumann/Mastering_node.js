"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Count = void 0;
const node_worker_threads_1 = require("node:worker_threads");
const Count = (request, iterations, total, callback) => {
    const worker = new node_worker_threads_1.Worker(__dirname + "/count_worker.js", {
        workerData: {
            iterations, total, request
        }
    });
    worker.on("exit", async (code) => {
        callback(code === 0 ? null : new Error(), true);
    });
    worker.on("error", async (err) => {
        callback(err, true);
    });
};
exports.Count = Count;
