const project = require("./../database/project.config");

// QUESTION
const getAllQuestion = async () =>
  await project
    .select(
      "q.question_id",
      "q.question_text",
      "q.id_area",
      "q.is_deleted",
      "ar.nama_area",
      "an.answer_id",
      "an.status"
    )
    .from("questions as q")
    .join("area as ar", "ar.id_area", "q.id_area")
    .leftJoin("answer as an", "an.question_id", "q.question_id")
    .where("q.is_deleted", 0);

const getAllByAreaId = async (areaID) =>
  await project
    .select(
      "q.question_id",
      "q.question_text",
      "q.id_area",
      "q.is_deleted",
      "ar.nama_area",
      "an.answer_id",
      "an.status"
    )
    .from("questions as q")
    .join("area as ar", "ar.id_area", "q.id_area")
    .leftJoin("answer as an", "an.question_id", "q.question_id")
    .where("q.id_area", areaID);

const addNewQuestion = async (data) => await project("questions").insert(data);
const updateQuestion = async (id, data) =>
  await project("questions").where("question_id", id).update(data);

// ANSWER
const getAnswerByQuestionId = async (id) =>
  await project.select("*").from("answer").where("question_id", id);
const addAnswer = async (data) => await project("answer").insert(data);
const updateAnswer = async (id, data) =>
  await project("answer").where("answer_id", id).insert(data);

// RESULT

module.exports = {
  getAllQuestion,
  getAllByAreaId,
  addNewQuestion,
  updateQuestion,
  addAnswer,
  updateAnswer,
  getAnswerByQuestionId,
};
