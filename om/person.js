import { Schema, Repository } from 'redis-om'
import { client } from './client.js'

const personSchema = new Schema('person', {
  firstName: { type: 'string' },
  lastName: { type: 'string' },
  age: { type: 'number' },
  verified: { type: 'boolean' },
  location: { type: 'point' },
  locationUpdated: { type: 'date' },
  skills: { type: 'string[]' },
  personalStatement: { type: 'text' }
});

export const personRepository = new Repository(personSchema, client)

await personRepository.createIndex()