import { useQuery } from '@apollo/client'
import { JOBS_QUERY } from '../graphql/queries'

function useJobs() {
   const { data, error, loading } = useQuery(JOBS_QUERY, { fetchPolicy: "network-only" });

   return {
      jobs: data?.jobs,
      loading,
      error: !!error,
   }
}

export default useJobs;