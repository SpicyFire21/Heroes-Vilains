// src/stores/index.js
import { useHeroesStore } from './modules/heroes'
import { useTeamsStore } from './modules/teams'
import { useOrganizationStore } from './modules/organization'
import { useErrorStore} from "@/stores/modules/error";
import { useAuthStore} from "@/stores/modules/auth";
import {useSecretStore} from "@/stores/modules/secret";

export {
    useHeroesStore,
    useTeamsStore,
  useOrganizationStore,
  useAuthStore,
  useSecretStore,
  useErrorStore

}
