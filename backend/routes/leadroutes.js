const express = require('express');

const router = express.Router();

const Lead = require('../models/Lead');


// ADMIN KEY MIDDLEWARE
router.use((req, res, next) => {

    const adminKey =
        req.body?.admin_key ||
        req.query?.admin_key;

    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {

        return res.status(401).json({
            message: 'Unauthorized.'
        });

    }

    next();

});


// CREATE LEAD
router.post('/', async (req, res) => {

    try {

        const lead = new Lead({

            type: req.body.type,

            firstName: req.body.firstName,

            lastName: req.body.lastName,

            company: req.body.company,

            contact: req.body.contact,

            teamMember: req.body.teamMember,

            result: req.body.result,

            followUp: req.body.followUp,

            inboundOrOutbound: req.body.inboundOrOutbound,

            description: req.body.description,

            followUpDate: req.body.followUpDate,

            viewed: req.body.viewed ?? false

        });

        const savedLead = await lead.save();

        res.status(201).json(savedLead);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to create lead.',
            error: error.message
        });

    }

});


// GET ALL LEADS
router.get('/', async (req, res) => {

    try {

        const leads = await Lead
            .find()
            .sort({ createdAt: -1 });

        res.status(200).json(leads);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to retrieve leads.',
            error: error.message
        });

    }

});


// GET LEADS BY TEAM MEMBER
router.get('/team-member/:teamMemberId', async (req, res) => {

    try {

        const leads = await Lead
            .find({
                teamMember: req.params.teamMemberId
            })
            .sort({ createdAt: -1 });

        res.status(200).json(leads);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to retrieve team member leads.',
            error: error.message
        });

    }

});


// GET LEADS THAT REQUIRE FOLLOW-UP
router.get('/follow-up/all', async (req, res) => {

    try {

        const leads = await Lead
            .find({
                followUp: true
            })
            .sort({ followUpDate: 1 });

        res.status(200).json(leads);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to retrieve follow-up leads.',
            error: error.message
        });

    }

});


// GET FOLLOW-UP LEADS BY TEAM MEMBER
router.get('/follow-up/team-member/:teamMemberId', async (req, res) => {

    try {

        const leads = await Lead
            .find({
                teamMember: req.params.teamMemberId,
                followUp: true
            })
            .sort({ followUpDate: 1 });

        res.status(200).json(leads);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to retrieve team member follow-up leads.',
            error: error.message
        });

    }

});


// GET UNVIEWED LEADS
router.get('/unviewed/all', async (req, res) => {

    try {

        const leads = await Lead
            .find({
                viewed: false
            })
            .sort({ createdAt: -1 });

        res.status(200).json(leads);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to retrieve unviewed leads.',
            error: error.message
        });

    }

});

// GET LEADS BY FILTERS
router.get('/filter', async (req, res) => {

    try {

        const filter = {};

        if (req.query.followUpDate) {

            const date = req.query.followUpDate;

            const startOfDay = new Date(`${date}T00:00:00.000Z`);

            const endOfDay = new Date(`${date}T00:00:00.000Z`);
            endOfDay.setUTCDate(endOfDay.getUTCDate() + 1);

            if (
                isNaN(startOfDay.getTime()) ||
                isNaN(endOfDay.getTime())
            ) {

                return res.status(400).json({
                    message: 'Invalid follow-up date.'
                });

            }

            filter.followUpDate = {
                $gte: startOfDay,
                $lt: endOfDay
            };

        }

        if (req.query.type) {
            filter.type = req.query.type;
        }

        if (req.query.result) {
            filter.result = req.query.result;
        }

        if (req.query.viewed !== undefined) {
            filter.viewed = req.query.viewed === 'true';
        }


        const leads = await Lead
            .find(filter)
            .sort({ followUpDate: 1, createdAt: -1 });

        res.status(200).json(leads);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to retrieve filtered leads.',
            error: error.message
        });

    }

});

// GET LEAD BY ID
router.get('/:id', async (req, res) => {

    try {

        const lead = await Lead.findById(req.params.id);

        if (!lead) {

            return res.status(404).json({
                message: 'Lead not found.'
            });

        }

        res.status(200).json(lead);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to retrieve lead.',
            error: error.message
        });

    }

});


// UPDATE LEAD
router.patch('/:id', async (req, res) => {

    try {

        const updateData = {

            type: req.body.type,

            firstName: req.body.firstName,

            lastName: req.body.lastName,

            company: req.body.company,

            contact: req.body.contact,

            teamMember: req.body.teamMember,

            result: req.body.result,

            followUp: req.body.followUp,

            inboundOrOutbound: req.body.inboundOrOutbound,

            description: req.body.description,

            followUpDate: req.body.followUpDate,

            viewed: req.body.viewed

        };

        const updatedLead = await Lead
            .findByIdAndUpdate(
                req.params.id,
                {
                    $set: updateData
                },
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!updatedLead) {

            return res.status(404).json({
                message: 'Lead not found.'
            });

        }

        res.status(200).json(updatedLead);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to update lead.',
            error: error.message
        });

    }

});


// MARK LEAD AS VIEWED
router.patch('/:id/viewed', async (req, res) => {

    try {

        const updatedLead = await Lead
            .findByIdAndUpdate(
                req.params.id,
                {
                    $set: {
                        viewed: true
                    }
                },
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!updatedLead) {

            return res.status(404).json({
                message: 'Lead not found.'
            });

        }

        res.status(200).json(updatedLead);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to mark lead as viewed.',
            error: error.message
        });

    }

});


// DELETE LEAD
router.delete('/:id', async (req, res) => {

    try {

        const deletedLead = await Lead.findByIdAndDelete(
            req.params.id
        );

        if (!deletedLead) {

            return res.status(404).json({
                message: 'Lead not found.'
            });

        }

        res.status(200).json({
            message: 'Lead deleted successfully.'
        });

    } catch (error) {

        res.status(500).json({
            message: 'Failed to delete lead.',
            error: error.message
        });

    }

});


module.exports = router;