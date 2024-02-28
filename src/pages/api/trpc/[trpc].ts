import {
  NextApiRequest,
  NextApiResponse,
  createNextApiHandler,
} from "@trpc/server/adapters/next";
import { appRouter } from "@trpcApi/root";
import { createTRPCContext } from "@trpcApi/trpc";
// create the API handler, but don't return it yet
const nextApiHandler = createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
});

const allowedOrigins = ["https://iot-control.vercel.app/"];

const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
// @link https://nextjs.org/docs/api-routes/introduction
export default async function handler(
  request: NextApiRequest,
  res: NextApiResponse
) {
  const origin = request.headers.origin ?? "";
  const isAllowedOrigin = allowedOrigins.includes(origin);

  if (isAllowedOrigin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  return nextApiHandler(request, res);
}
