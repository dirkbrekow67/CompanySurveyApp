const dataModel = require('../models/dataModel');
const adminModel = require('../models/adminModel');
const fs = require('fs');
const path = require('path');

exports.renderDashboard = async (req, res) => {
    const dataCount = (await dataModel.getAllData()).length;
    const userCount = (await adminModel.getAllAdmins()).length;
    const failedLogins = fs.readFileSync(path.join(__dirname, '../logs/loginErrors.log'), 'utf8').split('\n').length - 1;

    res.render('dashboard', {
        dataCount,
        userCount,
        failedLogins,
    });
};