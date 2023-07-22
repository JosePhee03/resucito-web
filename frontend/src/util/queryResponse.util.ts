
interface QueryResponse <T> {
  data: T[]
  isLoading: boolean
  isError: boolean
}

export async function queryResponse <T> (feching: Promise<T>): QueryResponse<T> {
  let data: T[] = []
  let isLoading = true
  let isError = false

  const response = await feching
  try {
    data = response
  } catch (error) {
    console.log(error)
    isError = true
  } finally {
    isLoading = false
  }

  return {
    data,
    isLoading,
    isError
  }
}
