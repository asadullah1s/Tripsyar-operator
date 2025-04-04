const jwt = require('jsonwebtoken');
const Agency = require('../models/agency-model');

// Home endpoint
const home = async (req, res) => {
    try {
        res.status(200).json({ message: "Welcome to Agency API!" });
    } catch (error) {
        next(error);
    }
};

// Get all agencies
const getAllAgencies = async (req, res, next) => {
    try {
        const agencies = await Agency.find();
        res.status(200).json({ 
            count: agencies.length,
            agencies 
        });
    } catch (error) {
        next(error);
    }
};

// Get single agency by ID
const getAgencyById = async (req, res, next) => {
    try {
        const agency = await Agency.findById(req.params.id);
        if (!agency) {
            return res.status(404).json({ message: "Agency not found" });
        }
        res.status(200).json({ agency });
    } catch (error) {
        next(error);
    }
};

// Create new agency
const createAgency = async (req, res, next) => {
    try {
        const { 
            salutation, firstName, lastName, email, phone, jobTitle, country, city, address, 
            companyName, companyAddress, businessType, secpStatus, ptdcStatus, companyCity, 
            province, postalCode, companyCountry, companyPhone, companyPhone2, companyPhone3, 
            companyEmail, socialMediaDetails, tourDetails 
        } = req.body;

        // Check existing company/email
        const [companyExists, agencyExists] = await Promise.all([
            Agency.findOne({ companyName }),
            Agency.findOne({ email })
        ]);
        
        if (companyExists) return res.status(409).json({ 
            message: "Company already exists",
            conflictType: "company" });
        if (agencyExists) return res.status(409).json({ 
            message: "Email already registered",
            conflictType: "email"});

        // Create agency
        const agencyCreated = await Agency.create({ ...req.body });

        // Generate token using model method
        const token = agencyCreated.generateAuthToken();

        res.status(201).json({
            message: "Agency created successfully",
            agency: agencyCreated,
            token
        });
    } catch (error) {
        next(error);
    }
};

// Update agency
const updateAgency = async (req, res, next) => {
    try {
        const updatedAgency = await Agency.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!updatedAgency) {
            return res.status(404).json({ message: "Agency not found" });
        }
        
        res.status(200).json({
            message: "Agency updated successfully",
            agency: updatedAgency
        });
    } catch (error) {
        next(error);
    }
};

// Delete agency
const deleteAgency = async (req, res, next) => {
    try {
        const deletedAgency = await Agency.findByIdAndDelete(req.params.id);
        
        if (!deletedAgency) {
            return res.status(404).json({ message: "Agency not found" });
        }
        
        res.status(200).json({
            message: "Agency deleted successfully",
            agency: deletedAgency
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { 
    home,
    getAllAgencies,
    getAgencyById,
    createAgency,
    updateAgency,
    deleteAgency
};