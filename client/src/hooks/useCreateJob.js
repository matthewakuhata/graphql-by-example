
import { useMutation } from '@apollo/client';
import { CREATE_JOB_MUTATION, JOB_QUERY } from '../graphql/queries'
import { getAccessToken } from '../auth'

function useCreateJob(id) {
   const [mutate, { loading }] = useMutation(CREATE_JOB_MUTATION, { variables: { id } });

   return {
      createJob: async (title, description) => {
         const { data: { job } } = await mutate({
            variables: { input: { title, description } },
            context: { headers: { 'Authorization': 'Bearer ' + getAccessToken() } },
            update: (cache, { data: { job } }) => (
               cache.writeQuery({
                  query: JOB_QUERY,
                  variables: { id: job.id },
                  data: { job },
               })
            )
         });

         return job;
      },
      loading
   }
}

export default useCreateJob;