/**
 * this is the implementation in bun to test speed of export 
 */

import express from 'express'
import { UserModel } from './model'
import ExcelJS from 'exceljs'
import { PrismaStream } from './prismastream'
import { PrismaClient, type users } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()


app.get('/', async (req, res) => {
    res.json({ message: 'welcome to bulk export testing using bun' })
})

/**
 *  time required to execute : 3.15 minutes double than node implementation
 */
app.get('/excel-js-stream', async (req, res) => {

    console.time('excel-js-stream');
    const cursor = UserModel.find({}, {}, {}).cursor()

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="excel-js-stream.xlsx"');

    const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({ stream: res });
    const worksheet = workbook.addWorksheet('Sheet1');

    worksheet.addRow(['ID', 'FirstName', 'LastName', 'Email', 'Place', 'Age']).commit(); // Add header row

    cursor.on('error', (err) => {
        console.error(err);
        res.status(500).json({ error: err.message });
    });

    cursor.on('data', (doc) => {
        worksheet.addRow([doc.id.toString(), doc.firstName, doc.lastName, doc.email, doc.place, doc.age]).commit(); // Write each row and commit immediately
    });

    cursor.on('end', async () => {
        await workbook.commit(); // Ensure workbook is committed and stream is closed
        console.timeEnd('excel-js-stream');
    });

})

/**
 *  time required to execute : 2.9 minutes .9 minutes more than nodejs implementation
 */
app.get('/prisma-stream', async (req, res) => {
    console.time('prisma-stream');

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="prisma-stream.xlsx"');

    const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({ stream: res });
    const worksheet = workbook.addWorksheet('Sheet1');

    worksheet.addRow(['ID', 'FirstName', 'LastName', 'Email', 'Place', 'Age']).commit(); // Add header row

    const prismaStream = new PrismaStream(prisma.users, 100000)

    prismaStream.on('data', (doc: users) => {

        worksheet.addRow([doc.id.toString(), doc.firstName, doc.lastName, doc.email, doc.place, doc.age]).commit(); // Write each row and commit immediately
    })

    prismaStream.on('error', (err) => {
        console.error(err);
        res.status(500).json({ error: err.message });
    });

    prismaStream.on('end', async () => {
        await workbook.commit(); // Ensure workbook is committed and stream is closed
        console.timeEnd('prisma-stream');
    });
});

app.listen(3000, () => console.log('server running on port 3000'))