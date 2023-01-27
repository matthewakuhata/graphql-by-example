import { Job, Company } from './db.js'

export const resolvers = {
   Query: {
      jobs: () => Job.findAll(),
      job: (root, { id }) => Job.findById(id),
      company: (root, { id }) => Company.findById(id)

   },

   Mutation: {
      createJob: (root, { input }) => {
         return Job.create(input);
      },

      deleteJob: (root, { id }) => {
         return Job.delete(id);
      }
   },

   Job: {
      company: (root, ctx) => Company.findById(root.companyId)
   },

   Company: {
      jobs: (company) => Job.findAll((job) => job.companyId === company.id),
   }
}