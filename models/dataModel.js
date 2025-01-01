const path = require('path');
const dataPath = path.join(__dirname, '../data/data.json');
const { v4: uuidv4 } = require('uuid');

async function addData({ data, createdBy }) {
    const allData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    allData.push({ id: uuidv4(), ...data, createdBy, createdAt: new Date().toISOString() });
    fs.writeFileSync(dataPath, JSON.stringify(allData));
}

async function getDataByUser(userEmail) {
    const allData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    return allData.filter(item => item.createdBy === userEmail);
}