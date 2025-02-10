import xlsx from 'xlsx'
import express from 'express'
import { PrismaClient } from '@prisma/client'
import { UserModel } from './model/users.js'
import { config } from 'dotenv'
import ExcelJS from 'exceljs'
import { PrismaStream } from './prismastream/index.js'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

config()
const app = express()
const prisma = new PrismaClient()


app.get('/', (req, res) => {
    res.sendFile(dirname(fileURLToPath(import.meta.url)) + '/index.html')
})


/**
 * GET /excel-js-stream
 * 
 * This endpoint exports user data to an Excel (.xlsx) file using a low RAM, non-blocking implementation.
 * 
 * - Sets the appropriate headers to indicate that the response is an Excel file.
 * - Uses ExcelJS stream writer to write the data to the response stream.
 * - Data is streamed from MongoDB using a Mongoose cursor, which allows for efficient handling of large datasets.
 * - Header row is added to the worksheet for column names: ID, FirstName, LastName, Email, Place, Age.
 * - Each row of user data is written and committed to the worksheet in real-time to keep memory usage low.
 * - Handles errors by logging them and responding with a 500 status code.
 * - Commits the workbook and ends the response when all data has been processed.
 * 
 * This approach ensures that memory usage remains low and prevents blocking operations, making it suitable for exporting large volumes of data.
 * 
 **  ******** TIME REQUIRED TO EXPORT 2 MILLION RECORDS - 1:46 MINUTES ********
 * 
 */
app.get('/export/excel-js-stream', async (req, res) => {
    console.time('excel-js-stream');

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="excel-js-stream.xlsx"');

    const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({ stream: res });
    const worksheet = workbook.addWorksheet('Sheet1');

    worksheet.addRow(['ID', 'FirstName', 'LastName', 'Email', 'Place', 'Age']).commit(); // Add header row

    const cursor = UserModel.find({}, {}, {}).cursor();

    cursor.on('data', (doc) => {
        worksheet.addRow([doc.id.toString(), doc.firstName, doc.lastName, doc.email, doc.place, doc.age]).commit(); // Write each row and commit immediately
    });

    cursor.on('error', (err) => {
        console.error(err);
        res.status(500).json({ error: err.message });
    });

    cursor.on('end', async () => {
        await workbook.commit(); // Ensure workbook is committed and stream is closed
        console.timeEnd('excel-js-stream');
    });
});

/**
 * GET /prisma-stream
 * 
 * This endpoint exports user data to an Excel (.xlsx) file using Prisma with a custom stream utility for efficient, low RAM, non-blocking data processing.
 * 
 * - Sets the appropriate headers to indicate that the response is an Excel file.
 * - Uses ExcelJS stream writer to write the data to the response stream.
 * - Data is streamed from the Prisma ORM using a custom PrismaStream utility, which allows for efficient handling of large datasets.
 * - Adds a header row to the worksheet with column names: ID, FirstName, LastName, Email, Place, Age.
 * - Each row of user data is written and committed to the worksheet in real-time to maintain low memory usage.
 * - Handles errors by logging them and responding with a 500 status code.
 * - Commits the workbook and ends the response when all data has been processed.
 * 
 * This approach ensures low memory usage and prevents blocking operations, making it suitable for exporting large volumes of data.
 * 
 **  ******** TIME REQUIRED TO EXPORT 2 MILLION RECORDS - 2:00 MINUTES ********
 */
app.get('/export/prisma-stream', async (req, res) => {
    console.time('prisma-stream');

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="prisma-stream.xlsx"');

    const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({ stream: res });
    const worksheet = workbook.addWorksheet('Sheet1');

    worksheet.addRow(['ID', 'FirstName', 'LastName', 'Email', 'Place', 'Age']).commit(); // Add header row

    const prismaStream = new PrismaStream(prisma.users, 100000)

    prismaStream.on('data', (cmt) => {

        worksheet.addRow([cmt.id.toString(), cmt.firstName, cmt.lastName, cmt.email, cmt.place, cmt.age]).commit(); // Write each row and commit immediately
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

/**
 * * ************************  OTHER APIS WITH OTHER LIBRARIES OR METHODS *****************************
 */


/**
 *  This API use sheetJs to export it is blocking at some point and high memory consuming 
 */
app.get('/xlsx-export', async (req, res) => {

    console.time('xlsx-report')

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.aoa_to_sheet([['ID', 'FirstName', 'LastName', 'Email', 'Place', 'Age']]); // Define your column headers

    const cursor = UserModel.find({}, {}, {}).cursor()

    cursor.on('data', (doc) => {
        const row = [doc.id.toString(), doc.firstName, doc.lastName, doc.email, doc.place, doc.age]
        xlsx.utils.sheet_add_aoa(ws, [row], { origin: -1 })
    })

    cursor.on('error', (err) => {
        log(err)
        res.status(500).json({ error: err.message })
    })

    cursor.on('end', () => {

        // ------------------- Blocking suspected Section -------------------//
        xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
        const wbout = xlsx.write(wb, { bookType: 'xlsx', type: 'buffer' });
        // ------------------- Blocking suspected Section -------------------//

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename="data.xlsx"');
        res.end(wbout);
        console.timeEnd('xlsx-report')

    })

})

/**
 * using sheet js stream as csv missing xlsx format also blocking and high memory usage
 */
app.get('/xlsx-csv-stream', async (req, res) => {

    console.time('xlsx-csv-stream')
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.aoa_to_sheet([['ID', 'FirstName', 'LastName', 'Email', 'Place', 'Age']]); // Define your column headers

    const cursor = UserModel.find({}, {}, {}).cursor()

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="xlsx-csv-stream.csv"');

    cursor.on('data', (doc) => {
        const row = [doc.id.toString(), doc.firstName, doc.lastName, doc.email, doc.place, doc.age]
        xlsx.utils.sheet_add_aoa(ws, [row], { origin: -1 })
    })

    cursor.on('error', (err) => {
        console.log(err)
        res.status(500).json({ error: err.message })
    })

    cursor.on('end', () => {

        xlsx.stream.to_csv(ws).pipe(res)
        console.timeEnd('xlsx-csv-stream')

    })


})

/**
 * just writing as csv without any packages seems to efficient couldn't find any issues
 * non-blocking and low memory
 */
app.get('/csv-write', async (req, res) => {

    console.time('csv-write')

    const cursor = UserModel.find().cursor()

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="csv-steam.csv"');
    res.write("ID,FirstName,LastName,Email,Place,Age\n")

    cursor.on('data', (doc) => {
        res.write(`${doc.id.toString()},${doc.firstName},${doc.lastName},${doc.email},${doc.place},${doc.age}\n`)
    })

    cursor.on('error', (err) => {
        log(err)
        res.status(500).json({ error: err.message })
    })

    cursor.on('end', () => {
        res.end()
        console.timeEnd('csv-write')
    })

})

const PORT = 8051

app.listen(PORT, () => console.log('on ' + PORT))

