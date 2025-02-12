import { Router } from "express";
import { personRepository } from "../om/person.js";



export const searchRouter = Router();

searchRouter.get('/all', async (req, res) => {
    const persons = await personRepository.search().return.all();
    res.send(persons);
});