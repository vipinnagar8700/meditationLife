const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');
const UserAnswer = require('../models/UserAnswer');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Enquiry
 *   description: Meditation app user questions, answers, and results APIs
 */

/**
 * @swagger
 * /enquiry/create:
 *   post:
 *     summary: Admin - Create a new question
 *     tags: [Enquiry]
 *     security:
 *       - bearerAuth: []
 *     description: Only admin can create a question with multiple options.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - options
 *             properties:
 *               question:
 *                 type: string
 *                 example: How often do you meditate per week?
 *               options:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *                       example: 3-5 times
 *                     isCorrect:
 *                       type: boolean
 *                       example: true
 *     responses:
 *       200:
 *         description: Question created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post('/create', verifyToken, isAdmin, async (req, res) => {
    try {
        const { question, options } = req.body;
        if (!question || !options || options.length < 2) {
            return res.status(400).json({ message: 'Question and at least 2 options required' });
        }
        const enquiry = new Enquiry({ question, options, createdBy: req.user.id });
        await enquiry.save();
        res.json({ message: 'Question created', enquiry });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /enquiry/all:
 *   get:
 *     summary: Get all questions
 *     tags: [Enquiry]
 *     security:
 *       - bearerAuth: []
 *     description: Fetch list of all questions available for user participation.
 *     responses:
 *       200:
 *         description: List of questions
 *       500:
 *         description: Server error
 */
router.get('/all', verifyToken, async (req, res) => {
    try {
        const list = await Enquiry.find().select('question options');
        res.json(list);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /enquiry/answer:
 *   post:
 *     summary: User - Submit answer for a question
 *     tags: [Enquiry]
 *     security:
 *       - bearerAuth: []
 *     description: Allows a logged-in user to submit an answer for an enquiry question.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - enquiryId
 *               - selectedOption
 *             properties:
 *               enquiryId:
 *                 type: string
 *                 example: 6739af2ebc2a19e12c1a0123
 *               selectedOption:
 *                 type: string
 *                 example: 3-5 times
 *     responses:
 *       200:
 *         description: Answer saved successfully
 *       400:
 *         description: Invalid option
 *       404:
 *         description: Question not found
 */
router.post('/answer', verifyToken, async (req, res) => {
    try {
        const { enquiryId, selectedOption } = req.body;
        const enquiry = await Enquiry.findById(enquiryId);
        if (!enquiry) return res.status(404).json({ message: 'Question not found' });

        const option = enquiry.options.find(o => o.text === selectedOption);
        if (!option) return res.status(400).json({ message: 'Invalid option' });

        const isCorrect = option.isCorrect || false;

        const answer = new UserAnswer({
            user: req.user.id,
            enquiry: enquiry._id,
            selectedOption,
            isCorrect
        });

        await answer.save();
        res.json({ message: 'Answer saved', answer });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /enquiry/result:
 *   get:
 *     summary: Get user results
 *     tags: [Enquiry]
 *     security:
 *       - bearerAuth: []
 *     description: Fetches the logged-in user's answered questions and calculates result percentage.
 *     responses:
 *       200:
 *         description: User result fetched successfully
 *       500:
 *         description: Server error
 */
router.get('/result', verifyToken, async (req, res) => {
    try {
        const answers = await UserAnswer.find({ user: req.user.id }).populate('enquiry', 'question options');
        const total = answers.length;
        const correct = answers.filter(a => a.isCorrect).length;
        res.json({
            totalQuestions: total,
            correctAnswers: correct,
            scorePercent: total ? ((correct / total) * 100).toFixed(2) : 0,
            answers
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /enquiry/answers/all:
 *   get:
 *     summary: Admin - Get all user answers
 *     tags: [Enquiry]
 *     security:
 *       - bearerAuth: []
 *     description: Only admin can view all user answers with question and user details.
 *     responses:
 *       200:
 *         description: All user answers fetched successfully
 *       403:
 *         description: Unauthorized (Not admin)
 */
router.get('/answers/all', verifyToken, isAdmin, async (req, res) => {
    try {
        const allAnswers = await UserAnswer.find()
            .populate('user', 'name email')
            .populate('enquiry', 'question');
        res.json(allAnswers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
