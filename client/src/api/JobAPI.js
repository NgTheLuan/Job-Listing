import { useState, useEffect } from 'react';
import axios from 'axios';

function JobAPI() {
  const [jobs, setJobs] = useState([]);
  const [jobhot, setJobHot] = useState([]);
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [location, setLocation] = useState('');
  const [callback, setCallBack] = useState(false);
  // const [result, setResult] = useState(0);

  const [loading, setLoading] = useState(true);

  //JOB-LIST
  useEffect(() => {
    const getJobs = async () => {
      const res = await axios.get(`/api/jobs?limit=${page * 6}&${category}&${sort}&position[regex]=${search}`);
      setJobs(res.data.jobs);

      setLoading(false);

      // setResult(res.data.result);
      // console.log(res.data.jobs);
      // console.log(res);
    };
    getJobs();
  }, [callback, category, location, search, sort, page]);

  //HOT-JOB
  useEffect(() => {
    const getJobHot = async () => {
      const res = await axios.get(`/api/jobs/jobhot?limit=${page * 3}&isHot[regex]=true`);
      setJobHot(res.data.jobhot);
      // setResult(res.data.result);;
      // console.log(res);
    };
    getJobHot();
  }, [page]);

  return {
    jobs: [jobs, setJobs],
    jobhot: [jobhot, setJobHot],
    category: [category, setCategory],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    location: [location, setLocation],
    loading: [loading, setLoading],
    callback: [callback, setCallBack],
    // result: [result, setResult],
  };
}

export default JobAPI;
