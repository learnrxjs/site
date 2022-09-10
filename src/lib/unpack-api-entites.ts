import type { ApiPackage, ApiEntity } from "../models"

export function unpackApiEntities(apiPackages: readonly ApiPackage[]): readonly ApiEntity[] {
  const entites: ApiEntity[] = []
  
  for (const apiPackage of apiPackages) {
    entites.push(...apiPackage.entities)
  }

  return entites
}