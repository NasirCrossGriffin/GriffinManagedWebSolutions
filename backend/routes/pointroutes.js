const express = require('express');

const router = express.Router();

const Point = require('../models/Point');

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

// CREATE POINT
router.post('/', async (req, res) => {

    try {

        const point = new Point({
            teamMember: req.body.teamMember,
            description: req.body.description,
            value: req.body.value
        });

        const savedPoint = await point.save();

        const populatedPoint = await savedPoint.populate(
            'teamMember',
            '-password'
        );

        res.status(201).json(populatedPoint);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to create point.',
            error: error.message
        });

    }

});


// GET ALL POINTS
router.get('/', async (req, res) => {

    try {

        const points = await Point
            .find()
            .populate('teamMember', '-password')
            .sort({ createdAt: -1 });

        res.status(200).json(points);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to retrieve points.',
            error: error.message
        });

    }

});


// GET POINTS BY TEAM MEMBER
router.get('/team-member/:teamMemberId', async (req, res) => {

    try {

        const points = await Point
            .find({
                teamMember: req.params.teamMemberId
            })
            .populate('teamMember', '-password')
            .sort({ createdAt: -1 });

        res.status(200).json(points);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to retrieve team member points.',
            error: error.message
        });

    }

});


// GET POINT BY ID
router.get('/:id', async (req, res) => {

    try {

        const point = await Point
            .findById(req.params.id)
            .populate('teamMember', '-password');

        if (!point) {

            return res.status(404).json({
                message: 'Point not found.'
            });

        }

        res.status(200).json(point);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to retrieve point.',
            error: error.message
        });

    }

});


// UPDATE POINT
router.patch('/:id', async (req, res) => {

    try {

        const updatedPoint = await Point
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

        if (!updatedPoint) {

            return res.status(404).json({
                message: 'Point not found.'
            });

        }

        res.status(200).json(updatedPoint);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to update point.',
            error: error.message
        });

    }

});


// DELETE POINT
router.delete('/:id', async (req, res) => {

    try {

        const deletedPoint = await Point.findByIdAndDelete(
            req.params.id
        );

        if (!deletedPoint) {

            return res.status(404).json({
                message: 'Point not found.'
            });

        }

        res.status(200).json({
            message: 'Point deleted successfully.'
        });

    } catch (error) {

        res.status(500).json({
            message: 'Failed to delete point.',
            error: error.message
        });

    }

});


module.exports = router;