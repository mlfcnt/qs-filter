import qs from 'query-string'
import { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useQueryParams } from './useQueryParams'

export function useQueryState<S>(
  initialState: S | (() => S),
  paramName: string,
  serialize: ((val: S) => string) | undefined = undefined
): [S, React.Dispatch<React.SetStateAction<S>>] {
  const history = useHistory()
  const { pathname } = useLocation()
  const queryParams = useQueryParams()
  console.log('🚀 ~ queryParams', queryParams)

  const [stateValue, setState] = useState<S>(initialState)

  useEffect(() => {
    const serializedValue = serialize
      ? serialize(stateValue)
      : stateValue !== null
      ? String(stateValue)
      : null

    // To avoid infinite loops caused by history.replace (which triggers the history object to change)
    // Check to see if our tag is going to change and only update the query param if that is true
    if (queryParams[paramName] !== serializedValue) {
      const updatedQueryParams = {
        ...queryParams
      }

      if (serializedValue !== null && typeof serializedValue !== 'undefined') {
        updatedQueryParams[paramName] = serializedValue
      } else {
        delete updatedQueryParams[paramName]
      }

      const newURL = qs.stringifyUrl({
        url: pathname,
        query: updatedQueryParams
      })

      history.replace(newURL)
    }
  }, [stateValue, history, paramName, pathname, queryParams, serialize])

  return [stateValue, setState]
}
