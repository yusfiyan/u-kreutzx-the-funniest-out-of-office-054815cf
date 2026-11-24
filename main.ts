import * as fs from "node:fs";
import * as path from "node:path";

// The Funniest Out-of-Office — u-kreutzx-the-funniest-out-of-office-054815cf
// Repo: yusfiyan/u-kreutzx-the-funniest-out-of-office-054815cf
// One line, 140 characters max, a real out-of-office reply a person would
// actually set — with a twist: the auto-reply itself has outworked its owner.
const ENTRY =
  "I'm out of office until Monday. My auto-reply has already worked more hours this week than I have.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outputDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

const text = ENTRY.trim();
if (text.length < 1 || text.length > 140) {
  throw new Error(`entry must be 1-140 characters, got ${text.length}`);
}
if (!text.trim()) {
  throw new Error("entry must not be whitespace-only");
}
if (text.includes("\n")) {
  throw new Error("entry must be a single line");
}

fs.writeFileSync(path.join(outputDir, "entry.txt"), text, "utf8");

// Read back and confirm the file on disk is byte-identical to what we wrote.
const written = fs.readFileSync(path.join(outputDir, "entry.txt"), "utf8");
if (written !== text) {
  throw new Error("entry.txt on disk does not match the entry text");
}
console.log(`Wrote entry.txt (${text.length} characters)`);
