import { Request, RequestHandler, Response } from "express";
import { User } from "../dto/users";
import { log } from "console";

const users: User[] = [
  { id: 1, username: "rajabi" },
  { id: 2, username: "askari" },
  { id: 3, username: "ghazi moradi" },
];

export const getUsers: RequestHandler = (req: Request, res: Response): void => {
  res.send(users);
};

export const createUser: RequestHandler = (req: Request, res: Response): void => {
  const { id, username } = req.body;
  const newUser: User = {
    id,
    username
  };
  users.push(newUser);
  res.status(201).send(newUser);
};

export function updateUserById(id: number, username: string): void {
  const user = users.findIndex(user => user.id === id);
  if (user) {
    users[user].username = username;
  }
}
export const UpdateUser: RequestHandler = (
  req: Request,
  res: Response
): void => {
  updateUserById(+req.params.id, req.body.username)
  res.send(users);
}

