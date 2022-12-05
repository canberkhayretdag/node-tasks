import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: Error,req: Request, res: Response, next: NextFunction) => {
    const { method, url } = req;
    const args = req.body;
  
    console.log(`Method: ${method}`);
    console.log(`URL: ${url}`);
    console.log(`Arguments: ${JSON.stringify(args)}`);
    res.status(500).send('Internal Server Error');
};

export { errorHandler }
