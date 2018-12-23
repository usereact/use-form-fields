import {
    useState,
    useCallback,
    useMemo,
    ChangeEvent,
    ChangeEventHandler,
  } from 'react'
  import equals from 'nano-equal'
  
  type InitalValuesType = { [key: string]: any }
  type SetValueFn<T> = <K extends keyof T>(key: K, value: T[K]) => void
  type StringInputFieldBindings<T, K extends keyof T> = {
    name: K
    value: T[K]
    onChange: ChangeEventHandler<HTMLInputElement>
  }
  type InputFieldBindings<T, K extends keyof T> = { name: K; value: T[K] }
  type Fields<T> = {
    [Key in keyof T]: T[Key] extends string
      ? StringInputFieldBindings<T, Key>
      : InputFieldBindings<T, Key>
  }
  
  function useFormFields<T extends InitalValuesType, K extends keyof T>(
    initalValues: T
  ) {
    const [state, setState] = useState(initalValues)
    const isDirty = useMemo(() => !equals(state, initalValues), [
      state,
      initalValues,
    ])
    const reset = useCallback(() => setState(initalValues), [])
    const setValue = useCallback<SetValueFn<T>>(
      (key, value) => setState(prevState => ({ ...prevState, [key]: value })),
      []
    )
    const onChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = evt.currentTarget
      if (!(name in initalValues)) {
        throw new Error(
          `Field name "${name}" is not a valid value. Must be one of [${keys}].`
        )
      }
      setValue(name as K, value as T[K])
    }, [])
  
    const keys = <K[]>Object.keys(initalValues)
  
    const fields = keys.reduce(
      (res, key) => {
        // @ts-ignore
        res[key] = {
          name: key,
          value: state[key],
        }
        if (typeof state[key] === 'string') {
          // @ts-ignore
          res[key].onChange = onChange
        }
        return res
      },
      {} as Fields<T>
    )
  
    return {
      values: state,
      isDirty,
      reset,
      setValue,
      fields,
    }
  }
  
  export default useFormFields
  