<script lang="ts">
  const translates: Record<string, any> = Object.freeze({
    entities: {
      kind: {
        class: "Класс",
        const: "Константа",
        enum: "Перечисление",
        function: "Функция",
        interface: "Интерфейс",
        type_alias: "Тип-алиас",
        all: "Все"
      },
      status: {
        stable: "Стабильный",
        deprecated: "Устаревший"
      },
      operator: "Оператор"
    }
  })

  export let key: string

  const getValueByKeyPath = (object: any, path: string) => {
    const preparedPath: string[] = path.split(".")

    let result = object

    for (const key of preparedPath) {
      if (Reflect.has(result, key)) {
        result = Reflect.get(result, key)
        continue
      }

      break
    }

    return result
  }

  $: result = getValueByKeyPath(translates, key)
</script>

{result}