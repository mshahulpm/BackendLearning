const qs = require('querystring');

const sendHTML = function (res, html) {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html)
}

const parseReceivedData = function (req, cb) {
    let body = ''
    req.setEncoding('utf8');
    req.on('data', (chunk) => {
        body += chunk
    })
    req.on('end', () => {
        cb(qs.parse(body))
    })

}


const actionForm = function (id, path, label) {
    return `<form action="${path}" method="POST">
    <input type="hidden" name="id" value="${id}">
    <input type="submit" value="${label}">
    </form>`
}


const add = function (db, req, res) {
    parseReceivedData(req, (data) => {
        db.query(`INSERT INTO work (hours,date,description) VALUES (${parseFloat(data.hours)},"${data.date}","${data.description}");`, (err) => {
            if (err) throw err;
            show(db, res)
        })
    })

}

function deleteTask(db, req, res) {
    parseReceivedData(req, (data) => {
        db.query(`DELETE FROM work WHERE id = ${data.id}`, (err) => {
            if (err) throw err;
            show(db, res)
        })
    })
}

function archive(db, req, res) {
    parseReceivedData(req, (data) => {
        db.query(`UPDATE work SET archived = 1 WHERE id = ${data.id}`, (err) => {
            if (err) throw err;
            show(db, res)
        })
    })
}


function show(db, res, showArchived) {

    db.query(`SELECT * FROM work WHERE archived = ${showArchived ? 1 : 0}`, (err, rows) => {
        if (err) throw err;
        let html = showArchived ? '' : `<a href="/archive">Archive</a><br/>`
        html += workList(rows)
        html += workForm()
        sendHTML(res, html)
    })
}

function showArchive(db, res) {
    show(db, res, true)
}

function archiveForm(id) {
    return actionForm(id, '/archive', 'Archive')
}

function deleteForm(id) {
    return actionForm(id, '/delete', 'Delete')
}

function workList(rows) {
    let html = `
    <table>
    ${rows.map(row => (
        `<tr>
        <td>${row.date}</td>
        <td>${row.hours}</td>
        <td>${row.description}</td>
        ${row.archived ? '' : `<td>${archiveForm(row.id)}</td>`}
        <td>${deleteForm(row.id)}</td>
        </tr>
        `
    )).join()}
    </table>
    `
    return html

}

function workForm() {
    var html = '<form method="POST" action="/">' +
        '<p>Date (YYYY-MM-DD):<br/><input name="date" type="text"><p/>' +
        '<p>Hours worked:<br/><input name="hours" type="text"><p/>' +
        '<p>Description:<br/>' +
        '<textarea name="description"></textarea></p>' +
        '<input type="submit" value="Add" />' +
        '</form>';
    return html;
}

module.exports = {
    sendHTML,
    parseReceivedData,
    actionForm,
    add,
    archive,
    showArchive,
    show,
    deleteTask
}
