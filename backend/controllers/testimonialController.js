const Testimonial = require("../models/testimonialModel");

const createTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    return res.status(201).json(testimonial);
  } catch (error) {
    return next(error);
  }
};

const listTestimonials = async (req, res, next) => {
  try {
    const { includeDrafts, featured } = req.query;
    const query = includeDrafts === "true" ? {} : { status: "published" };
    if (featured === "true") {
      query.featured = true;
    }
    const testimonials = await Testimonial.find(query)
      .sort({ createdAt: -1 })
      .lean();
    return res.status(200).json(testimonials);
  } catch (error) {
    return next(error);
  }
};

const getTestimonialById = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id).lean();
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    return res.status(200).json(testimonial);
  } catch (error) {
    return next(error);
  }
};

const updateTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    Object.assign(testimonial, req.body);
    await testimonial.save();
    return res.status(200).json(testimonial);
  } catch (error) {
    return next(error);
  }
};

const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    return res.status(200).json({ message: "Testimonial deleted" });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createTestimonial,
  listTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
};
