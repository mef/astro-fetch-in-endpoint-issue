let cache = {
		isReady: false
		, data: {}
	}
	, pendingRequests = [] // array of requests waiting for data extraction to complete



// launch data extraction when server starts and store result in a cache object
cacheData()

async function cacheData() {
	// sample scenario with a simple call to an external API using fetch
	// in real life use case, quite a few calls need to be made to multiple endpoints, then some logic processes
	// the extracted data, hence the need of performing the operations ahead of receiving requests
	
	const response = await fetch('https://www.mediawiki.org/w/api.php?action=opensearch&search=example')
	
	cache.data = await response.json()
	
	cache.isReady = true

	console.log('-- resolving queued request promisess')

	// send dataset to all queued requestors
	pendingRequests.forEach(({resolve}) =>
		resolve({
			body: JSON.stringify(cache.data)
		})
	)
	
}


export async function get({ params, request }) {
	
	
	// fetch actually works here:
	// const response = await fetch('https://www.mediawiki.org/w/api.php?action=opensearch&search=example')
	// let data = await response.json()
	
	
	return new Promise((resolve, reject) => {
		if(cache.isReady) {
			console.log('-- data is available in cache, send directly to client')
		
			return resolve({
				body: JSON.stringify(cache.data)
			})
		
		}
		else {
			console.log('-- data extraction is ongoing, queue request')
		
			pendingRequests.push({resolve, reject})
		}
	})
}
