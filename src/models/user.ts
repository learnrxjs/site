export interface UserSocial {
  type: "GITHUB" | "TWITTER"
  nickname: string
}

export interface User {
  name: string
  nickname: string
  url: string | null
  avatarUrl: string
  description: string
  socials: readonly UserSocial[]
}