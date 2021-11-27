import { Request, Response } from "express";
import { UserRole } from "../routes/v1/Auth/interface";

export function hasRole(roles: Array<UserRole>) {
  return (req: Request, res: Response, next: Function) => {
    const { role, email } = res.locals;

    if (!role) return res.status(403).send();

    if (roles.includes(role)) {
      return next();
    } else {
      return res.status(403).send();
    }
  };
}

export function isAuthorized(opts: {
  hasRole: Array<UserRole>;
  allowSameUser?: boolean;
}) {
  return (req: Request, res: Response, next: Function) => {
    const { role, email, uid } = res.locals;
    const { id } = req.params;

    if (opts.allowSameUser && id && uid === id) return next();

    if (!role) return res.status(403).send();

    if (opts.hasRole.includes(role)) return next();

    return res.status(403).send();
  };
}
