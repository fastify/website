const axios = require('axios')
const yaml = require('js-yaml')
const fs = require('fs')

const URL_BENCHMARK = 'https://raw.githubusercontent.com/fastify/benchmarks/master/benchmark-results.json'
const FILE_LOCATION = 'src/website/data/benchmarks.yml'
const arrayDefaultFrameworks = ['fastify', 'koa', 'express', 'restify', 'hapi']

const main = async () => {
  try {
    const jsonData = await getJSONData(URL_BENCHMARK)

    const dataYaml = getDataYaml()

    const updatedData = getUpdatedData(jsonData)

    const newDataYaml = updateDataYaml(dataYaml, updatedData)

    dumpYaml(newDataYaml)
  } catch (error) {
    console.log('Catch an error: ', error)
    process.exit(1)
  }
}

const getJSONData = async (url) => {
  try {
    const { data } = await axios.get(url)
    return data
  } catch (error) {
    console.error(`Error while fetching from url - ${url}`)
    throw (error)
  }
}

const getDataYaml = () => {
  try {
    const fileContents = fs.readFileSync(FILE_LOCATION)
    return yaml.load(fileContents)
  } catch (error) {
    console.error('Cannot load yml file')
    throw (error)
  }
}

const getUpdatedData = (jsonData) => {
  const newData = {}
  for (const framework of jsonData) {
    const nameFramework = framework.name
    if (arrayDefaultFrameworks.includes(nameFramework)) {
      const requestsSec = parseInt(framework.requests)
      newData[nameFramework] = requestsSec
    }
  }
  return newData
}

const updateDataYaml = (dataYaml, updatedData) => {
  const newDataYaml = { ...dataYaml }

  // eslint-disable-next-line array-callback-return
  newDataYaml.frameworks.map((framework) => {
    framework.requests_sec = parseInt(updatedData[framework.tag])
  })

  return newDataYaml
}

const dumpYaml = (dataYaml) => {
  try {
    const updatedData = yaml.dump(dataYaml)
    fs.writeFileSync(FILE_LOCATION, updatedData, 'utf8')
  } catch (error) {
    console.error('Cannot create yml file')
    throw (error)
  }
}

main()