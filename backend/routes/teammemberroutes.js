const express = require('express');

const router = express.Router();

const TeamMember = require('../models/TeamMember');

const bcrypt = require('bcrypt');

const saltRounds = 10;


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


// CREATE TEAM MEMBER
router.post('/', async (req, res) => {

    try {

        const password = req.body.password;

        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        const teamMember = new TeamMember({

            firstName: req.body.firstName,

            lastName: req.body.lastName,

            username: req.body.username,

            password: hash,

            level: req.body.level,

            status: req.body.status,

            email: req.body.email,

            profilePic: req.body.profilePic,

            admin: req.body.admin

        });

        const savedTeamMember = await teamMember.save();

        const response = savedTeamMember.toObject();
        delete response.password;

        res.status(201).json(response);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to create team member.',
            error: error.message
        });

    }

});


// GET ALL TEAM MEMBERS
router.get('/', async (req, res) => {

    try {

        const teamMembers = await TeamMember
            .find()
            .select('-password');

        res.status(200).json(teamMembers);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to retrieve team members.',
            error: error.message
        });

    }

});


// GET TEAM MEMBER BY ID
router.get('/:id', async (req, res) => {

    try {

        const teamMember = await TeamMember
            .findById(req.params.id)
            .select('-password');

        if (!teamMember) {

            return res.status(404).json({
                message: 'Team member not found.'
            });

        }

        res.status(200).json({
                id: teamMember._id,
                firstName: teamMember.firstName,
                lastName: teamMember.lastName,
                username: teamMember.username,
                level: teamMember.level,
                status: teamMember.status,
                email: teamMember.email,
                profilePic: teamMember.profilePic,
                admin: teamMember.admin
            });

    } catch (error) {

        res.status(500).json({
            message: 'Failed to retrieve team member.',
            error: error.message
        });

    }

});


// UPDATE TEAM MEMBER
router.put('/:id', async (req, res) => {

    try {

        const updateData = {

            firstName: req.body.firstName,

            lastName: req.body.lastName,

            username: req.body.username,

            level: req.body.level,

            status: req.body.status,

            email: req.body.email,

            admin: req.body.admin,

            profilePic: req.body.profilePic

        };


        // Only update password if one was supplied.
        // Never save a plaintext password.
        if (req.body.password) {

            const salt = bcrypt.genSaltSync(saltRounds);

            updateData.password = bcrypt.hashSync(
                req.body.password,
                salt
            );

        }


        const updatedTeamMember = await TeamMember
            .findByIdAndUpdate(
                req.params.id,
                updateData,
                {
                    new: true,
                    runValidators: true
                }
            )
            .select('-password');


        if (!updatedTeamMember) {

            return res.status(404).json({
                message: 'Team member not found.'
            });

        }


        res.status(200).json(updatedTeamMember);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to update team member.',
            error: error.message
        });

    }

});


// DELETE TEAM MEMBER
router.delete('/:id', async (req, res) => {

    try {

        const deletedTeamMember =
            await TeamMember.findByIdAndDelete(req.params.id);

        if (!deletedTeamMember) {

            return res.status(404).json({
                message: 'Team member not found.'
            });

        }

        res.status(200).json({
            message: 'Team member deleted successfully.'
        });

    } catch (error) {

        res.status(500).json({
            message: 'Failed to delete team member.',
            error: error.message
        });

    }

});


// AUTHENTICATE TEAM MEMBER
router.post('/authenticate', async (req, res) => {

    try {

        const username = req.body.username;
        const password = req.body.password;

        const teamMember = await TeamMember.findOne({
            username: username
        });


        if (!teamMember) {

            return res.status(400).send(
                'Username or password incorrect'
            );

        }


        const authenticated = await bcrypt.compare(
            password,
            teamMember.password
        );


        if (!authenticated) {

            return res.status(400).send(
                'Username or password incorrect'
            );

        }

        req.session.teamMember = teamMember._id;
        return res.status(200).json({
            message: 'Authenticated successfully.',
            teamMember: {
                id: teamMember._id,
                firstName: teamMember.firstName,
                lastName: teamMember.lastName,
                username: teamMember.username,
                level: teamMember.level,
                status: teamMember.status,
                email: teamMember.email,
                profilePic: teamMember.profilePic,
                admin: teamMember.admin
            }
        });

    } catch (error) {

        res.status(500).json({
            message: 'Authentication failed.',
            error: error.message
        });

    }

});

// SEARCH TEAM MEMBERS
router.get('/search/team-members', async (req, res) => {

    try {

        const search = req.query.search?.trim();

        if (!search) {

            return res.status(400).json({
                message: 'Search string is required.'
            });

        }


        const searchParts = search.split(/\s+/);

        let query;


        // If searching multiple words, attempt to match
        // first name + last name
        if (searchParts.length > 1) {

            const firstName = searchParts[0];

            const lastName = searchParts
                .slice(1)
                .join(' ');

            query = {
                $or: [

                    {
                        firstName: {
                            $regex: firstName,
                            $options: 'i'
                        },

                        lastName: {
                            $regex: lastName,
                            $options: 'i'
                        }
                    },

                    {
                        firstName: {
                            $regex: search,
                            $options: 'i'
                        }
                    },

                    {
                        lastName: {
                            $regex: search,
                            $options: 'i'
                        }
                    }

                ]
            };

        } else {

            // Single search term can match either name
            query = {
                $or: [

                    {
                        firstName: {
                            $regex: search,
                            $options: 'i'
                        }
                    },

                    {
                        lastName: {
                            $regex: search,
                            $options: 'i'
                        }
                    }

                ]
            };

        }


        const teamMembers = await TeamMember
            .find(query)
            .select('-password');


        res.status(200).json(teamMembers);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to search team members.',
            error: error.message
        });

    }

});

//Check Session

router.post('/checkSession', (req, res) => {
    if (req.session.teamMember) {
        res.status(200).json({ loggedIn: true, teamMember: req.session.teamMember });
    } else {
        res.status(401).json({ loggedIn: false, message: 'Session not found' });
    }
});


module.exports = router;