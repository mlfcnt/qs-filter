import * as qs from 'query-string'
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

export const useQueryParams = (options?: qs.ParseOptions) => {
  console.log('insie useQueryParams')
  const defaultOptions: qs.ParseOptions = {
    parseBooleans: true,
    arrayFormat: 'comma'
  }
  const finalOptions = {
    ...defaultOptions,
    ...options
  }
  const { search } = useLocation()
  const queryParams = useMemo(
    () => qs.parse(search, finalOptions),
    [search, finalOptions]
  )
  return queryParams
}
