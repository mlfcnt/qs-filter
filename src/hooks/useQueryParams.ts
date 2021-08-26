import * as qs from 'query-string'
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

export const useQueryParams = (options?: qs.ParseOptions) => {
  console.log('inside useQueryParams')
  const defaultOptions: qs.ParseOptions = {
    parseBooleans: true,
    arrayFormat: 'comma'
  }
  const finalOptions = {
    ...defaultOptions,
    ...options
  }
  console.log('🚀 ~ useQueryParams ~ finalOptions', finalOptions)

  const { search } = useLocation()
  const queryParams = useMemo(
    () => qs.parse(search, finalOptions),
    [search, finalOptions]
  )
  console.log('🚀 ~ useQueryParams ~ queryParams', queryParams)
  return queryParams
}
