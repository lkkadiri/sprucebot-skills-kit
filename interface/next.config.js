const path = require('path')
const fs = require('fs')
const config = require('config')
const { omit } = require('lodash')

module.exports = {
	webpack: webpack => {
		const jsonPath = path.resolve(__dirname, './client.json')
		// Remove sensitive keys
		const clientConfig = config.sanitizeClientConfig({ ...config })
		// Export our whitelisted config for the client bundle
		fs.writeFileSync(jsonPath, JSON.stringify(clientConfig))
		webpack.plugins = webpack.plugins.filter(plugin => {
			if (plugin.constructor.name === 'UglifyJsPlugin') {
				return false
			} else {
				return true
			}
		})

		webpack.resolve = {
			alias: {
				config: jsonPath
			}
		}
		return webpack
	}
}
