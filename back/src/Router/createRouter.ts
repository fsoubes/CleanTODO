import glob from "glob";
import { Router } from "express";

// Inspiring article https://webapplog.com/url-parameters-and-routing-in-express-js/

module.exports = () =>
  glob
    .sync("routes/*.js", { cwd: `${__dirname}/` })
    .map((filename: string) => require(`./${filename}`))
    .filter((router: NodeRequire) => Object.getPrototypeOf(router) === Router)
    .reduce(
      (rootRouter: Router, router: Router) => rootRouter.use(router),
      Router({ mergeParams: true })
    );
