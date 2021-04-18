function action(bp: typeof sdk, event: sdk.IO.IncomingEvent, args: any, { user, temp, session } = event.state) {
  /** Your code starts below */

  const axios = require('axios')
  /**
   * Small description of your action
   * @title The title displayed in the flow editor
   * @category HallTicket Fetch
   * @author Your_Name
   * @param {string} rollno - An example string variable
   */
  const myAction = async rollno => {
    try{
      const response = await axios.get(`http://192.168.201.214/hallTicket?regdno=${rollno}`)
      if(response.data.success === true){
      const file = response.data.filename
      temp.hallTicket = file.path
      }
      else{
      if (response.data.error_message === 'Please recheck your rollno') {
        temp.hallTicket = 'Please recheck your rollno'
      }
      if (response.data.error_message === 'Your hallticket is not present currently') {
        temp.hallTicket = 'Your hallticket is not present currently'
      }
      }
    } catch (err) {
      console.log(err)
      temp.hallTicket = 'Sorry there is a problem with our Hall Ticket Fetcher'
    }
  }

  return myAction(args.rollno)

  /** Your code ends here */
}
