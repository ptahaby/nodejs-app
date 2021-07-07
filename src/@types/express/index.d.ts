import User from "../../resources/users/user.model"

declare global{
    namespace Express {
      export interface Request {
        user: User
    }
  }  
}
