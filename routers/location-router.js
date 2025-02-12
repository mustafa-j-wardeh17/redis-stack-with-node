import { Router } from "express";
import { personRepository } from "../om/person.js";
import { client } from "../om/client.js";


export const locationRouter = Router()

locationRouter.patch('/:id/location/:lng,:lat', async (req, res) => {
    const id = req.params.id;
    const lng = Number(req.params.lng);
    const lat = Number(req.params.lat);

    const locationUpdated = new Date();

    const person = await personRepository.fetch(id);
    person.location = { lng, lat };
    person.locationUpdated = locationUpdated;

    // add the location to the location history to keep track of where the person has been over time
    await client.XADD(`${person.keyName}:locationHistory`, '*', person.location);

    await personRepository.save(person);

    res.send({ id, locationUpdated, location: { lng, lat } });
})