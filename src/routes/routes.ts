import { Express, Request, Response } from "express";
import { createUserSessionHandler, deleteSessionHandler, getUserSessionsHandler } from "../controllers/sessioin.controller";
import { createUserHandler } from "../controllers/user.controller";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import { createSessionSchema } from "../schemas/session.schema";
import { createUserSchema } from "../schemas/user.schema";

const routes = (app: Express) => {
    app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

    app.post("/api/users", validateResource(createUserSchema), createUserHandler);

    app.post(
        "/api/sessions",
        validateResource(createSessionSchema),
        createUserSessionHandler
    );

    app.get("/api/sessions", requireUser, getUserSessionsHandler);

    app.delete("/api/sessions", requireUser, deleteSessionHandler);

    // app.post(
    //     "/api/products",
    //     [requireUser, validateResource(createProductSchema)],
    //     createProductHandler
    // );

    // app.put(
    //     "/api/products/:productId",
    //     [requireUser, validateResource(updateProductSchema)],
    //     updateProductHandler
    // );

    // app.get(
    //     "/api/products/:productId",
    //     validateResource(getProductSchema),
    //     getProductHandler
    // );

    // app.delete(
    //     "/api/products/:productId",
    //     [requireUser, validateResource(deleteProductSchema)],
    //     deleteProductHandler
    // );
}

export default routes;