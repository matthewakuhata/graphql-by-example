import { useQuery } from '@apollo/client'
import { JOB_QUERY } from '../graphql/queries'

function useJobDetails(id) {
   const { data, error, loading } = useQuery(JOB_QUERY, { variables: { id } });

   return {
      job: data?.job,
      loading,
      error: !!error,
   }
}

export default useJobDetails;