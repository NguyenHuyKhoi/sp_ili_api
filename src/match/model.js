const mongoose = require('mongoose')
const { QuestionSchema } = require('../question/model')
const QUESTION_TYPES_ID = {
    MULTIPLE_CHOICE: 0,
    TF_CHOICE: 1,
    PIC_WORD: 2,
    WORD_TABLE: 3
}
const PlayerSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    userId: {type: String}, // UserId: id of user in ILI if exists
    platformId: {type: String},
    profile: {type: String},
    avatar: {type: String},  // Avatar can be avatar on ILI or avatar on platform Fb/YT (for livestream...)
    username: {type: String, required: true},
    score: {type: Number, require: true},
    rank: {type: Number},
    correctNum: {type: Number},
    incorrectNum: {type: Number},
    unanswerNum: {type: Number}
})

const AnswerPlayerSchema = new mongoose.Schema({
    _id: {type: String, require: true},
    platformId: {type: String},
    profile: {type: String},
    avatar: {type: String}, 
    username: {type: String, require: true},
    answerContent: {type: String, require: true}, 
    keywordIndex: {type: Number},
    answerTime: {type: Number, require: true},
    isCorrect: {type: Boolean, require: true},
    earnScore: {type: Number, required: true},
    isCalculated: {type: Boolean}
})

const ProgressSchema = new mongoose.Schema({
    question: {type: QuestionSchema, required: true},
    answers: {type: [AnswerPlayerSchema], required: true},
    open_word_states: {type: [Number], required: true},
    startAt: {type: Date},
    correctNum: {type: Number},
    incorrectNum: {type: Number},
    unanswerNum: {type: Number},
    answerTimeAvg: {type: Number}
})

const LivestreamSchema = new mongoose.Schema({
    livestreamId: {type: String},
    liveChatId: {type: String},
    livestreamUrl: {type: String},
    accessToken: {type: String},
    platform: { type: String},
    type: {type: String}, // With platform is FB -> type = profile/group/page
    streamId: {type: String},
    streamUrl: {type: String},
    title: {type: String},
    description: {type: String}
})

// STATE = waiting - locking - playing - finished
const MatchSchema = new mongoose.Schema({
    game: {type: Object, require: true},
    state: {type: String},
    questionIndex: {type: Number},
    livestream: {type: LivestreamSchema},
    mode: {type: String},
    pinCode: {type: String,  require: true},
    host: { type: Object , require: true},
    players: {type: [PlayerSchema], required: true},
    progress: {type: [ProgressSchema]},
    startAt: {type: Date, required: true },
    finishAt: {type: Date},
    delayStartTime: {type: Number},
    showQuestionEndTime: {type: Number},
    showLeaderboardTime: {type: Number},
    delayEndTime: {type: Number},
})

const Match =  mongoose.model('Match', MatchSchema)
module.exports = {
    Match,
    QUESTION_TYPES_ID
}