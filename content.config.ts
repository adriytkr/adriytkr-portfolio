import { defineContentConfig } from '@nuxt/content';

import {projectsCollection} from './content/config/projects';

export default defineContentConfig({
  collections:{
    projects:projectsCollection,
  }
})
