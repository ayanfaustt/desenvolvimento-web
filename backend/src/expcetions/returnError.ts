import { Response } from "express";
import { DatabaseError } from "sequelize";
import { AlreadyExistError } from "./AlreadyExistError";
import { NotFoundError } from "./NotFound";
import { ServiceUnavailableError } from "./ServiceUnavailableError";

export default function errorHandler(error: unknown, res: Response): Response{
  if(error instanceof NotFoundError)
    return res.status(404).send({message: error.message});

  if(error instanceof AlreadyExistError)
    return res.status(409).send({message: error.message});

  if(error instanceof DatabaseError)
    return res.status(500).send({message: error.message});

  if(error instanceof ServiceUnavailableError)
    return res.status(503).send({message: error.message});
	
  if(error instanceof Error)
    return res.status(400).send({message: error.message});


  return res.status(400).send({message: error});

}


