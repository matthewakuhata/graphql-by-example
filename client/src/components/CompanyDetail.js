import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getCompany } from '../graphql/queries';
import JobList from './JobList';
import useCompany from '../hooks/useCompany'


function CompanyDetail() {
  const { companyId } = useParams();

  const { company, loading, error } = useCompany(companyId);


  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h1 className="title">
        {company.name}
      </h1>
      <div className="box">
        {company.description}
      </div>

      <JobList jobs={company.jobs} />
    </div>
  );
}

export default CompanyDetail;
