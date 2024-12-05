import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { handle } from "hono/vercel";
import { swaggerUI } from "@hono/swagger-ui";
import { mercenary } from "@/data/mercenary";

export const dynamic = "force-dynamic";

const app = new OpenAPIHono().basePath("/api");

app.openapi(
  createRoute({
    method: "get",
    summary: "Get all of mercenary list",
    tags: ["Mercenary"],
    path: "/mercenary",
    responses: {
      200: {
        description: "Get all of mercenary list",
        content: {
          "application/json": {
            schema: z.object({
              status: z.string(),
              data: z.array(
                z.object({
                  id: z.number(),
                  type: z.string(),
                  AttackType: z.string(),
                  name: z.string(),
                  video: z.string(),
                  description: z.string(),
                  skills: z.array(
                    z.object({
                      id: z.number(),
                      name: z.string(),
                      description: z.string(),
                      icon: z.string(),
                      type: z.string(),
                    })
                  ),
                  thumb_male: z.string(),
                  thumb_female: z.string(),
                  image_male: z.string(),
                  image_female: z.string(),
                })
              ),
            }),
          },
        },
      },
    },
  }),
  (c) => {
    return c.json({
      status: "OK",
      data: mercenary,
    });
  }
);

app.openapi(
  createRoute({
    method: "get",
    summary: "Get mercenary by ID",
    tags: ["Mercenary"],
    path: "/mercenary/{id}",
    request: {
      params: z.object({
        id: z.coerce.number().openapi({
          param: {
            name: "id",
            in: "path",
            required: true,
            description: "Mercenary ID",
          },
          example: 1,
        }),
      }),
    },
    responses: {
      200: {
        description: "Get mercenary by ID",
        content: {
          "application/json": {
            schema: z.object({
              status: z.string(),
              data: z
                .object({
                  id: z.number(),
                  type: z.string(),
                  AttackType: z.string(),
                  name: z.string(),
                  video: z.string(),
                  description: z.string(),
                  skills: z.array(
                    z.object({
                      id: z.number(),
                      name: z.string(),
                      description: z.string(),
                      icon: z.string(),
                      type: z.string(),
                    })
                  ),
                  thumb_male: z.string(),
                  thumb_female: z.string(),
                  image_male: z.string(),
                  image_female: z.string(),
                })
                .optional(),
            }),
          },
        },
      },
    },
  }),
  (c) => {
    const { id } = c.req.valid("param");

    const mercenarydata = mercenary.find((m) => m.id === id);

    return c.json({
      status: "OK",
      data: mercenarydata,
    });
  }
);

app.get(
  "/swagger",
  swaggerUI({
    url: "/api/doc",
  })
);

app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Lost Saga Database API",
    description: "API for accessing Lost Saga Database",
  },
});

export const GET = handle(app);
export type AppType = typeof app;
