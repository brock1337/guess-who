import safeHarborService from '../services/safe-harbor-service'

export default class PatientController {

  constructor() {
    this.mockPatientInput = {
      'birthDate': '2001-01-01',
      'zipCode': '01013',
      'admissionDate': '2019-03-12',
      'dischargeDate': '2019-03-14',
      'notes': `Here is a note with an email, tester@email.com.  Patient with SSN 123-45-6789.  
                Patient's emergency contact can be reached at 215-555-4444`
    }
  }

  async deIdentifyPatient(ctx, next) {
    let safeOutput = safeHarborService.transform(this.mockPatientInput)

    let body = {
      'status': '',
      'data': {
        safeOutput
      }
    }

    try {
      body.status = 'success'
      ctx.body = body
    } catch (err) {
      body.status = 'error'
      ctx.throw(400, 'INVALID_DATA: ' + err)
    }
  }
}
