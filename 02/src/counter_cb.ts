import { Worker } from "node:worker_threads";

export const Count = (request: number, iterations: number, total: number, callback:(err: Error | null, update: number | boolean) => void) => { const worker = new Worker(__dirname + "/count_worker.js", {
    workerData: {
        iterations, total, request
    }
});

worker.on("exit", async (code: number) => {
    callback(code === 0 ? null : new Error(), true);
});

worker.on("error", async (err) => {
    callback(err, true);
});

}