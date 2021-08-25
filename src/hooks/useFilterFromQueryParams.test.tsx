import { renderHook } from '@testing-library/react-hooks'
import { useFilterFromQueryParams } from './useFilterFromQueryParams'
import { fakeUsers } from './useFIlterFromQueryParams.fixtures'

const { location } = window
beforeAll(() => {
  delete window.location
})
afterAll(() => {
  window.location = location
})

const generateWindowLocation = (search = '') =>
  (window.location = { ...location, search })

it('returns an empty array if no items are provided', () => {
  generateWindowLocation('?isActive=true')
  const { result: result0 } = renderHook(() => useFilterFromQueryParams())
  expect(result0.current).toHaveLength(0)
})

it('returns the same items if the url', () => {
  generateWindowLocation()
  const { result: result1 } = renderHook(() =>
    useFilterFromQueryParams(fakeUsers)
  )
  expect(result1.current).toHaveLength(2)
})

it('filters booleans', () => {
  generateWindowLocation('?isActive=true')
  const { result } = renderHook(() => useFilterFromQueryParams(fakeUsers))
  expect(result.current).toHaveLength(1)
  expect(result.current.every((x) => !!x.isActive))

  //
  generateWindowLocation('?isFinalized=true')
  const { result: result2 } = renderHook(() =>
    useFilterFromQueryParams(fakeUsers)
  )
  expect(result2.current).toHaveLength(2)
  expect(result.current.every((x) => !!x.isFinalized))
  //
  generateWindowLocation('?isActive=true&isFinalized=true')
  const { result: result3 } = renderHook(() =>
    useFilterFromQueryParams(fakeUsers)
  )
  expect(result3.current).toHaveLength(1)
  expect(result.current.every((x) => !!x.isFinalized && !!x.isActive))
  //
  generateWindowLocation('?isActive=false&isFinalized=false')
  const { result: result4 } = renderHook(() =>
    useFilterFromQueryParams(fakeUsers)
  )
  expect(result4.current).toHaveLength(0)
})

it("ignores filters that aren't booleans", () => {
  generateWindowLocation('?isActive=true&id=2')
  const { result } = renderHook(() => useFilterFromQueryParams(fakeUsers))
  expect(result.current).toHaveLength(1)
  expect(result.current.every((x) => !!x.isActive))
  const id = result.current[0].id
  expect(id).toBe(1)
})
