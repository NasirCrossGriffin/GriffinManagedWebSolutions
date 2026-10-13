const express = require('express');

const router = express.Router();

const Role = require('../models/Role');

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


// CREATE ROLE
router.post('/', async (req, res) => {

    try {

        const role = new Role({

            title: req.body.title,

            description: req.body.description,

            department: req.body.department,

            teamMember: req.body.teamMember

        });

        const savedRole = await role.save();

        const populatedRole = await savedRole.populate(
            'teamMember',
            '-password'
        );

        res.status(201).json(populatedRole);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to create role.',
            error: error.message
        });

    }

});


// GET ALL ROLES
router.get('/', async (req, res) => {

    try {

        const roles = await Role
            .find()
            .populate('teamMember', '-password');

        res.status(200).json(roles);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to retrieve roles.',
            error: error.message
        });

    }

});

// GET ROLES BY TEAM MEMBER
router.get('/team/:teamMemberId', async (req, res) => {

    try {

        const roles = await Role
            .find({
                teamMember: req.params.teamMemberId
            })
            .populate('teamMember', '-password');

        res.status(200).json(roles);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to retrieve team member roles.',
            error: error.message
        });

    }

});

// GET ROLE BY ID
router.get('/:id', async (req, res) => {

    try {

        const role = await Role
            .findById(req.params.id)
            .populate('teamMember', '-password');

        if (!role) {

            return res.status(404).json({
                message: 'Role not found.'
            });

        }

        res.status(200).json(role);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to retrieve role.',
            error: error.message
        });

    }

});


// UPDATE ROLE
router.patch('/:id', async (req, res) => {

    try {

        const updatedRole = await Role
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

        if (!updatedRole) {

            return res.status(404).json({
                message: 'Role not found.'
            });

        }

        res.status(200).json(updatedRole);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to update role.',
            error: error.message
        });

    }

});


// DELETE ROLE
router.delete('/:id', async (req, res) => {

    try {

        const deletedRole = await Role.findByIdAndDelete(
            req.params.id
        );

        if (!deletedRole) {

            return res.status(404).json({
                message: 'Role not found.'
            });

        }

        res.status(200).json({
            message: 'Role deleted successfully.'
        });

    } catch (error) {

        res.status(500).json({
            message: 'Failed to delete role.',
            error: error.message
        });

    }

});


module.exports = router;