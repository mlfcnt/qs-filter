import * as qs from 'query-string'
import { useEffect, useState } from 'react'

interface Item {
  [key: string]: any
}
/**
 * @description Beware, for now only the query params of type boolean are taken into account
 * @param items array of items to filter
 * @returns items filtered according to query params
 * @example const filteredUsers = useFilterFromQueryParams(users)
 */
export const useFilterFromQueryParams = (items: Item[] = []): Item[] => {
  const [filteredItems, setFilteredItems] = useState<Item[]>(items)
  if (!items) return []
  const queryParams = qs.parse(window.location.search, {
    parseBooleans: true,
    arrayFormat: 'comma'
  })
  useEffect(() => {
    setFilteredItems(filterItems())
  }, [queryParams])

  const filterItems = () => {
    if (!Object.values(queryParams)?.length) return items
    return items.filter((item) => {
      const filters = Object.entries(queryParams).map(([key, value]) => {
        if (typeof value !== 'boolean') {
          console.error(
            `⚠️ Type "${typeof value}" is not supported by useFilterFromQueryParams yet. This filter will be ignored`
          )
          return true
        }
        return item[key] === value
      })
      return !filters.includes(false)
    })
  }
  return filteredItems
}
