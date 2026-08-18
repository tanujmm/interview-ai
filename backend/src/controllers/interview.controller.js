const pdfParse=require("pdf-parse");
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service");
const interviewReportModel=require("../models/interviewReport.model")
async function generateInterviewReportController(req,res){

  const resumeFile=req.file;
  const resumeContent=await (new pdfParse.PDFParse(Uint8Array.from (req.file.buffer))).getText();

  const {selfDescription,jobDescription}=req.body

  const interviewReportByAi=await generateInterviewReport({resume:resumeContent.text,selfDescription,jobDescription})
  
 
  const interviewReport=await interviewReportModel.create({
    user:req.user.id,
    resume:resumeContent.text,
    selfDescription,
    jobDescription,
    ...interviewReportByAi
  })

  return res.status(201).json({message:"Interview report generated successfully",interviewReport})

}

/**
 * 
 * @description Get an interview report related to interviewId
 * 
 */


async function getInterviewReportController(req,res){

  const {interviewId}=req.params;

  const interviewReport=await interviewReportModel.findOne({_id:interviewId,user:req.user.id})
  if(!interviewReport){
    return res.status(401).json({
      message:"No result found"
    })
  }
  return res.status(200).json({message:"Interview report fetched successfully",interviewReport})
}

/**
 * 
 * @description get all interview reports of the logged-in-user
 */

async function getAllInterviewReportsController(req,res){

  const allReports=await interviewReportModel.find({user:req.user.id}).sort({createdAt:-1}).select('-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan')

  if(!allReports){
    return res.status(401).json({
      message:"no reports found"
    })
  }

  return res.status(200).json({
    message:"All reports fetched succesffuly",
    allReports
  })
}
async function generateResumePdfController(req, res) {
    const { interviewReportId } = req.params

    const interviewReport = await interviewReportModel.findById(interviewReportId)

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    const { resume, jobDescription, selfDescription } = interviewReport

    const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
    })

    res.send(pdfBuffer)
}

module.exports={
  generateInterviewReportController,
  getInterviewReportController,
  getAllInterviewReportsController,
  generateResumePdfController
}