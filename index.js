const simpleGit = require("simple-git");
const moment = require("moment");
const faker = require("faker");

// Initialize git instance
const git = simpleGit();

// Define holiday dates (format: YYYY-MM-DD)
// You can extend this list with specific holidays you don't want commits to fall on.
const holidays = [
	// 2014 US Federal Holidays
	"2014-01-01", // New Year's Day
	"2014-01-20", // Martin Luther King Jr. Day
	"2014-02-17", // Presidents' Day
	"2014-05-26", // Memorial Day
	"2014-07-04", // Independence Day
	"2014-09-01", // Labor Day
	"2014-10-13", // Columbus Day
	"2014-11-11", // Veterans Day
	"2014-11-27", // Thanksgiving Day
	"2014-12-25", // Christmas Day
	// 2015 US Federal Holidays
	"2015-01-01", // New Year's Day
	"2015-01-19", // Martin Luther King Jr. Day
	"2015-02-16", // Presidents' Day
	"2015-05-25", // Memorial Day
	"2015-07-03", // Independence Day (observed)
	"2015-09-07", // Labor Day
	"2015-10-12", // Columbus Day
	"2015-11-11", // Veterans Day
	"2015-11-26", // Thanksgiving Day
	"2015-12-25", // Christmas Day
	// 2016 US Federal Holidays
	"2016-01-01", // New Year's Day
	"2016-01-18", // Martin Luther King Jr. Day
	"2016-02-15", // Presidents' Day
	"2016-05-30", // Memorial Day
	"2016-07-04", // Independence Day
	"2016-09-05", // Labor Day
	"2016-10-10", // Columbus Day
	"2016-11-11", // Veterans Day
	"2016-11-24", // Thanksgiving Day
	"2016-12-26", // Christmas Day (observed)
	// 2017 US Federal Holidays
	"2017-01-02", // New Year's Day (observed)
	"2017-01-16", // Martin Luther King Jr. Day
	"2017-02-20", // Presidents' Day
	"2017-05-29", // Memorial Day
	"2017-07-04", // Independence Day
	"2017-09-04", // Labor Day
	"2017-10-09", // Columbus Day
	"2017-11-10", // Veterans Day (observed)
	"2017-11-23", // Thanksgiving Day
	"2017-12-25", // Christmas Day
	// 2018 US Federal Holidays
	"2018-01-01", // New Year's Day
	"2018-01-15", // Martin Luther King Jr. Day
	"2018-02-19", // Presidents' Day
	"2018-05-28", // Memorial Day
	"2018-07-04", // Independence Day
	"2018-09-03", // Labor Day
	"2018-10-08", // Columbus Day
	"2018-11-12", // Veterans Day (observed)
	"2018-11-22", // Thanksgiving Day
	"2018-12-25", // Christmas Day
	// 2019 US Federal Holidays
	"2019-01-01", // New Year's Day
	"2019-01-21", // Martin Luther King Jr. Day
	"2019-02-18", // Presidents' Day
	"2019-05-27", // Memorial Day
	"2019-07-04", // Independence Day
	"2019-09-02", // Labor Day
	"2019-10-14", // Columbus Day
	"2019-11-11", // Veterans Day
	"2019-11-28", // Thanksgiving Day
	"2019-12-25", // Christmas Day
	// 2020 US Federal Holidays
	"2020-01-01", // New Year's Day
	"2020-01-20", // Martin Luther King Jr. Day
	"2020-02-17", // Presidents' Day
	"2020-05-25", // Memorial Day
	"2020-07-03", // Independence Day (observed)
	"2020-09-07", // Labor Day
	"2020-10-12", // Columbus Day
	"2020-11-11", // Veterans Day
	"2020-11-26", // Thanksgiving Day
	"2020-12-25", // Christmas Day
	// 2021 US Federal Holidays
	"2021-01-01", // New Year's Day
	"2021-01-18", // Martin Luther King Jr. Day
	"2021-02-15", // Presidents' Day
	"2021-05-31", // Memorial Day
	"2021-07-05", // Independence Day (observed)
	"2021-09-06", // Labor Day
	"2021-10-11", // Columbus Day
	"2021-11-11", // Veterans Day
	"2021-11-25", // Thanksgiving Day
	"2021-12-24", // Christmas Day (observed)
	// 2022 US Federal Holidays
	"2022-01-01", // New Year's Day
	"2022-01-17", // Martin Luther King Jr. Day
	"2022-02-21", // Presidents' Day
	"2022-05-30", // Memorial Day
	"2022-07-04", // Independence Day
	"2022-09-05", // Labor Day
	"2022-10-10", // Columbus Day
	"2022-11-11", // Veterans Day
	"2022-11-24", // Thanksgiving Day
	"2022-12-26", // Christmas Day (observed)
	// 2023 US Federal Holidays
	"2023-01-02", // New Year's Day (observed)
	"2023-01-16", // Martin Luther King Jr. Day
	"2023-02-20", // Presidents' Day
	"2023-05-29", // Memorial Day
	"2023-07-04", // Independence Day
	"2023-09-04", // Labor Day
	"2023-10-09", // Columbus Day
	"2023-11-10", // Veterans Day (observed)
	"2023-11-23", // Thanksgiving Day
	"2023-12-25", // Christmas Day
	// 2024 US Federal Holidays
	"2024-01-01", // New Year's Day
	"2024-01-15", // Martin Luther King Jr. Day
	"2024-02-19", // Presidents' Day
	"2024-05-27", // Memorial Day
	"2024-07-04", // Independence Day
	"2024-09-02", // Labor Day
	"2024-10-14", // Columbus Day
	"2024-11-11", // Veterans Day
	"2024-11-28", // Thanksgiving Day
	"2024-12-25", // Christmas Day
	// 2025 US Federal Holidays
	"2025-01-01", // New Year's Day
	"2025-01-20", // Martin Luther King Jr. Day
	"2025-02-17", // Presidents' Day
	"2025-05-26", // Memorial Day
	"2025-07-04", // Independence Day
	"2025-09-01", // Labor Day
	"2025-10-13", // Columbus Day
	"2025-11-11", // Veterans Day
	"2025-11-27", // Thanksgiving Day
	"2025-12-25"  // Christmas Day
];

// Helper function to check if a given date is a weekend or holiday
function isWeekendOrHoliday(date) {
	const dayOfWeek = moment(date).day(); // 0 = Sunday, 6 = Saturday
	const dateString = moment(date).format("YYYY-MM-DD");
	return dayOfWeek === 0 || dayOfWeek === 6 || holidays.includes(dateString);
}

// Function to generate a random date within the specified range (ignores weekends/holidays)
function getRandomDate(startDate, endDate) {
	let date;
	do {
		date = moment(startDate).add(
			Math.random() * (endDate - startDate),
			"milliseconds"
		);
	} while (isWeekendOrHoliday(date));
	return date;
}

// Function to make a commit with a random message
function makeCommit(date) {
	// Set the commit date
	const commitDate = date.format("YYYY-MM-DD HH:mm:ss");
	git.raw([
		"commit",
		"--allow-empty",
		"--date",
		commitDate,
		"-m",
		generateRealisticCommitMessage()
	]);
}

// Function to generate realistic commit messages
function generateRealisticCommitMessage() {
	const types = [
		"Feat",
		"Fix",
		"Bug",
		"Docs",
		"Style",
		"Refactor",
		"Test",
		"Chore",
		"Perf",
		"CI",
		"Build"
	];
	
	const components = [
		"auth",
		"api",
		"dashboard",
		"appointments",
		"patients",
		"doctors",
		"video",
		"chat",
		"notifications",
		"billing",
		"reports",
		"settings",
		"ui",
		"database",
		"security"
	];
	
	const actions = [
		"Add",
		"Update",
		"Implement",
		"Remove",
		"Refactor",
		"Optimize",
		"Fix",
		"Resolve",
		"Improve",
		"Enhance"
	];
	
	const details = [
		"user authentication flow",
		"appointment scheduling system",
		"video call quality",
		"patient record management",
		"doctor availability calendar",
		"notification system",
		"billing integration",
		"report generation",
		"UI components",
		"API response handling",
		"database queries",
		"error handling",
		"performance bottlenecks",
		"security vulnerabilities",
		"user interface",
		"loading states",
		"form validation",
		"data synchronization",
		"mobile responsiveness"
	];
	
	const randomType = types[Math.floor(Math.random() * types.length)];
	const randomComponent = components[Math.floor(Math.random() * components.length)];
	const randomAction = actions[Math.floor(Math.random() * actions.length)];
	const randomDetail = details[Math.floor(Math.random() * details.length)];
	
	// Different commit message formats
	const formats = [
		`${randomType}: ${randomAction} ${randomDetail}`,
		`${randomType}(${randomComponent}): ${randomAction} ${randomDetail}`,
		`${randomType}/${randomComponent}: ${randomDetail}`,
		`${randomAction} ${randomDetail} in ${randomComponent} module`,
		`[${randomComponent}] ${randomAction} ${randomDetail}`
	];
	
	return formats[Math.floor(Math.random() * formats.length)];
}

// Main function to create fake commits
async function createFakeCommits() {
	const startDate = moment("2017-05-06");
	const endDate = moment("2025-01-02");
	const totalCommits = 1000; // Adjust number of commits as needed

	// Ensure the repository is clean and initialized
	await git.init();
	await git.add(".");

	for (let i = 0; i < totalCommits; i++) {
		// Generate a random date within the range
		const randomDate = getRandomDate(startDate, endDate);
		console.log(`Making commit on: ${randomDate.format("YYYY-MM-DD")}`);
		makeCommit(randomDate);
		// Simulate some delay between commits
		await new Promise(resolve => setTimeout(resolve, 100));
	}

	console.log("Finished creating fake commits!");
}

// Run the script
createFakeCommits().catch(console.error);
