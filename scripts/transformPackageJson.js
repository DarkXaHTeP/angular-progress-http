"use strict";

const fs = require("fs");
const path = require("path");
let pkg = require("../package.json");

delete pkg.scripts;
delete pkg.devDependencies;

const filepath = path.join(__dirname, "../build/package.json");
fs.writeFileSync(filepath, JSON.stringify(pkg, null, 2));