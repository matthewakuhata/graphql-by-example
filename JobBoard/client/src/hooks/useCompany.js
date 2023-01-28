import { useQuery } from '@apollo/client'
import { COMPANY_QUERY } from '../graphql/queries'

function useCompany(id) {
   const { data, error, loading } = useQuery(COMPANY_QUERY, { variables: { id } });

   return {
      company: data?.company,
      loading,
      error: !!error,
   }
}

export default useCompany;