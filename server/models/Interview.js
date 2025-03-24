const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'job',
    // Not required anymore since we may use mockJobId
  },
  mockJobId: {
    type: String,
    // This will store "mock1", "mock2", etc.
  },
  jobTitle: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  // Make question optional during initial creation
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'question',
    // No longer required, will be added after interview starts
  },
  // Fix the enum values to include 'active'
  status: {
    type: String,
    enum: ['pending', 'active', 'in_progress', 'submitted', 'reviewed', 'completed'],
    default: 'pending'
  },
  complexity: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  code: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    enum: ['python', 'javascript', 'java', 'cpp', 'csharp', 'ruby'],
    default: 'javascript'
  },
  feedback: {
    type: String
  },
  aiFeedback: {
    type: Object,
    default: {}
  },
  improvedSolution: {
    type: String
  },
  testResults: [{
    input: String,
    expectedOutput: String,
    actualOutput: String,
    passed: Boolean
  }],
  overallScore: {
    type: Number,
    min: 0,
    max: 100
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  submittedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Add method to get job data
InterviewSchema.methods.getJobData = async function() {
  if (this.mockJobId) {
    const { mockJobs } = require('../utils/mockData');
    return mockJobs.find(job => job._id === this.mockJobId);
  }
  
  if (this.job) {
    return await mongoose.model('job').findById(this.job);
  }
  
  return null;
};

module.exports = mongoose.model('interview', InterviewSchema);
