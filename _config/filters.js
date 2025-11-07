import { DateTime } from "luxon";
import CleanCSS from "clean-css";
import htmlminifier from "html-minifier-terser";
import fs from "fs";
import path from "path";

export default function(eleventyConfig) {
	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
	});
    eleventyConfig.addNunjucksFilter("limit", (arr, limit) => arr.slice(0, limit));
    eleventyConfig.addFilter("min", (...numbers) => {
        return Math.min.apply(null, numbers);
    });
	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat('yyyy-LL-dd');
	});

	eleventyConfig.addFilter("head", (array, n) => {
		if(!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if( n < 0 ) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});

	eleventyConfig.addFilter("getKeys", target => {
		return Object.keys(target);
	});

	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(tag => ["all", "posts" , "featured"].indexOf(tag) === -1);
	});

	// Nunjucks-only filters for inlining and minifying
	eleventyConfig.addNunjucksFilter("inlineFile", (relativePath) => {
		try {
			const absolute = path.resolve(process.cwd(), relativePath);
			return fs.readFileSync(absolute, "utf8");
		} catch (e) {
			console.error(`[inlineFile] Unable to read ${relativePath}: ${e.message}`);
			return "";
		}
	});

	eleventyConfig.addNunjucksFilter("cssmin", (code) => {
		try {
			return new CleanCSS({ level: 2 }).minify(code || "").styles || "";
		} catch (e) {
			console.error(`[cssmin] Error: ${e.message}`);
			return code;
		}
	});

	eleventyConfig.addNunjucksFilter("htmlmin", (code) => {
		try {
			return htmlminifier.minify(code || "", {
				collapseWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true,
				removeEmptyAttributes: true,
				useShortDoctype: true,
				minifyCSS: true,
				minifyJS: true
			});
		} catch (e) {
			console.error(`[htmlmin] Error: ${e.message}`);
			return code;
		}
	});

};
