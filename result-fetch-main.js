function action(bp: typeof sdk, event: sdk.IO.IncomingEvent, args: any, { user, temp, session } = event.state) {
  /** Your code starts below */

  const axios = require('axios')
  /**
   * Small description of your action
   * @title The title displayed in the flow editor
   * @category Fetch Results
   * @author Your_Name
   * @param {string} sem - An example string variable
   * @param {any} rollno - Another Example value
   */
  const myAction = async (sem, rollno) => {
    try {
      const response = await axios.get(`http://192.168.201.214/fetch?regno=${rollno}&sem_no=${sem}`)
      const data = response.data
      temp.name = `Hi ${data.student.name}! Nice to meet you. You can get info about your cgpa and can also ask any questions about GITAM University if you want.`
      temp.response = `In Semester ${sem},Your CGPA is ${data.student.cgpa}`
      temp.result = `http://192.168.201.214/api/v1/bots/bot1/media/res${rollno}_sem${sem}.jpg`
    } catch {
      temp.name = "Sorry couldn't fetch your data."
      temp.response = 'Please recheck your rollnumber or semester'
      temp.result = 'Your result was not fetched'
    }
  }

  return myAction(args.sem, args.rollno)

  /** Your code ends here */
}
