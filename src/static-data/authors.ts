import type { User } from "../models"

export const USERS: Record<string, User> = {
  mephistorine: {
    name: "Сэм Булатов",
    nickname: "mephistorine",
    url: "https://mephi.dev",
    avatarUrl: "https://avatars.githubusercontent.com/u/17084223?v=4",
    description: "Ведущий фронт в [Waliot](https://waliot.com), организатор в [krd.dev](https://krd.dev) основатель проекта [learnrxjs.ru](https://learnrxjs.ru).",
    socials: [
      {
        type: "GITHUB",
        nickname: "mephistorine"
      }
    ]
  },
  learnrxjs_bot: {
    name: "Рыся (Бот)",
    nickname: "learnrxjs_bot",
    url: null,
    avatarUrl: "https://avatars.githubusercontent.com/u/17084223?v=4",
    description: "Я бот",
    socials: []
  }
}