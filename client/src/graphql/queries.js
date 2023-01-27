import { request, gql } from 'graphql-request';

const GRAPHQL_URL = "http://localhost:9000/graphql";

export async function getJobs() {
  const query = gql`
   query getJobs {
      jobs {
        id
        title
        company {
          name
        }
      }
    }
   `

  const { jobs } = await request(GRAPHQL_URL, query);
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

  const { job } = await request(GRAPHQL_URL, query, { id });
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

  const { company } = await request(GRAPHQL_URL, query, { id });
  return company;
}

export async function createJob(input) {
  if (!input) return;

  const query = gql`
  mutation CreateJob($input: CreateJobInput!){
    job: createJob(input: $input) {
      id
    }
  }
   `

  const { job } = await request(GRAPHQL_URL, query, { input });
  return job;
}

