import JobData from "../models/Job-models.js";
// import dayjs from "dayjs";

//Filter, Sorting and Paginating
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObj = { ...this.queryString }; //queryString = req.query
    //console.log({ before: queryObj }); //before delete page

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);
    //console.log({ after: queryObj }); //after delete page

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );
    // gte = greater than or equal
    // lte = lesser than or equal
    // lt = lesser than
    // gt = greater than
    this.query.find(JSON.parse(queryStr));
    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 6;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

//GET ALL JOBS
export const getJobs = async (req, res) => {
  try {
    const features = new APIfeatures(JobData.find(), req.query)
      .filtering()
      .sorting()
      .paginating();

    const jobs = await features.query;

    res.json({
      status: "success",
      result: jobs.length,
      jobs: jobs,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
/**********************************************************/
//GET ALL JOBHOT
export const getJobHot = async (req, res) => {
  try {
    const featuresjobhot = new APIfeatures(JobData.find(), req.query)
      .filtering()
      .paginating();

    const jobhot = await featuresjobhot.query;

    res.json({
      status: "success",
      result: jobhot.length,
      jobhot: jobhot,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
/**********************************************************/
//CREATE JOBS
export const createJobs = async (req, res) => {
  try {
    const {
      imgCom,
      detail,
      benefit,
      contact: { contactName, contactEmail, contactAddress, contactPhone },
      certification,
      salary: { from, to },
      requirement,
      nameCom,
      workingTime,
      position,
      location: { street, district, city },
      siteCom,
      thumbnail,
      category,
      otherInfo,
      isHot,
      numofRecruit,
      experience,
      startDay,
      endDay,
    } = req.body;
    const createdJob = new JobData({
      detail,
      benefit,
      contact: { contactName, contactEmail, contactAddress, contactPhone },
      certification,
      salary: { from, to },
      requirement,
      imgCom,
      workingTime,
      position: position.toLowerCase(),
      location: { street, district, city },
      nameCom,
      siteCom,
      thumbnail,
      category,
      otherInfo,
      isHot,
      numofRecruit,
      experience,
      // startDay: dayjs(),
      // endDay: dayjs().add("30", "day"),
      startDay,
      endDay,
    });

    await createdJob.save();
    res.json({ JobData: createdJob });
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
/**********************************************************/
//DELETE JOB
export const deleteJobs = async (req, res) => {
  try {
    await JobData.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted a Product" });
  } catch (error) {
    return res.status(500).json({ msg: err.message });
  }
};
/**********************************************************/
//UPDATE JOB
export const updateJobs = async (req, res) => {
  try {
    const {
      imgCom,
      detail,
      benefit,
      contact: { contactName, contactEmail, contactAddress, contactPhone },
      certification,
      salary: { from, to },
      requirement,
      nameCom,
      workingTime,
      position,
      location: { street, district, city },
      siteCom,
      thumbnail,
      category,
      otherInfo,
      isHot,
      numofRecruit,
      experience,
      startDay,
      endDay,
    } = req.body;

    await JobData.findOneAndUpdate(
      { _id: req.params.id },
      {
        detail,
        benefit,
        contact: { contactName, contactEmail, contactAddress, contactPhone },
        certification,
        salary: { from, to },
        requirement,
        imgCom,
        workingTime,
        position: position.toLowerCase(),
        location: { street, district, city },
        nameCom,
        siteCom,
        thumbnail,
        category,
        otherInfo,
        isHot,
        numofRecruit,
        experience,
        // startDay: dayjs(),
        // endDay: dayjs().add("30", "day"),
        startDay,
        endDay,
      }
    );

    res.json({ msg: "Updated a Job" });
  } catch (error) {
    return res.status(500).json({ msg: err.message });
  }
};
/**********************************************************/
