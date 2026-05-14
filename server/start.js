const spawn = require("child_process").spawn;
const path = require("path");

console.log("Starting mock server...");
const server = spawn("node", [path.join(__dirname, "mockServer.js")], {
    stdio: "inherit"
});

server.on("exit", (code) => {
    console.error(`Mock server exited with code ${code}`);
    setTimeout(() => {
        console.log("Restarting mock server...");
        spawn("node", [path.join(__dirname, "mockServer.js")], {
            stdio: "inherit"
        });
    }, 1000);
});
