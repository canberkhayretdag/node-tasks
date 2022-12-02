import { Router, Request, Response } from 'express';
import { repository as userRepository } from '../../data-access/repositories/UserRepository';
import User from '../../models/User';
import { userService } from '../../services/user';
import { checkAuth } from '../middlewares/auth'
import { IUserInputDTO } from '../../interfaces/IUser';
import middlewares from '../middlewares';
const route = Router();

export default (app: Router) => {
    app.use('/users', route);
  
    route.get("/", middlewares.checkAuth, async (req: Request, res:Response) => {
        return res.status(200).send(await userService.getUsers());
    });

    route.get("/suggest", middlewares.checkAuth, async (req: Request, res:Response) => {
        if (req.query.loginSubstring && req.query.limit) {
          const result = await userService.getAutoSuggestUsers(
            req.query.loginSubstring as string,
            parseInt(req.query.limit as string)
          );
          return res.status(200).send(result);
        }
        return res.status(404).send("Not Found");
      });

    route.get("/:id", middlewares.checkAuth, async (req: Request, res:Response) => {
        if (req.params.id) {
            const user = await userService.getById(parseInt(req.params.id));
            if (user) {
              return res.status(200).send(user);
            }
          }
          res.status(400).send("Not Found");
    });

    route.post("/", middlewares.validateUser ,async (req: Request, res:Response) => {
        const userCreateDTO: IUserInputDTO = req.body;
        const result = await userService.createUser(userCreateDTO);
        if (result) {
          return res.send(result);
        }
        return res.status(404).send("Not Found");
    });

    route.put("/:id", middlewares.checkAuth, async (req: Request, res:Response) => {
        const userUpdateDTO: IUserInputDTO = req.body;
        const updatedUser = await userService.updateUser(parseInt(req.params.id), userUpdateDTO);
        if (updatedUser) {
            return res.status(200).send("OK");
          }
        return res.status(400).send("Not Found");
    })

    route.delete("/:id", middlewares.checkAuth, async (req: Request, res:Response) => {
        const result = await userService.deleteUser(parseInt(req.params.id));
        if (result) {
          return res.status(200).send("OK");
        }
        return res.status(400).send("Not Found");
    })

    route.post("/addUsersToGroup", middlewares.checkAuth, async (req: Request, res:Response) => {
      if (req.body.groupId && req.body.userIds) {
        const result = await userService.addUsersToGroup(req.body.groupId, req.body.userIds);
        if (result) {
          return res.status(200).send("OK");
        }
      }
      return res.status(400).send("Bad Request");
    })
    
  };