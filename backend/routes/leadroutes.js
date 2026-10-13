const express = require('express');

const router = express.Router();

const Lead = require('../models/lead');

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
            inboundOrOutbound: req.body.inboundOrOutbound
        });

        const savedLead = await lead.save();

        const populatedLead = await savedLead.populate(
            'teamMember',
            '-password'
        );

        res.status(201).json(populatedLead);

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
            .populate('teamMember', '-password')
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
            .populate('teamMember', '-password')
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
            .populate('teamMember', '-password')
            .sort({ createdAt: -1 });

        res.status(200).json(leads);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to retrieve follow-up leads.',
            error: error.message
        });

    }

});


// GET LEAD BY ID
router.get('/:id', async (req, res) => {

    try {

        const lead = await Lead
            .findById(req.params.id)
            .populate('teamMember', '-password');

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

        const updatedLead = await Lead
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