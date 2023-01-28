import { gql, ApolloClient, InMemoryCache } from '@apollo/client'

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

export const CREATE_JOB_MUTATION = gql`
mutation CreateJob($input: CreateJobInput!){
  job: createJob(input: $input) {
    ...JobDetail
  }
}
${JOB_DETAILS_FRAG}`
