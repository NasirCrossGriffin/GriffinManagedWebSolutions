const express = require('express');

const router = express.Router();

const { DateTime } = require('luxon');

const Punch = require('../models/Punch');

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

// CREATE PUNCH
router.post('/', async (req, res) => {

    try {

        const punch = new Punch({
            teamMember: req.body.teamMember,
            type: req.body.type
        });

        const savedPunch = await punch.save();

        const populatedPunch = await savedPunch.populate(
            'teamMember',
            '-password'
        );

        res.status(201).json(populatedPunch);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to create punch.',
            error: error.message
        });

    }

});


// GET ALL PUNCHES
router.get('/', async (req, res) => {

    try {

        const punches = await Punch
            .find()
            .populate('teamMember', '-password')
            .sort({ createdAt: -1 });

        res.status(200).json(punches);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to retrieve punches.',
            error: error.message
        });

    }

});


// GET PUNCHES BY TEAM MEMBER
router.get('/team-member/:teamMemberId', async (req, res) => {

    try {

        const punches = await Punch
            .find({
                teamMember: req.params.teamMemberId
            })
            .populate('teamMember', '-password')
            .sort({ createdAt: -1 });

        res.status(200).json(punches);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to retrieve team member punches.',
            error: error.message
        });

    }

});


// GET PUNCH BY ID
router.get('/:id', async (req, res) => {

    try {

        const punch = await Punch
            .findById(req.params.id)
            .populate('teamMember', '-password');

        if (!punch) {

            return res.status(404).json({
                message: 'Punch not found.'
            });

        }

        res.status(200).json(punch);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to retrieve punch.',
            error: error.message
        });

    }

});


// UPDATE PUNCH
router.patch('/:id', async (req, res) => {

    try {

        const updatedPunch = await Punch
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
            .populate('teamMember', '-password');

        if (!updatedPunch) {

            return res.status(404).json({
                message: 'Punch not found.'
            });

        }

        res.status(200).json(updatedPunch);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to update punch.',
            error: error.message
        });

    }

});


// DELETE PUNCH
router.delete('/:id', async (req, res) => {

    try {

        const deletedPunch = await Punch.findByIdAndDelete(
            req.params.id
        );

        if (!deletedPunch) {

            return res.status(404).json({
                message: 'Punch not found.'
            });

        }

        res.status(200).json({
            message: 'Punch deleted successfully.'
        });

    } catch (error) {

        res.status(500).json({
            message: 'Failed to delete punch.',
            error: error.message
        });

    }

});

// GET PUNCHES BY TEAM MEMBER AND DATE
router.get('/team-member/:teamMemberId/date/:date', async (req, res) => {

    try {

        const teamMemberId = req.params.teamMemberId;
        const date = req.params.date;

        const selectedDate = DateTime.fromISO(date, {
            zone: 'America/Chicago'
        });

        if (!selectedDate.isValid) {

            return res.status(400).json({
                message: 'Invalid date.'
            });

        }

        const startOfDay = selectedDate
            .startOf('day')
            .toUTC()
            .toJSDate();

        const endOfDay = selectedDate
            .plus({ days: 1 })
            .startOf('day')
            .toUTC()
            .toJSDate();

        const punches = await Punch
            .find({
                teamMember: teamMemberId,
                createdAt: {
                    $gte: startOfDay,
                    $lt: endOfDay
                }
            })
            .populate('teamMember', '-password')
            .sort({ createdAt: 1 });

        res.status(200).json(punches);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to retrieve team member punches by date.',
            error: error.message
        });

    }

});


module.exports = router;