import { useEzForm } from '../hooks/useEzForm'

export const useFetchGetPut = (initVals) => {
  const ezForm = useEzForm( initVals || {} )
  return ( ezForm )
}