import type { ApiEntity } from "./api-entity"

export interface ApiPackage {
  name: string
  entities: ApiEntity[]
}