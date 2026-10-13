const express = require('express');

const router = express.Router();

const Shift = require('../models/shift');

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


// CREATE SHIFT
router.post('/', async (req, res) => {

    try {

        const shift = new Shift({
            teamMember: req.body.teamMember,
            startTime: req.body.startTime,
            endTime: req.body.endTime
        });

        const savedShift = await shift.save();

        const populatedShift = await savedShift.populate(
            'teamMember',
            '-password'
        );

        res.status(201).json(populatedShift);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to create shift.',
            error: error.message
        });

    }

});


// GET ALL SHIFTS
router.get('/', async (req, res) => {

    try {

        const shifts = await Shift
            .find()
            .populate('teamMember', '-password')
            .sort({ startTime: 1 });

        res.status(200).json(shifts);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to retrieve shifts.',
            error: error.message
        });

    }

});


// GET SHIFTS BY TEAM MEMBER
router.get('/team-member/:teamMemberId', async (req, res) => {

    try {

        const shifts = await Shift
            .find({
                teamMember: req.params.teamMemberId
            })
            .populate('teamMember', '-password')
            .sort({ startTime: 1 });

        res.status(200).json(shifts);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to retrieve team member shifts.',
            error: error.message
        });

    }

});


// GET SHIFTS BY DATE RANGE
router.get('/range', async (req, res) => {

    try {

        const { start, end } = req.query;

        if (!start || !end) {

            return res.status(400).json({
                message: 'start and end query parameters are required.'
            });

        }

        const shifts = await Shift
            .find({
                startTime: {
                    $gte: new Date(start),
                    $lte: new Date(end)
                }
            })
            .populate('teamMember', '-password')
            .sort({ startTime: 1 });

        res.status(200).json(shifts);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to retrieve shifts.',
            error: error.message
        });

    }

});


// GET SHIFT BY ID
router.get('/:id', async (req, res) => {

    try {

        const shift = await Shift
            .findById(req.params.id)
            .populate('teamMember', '-password');

        if (!shift) {

            return res.status(404).json({
                message: 'Shift not found.'
            });

        }

        res.status(200).json(shift);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to retrieve shift.',
            error: error.message
        });

    }

});


// UPDATE SHIFT
router.patch('/:id', async (req, res) => {

    try {

        const shift = await Shift.findById(req.params.id);

        if (!shift) {

            return res.status(404).json({
                message: 'Shift not found.'
            });

        }

        if (req.body.teamMember !== undefined) {
            shift.teamMember = req.body.teamMember;
        }

        if (req.body.startTime !== undefined) {
            shift.startTime = req.body.startTime;
        }

        if (req.body.endTime !== undefined) {
            shift.endTime = req.body.endTime;
        }

        await shift.save();

        await shift.populate(
            'teamMember',
            '-password'
        );

        res.status(200).json(shift);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to update shift.',
            error: error.message
        });

    }

});


// DELETE SHIFT
router.delete('/:id', async (req, res) => {

    try {

        const deletedShift = await Shift.findByIdAndDelete(
            req.params.id
        );

        if (!deletedShift) {

            return res.status(404).json({
                message: 'Shift not found.'
            });

        }

        res.status(200).json({
            message: 'Shift deleted successfully.'
        });

    } catch (error) {

        res.status(500).json({
            message: 'Failed to delete shift.',
            error: error.message
        });

    }

});

// GET UPCOMING SHIFTS FOR TEAM MEMBER
router.get('/upcoming/:teamMemberId', async (req, res) => {

    try {

        const teamMemberId = req.params.teamMemberId;

        const today = new Date();

        // Start of today
        today.setHours(0, 0, 0, 0);


        // 14 days from today
        const twoWeeksFromToday = new Date(today);

        twoWeeksFromToday.setDate(
            twoWeeksFromToday.getDate() + 14
        );

        // Include the entire final day
        twoWeeksFromToday.setHours(23, 59, 59, 999);


        const shifts = await Shift
            .find({
                teamMember: teamMemberId,

                startTime: {
                    $gte: today,
                    $lte: twoWeeksFromToday
                }
            })
            .populate('teamMember', '-password')
            .sort({ startTime: 1 });


        res.status(200).json(shifts);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to retrieve upcoming shifts.',
            error: error.message
        });

    }

});


module.exports = router;