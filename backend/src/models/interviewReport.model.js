const mongoose=require("mongoose")


const technicalQuestionSchema=new mongoose.Schema({

  question:{
    type:String
  },
  intention:{
   type:String
  },
  answer:{
    type:String
  }

},{id:false})

const behavioralQuestionSchema=new mongoose.Schema({

  question:{
    type:String
  },
  intention:{
    type:String
  },
  answer:{
    type:String
  }

},{id:false})

const skillGapsSchema=new mongoose.Schema({
  skill:String,
  severity:{
    type:String,
    enum:["low","medium","high"]
  }
},{_id:false})

const preperationPlanSchema=new mongoose.Schema({

  day:Number,
  focus:String,
  tasks:[{
    type:String
  }]

},{
  id:false
})

const interviewReportSchema=new mongoose.Schema({

  jobDescription:{
    type:String,
    required:[true,"jobDescription is required"] 
  },

  resume:{
    type:String
  },

  selfDescription:{
    type:String
  },

  matchScore:{
    type:Number,
    min:0,
    max:100
  },

  technicalQuestions:[technicalQuestionSchema],

  behavioralQuestions:[behavioralQuestionSchema],

  skillGaps:[skillGapsSchema],

  preparationPlan:[preperationPlanSchema],

  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users-interview"
  },
  title:{
    type:String
  }

   
  
},{timestamps:true})

const interviewReportModel=mongoose.model("interviewReportModel",interviewReportSchema)

module.exports=interviewReportModel