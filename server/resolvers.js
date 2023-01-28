import { Job, Company } from './db.js'

export const resolvers = {
   Query: {
      jobs: () => Job.findAll(),
      job: (root, { id }) => Job.findById(id),
      company: (root, { id }) => Company.findById(id)

   },

   Mutation: {
      createJob: (root, { input }, { user }) => {
         if (!user) {
            throw new Error('Unauthorized request!');
         }
         return Job.create({ companyId: user.companyId, ...input });
      },

      deleteJob: async (root, { id }, { user }) => {
         if (!user) {
            throw new Error('Unauthorized request!');
         }

         const job = await Job.findById(id);
         if (job.companyId !== user.companyId) {
            throw new Error('Unauthorized request!');
         }

         return Job.delete(id);
      },

      updateJob: async (root, { input }, { user }) => {
         if (!user) {
            throw new Error('Unauthorized request!');
         }

         const job = await Job.findById(input.id);
         if (job.companyId !== user.companyId) {
            throw new Error('Unauthorized request!');
         }

         return Job.update(input);
      }
   },

   Job: {
      company: (root, _variables, ctx) => Company.findById(root.companyId)
   },

   Company: {
      jobs: (company) => Job.findAll((job) => job.companyId === company.id),
   }
}