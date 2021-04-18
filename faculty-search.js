function action(bp: typeof sdk, event: sdk.IO.IncomingEvent, args: any, { user, temp, session } = event.state) {
  /** Your code starts below */

  const axios = require('axios')
  /**
   * Small description of your action
   * @title The title displayed in the flow editor
   * @category Custom
   * @author Your_Name
   * @param {string} name - An example string variable
   */
  const myAction = async name => {
    const response = await axios.get(`http://192.168.201.214/crportal/employee_api?search=${name}`)
    var cards = []
    for (var i = 0; i < response.data.length; i++) {
      const payload = 
        {
          title: `${response.data[i].ename}`,
          subtitle: `${response.data[i].email}`,
          image: `https://staffphotos.gitam.edu/${response.data[i].eid}.jpg`,
          actions: [
            {
              title: `${response.data[i].ename}`,
              action: 'Open URL',
              dependencies: {
                action: 'Open URL',
                url: `https://${response.data[i].dept}.gitam.edu/faculty/profile/${response.data[i].eid}`
              }
            }
          ]
        }
      cards.push(payload)
    }
    const finRes = await bp.cms.renderElement('builtin_carousel',{items:cards},event)
    await bp.events.replyToEvent(event, finRes)
  }

  return myAction(args.name)

  /** Your code ends here */
}
