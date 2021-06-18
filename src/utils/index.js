import * as R from 'ramda'

export default {
	sortedJobNames,
}

function sortedJobNames (unitCodes) {
	const sortedJobs = R.sort(R.descend(x => new Date(x.createdAt)), unitCodes)
	console.log(`Sortedjobs`, sortedJobs)
	const groupObj = R.groupBy(R.prop(`job`), sortedJobs)
	console.log(`groupobj`, groupObj)
	const jobNames = Object.keys(groupObj)

	return jobNames
}