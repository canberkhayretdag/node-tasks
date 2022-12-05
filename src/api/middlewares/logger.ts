import { Request, Response, NextFunction } from 'express';

const serviceMethodLogger = (req: Request, res: Response, next: NextFunction) => {
  const { method, url } = req;
  const args = req.body;

  console.log(`Method: ${method}`);
  console.log(`URL: ${url}`);
  console.log(`Arguments: ${JSON.stringify(args)}`);

  next();
};

export { serviceMethodLogger }
