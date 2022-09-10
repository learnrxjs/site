import type { ApiEntityKind } from "./api-entity-kind"
import type { ApiEntityStatus } from "./api-entity-status"

export interface ApiEntityFrontmatter {
  title: string
  packageName: string
  isOperator: boolean
  status: ApiEntityStatus
  kind: ApiEntityKind
}

export interface ApiEntity extends ApiEntityFrontmatter {
  url: string | undefined
}