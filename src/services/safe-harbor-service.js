import csvToJson from 'convert-csv-to-json'

/**
 * Calculate how old a patient is given their DOB
 * 
 * @param {object} record - Patient Input Record
 * @param {*} next
 * @returns {string}
 */
function convertBirthdayToAge(dob) {
  // Difference btwn today and DOB
  let year = new Date(dob)
  let age = (new Date().getFullYear() - new Date(year.getFullYear()))
  return age > 89 ? '90+' : `${age}`
}

const getStringYear = date => {
  if (typeof (date) === Date) {
    return `${date.getFullYear()}`
  } else {
    return `${new Date(date).getFullYear()}`
  }
}

const replaceTxt = (matches, type) => {
  let safeText = []

  if (type === 'ssn') {
    matches.forEach(ssn => {
      safeText.push(ssn.replace(/([1-9])/g, 'X'))
    })
  }

  if (type === 'email') {
    matches.forEach(email => {
      safeText.push(email.replace(/\w+([\.-]?\w+)*@/g, '@'))
    })
  }

  if (type === 'phone') {
    matches.forEach(email => safeText.push(email.replace(/\(?([0-9])/g, '#')))
  }

  return safeText
}

const encodePII = text => {
  let origText = text

  // Would probably not keep so local. These regex statements would be common
  const REGEX_EMAIL = /\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+/g
  const REGEX_SSN = /([1-9])(?!\1{2}-\1{2}-\1{4})[1-9]{2}-[1-9]{2}-[1-9]{4}/g
  const REGEX_PHONE = /\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})/g

  // Ideally iterate through; invoking function call to: match & replace
  // const REGEX_MATCHERS = [REGEX_EMAIL, REGEX_SSN, REGEX_PHONE]

  // TODO: Determine index of match so that we can insert de-identified text back correctly
  let emailMatches = text.match(REGEX_EMAIL)
  let ssnMatches = text.match(REGEX_SSN)
  let phoneMatches = text.match(REGEX_PHONE)

  let encodedSsn = replaceTxt(ssnMatches, 'ssn')
  // console.log('encoded SSN - ', encodedSsn)

  let encodedEmail = replaceTxt(emailMatches, 'email')
  // console.log('encoded Email - ', encodedEmail)

  let encodedPhone = replaceTxt(phoneMatches, 'phone')
  // console.log('encoded Phone #s - ', encodedPhone)

  // FIXME: Needs to be inserted into original "notes"
  let newText = [encodedSsn, encodedEmail, encodedPhone].join(' ')
  // console.log('newText --> ', newText)

  return newText
}

/**
 * Strip first 3 digits IFF population > 20,000.  
 *   Where population = SUM(ZIPCODES sharing same first 3 digits)
 * 
 * @param {*} zip
 */
const hashZip = (zip) => {
  // TODO: Complete Steps!
  // 1) Trim first 3 digits
  // 2) Iterating through all zips until the first occurance of the 3 digits being different (i.e. 010 becomes 011)
  // 3) While iterating (Step 2), SUM(population) ---> Hint at using Generator? Yield & cancel if sum >= 20,000
  let currZipStart = null
  console.log('current zip start -> ', currZipStart)

  let zipStart = zip.slice(0, 3)
  console.log('zip start -> ', zipStart)

  currZipStart = zipStart

  // While currZipStart !== zipStart

  return zip
}


/* API Call to raw git file */
// const parseCsv = (ctx) => {
//   const CSV_URL = 'https://raw.githubusercontent.com/elsevierPTG/interviews/master/api-challenge/population_by_zcta_2010.csv'
//   let repo = ctx.get(CSV_URL)
//   return repo
// }

/* Could read through a static file & output to another */
// const parseCsvFile = () => {
//   const FILE_ZCTA = require('../mocks/zcta.json')
//   let outputFile = '../mocks/output.json'
// }

// Read through generated JSON file
// Should be using Generator
const readJson = () => {
  const zcta = require('../mocks/zcta.json')
  let currSum = 0
  let currZip = 0

  for (const row of zcta) {
    let zipCode = row['Zip Code ZCTA']

    currZip = zipCode

    while (zipCode === currZip && currSum < 20000) {
      currSum += row['2010 Census Population']
      console.log(`Current Zip: ${currZip} && Total SUM of Population: ${currSum}`)

      if (currSum >= 20000) {
        return '00000'
      }
    }
  }
}

const transform = (record) => {
  let age = convertBirthdayToAge(record.birthDate)
  let admissionYear = getStringYear(record.admissionDate)
  let dischargeYear = getStringYear(record.dischargeDate)
  let notes = encodePII(record.notes)

  let zipCode = readJson()
  console.log('PARSED zipCode --> ', zipCode)

  return {
    age,
    zipCode,
    admissionYear,
    dischargeYear,
    notes
  }
}

let safeHarborService = {
  transform
}

module.exports = safeHarborService
