import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { getReactions, insertReaction } from "./src/db/actions/reactions";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handler);

    const io = new Server(httpServer);

    io.on("connection", (socket) => {
        socket.on("reaction", async (data) => {
            const reaction = data.type === "like" ? 1 : 0;
            await insertReaction(data.userId, data.commentId, reaction);
            const updatedData = await getReactions(data.commentId);
            io.emit("reaction-server", updatedData);        
        });
    });

    httpServer
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });
});
