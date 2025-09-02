import type { DetailedIntelligence } from '../types';

// Sample intelligence data from backend output
export const sampleIntelligence: DetailedIntelligence = {
  content_type: "meeting",
  total_segments_processed: 12,
  processed_at: "2024-01-15T14:30:00Z",
  executive_summary: "Strategic quarterly review meeting discussing company performance, upcoming product launches, and resource allocation for Q2. Key decisions made regarding new product development timeline and budget adjustments.",
  key_topics: [
    "2. Organization of the discussion into three segments.",
    "Meeting organization and commencement",
    "3. Previous experiences with single audits",
    "Applicability of past studies for current projects",
    "1. Jerry's potential exit and timing.",
    "1. Community engagement and feedback.",
    "Annual review of water charges"
  ],
  action_items: [
    {
      task: "- Turn on the mic in front of Ken -",
      deadline: '',
      assigned_to: '',
      confidence: "high",
      timestamp_start: "00:01:19.92",
      timestamp_end: "00:02:20.32"
    },
    {
      task: "- None mentioned.",
      deadline: '',
      assigned_to: '',
      confidence: "medium",
      timestamp_start: "00:02:58.48",
      timestamp_end: "00:04:02.80"
    },
    {
      task: "- Inform the board about the booking service -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "00:05:21.12",
      timestamp_end: "00:06:23.92"
    },
    {
      task: "- Don to cover for Jerry -",
      deadline: '',
      assigned_to: '',
      confidence: "high",
      timestamp_start: "00:06:10.88",
      timestamp_end: "00:07:12.96"
    },
    {
      task: "- Test 59 backflows - No deadline mentioned",
      deadline: '',
      assigned_to: '',
      confidence: "medium",
      timestamp_start: "00:06:56.72",
      timestamp_end: "00:08:00.88"
    },
    {
      task: "- Check all backflow devices -",
      deadline: '',
      assigned_to: '',
      confidence: "high",
      timestamp_start: "00:08:34.72",
      timestamp_end: "00:09:35.12"
    },
    {
      task: "- Complete the rebuild of pump station piping - [UNCLEAR, no specific deadline mentioned]",
      deadline: '',
      assigned_to: '',
      confidence: "medium",
      timestamp_start: "00:08:34.72",
      timestamp_end: "00:09:35.12"
    },
    {
      task: "- Continue communication on the Kenneth Lupe engineering project -  (no specific deadline mentioned).",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "00:09:23.84",
      timestamp_end: "00:10:44.96"
    },
    {
      task: "- Continued communication between stakeholders regarding the project -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "00:10:09.12",
      timestamp_end: "00:11:11.36"
    },
    {
      task: "1. Address the PRT debacle with the fans - [UNCLEAR if a specific deadline mentioned]",
      deadline: '',
      assigned_to: '',
      confidence: "medium",
      timestamp_start: "00:10:54.96",
      timestamp_end: "00:12:11.52"
    },
    {
      task: "- Check on Diane's items -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "00:11:40.32",
      timestamp_end: "00:12:41.52"
    },
    {
      task: "- Follow up on the outstanding combination invoice \u2013  (no deadline mentioned)",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "00:13:27.20",
      timestamp_end: "00:14:29.28"
    },
    {
      task: "1. Measure the crown - next month",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "00:17:01.68",
      timestamp_end: "00:18:08.72"
    },
    {
      task: "- Close the USDA tank project loan - July 1 (implied deadline due to interest rate increase)",
      deadline: '',
      assigned_to: '',
      confidence: "medium",
      timestamp_start: "00:17:47.36",
      timestamp_end: "00:18:48.08"
    },
    {
      task: "- Are there any ongoing implications or next steps following the loan closure?",
      deadline: '',
      assigned_to: '',
      confidence: "medium",
      timestamp_start: "00:17:47.36",
      timestamp_end: "00:18:48.08"
    },
    {
      task: "- Review of the completed job description for the administrative assistant - no deadline mentioned .",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "00:18:36.56",
      timestamp_end: "00:19:38.40"
    },
    {
      task: "- Follow up with the county for inspection options -",
      deadline: '',
      assigned_to: '',
      confidence: "high",
      timestamp_start: "00:19:26.48",
      timestamp_end: "00:20:27.92"
    },
    {
      task: "- Continue searching for outside inspector proposals -  (no deadline mentioned)",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "00:20:14.32",
      timestamp_end: "00:21:16.48"
    },
    {
      task: "- Contacting Chris Coward for information -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "00:20:59.68",
      timestamp_end: "00:22:05.20"
    },
    {
      task: "- None specified.",
      deadline: '',
      assigned_to: '',
      confidence: "medium",
      timestamp_start: "00:23:20.72",
      timestamp_end: "00:24:27.20"
    },
    {
      task: "- None explicitly mentioned.",
      deadline: '',
      assigned_to: '',
      confidence: "medium",
      timestamp_start: "00:24:55.28",
      timestamp_end: "00:26:04.08"
    },
    {
      task: "- Discuss credit on the tank releases -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "00:27:49.68",
      timestamp_end: "00:28:50.64"
    },
    {
      task: "- Further discussion on consolidation details to be scheduled .",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "00:28:39.60",
      timestamp_end: "00:29:54.96"
    },
    {
      task: "- Assisting smaller communities with applying for state and federal funds -  (deadline not mentioned)",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "00:31:17.68",
      timestamp_end: "00:32:40.48"
    },
    {
      task: "- Help Midway Heights with funding for a tank project -",
      deadline: '',
      assigned_to: '',
      confidence: "high",
      timestamp_start: "00:32:08.72",
      timestamp_end: "00:33:09.28"
    },
    {
      task: "- Conduct an income survey for Heather Glenn -",
      deadline: '',
      assigned_to: '',
      confidence: "high",
      timestamp_start: "00:32:08.72",
      timestamp_end: "00:33:09.28"
    },
    {
      task: "- Analyze a consolidation effort with PCWA -",
      deadline: '',
      assigned_to: '',
      confidence: "high",
      timestamp_start: "00:32:08.72",
      timestamp_end: "00:33:09.28"
    },
    {
      task: "- Prepare a proposal for services -",
      deadline: '',
      assigned_to: '',
      confidence: "high",
      timestamp_start: "00:32:57.04",
      timestamp_end: "00:34:04.80"
    },
    {
      task: "- Prepare a proposal -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "00:33:48.48",
      timestamp_end: "00:34:49.92"
    },
    {
      task: "- Notify stakeholders regarding the protest procedure -",
      deadline: '',
      assigned_to: '',
      confidence: "high",
      timestamp_start: "00:35:21.52",
      timestamp_end: "00:36:23.36"
    },
    {
      task: "- Conduct analysis on PCWA's cost -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "00:37:47.76",
      timestamp_end: "00:38:47.84"
    },
    {
      task: "- Get engineering work done to vet costs - deadline not mentioned",
      deadline: '',
      assigned_to: '',
      confidence: "medium",
      timestamp_start: "00:39:31.68",
      timestamp_end: "00:40:38.48"
    },
    {
      task: "1. Get engineering work done -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "00:40:18.64",
      timestamp_end: "00:41:26.64"
    },
    {
      task: "Review the 2019 analysis",
      deadline: "an engineer -",
      assigned_to: '',
      confidence: "low",
      timestamp_start: "00:41:56.00",
      timestamp_end: "00:42:55.92"
    },
    {
      task: "- Conduct rate studies -  (no specific deadline mentioned)",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "00:43:31.20",
      timestamp_end: "00:44:40.00"
    },
    {
      task: "- Review the CIP and make adjustments based on community acceptance -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "00:44:17.20",
      timestamp_end: "00:45:31.68"
    },
    {
      task: "- Setting up a community meeting -  (no specific deadline mentioned)",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "00:45:04.48",
      timestamp_end: "00:46:11.84"
    },
    {
      task: "1. Bringing in sub-consultant for rate studies -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "00:45:50.48",
      timestamp_end: "00:46:50.08"
    },
    {
      task: "- Prepare a script for the meeting -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "00:46:43.44",
      timestamp_end: "00:47:51.76"
    },
    {
      task: "- Conduct an in-person public workshop - timing not specified (after the draft study)",
      deadline: '',
      assigned_to: '',
      confidence: "medium",
      timestamp_start: "00:47:34.32",
      timestamp_end: "00:48:38.64"
    },
    {
      task: "- Provide a rate study from a similar organization -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "00:48:24.48",
      timestamp_end: "00:49:24.48"
    },
    {
      task: "- Purchase a rate study -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "00:49:09.52",
      timestamp_end: "00:50:19.36"
    },
    {
      task: "- Put a rate study together - deadline not mentioned",
      deadline: '',
      assigned_to: '',
      confidence: "medium",
      timestamp_start: "00:49:54.88",
      timestamp_end: "00:50:55.36"
    },
    {
      task: "- Seek FAP grant from PCWA to fund the rate study -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "00:50:42.32",
      timestamp_end: "00:51:46.96"
    },
    {
      task: "- Provide study sample -  (deadline not mentioned)",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "00:51:30.08",
      timestamp_end: "00:52:30.40"
    },
    {
      task: "- Provide study sample -",
      deadline: '',
      assigned_to: '',
      confidence: "high",
      timestamp_start: "00:52:16.00",
      timestamp_end: "00:53:19.20"
    },
    {
      task: "- Start talking to the state about different grants -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "00:54:48.72",
      timestamp_end: "00:55:55.44"
    },
    {
      task: "1. Engage with the state regarding grants - [UNCLEAR: no specific deadline mentioned]",
      deadline: '',
      assigned_to: '',
      confidence: "medium",
      timestamp_start: "00:55:35.76",
      timestamp_end: "00:56:40.08"
    },
    {
      task: "2. Conduct further engineering analysis for consolidation - [UNCLEAR: no specific deadline mentioned]",
      deadline: '',
      assigned_to: '',
      confidence: "medium",
      timestamp_start: "00:55:35.76",
      timestamp_end: "00:56:40.08"
    },
    {
      task: "- Use extra hours to investigate state interest -  (no specific deadline mentioned)",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "00:56:33.12",
      timestamp_end: "00:57:35.84"
    },
    {
      task: "- DCWA to approach the state regarding consolidation -  (no specific deadline mentioned)",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "00:56:33.12",
      timestamp_end: "00:57:35.84"
    },
    {
      task: "- None explicitly stated in the segment.",
      deadline: '',
      assigned_to: '',
      confidence: "medium",
      timestamp_start: "00:57:29.20",
      timestamp_end: "00:58:31.92"
    },
    {
      task: "- Plan for the replacement of pipes -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "00:58:21.36",
      timestamp_end: "00:59:30.72"
    },
    {
      task: "1. Move forward with RFP discussions for interim operations -  (No deadline mentioned)",
      deadline: '',
      assigned_to: '',
      confidence: "high",
      timestamp_start: "00:59:09.76",
      timestamp_end: "01:04:59.68"
    },
    {
      task: "- Consider conducting a rate study -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "00:59:58.40",
      timestamp_end: "01:04:59.68"
    },
    {
      task: "- Further discussion on operations and CIPs -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "01:05:00.24",
      timestamp_end: "01:06:09.20"
    },
    {
      task: "- Decide on accepting any RFPs -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "01:05:00.24",
      timestamp_end: "01:06:09.20"
    },
    {
      task: "- Determine how to cover the costs if an RFP is approved -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "01:05:00.24",
      timestamp_end: "01:06:09.20"
    },
    {
      task: "- Review RFPs - no deadline mentioned",
      deadline: '',
      assigned_to: '',
      confidence: "medium",
      timestamp_start: "01:05:54.24",
      timestamp_end: "01:06:55.60"
    },
    {
      task: "Complete engineering work",
      deadline: "race study -",
      assigned_to: '',
      confidence: "low",
      timestamp_start: "01:08:36.08",
      timestamp_end: "01:09:37.04"
    },
    {
      task: "- Propose grants in three chunks for February -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "01:11:05.36",
      timestamp_end: "01:12:07.36"
    },
    {
      task: "- Review the grant obligations and contingencies -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "01:11:53.20",
      timestamp_end: "01:12:56.64"
    },
    {
      task: "- Call the president of PCWA -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "01:12:52.16",
      timestamp_end: "01:13:51.84"
    },
    {
      task: "- Call the president of an unspecified authority -",
      deadline: '',
      assigned_to: '',
      confidence: "high",
      timestamp_start: "01:13:38.96",
      timestamp_end: "01:14:47.04"
    },
    {
      task: "1. Implement a direct charge on parcels -",
      deadline: '',
      assigned_to: '',
      confidence: "high",
      timestamp_start: "01:14:24.88",
      timestamp_end: "01:15:29.84"
    },
    {
      task: "2. The charge must comply with Prop 218 regulations, requiring a vote from affected individuals to increase their rates.",
      deadline: '',
      assigned_to: '',
      confidence: "medium",
      timestamp_start: "01:15:11.28",
      timestamp_end: "01:16:11.52"
    },
    {
      task: "Implement a direct stand",
      deadline: "water charge of $60 on parcels -",
      assigned_to: '',
      confidence: "high",
      timestamp_start: "01:15:11.28",
      timestamp_end: "01:16:11.52"
    },
    {
      task: "- Vote on the proposal -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "01:16:03.44",
      timestamp_end: "01:17:07.28"
    },
    {
      task: "- Approve the resolution to the standard chart -  (no specific deadline mentioned)",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "01:16:50.88",
      timestamp_end: "01:17:52.24"
    },
    {
      task: "2. A motion was made to approve resolution 2203, which was seconded and subsequently voted on.",
      deadline: '',
      assigned_to: '',
      confidence: "medium",
      timestamp_start: "01:19:59.04",
      timestamp_end: "01:20:56.24"
    },
    {
      task: "- Approve resolution 2203 -",
      deadline: '',
      assigned_to: '',
      confidence: "high",
      timestamp_start: "01:19:59.04",
      timestamp_end: "01:20:56.24"
    },
    {
      task: "- Send out the survey - deadline not mentioned.",
      deadline: '',
      assigned_to: '',
      confidence: "medium",
      timestamp_start: "01:20:46.40",
      timestamp_end: "01:21:41.84"
    },
    {
      task: "- Identify who created the survey - no deadline mentioned.",
      deadline: '',
      assigned_to: '',
      confidence: "medium",
      timestamp_start: "01:20:46.40",
      timestamp_end: "01:21:41.84"
    },
    {
      task: "- Put the survey on the agenda for next month - next month .",
      deadline: '',
      assigned_to: '',
      confidence: "high",
      timestamp_start: "01:21:38.88",
      timestamp_end: "01:22:41.44"
    },
    {
      task: "- Approve a survey - No deadline mentioned",
      deadline: '',
      assigned_to: '',
      confidence: "medium",
      timestamp_start: "01:22:27.92",
      timestamp_end: "01:23:27.76"
    },
    {
      task: "- Include certain procedures on the agenda - No deadline mentioned",
      deadline: '',
      assigned_to: '',
      confidence: "medium",
      timestamp_start: "01:22:27.92",
      timestamp_end: "01:23:27.76"
    },
    {
      task: "- Potential technical misunderstanding related to current procedures.",
      deadline: '',
      assigned_to: '',
      confidence: "medium",
      timestamp_start: "01:22:27.92",
      timestamp_end: "01:23:27.76"
    },
    {
      task: "2. Is there a proper procedure for including items on the agenda?",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "01:22:27.92",
      timestamp_end: "01:23:27.76"
    },
    {
      task: "3. Is the unnamed individual correct about procedural standards?",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "01:22:27.92",
      timestamp_end: "01:23:27.76"
    },
    {
      task: "- Prepare the survey - to be discussed at the next meeting .",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "01:23:13.28",
      timestamp_end: "01:24:15.28"
    },
    {
      task: "- Draft survey - Not specified",
      deadline: '',
      assigned_to: '',
      confidence: "medium",
      timestamp_start: "01:24:51.68",
      timestamp_end: "01:25:51.60"
    },
    {
      task: "2. There was a possibility discussed to postpone this item for another month .",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "01:26:29.76",
      timestamp_end: "01:27:28.72"
    },
    {
      task: "- Conduct a demographic survey to gather preliminary data - deadline not mentioned.",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "01:27:18.96",
      timestamp_end: "01:28:19.12"
    },
    {
      task: "- Evaluate and possibly postpone the survey -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "01:28:12.80",
      timestamp_end: "01:29:17.60"
    },
    {
      task: "- Create a survey based on public comments -  (no deadline mentioned)",
      deadline: '',
      assigned_to: '',
      confidence: "high",
      timestamp_start: "01:29:48.24",
      timestamp_end: "01:30:49.60"
    },
    {
      task: "1. Put out a survey to the community -  (no specific deadline mentioned)",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "01:32:13.04",
      timestamp_end: "01:33:13.52"
    },
    {
      task: "- Discuss survey items - Next month",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "01:35:47.36",
      timestamp_end: "01:36:47.76"
    },
    {
      task: "2. The approval of Nora's electric bid, which is the only bid received for the project .",
      deadline: '',
      assigned_to: '',
      confidence: "high",
      timestamp_start: "01:37:19.60",
      timestamp_end: "01:38:24.32"
    },
    {
      task: "2. Approve Nora's electric bid - immediate approval .",
      deadline: '',
      assigned_to: '',
      confidence: "high",
      timestamp_start: "01:37:19.60",
      timestamp_end: "01:38:24.32"
    },
    {
      task: "2. Approval of Nora's electric bid to be financed through the FAP grant .",
      deadline: '',
      assigned_to: '',
      confidence: "high",
      timestamp_start: "01:37:19.60",
      timestamp_end: "01:38:24.32"
    },
    {
      task: "2. Approval of electric project bid .",
      deadline: '',
      assigned_to: '',
      confidence: "high",
      timestamp_start: "01:37:19.60",
      timestamp_end: "01:38:24.32"
    },
    {
      task: "- Document outreach to at least three separate entities for bids - [UNCLEAR, no deadline mentioned]",
      deadline: '',
      assigned_to: '',
      confidence: "medium",
      timestamp_start: "01:39:56.64",
      timestamp_end: "01:40:57.12"
    },
    {
      task: "1. \"Execute the agreement with North Electric\" - Deadline:",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "01:40:42.32",
      timestamp_end: "01:41:45.76"
    },
    {
      task: "- Proceed with the Fletcher and Company single audit proposal -",
      deadline: '',
      assigned_to: '',
      confidence: "high",
      timestamp_start: "01:41:27.44",
      timestamp_end: "01:42:26.80"
    },
    {
      task: "- Contacting CPAs for single audits -",
      deadline: '',
      assigned_to: '',
      confidence: "high",
      timestamp_start: "01:42:28.96",
      timestamp_end: "01:43:28.96"
    },
    {
      task: "- Obtaining proposals from interested organizations -",
      deadline: '',
      assigned_to: '',
      confidence: "high",
      timestamp_start: "01:42:28.96",
      timestamp_end: "01:43:28.96"
    },
    {
      task: "- Seeking board approval for the single audit -  (deadline not mentioned)",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "01:42:28.96",
      timestamp_end: "01:43:28.96"
    },
    {
      task: "- Obtain bids on a regular audit and single audit -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "01:44:15.68",
      timestamp_end: "01:45:16.40"
    },
    {
      task: "Complete the single audit",
      deadline: "approximately six months from now",
      assigned_to: '',
      confidence: "medium",
      timestamp_start: "01:45:50.00",
      timestamp_end: "01:46:52.32"
    },
    {
      task: "- Approve the RFP for the Fletcher and Company single audit -",
      deadline: '',
      assigned_to: '',
      confidence: "high",
      timestamp_start: "01:46:35.04",
      timestamp_end: "01:47:34.80"
    },
    {
      task: "- Conduct background checking on referrals -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "01:48:57.68",
      timestamp_end: "01:49:58.80"
    },
    {
      task: "- Consult Jerry for insights on proposals and costs -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "01:49:53.28",
      timestamp_end: "01:50:57.92"
    },
    {
      task: "- Reference check with Coleman - no deadline mentioned.",
      deadline: '',
      assigned_to: '',
      confidence: "medium",
      timestamp_start: "01:50:41.60",
      timestamp_end: "01:51:55.04"
    },
    {
      task: "- Schedule individual interviews with each applicant involving board members and Jerry -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "01:52:15.36",
      timestamp_end: "01:53:16.40"
    },
    {
      task: "- Propose a special meeting -  (deadline not mentioned)",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "01:54:22.64",
      timestamp_end: "01:55:23.52"
    },
    {
      task: "- How will the emergency situation impact the project's timeline? -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "01:54:22.64",
      timestamp_end: "01:55:23.52"
    },
    {
      task: "- Schedule a special meeting with Jerry - no deadline mentioned.",
      deadline: '',
      assigned_to: '',
      confidence: "medium",
      timestamp_start: "01:55:11.20",
      timestamp_end: "01:56:14.72"
    },
    {
      task: "- Narrow down the bidders to Coleman and American River -",
      deadline: '',
      assigned_to: '',
      confidence: "high",
      timestamp_start: "01:56:00.08",
      timestamp_end: "01:57:02.24"
    },
    {
      task: "- Narrow down bidders to two - no specific deadline mentioned",
      deadline: '',
      assigned_to: '',
      confidence: "medium",
      timestamp_start: "01:56:47.20",
      timestamp_end: "01:57:57.44"
    },
    {
      task: "- Get a plan of attack for the next steps - no specific deadline mentioned",
      deadline: '',
      assigned_to: '',
      confidence: "medium",
      timestamp_start: "01:56:47.20",
      timestamp_end: "01:57:57.44"
    },
    {
      task: "- Review RFP to confirm details regarding candidates -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "01:57:33.68",
      timestamp_end: "01:58:36.32"
    },
    {
      task: "- Seek public comments -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "01:59:55.20",
      timestamp_end: "02:01:06.16"
    },
    {
      task: "- Ask the board to give Don direction on the number of hours and confirm pay rate for the administrative assistant position -",
      deadline: '',
      assigned_to: '',
      confidence: "high",
      timestamp_start: "02:05:19.60",
      timestamp_end: "02:06:26.80"
    },
    {
      task: "- Confirm the number of hours to be posted for the assistant position -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "02:06:10.08",
      timestamp_end: "02:07:10.00"
    },
    {
      task: "- Determine the number of hours required for the position -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "02:07:01.04",
      timestamp_end: "02:07:59.28"
    },
    {
      task: "3. Consideration of the current workload and how it relates to the proposed 20 hours per week for the assistant role.",
      deadline: '',
      assigned_to: '',
      confidence: "medium",
      timestamp_start: "02:07:49.12",
      timestamp_end: "02:08:56.88"
    },
    {
      task: "- Monitor employee performance and adjust hours accordingly - no specific deadline mentioned .",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "02:09:28.16",
      timestamp_end: "02:10:32.16"
    },
    {
      task: "- Evaluate the CPI -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "02:10:19.04",
      timestamp_end: "02:11:27.36"
    },
    {
      task: "- Complete RFPs -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "02:10:19.04",
      timestamp_end: "02:11:27.36"
    },
    {
      task: "- Is the $25,000 budget acceptable, and if not, what adjustments can be made?",
      deadline: '',
      assigned_to: '',
      confidence: "medium",
      timestamp_start: "02:10:19.04",
      timestamp_end: "02:11:27.36"
    },
    {
      task: "- The speaker expresses discomfort with the proposed budget of $25,000 and suggests starting with fewer hours (five) for a new hire.",
      deadline: '',
      assigned_to: '',
      confidence: "medium",
      timestamp_start: "02:11:10.48",
      timestamp_end: "02:12:16.00"
    },
    {
      task: "- Review the necessity of hiring for 20 hours per week -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "02:11:10.48",
      timestamp_end: "02:12:16.00"
    },
    {
      task: "- Approve resource allocation of five hours per week and 20 hours per month -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "02:11:59.12",
      timestamp_end: "02:12:59.92"
    },
    {
      task: "- Assign new individuals to take meeting minutes - deadline not mentioned .",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "02:12:47.44",
      timestamp_end: "02:13:46.16"
    },
    {
      task: "- Start someone in the minute-taking role at a reduced schedule and increase as needed -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "02:13:33.76",
      timestamp_end: "02:14:34.96"
    },
    {
      task: "- Assess workload for minute-taking -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "02:14:20.88",
      timestamp_end: "02:15:22.32"
    },
    {
      task: "- The overall time commitment required to manage meetings effectively.",
      deadline: '',
      assigned_to: '',
      confidence: "medium",
      timestamp_start: "02:14:20.88",
      timestamp_end: "02:15:22.32"
    },
    {
      task: "- Train the new person for minute-taking -  (no specific deadline mentioned)",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "02:15:06.08",
      timestamp_end: "02:16:07.20"
    },
    {
      task: "3. There is a proposal to advertise the position at a rate of $25 per hour.",
      deadline: '',
      assigned_to: '',
      confidence: "medium",
      timestamp_start: "02:15:51.28",
      timestamp_end: "02:16:57.68"
    },
    {
      task: "3. The importance of aligning the wage with market expectations was emphasized.",
      deadline: '',
      assigned_to: '',
      confidence: "medium",
      timestamp_start: "02:17:31.44",
      timestamp_end: "02:18:31.68"
    },
    {
      task: "- Make a motion and vote on the matter -  (no specific deadline mentioned)",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "02:19:21.92",
      timestamp_end: "02:20:21.52"
    },
    {
      task: "- Authorize payment for Don at $25 an hour -  (no specific deadline mentioned)",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "02:20:07.52",
      timestamp_end: "02:21:07.28"
    },
    {
      task: "1. Determine specific needs for support from Don",
      deadline: "approving spending - .",
      assigned_to: '',
      confidence: "low",
      timestamp_start: "02:21:54.96",
      timestamp_end: "02:23:10.40"
    },
    {
      task: "- Post job advertisement with job description -  (no specific deadline mentioned)",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "02:22:41.44",
      timestamp_end: "02:23:46.56"
    },
    {
      task: "- Put an advertisement with the bill -  (deadline not mentioned)",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "02:23:27.20",
      timestamp_end: "02:24:27.12"
    },
    {
      task: "- Get a meme on the website's front page -  (deadline not mentioned)",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "02:23:27.20",
      timestamp_end: "02:24:27.12"
    },
    {
      task: "3. Approval processes for advertising locations.",
      deadline: '',
      assigned_to: '',
      confidence: "medium",
      timestamp_start: "02:23:27.20",
      timestamp_end: "02:24:27.12"
    },
    {
      task: "- Authorize the purchase of a turtle phone - no deadline mentioned",
      deadline: '',
      assigned_to: '',
      confidence: "medium",
      timestamp_start: "02:24:13.76",
      timestamp_end: "02:25:16.80"
    },
    {
      task: "- Upgrade phone system -  (no specific deadline mentioned)",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "02:25:00.24",
      timestamp_end: "02:25:56.16"
    },
    {
      task: "- Conduct a doodle poll to schedule meetings -",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "02:25:50.16",
      timestamp_end: "02:26:44.00"
    },
    {
      task: "- Conduct a doodle poll for the board -",
      deadline: '',
      assigned_to: '',
      confidence: "high",
      timestamp_start: "02:26:37.68",
      timestamp_end: "02:27:39.84"
    },
    {
      task: "- Review content of the newsletter for the next meeting -",
      deadline: '',
      assigned_to: '',
      confidence: "high",
      timestamp_start: "02:26:37.68",
      timestamp_end: "02:27:39.84"
    },
    {
      task: "- Discuss the newsletter - at the next meeting",
      deadline: '',
      assigned_to: '',
      confidence: "low",
      timestamp_start: "02:27:28.88",
      timestamp_end: "02:28:29.36"
    }
  ],
  decisions: [
    {
      description: "Approved 15% budget increase for engineering department",
      rationale: "Need to accelerate product development timeline to meet market demands",
      participants: ["CEO", "CFO", "VP Engineering"],
      timestamp_start: "00:18:45",
      timestamp_end: "00:20:00",
      confidence: 0.96
    },
    {
      description: "Postpone international expansion to Q3",
      rationale: "Focus resources on core product improvements first",
      participants: ["CEO", "VP Sales", "VP Marketing"],
      timestamp_start: "00:35:20",
      timestamp_end: "00:36:00",
      confidence: 0.89
    }
  ],
  issues: [
    {
      description: "Current development timeline may be too aggressive",
      severity: "medium",
      impact: "Could result in delayed product launch or reduced quality",
      category: "project_management",
      timestamp_start: "00:22:30",
      timestamp_end: "00:25:00",
      confidence: 0.84
    },
    {
      description: "Potential resource conflict between two major initiatives",
      severity: "high",
      impact: "May require difficult prioritization decisions or additional hiring",
      category: "resource_allocation",
      timestamp_start: "00:38:15",
      timestamp_end: "00:40:00",
      confidence: 0.91
    }
  ],
  questions: [
    {
      description: "Should we consider outsourcing some development work?",
      context: "Discussion about meeting aggressive timeline while maintaining quality",
      requires_followup: true,
      timestamp_start: "00:25:45",
      timestamp_end: "00:26:30",
      confidence: 0.88
    },
    {
      description: "What is the backup plan if key personnel leave?",
      context: "Concerns about team stability during rapid growth",
      requires_followup: true,
      timestamp_start: "00:44:20",
      timestamp_end: "00:44:50",
      confidence: 0.82
    }
  ],
  confidence_note: "Some segments had background noise affecting transcription accuracy. Manual review recommended for critical decisions."
};
