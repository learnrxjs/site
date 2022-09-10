import type { MarkdownInstance } from "astro"
import type { ApiEntityFrontmatter, ApiEntity } from "../models"

export function makeApiEntity(fileData: MarkdownInstance<ApiEntityFrontmatter>): ApiEntity {
  return {
    ...fileData.frontmatter,
    url: fileData.url
  }
}