import { getCabins } from '../utils/data-service'

export default defineEventHandler(async () => {
  const cabins = await getCabins()

  return {
    cabinsCount: cabins.length,
  }
})
