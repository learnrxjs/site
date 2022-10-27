import type { TutorialPageFile } from "./tutorial-page-file"

export interface TutorialPageData {
  id: string
  content: string
  files: readonly TutorialPageFile[]
}