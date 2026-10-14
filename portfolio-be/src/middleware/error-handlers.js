import { env } from "../config/env.js";

/** Any request that matched no route. */
export function notFoundHandler(_req, res) {
  res.status(404).json({ error: "Not found" });
}

/** The last stop for every error thrown in a route (Express 5 forwards async errors here as well). */
export function errorHandler(error, _req, res, _next) {
  const isValidationError = error.name === "ValidationError";
  const status = isValidationError ? 400 : (error.status ?? 500);

  if (status >= 500 && env.nodeEnv !== "test") console.error(error);

  res.status(status).json({
    error: status >= 500 ? "Something went wrong on the server." : error.message,
  });
}
