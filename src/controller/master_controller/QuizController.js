const model = require("../../model/quiz.model");
const api = require("../../tools/common");

// Question
const getAllQuestions = async (req, res) => {
  try {
    let data = await model.getAllQuestion();
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error");
  }
};
const getAllQuestionByAreaID = async (req, res) => {
  const { areaID } = req.params;
  try {
    let data = await model.getAllByAreaId(areaID);
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error");
  }
};
const addQuestion = async (req, res) => {
  const newQuestion = req.body;
  try {
    let data = await model.addNewQuestion(newQuestion);
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error");
  }
};
const updateQuestion = async (req, res) => {
  const { questionID } = req.params;
  const newQuestion = req.body;
  try {
    let data = await model.updateQuestion(questionID, newQuestion);
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error");
  }
};

// ANSWER
const getAnswerByQuestion = async (req, res) => {
  const { questionID } = req.params;
  try {
    let data = await model.getAnswerByQuestionId(questionID);
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error");
  }
};
const addAnswer = async (req, res) => {
  const newAnswer = req.body;
  try {
    let data = await model.addAnswer(newAnswer);
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error");
  }
};
const updateAnswer = async (req, res) => {
  const { answerID } = req.params;
  const newAnswer = req.body;
  try {
    let data = await model.updateAnswer(answerID, newAnswer);
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error");
  }
};

module.exports = {
  getAllQuestions,
  getAllQuestionByAreaID,
  addQuestion,
  updateQuestion,
  updateAnswer,
  getAnswerByQuestion,
  addAnswer,
};
