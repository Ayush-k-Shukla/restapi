import fs from 'fs';
import fastCsv from 'fast-csv';
import Contact from '../model/contact.js';

// csv file should be in format of `name, email, phone, linkedin`

export const readCSV = async (csvFilePath) => {
  const readData = fs.createReadStream(csvFilePath);
  const data = [];
  readData
    .pipe(fastCsv.parse())
    .on('data', (row) => {
      data.push({
        name: row[0],
        email: row[1],
        phone: row[2],
        linkedin: row[3],
      });
    })
    .on('end', (rowCount) => {
      console.log(`${rowCount} rows parsed!`);

      data.map(async (contact) => {
        const contacts = await Contact.create(contact);
      });
      console.log('Contacts saved in db successfull');
    })
    .on('error', (e) => console.error(e));
};
