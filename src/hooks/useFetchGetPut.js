import { useEzForm } from '../hooks/useEzForm'

export const useFetchGetPut = (initVals, submitCallback) => {
  const ezForm = useEzForm( initVals || {}, submitCallback )
  return ( ezForm )
}