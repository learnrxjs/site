---
title: timer
layout: ../../../../layouts/api-entity-layout.astro
packageName: index
isOperator: false
status: STABLE
kind: FUNCTION
translate:
  sourceUrl: https://rxjs.dev/api/index/function/timer
  title: timer
contributorNicknames:
  - mephistorine
---

## Сигнатура

```typescript
timer(dueTime: number | Date = 0, periodOrScheduler?: number | SchedulerLike, scheduler?: SchedulerLike): Observable<number>
```

## Описание

Создает поток, который начинает слать значения после истечения `dueTime` в виде инкрементирующегося числа каждый `periodOrScheduler`

## Параметры

| Название | Описание |
|-|-|
| `dueTime` | *Опционально*. По умл.: `0`<br>Время в милисекундах или дата после истечении которого отправлять значения |
| `periodOrScheduler` | *Опционально*. По умл.: `undefined`<br>Период времени в милисекудах между новыми значениями |
| `scheduler` | *Опционально*. По умл.: `undefined`<br>Планировщик |

## Примеры

### Пример 1

Отправляет числа, каждую секунду, начиная через 3 секунды

```typescript
import { timer } from 'rxjs';

const numbers = timer(3000, 1000);
numbers.subscribe(x => console.log(x));
```

### Пример 2

Испустит одно значение через 5 секунд

```typescript
import { timer } from 'rxjs';

const numbers = timer(5000);
numbers.subscribe(x => console.log(x));
```

## Полезные ссылки

- 📰 Официальная документация: [timer](https://rxjs.dev/api/index/function/timer)
- 📁 Исходный код: https://github.com/reactivex/rxjs/tree/6.5.5/src/internal/observable/timer.ts

