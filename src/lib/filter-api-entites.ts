import type { ApiPackage, ApiEntity, ApiEntityKindForView } from "./../models"
import { packApiEntities } from "./pack-api-entities"
import { unpackApiEntities } from "./unpack-api-entites"

export function filterApiEntites(apiPackages: readonly ApiPackage[], titleSearchValue: string, kind: ApiEntityKindForView, caseSesnetive: boolean = false) {
  const entities: readonly ApiEntity[] = unpackApiEntities(apiPackages)

  const entitiesByPredicate: readonly ApiEntity[] = entities.filter((entity: ApiEntity) => {
    const isEqualKind = kind === "ALL" || kind === entity.kind

    if (caseSesnetive) {
      return entity.title.includes(titleSearchValue) && isEqualKind
    }

    return entity.title.toLowerCase().includes(titleSearchValue.toLowerCase()) && isEqualKind
  })

  return packApiEntities(entitiesByPredicate)
}