#!/usr/bin/env node

// get the total number of babies born from SSA
// http://www.ssa.gov/oact/babynames/numberUSbirths.html

const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

let data = {};
let csv = "year,male,female,total\n";

request("http://www.ssa.gov/oact/babynames/numberUSbirths.html", function(err, response, body) {
<<<<<<< HEAD
	var $ = cheerio.load(body);
	$(".t-stripe tr").each(function(i, tr) {
		if (i === 0) { return; } // header row
		var $tr = $(tr);
		var datum = {
=======
	let $ = cheerio.load(body);
	$("table.t-stripe tbody tr").each(function(i, tr) {
		// if (i === 0) { return; } // header row
		let $tr = $(tr);

		let datum = {
>>>>>>> 721033d33db01a787a2713ed3e9f8059d40da05d
			year: 	parseInt($tr.children("td:nth-child(1)").text(), 10),
			M: 	parseInt($tr.children("td:nth-child(2)").text().replace(/,/g, ""), 10),
			F: parseInt($tr.children("td:nth-child(3)").text().replace(/,/g, ""), 10),
			both: 	parseInt($tr.children("td:nth-child(4)").text().replace(/,/g, ""), 10)
		};

		if (datum.year) {
			data[String(datum.year)] = datum;
		}

		csv += [datum.year, datum.M, datum.F, datum.both].join(",") + "\n";
	});
	fs.writeFileSync(__dirname + "/../data/totals.json", JSON.stringify(data, null, 2));
	fs.writeFileSync(__dirname + "/../data/totals.csv", csv);
});