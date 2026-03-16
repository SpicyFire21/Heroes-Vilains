// api - appelle API
import { useHeroesStore } from './modules/api/heroes.js'
import { useTeamsStore } from './modules/api/teams.js'
import { useOrganizationStore } from './modules/api/organization.js'
import { useErrorStore} from "@/stores/modules/api/error.js";
import { useAuthStore} from "@/stores/modules/api/auth.js";
import {useSecretStore} from "@/stores/modules/api/secret.js";

// domain - gères les états partagés sur le fronted
import { useLayoutStore} from "@/stores/modules/domain/layout.js";

export {
    useHeroesStore,
    useTeamsStore,
  useOrganizationStore,
  useAuthStore,
  useSecretStore,
  useErrorStore,

  useLayoutStore
}
