import { gql, ApolloClient, InMemoryCache } from '@apollo/client'
import { getAccessToken } from '../auth'

const GRAPHQL_URL = "http://localhost:9000/graphql";

export const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache()
});

const JOB_DETAILS_FRAG = gql`
  fragment JobDetail on Job {
    id
    title
    description
    company {
      name
      id
    }
  }
`
export const JOB_QUERY = gql`
query GetJobDetails($id: ID!) {
  job(id: $id) {
    ...JobDetail
   }
 }
 ${JOB_DETAILS_FRAG}
`

export const JOBS_QUERY = gql`
query GetJobs {
   jobs {
    ...JobDetail
   }
 }
 ${JOB_DETAILS_FRAG}
`

export const COMPANY_QUERY = gql`
query CompanyDetails($id: ID!) {
   company(id: $id) {
      id
      name
      description
      jobs {
       id
       title
      }
    }
 }`

export async function createJob(input) {
  if (!input) return;

  const mutation = gql`
  mutation CreateJob($input: CreateJobInput!){
    job: createJob(input: $input) {
      ...JobDetail
    }
  }
  ${JOB_DETAILS_FRAG}
   `

  const context = { headers: { 'Authorization': 'Bearer ' + getAccessToken() } };
  const { data: { job } } = await client.mutate({
    mutation,
    variables: { input },
    context,
    update: (cache, { data: { job } }) => (
      cache.writeQuery({
        query: JOB_QUERY,
        variables: { id: job.id },
        data: { job },
      })
    )
  });

  return job;
}

