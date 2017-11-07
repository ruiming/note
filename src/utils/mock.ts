import * as faker from 'faker'
import { PartialNote, PartialSite, PartialUser } from '../entities'

export function mockNote(item?: PartialNote): PartialNote {
  return {
    title: faker.lorem.sentence(),
    url: faker.internet.url(),
    summary: faker.lorem.sentence(),
    description: faker.lorem.paragraphs(8),
    ...item
  }
}

export function mockSite(item?: PartialSite): PartialSite {
  return {
    title: faker.lorem.sentence(),
    link: faker.internet.url(),
    favicon: faker.internet.avatar(),
    feed: faker.internet.url(),
    ...item
  }
}

export function mockUser(item?: PartialUser): PartialUser {
  return {
    email: faker.internet.email(),
    name: faker.name.lastName(),
    password: faker.internet.password(),
    ...item
  }
}
