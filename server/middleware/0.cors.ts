export default defineEventHandler((event) => {
  setResponseHeaders(event, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  });

  // handle preflight
  if (getMethod(event) === "OPTIONS") {
    event.node.res.statusCode = 204;
    return "";
  }
});