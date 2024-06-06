/* this script works in Node 0.12 (which predated ES6) so no modern syntax */
var XLSX = require("xlsx"), fs = require("fs"), stream = require("stream");

var wb = XLSX.readFile(process.argv[2]);
var ws = wb.Sheets[wb.SheetNames[0]];

/* this Transform stream converts JS objects to text */
var conv = new stream.Transform({writableObjectMode:true});
conv._transform = function(obj, e, cb){ cb(null, JSON.stringify(obj) + "\n"); };

/* to_json -> transformer -> standard output */
XLSX.stream.to_json(ws, {raw: true}).pipe(conv).pipe(process.stdout);

/* to_csv -> SheetJSNodeJStream.csv */
var ostream = fs.createWriteStream("SheetJSNodeJStream.csv");
XLSX.stream.to_csv(ws).pipe(ostream);
