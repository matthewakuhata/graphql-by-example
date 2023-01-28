import useJobs from '../hooks/useJobs'
import JobList from './JobList';

function JobBoard() {
  const { jobs, loading } = useJobs();

  if (loading) return <p>Loading...</p>
  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
