const project = require("./../database/project.config");

// QUESTION
const getAllQuestion = async () =>
  await project
    .select(
      "q.question_id",
      "q.question_text",
      "q.id_area",
      "q.is_deleted",
      "ar.nama_area"
    )
    .from("questions as q")
    .join("area as ar", "ar.id_area", "q.id_area")
    .where("q.is_deleted", 0);

const getQuestionById = async (id) => {
  const question = await project
    .select(
      "q.question_id",
      "q.question_text",
      "q.id_area",
      "q.is_deleted",
      "ar.nama_area",
      "an.answer_id",
      "an.answer_text",
      "an.status"
    )
    .from("questions as q")
    .join("area as ar", "ar.id_area", "q.id_area")
    .leftJoin("answer as an", "an.question_id", "q.question_id")
    .where("q.question_id", id)
    .andWhere("q.is_deleted", 0);

  // Mengelompokkan jawaban ke dalam objek pertanyaan
  const questionWithAnswer = question.reduce((acc, curr) => {
    if (!acc) {
      acc = {
        ...curr,
        answer: [],
      };
    }
    acc.answer.push({
      answer_id: curr.answer_id,
      answer_text: curr.answer_text,
      status: curr.status,
    });
    return acc;
  }, null);

  return questionWithAnswer;
};

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
  getQuestionById,
};
