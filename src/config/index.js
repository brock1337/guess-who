import convict from 'convict'

// Configuration Schema
const config = convict({
  version: '1',
  env: {
    doc: '',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  port: {
    doc: 'HTTP Port',
    default: 3000,
    env: 'PORT'
  }
})

// Load env files
const env = config.get('env')

// Load env files into Convict
config.loadFile(require('path').resolve(`src/config/${env}.json`))

export default config