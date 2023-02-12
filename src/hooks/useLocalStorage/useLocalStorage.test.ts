import { act, renderHook } from '@testing-library/react'
import useLocalStorage from './useLocalStorage'

const TEST_KEY = 'key'
const TEST_VALUE = { test: 'test' }

describe('useStateWithLocalStorage', () => {
   it('should set localStorage with default value', () => {
      renderHook(() => useLocalStorage(TEST_KEY, TEST_VALUE))
      expect(JSON.parse(localStorage.getItem(TEST_KEY) || '')).toEqual(
         TEST_VALUE
      )
   })

   it('should set the default value from localStorage if it exists', () => {
      localStorage.setItem(TEST_KEY, JSON.stringify(TEST_VALUE))

      const { result } = renderHook(() => useLocalStorage(TEST_KEY, {}))

      const [value] = result.current
      expect(value).toEqual(TEST_VALUE)

      expect(JSON.parse(localStorage.getItem(TEST_KEY) || '')).toEqual(
         TEST_VALUE
      )
   })

   it('should update localStorage when state changes', () => {
      const { result } = renderHook(() => useLocalStorage(TEST_KEY, TEST_VALUE))

      const [, setValue] = result.current

      const newValue = { test: 'Some value' }
      act(() => {
         setValue(newValue)
      })

      expect(JSON.parse(localStorage.getItem(TEST_KEY) || '')).toEqual(newValue)
   })
})
