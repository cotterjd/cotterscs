import * as R from 'ramda'

export * from './handleCSVDownload'
export * from './formatDBData'
export default {
	sortedJobNames,
}

function sortedJobNames (unitCodes) {
	const sortedJobs = R.sort(R.descend(x => new Date(x.createdAt)), unitCodes)
	const groupObj = R.groupBy(R.prop(`job`), sortedJobs)
	const jobNames = Object.keys(groupObj)

	return jobNames
}