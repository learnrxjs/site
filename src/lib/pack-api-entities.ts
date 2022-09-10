import type { ApiEntity, ApiPackage } from "./../models"

export function packApiEntities(apiEntities: readonly ApiEntity[]): readonly ApiPackage[] {
  const packages: Map<string, ApiPackage> = new Map<string, ApiPackage>();

  for (const apiEntity of apiEntities) {
    if (packages.has(apiEntity.packageName)) {
      packages.get(apiEntity.packageName)!.entities.push(apiEntity)
    } else {
      packages.set(apiEntity.packageName, {
        name: apiEntity.packageName,
        entities: [ apiEntity ]
      })
    }
  }

  return Array.from(packages.values())
}