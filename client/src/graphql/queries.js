import { gql, ApolloClient, InMemoryCache } from '@apollo/client'
import { request } from 'graphql-request';
import { getAccessToken } from '../auth'

const GRAPHQL_URL = "http://localhost:9000/graphql";

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache()
});

export async function getJobs() {
  const query = gql`
   query GetJobs {
      jobs {
        id
        title
        company {
          name
        }
      }
    }
   `

  const { data: { jobs } } = await client.query({ query });
  return jobs;
}

export async function getJobDetails(id) {
  if (!id) return;

  const query = gql`
   query JobDetail($id: ID!) {
      job(id: $id) {
        id
        title
        description
        company {
          name
          id
        }
      }
    }
   `

  const { data: { job } } = await client.query({ query, variables: { id } });
  return job;
}

export async function getCompany(id) {
  if (!id) return;

  const query = gql`
   query CompanyDetails($id: ID!) {
      company(id: $id) {
         id
         name
         description
         jobs {
          id
          title
          description
         }
       }
    }
   `
  const { data: { company } } = await client.query({ query, variables: { id } });
  return company;
}

export async function createJob(input) {
  if (!input) return;

  const mutation = gql`
  mutation CreateJob($input: CreateJobInput!){
    job: createJob(input: $input) {
      id
    }
  }
   `
  const headers = { 'Authorization': 'Bearer ' + getAccessToken() };
  const { data: { job } } = await client.mutate({ mutation, variables: { input }, headers });
  return job;
}

