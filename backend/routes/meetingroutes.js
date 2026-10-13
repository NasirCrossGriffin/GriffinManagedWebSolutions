const express = require('express');

const router = express.Router();

const Meeting = require('../models/meeting');

// ADMIN KEY MIDDLEWARE
router.use((req, res, next) => {

    const adminKey =
        req.body?.admin_key ||
        req.query?.admin_key;

    console.log(adminKey);

    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {

        return res.status(401).json({
            message: 'Unauthorized.'
        });

    }

    next();

});


// CREATE MEETING
router.post('/', async (req, res) => {

    try {

        const meeting = new Meeting({
            type: req.body.type,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            company: req.body.company,
            contact: req.body.contact,
            setter: req.body.setter,
            closer: req.body.closer
        });

        const savedMeeting = await meeting.save();

        const populatedMeeting = await savedMeeting.populate([
            {
                path: 'setter',
                select: '-password'
            },
            {
                path: 'closer',
                select: '-password'
            }
        ]);

        res.status(201).json(populatedMeeting);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to create meeting.',
            error: error.message
        });

    }

});


// GET ALL MEETINGS
router.get('/', async (req, res) => {

    try {

        const meetings = await Meeting
            .find()
            .populate('setter', '-password')
            .populate('closer', '-password')
            .sort({ createdAt: -1 });

        res.status(200).json(meetings);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to retrieve meetings.',
            error: error.message
        });

    }

});


// GET MEETINGS BY SETTER
router.get('/setter/:teamMemberId', async (req, res) => {

    try {

        const meetings = await Meeting
            .find({
                setter: req.params.teamMemberId
            })
            .populate('setter', '-password')
            .populate('closer', '-password')
            .sort({ createdAt: -1 });

        res.status(200).json(meetings);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to retrieve meetings by setter.',
            error: error.message
        });

    }

});


// GET MEETINGS BY CLOSER
router.get('/closer/:teamMemberId', async (req, res) => {

    try {

        const meetings = await Meeting
            .find({
                closer: req.params.teamMemberId
            })
            .populate('setter', '-password')
            .populate('closer', '-password')
            .sort({ createdAt: -1 });

        res.status(200).json(meetings);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to retrieve meetings by closer.',
            error: error.message
        });

    }

});


// GET MEETING BY ID
router.get('/:id', async (req, res) => {

    try {

        const meeting = await Meeting
            .findById(req.params.id)
            .populate('setter', '-password')
            .populate('closer', '-password');

        if (!meeting) {

            return res.status(404).json({
                message: 'Meeting not found.'
            });

        }

        res.status(200).json(meeting);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to retrieve meeting.',
            error: error.message
        });

    }

});


// UPDATE MEETING
router.patch('/:id', async (req, res) => {

    try {

        const updatedMeeting = await Meeting
            .findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body
                },
                {
                    new: true,
                    runValidators: true
                }
            )
            .populate('setter', '-password')
            .populate('closer', '-password');

        if (!updatedMeeting) {

            return res.status(404).json({
                message: 'Meeting not found.'
            });

        }

        res.status(200).json(updatedMeeting);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to update meeting.',
            error: error.message
        });

    }

});


// DELETE MEETING
router.delete('/:id', async (req, res) => {

    try {

        const deletedMeeting = await Meeting.findByIdAndDelete(
            req.params.id
        );

        if (!deletedMeeting) {

            return res.status(404).json({
                message: 'Meeting not found.'
            });

        }

        res.status(200).json({
            message: 'Meeting deleted successfully.'
        });

    } catch (error) {

        res.status(500).json({
            message: 'Failed to delete meeting.',
            error: error.message
        });

    }

});


module.exports = router;