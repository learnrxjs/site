import type { MenuItem, MenuLink } from "../models"

export const menuSidebarLinks: readonly MenuItem[] = [
  {
    type: "GROUP",
    title: "Обзор",
    links: [
      {
        type: "LINK",
        title: "Введение",
        url: "/guide/overview",
      },
      {
        type: "LINK",
        title: "Потоки",
        url: "/guide/observables",
      },
      {
        type: "LINK",
        title: "Наблюдатель",
        url: "/guide/observer",
      },
      {
        type: "LINK",
        title: "Операторы",
        url: "/guide/operators",
      },
      {
        type: "LINK",
        title: "Подписки",
        url: "/guide/subscription",
      },
      {
        type: "LINK",
        title: "Сабжекты",
        url: "/guide/subject",
      },
      {
        type: "LINK",
        title: "Шедулеры",
        url: "/guide/schediler",
      },
      {
        type: "LINK",
        title: "Marble тестирование",
        url: "/guide/testing/marble-testing",
      },
    ],
  },
  {
    type: "LINK",
    title: "Установка",
    url: "/guide/installation",
  },
  {
    type: "LINK",
    title: "Импортинг",
    url: "/guide/importing",
  },
];

export const headerMenuLinks: readonly MenuLink[] = [
  {
    type: "LINK",
    title: "Введение",
    url: "/guide/overview"
  },
  {
    type: "LINK",
    title: "API",
    url: "/api"
  },
  /* {
    type: "LINK",
    title: "Блог",
    url: "/blog"
  }, */
  {
    type: "LINK",
    title: "Руководства",
    url: "/tutorials"
  }
]