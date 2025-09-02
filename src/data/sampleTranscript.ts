// Sample transcript data based on output_aug.json structure
export interface TranscriptData {
  file_name: string;
  file_path: string;
  duration_seconds: number;
  sample_rate: number;
  is_longform: boolean;
  was_stereo: boolean;
  full_transcription?: string;
  segments?: TranscriptSegment[];
}

export interface TranscriptSegment {
  segments_id: number;
  start: number;
  end: number;
  text: string;
  speaker?: string;
  confidence?: number;
}

export const sampleTranscriptData: TranscriptData = {
  file_name: "july_12_2022_audio_converted.wav",
  file_path: "/Users/johnbolanipekun/Documents/Projects/speechai/input_audio/july_12_2022_audio_converted.wav",
  duration_seconds: 8931.328,
  sample_rate: 16000,
  is_longform: true,
  was_stereo: false,
  full_transcription: `We got a lot going on tonight because we've got a lot of stuff. So what's going on? There's five board members. You're on mute. So, how are they going to hear me? You can hear you from here. I can hear now. Hello, everyone. Hello, everybody. Hi, okay. Was everyone here? So can we call the meeting in order? Absolutely. Looks like I'm in charge. Yeah, Heidi evidently is not here. Oh, okay. I get the honors. But can we get started? Okay, I'll do roll call. It's really more of a sound check. Richard? Here. Okay. Ken? Here. Rolando here. Dan? Here. Heidi. Yeah. Not here. Hey, Ken, can you turn on the mic in front of you? It says Haley on it. Okay. Okay. Yeah, I'm using a shared mic right now. Can you hear me without mic? I've got the central mic here. Can you hear me? Yeah, I can hear you. Okay, because if I turn this on, might have feedback. Oh, yeah, no, it's better the other way. Better the other way. Okay. All right. Thanks. Okay, I'd like to welcome everybody out. Bear with me. First time I've done this. We have a consent idea. So let's get started. I just wanted to welcome everybody. Yeah, all the new people. We got some new people that have never attended meeting before. It'd be interesting to introduce them. So I actually forgot your name. That's okay now. I'm Mandy Danny. This is my husband. 3475 Christian Valley. Moved in about 11 months ago and wanting to learn about what happened. I've never been part of a CSD and I didn't know what to expect to expect. So I just kind of sit back and finally observe and learn. Awesome. What was your last name? Danny D. Awesome. Should we introduce ourselves to? Yeah, why don't we do that? So I'm Ken. I'm the vice president. Heidi's not here. So I am aware of the board member. Hi, I am Donna Leitz, General Manager. We had a major board member a while. Let's see. 40 years old. Sorry, I was having trouble unmuting. Thank you, Diana Letty here. Let me see, Greg. Hi, Greg. And then we. Hi, Dick Warren. I'm here. Oh, following Dick, okay. And then Jason and Andrea Hoffman. They are from one of the proposers. All right, good. Welcome, everybody. All right, so start with the approval of the consent item for the consent items, which consists of the minutes to the July 12th meeting or the agenda for the July 12th minutes. Approval of the June 14th regular board meeting minutes and then the monthly expenditures. I move to approve the consent items. I second that. Okay, and uh roll call vote. Hi. Ken. Hi. Richard. Hi. Okay. So, so Andrea Hoffman, okay, so so is this the uh Jason's wife? Oh Jason's wife. Okay, so I see that she's on the board. Did she have something that she was going to say? Inform? I don't know. Catherine will inform the board what the booking service that's a different person. That's a different Catherine will be coming in. Catherine is the one who is a great consultant. And she'll be coming in at 7.30. Coming in hourly. May I ask you all to project a little bit more? Because it is just a little hard to hear y'all. Thank you. Okay. All right. Then so we were saying that at 7.30, Catherine Hansford is going to be here to give us her explain her proposal. But so the next item on the first item will be Jerry. I assume Jerry. Is Jerry here? No. Oh, okay. So Jerry is not here. And so Don is going to cover for Jerry. Yeah. So, well, the good news is, is that Jerry had a really short list of what happened. So anyway, the average flow for the month was 0.48, 480,000 gallons a day. And the raw water was 1.3 MTO or I don't remember that. But anyway, it's a turbidity. We had some waterline repairs, a couple on Stanley, one on Barbara, one on Gale. And backflow testing was finished complete this time. There are 59 backflows that need to be tested. And usually the backflows that need to be tested is because they have another water source, whether it's a well or a pool. And so anyway, that's why they have a backlow. But truth be told, every new construction gets a backlow device. So when they sign up for a meter, they get the meter and a backlow device. And a backflow is their issue. And our responsibility stops at the meter, but they install a backflow device. So how many backflow devices do we have? A bunch. And only the ones that need to be tested are the ones that have alternate large source. Oh, and that's 59. So you check all of them. Yeah, and they all pass, which is kind of unusual. Usually there's a couple of them that go south and just need new debts or whatever. So anyway, the capital item said to rebuild the pump station piping, which is inside that building there. And that's still going on. The parts are all ordered. And he's going to be putting a cap on that pipe so that we can use that post a lot. And then. So this was the improvement that he told us last time that it was going to exceed what he originally projected, right? So we all agreed that that was okay. I didn't realize it was a little chill. And the idea of thumbs up to fix it because it's a maintenance item, not a anyway. And so, and then he, the last thing that he had noted that the generator proposal was received from Lawrence, he got it. Oh, so that's the end of the platform. So, Panthalope part is still an ongoing project going on. There's still some communications between some people out there and anyway, he's still working on that project. Which project? The Kenneth Lupe, the engineering for the Kenneth Lupe. And the Kenneth Lupe engineering is to connect from Gale Lane through, or from the pipe would go from Gale Lane through Sunshine Meadow and somehow go properly lines over to Kenneth Way, which is over off of Virginia. What they're basically putting, trying to propose that project is because that area, if never used to be a major break, it's going to affect a lot of people. So what they're trying to do is put a bypass in there. So if they have to shut off part of the system, we can still maintain order to a portion of it. Right now, the way it is, there's no way to shut it off if we're going to make a break in there. So the bypass will allow us to still serve the customers while they're repair or replace whatever we need to replace the area. So it's kind of like the looping is kind of like the water's always coming in from the left. If it's looped, it will come in from the right if you turn off from the left. That's third-gate term. I'm a third-gate teacher. So Diane, did you have a comment or question? Yes, thank you. One of those callouts on Jerry's list is, of course, my resident, and it's still related to the PRT debacle with the fans. So rather, I know that Jerry, you know, gets however apportionment for that, but I'm just wondering, I don't know about the other addresses, if it's somewhat still related, because that needs to be a different accounting for it to go back to PRT, if that's my opinion. So I'll rest with that. Thank you. Yeah, good point. So let's pause that. So there's these things right now are not, well, I should check on Diane's, but on, because that is everything on Diane's thing is POT. And there's, I'm going to regress just for a second, just so that everybody's on the same page on what's happened. When the tank number two came online, there must have been some grid in the pipe because they kind of sandblast the whole gut, the whole inside of those giant tanks that we were standing to. And the sandblasting material, which we refer to as grit, some was in the outlet pipe. And it magically just blessed Diane beyond belief. And some of her neighbors, which is unusual about the whole thing is she's like three-quarters of a mile pipewise away from the tank. And so anyway, so anyway, these other waterline issues are not. Yeah, so there's a PRT the charter. Oh, absolutely. So yeah. For all the so far, they've been billed, but they've been paid. Yeah. Well, we've got one outstanding, we've got a combination invoice of, there's grit, there's a couple of doors down from Diane, as well as, and that's the, it's Guy and Gail something. Anyway, so that invoice, as well as the tank, you know, there are some repairs done to tank number one that needs to get reimbursed. So anyway, we're just waiting for the chat. Let's just see. So it's in process related process. All right. All right. So there's a lot of house on the system. On the end of the way, another end of the lockhouse like now. Is that Dan talking? Is that Dan talking? I can't hear a word from Dan. Hi, it's Joshua. I was just wondering if there are blow-off valves at the end of trunk lines. Joshua is asking, are there blow-off valves at the end of the different mains? And the answer is that we have hydrants at the end of the different mains and at intersections and to blow out the grid and whatnot. So they do get flush for the long fall because we have to test them. It's an annual exercise. So is that everything on Jerry's report? Yeah. Okay. So that means that I can just move right on. Mr. Monitor can keep on going. Okay. I don't know if there's a comment or question from anybody on the board. Anything with Jerry's? Okay. Anyone from the audience? Anybody? Okay. Good. So we can now move on. So since Catherine is going to give us a report at 7.30. Yeah. So if I can. Let's just keep on going and then this will just be perfect. Okay. Just show her and do it. Yeah. So there's no correspondence on this agenda, although I just received correspondence from a lady on Allen Drive, who where the road is a road issue. And it's where the crown of the road is very severe at her driveway. And she needs the district to flatten that part of the road so that her cars don't keep sweeping the road. And I mean, they've kind of been dealing with it for about five years, but she's got some medical issues and it's going to have a big van going in and out of the wheelchair kind of thing. And so anyway, she's asking if the district solved that issue. And so I'm working on that whole issue and I'll be reporting back next month. Okay. Yeah. So I just need to measure the crown. And I'll be asking for to help measure that crown. Okay. All right. That's fine. Cool. Is that our road or is it far? Okay. You can, if it was Placer County or I don't know. Oh, well, public works number is. I'd say now, there's some good news. I got some good news here. The USDA tank project, the loan closed like just a couple of days before the interest rate was going to bump by another percent, 1%. So the history of that is that we were trying to close the loan, which is not just like going to the bank and signing things. You got the bond council and all the magic. And so anyway, we're trying to close it at two and an eighth, and then it just didn't make it. And it was really on their, on USDA's side of the problem. You know, it's their issue. And then, so then I was like, he voted, you know, try, okay, we're going to close this thing in May, you know, and May came and went. And so anyway, and then it almost didn't close in June in July 1. It's when the interest rate moves to go up. So anyway, long story. Oh, well, I gave you a long story. Anyway, the short story is, is that we got 2.5%, which is a huge savings. And the guaranteed interest rate from USDA was 3.7%. So that would be like worst case scenario, but we dodge that goal. I just want to make sure I'm still recording. The administrative assistant job description that's completed and I'm sure it's attached on the documents. And I just want to shout out to Richard for coming through it. And it's just really nice to have extra eyes looking at stuff. So we're going to review that on the action items. Okay. So anyway, thank you, Richard. Well, you heard my roads update there. And hopefully this next month, I'll either have a survey of the roads or a couple of proposals from contractors. But I'm not having good response from the county. They don't use outside inspectors on their roads. And I have a call and no answer and another call and then they'll answer, seeing if there's anyone on the inside that's available to do some inspection on the side for us. So because it would just be really nice to have an outside inspector inspecting the roads who knows when is enough oil on the road and when is not. Because if there's not enough oil, that's when you see that you can still come off. So didn't we have one? We were looking for more. A couple more proposals and we haven't yet found anybody. Right. And where did you look for that? From Flasher County Public Works right there. And then a call to CSDA if they have it out. But they don't. So what would be the next, where else can we look for that? Oh yeah, maybe Chris Coward, a former board member might know. Oh, yeah. Yeah, that's good. So anyway, the RB was opened, or you know, the proposals were open. And we had, we were coming in good. We were going to have five proposals. And then a week before it went to four, or maybe it was two weeks before, it went to four proposals. And then on the morning of 6.30 a.m., 6.23 a.m., it went to three. And so the three proposals from Jason Hoffman's business, the American River backflow, and then Coleman Engineering, and 49er water. Those are the three that came through. 49er water is a repeat proposal. So the other repeat they opted out? They didn't propose. They didn't answer that the same proposal. Right. I think the price was kind of like, yeah, we really don't want to do it. Yeah, we don't want to do this proposal. Just saying. And then the last piece is about the PCWA consolidation letter. And so PCWA sent the district a letter. And oh God, they sent everybody an individualized letter so that you have your name on it. And I correct the book. But if you just look at the one that is online from Heidi, it's the same exact one. Just different name of it. So anyway, is this okay time to go over that real quick? Yeah, Catherine's not in the meeting yet, so anyway. Okay, yeah, let's show it. She's currently attending remotely from Parkland. She's just getting out of a meeting in Sacramento. So she's going to apart and zooming in and then driving home the trucky afterwards. So it's important. So anyway, when you hear that, then I'll stop talking. Okay. Anyway, so PCWA consolidation. Just a quick definition of consolidation, which Heidi and I met with PCWA and we just talked through kind of the nuts and bolts of the letter and just asked some questions. And it will still be open to having more meetings and more questions. But there were a lot of questions just from the letter itself. So anyway, my first question was, do we have to actually hook into your line? Why do we have to do that? And they said, well, that's actually the definition of the consolidation. Is their water lines connecting to our water lines? And their regulations are they need to have two places. That they're looking into our line. And so the two places which you would see on that map, one was at the end of Pondarex and one was at the end of Westridge Avenue. Kind of the, if you go from the water tanks and you go across Ponderex and go to the very end, you know, hook in somewhere out there. And so anyway, so that's what the consolidation, the definition of it is. And it would, and they looked at it. There's a partial consolidation and then there's a full consolidation. A partial means that they would, I'm not sure if I want to go into that, but a full consolidation means that they would take over the whole water side of things for the district, the entirety, whether it's billing, the water treatment, you know, the labor for that, and the distribution lines, everything. And so the concept is that to consolidate, to be fair to their ratepayers, PCWA ratepayers, all 30,000 of them, is to match the age of their system to the age of our system. And the numbers on there look all nice. It looks like it's highly technical, but it's really just an overview. It is more of a ballpark figure. And the trying to say, so anyway, the water plant, they deem the water plant as being very sufficient to run the district, you know, putting water into the water lines and no need to put treated water from them into our lines. And that's why I asked, why do we have to connect in if we don't really need your water? But it's kind of like their safety net in providing water to the district. If our plant goes down, they're the safety net. So don't we get our water from PCWA of our raw water already? Yeah, but they'll make the treated water connection. Oh. So we get raw water now, and what they were suggesting is to get a redundant treated water from their plant. Exactly. So there will be redundancy of treated water coming from a piece of raid plant. Ramondo, could you speak up a little bit more? Because I only got just pieces of what you said. Thank you. Sure. I was just answering Ken's question, I think, is we currently receive raw water from BCWA. If we were to do the consolidation, they require that there be redundancy for the treated water. So they would be connecting to our treated water from their plant as well, even in two places, even though our plant is more than sufficient and meets their standards. And in doing so, because our plant is sufficient to do that, there's no, in the letter, you'd see that there's nothing, all of zeros for a connection fee, because there's no, they don't have to expand their plants in order to serve our community because our plant served it well enough. And so the first thing I asked was, well, shouldn't we get a credit on that release on the tanks? And they said, you know, we can talk about that later when we go from an overview, when we start digging deeper onto the stuff. And saving me from putting my foot in my mouth is Catherine coming in. All right. So anyway, and I'll go back over, I'll finish up on the consolidation. But anyway, the thing that they said that that letter has no grant money associated with it. And so they said that the consolidation for that, for a full consolidation, because it's less than the partial, is $6.8 million. And then they said that there's a possibility that there could be like about $10,000 per connection to offset that, which is like $6.3 million or we'll just say $6 million just to be a possible $6 million to offset that. So anyway, I just want to welcome Catherine Hanson. Transferred to the meeting. And she's in the lower right corner for me. Catherine, can you hear me? Yes, I can. Oh, awesome. So Catherine is coming to the meeting because I think, and she does great, well, she'll explain how her business can, what they do and how they can help us. So before she does that, can either Catherine or you explain what's the purpose of the single part? Is that right? Yeah. Oh, the rate study. So, Catherine, if you're ready. Yeah, I'm hi. I'm sorry. I don't have my camera on, but I'm currently traveling, so just not in a good place to do it. So sorry about that. But pleased to meet you. My name is Catherine Hansford. I'm the principal of Hansford Economic Consulting. And I've been in business since about two, well, since 2005. I'm located up in Truckee. And I do a lot of work with water utilities. I primarily work with financial questions. I do rate studies, fee studies. I have helped with consolidation, merger, acquisitions. I've done appraisals of water utilities, both public and private. I've done expert review of freight cases. And so I primarily work in the water utility business. I also do work in other areas. I work with roads funding, parks funding, public safety funding, and I work primarily in California. And I primarily work with smaller cities and special districts and often of a rural nature. So I would say that's really my niche is in working with the smaller communities and in particular communities that I work with a lot of volunteer boards, a lot of small rural utilities that need help with applying for state funds and federal funds, for example. So that's really my expertise. Locally in your area, I've worked with Midway Heights. I've worked with them on getting funding for a tank project and I also helped them with their last rate study. And then I've also worked with Heather Glenn. I did an income survey for them and then I also did an analysis of a consolidation effort with PCWA for them a couple of years ago. Well, a bit more than a couple of years ago now. Did Heather Glenn consolidate? Oh, you just cut out there. Could you hear me? Did Heather Glenn consolidate? They did not at the time. I don't actually know what they're doing right now. Jerry would know if he's around, but no, at the time we did the work, they did not. So I received a call from your general manager asking me about my services. And I said I'd be happy to hop onto a board meeting and let you know that I'm fairly local and I do this work. And if that's something that you would like assistance with, then I would be happy to put together a proposal for you. Do you know, if we increase rates just because of inflation of our costs, do we need to go through having a rates study? Yes, you do. Yes. You have to demonstrate your cost of service and proportionality. So in California, there's some very specific requirements. I'm sure you've heard of Proposition 218, and you have to follow those. So anytime that you are going to increase or adopt a new fee for water, sewer or refuse services, you have to go through this process. Now, you can adopt rates that have an inflation factor built into them, but if you do that, that only can go out for Five years. So statutes require that you can only apply a cost of inflation factor for five years. To piggyback on that question, does it require a vote when we're just do we have to get approval from the ratepayers? No, it's what they call a protest procedure. So yeah, you just notify everyone and then if there's no majority protest at that point in time, you can then adopt the rates. Are there any other questions? Any questions? Diane, did you have a question? Actually, pardon me, Catherine, you actually jumped into what I was going to say, and that was that five-year scenario where you do just do the notify, because I was telling the board, actually, you know, we can't continually absorb the inflationary rate. And there is the provision, and I sent them the code to that a couple of years ago. Now, in terms of a CIP project and so on and so forth, that's a different scenario. So you basically, you answered it. Thank you. I wanted to understand a little bit about the work that you do with the merger, such as if we were to merge with PCWA, what would be kind of the services that you would provide in that process? And maybe explain what you did for Glenn. Yeah, so it's really looking at what is the impact financially to the customers. Are their rates going to be higher or lower upon consolidation? Recognizing that's only one factor, of course, that there might be other good reasons to consolidate. It's not just a financial decision. But that's primarily what I was doing was to see, as you had mentioned, I heard you when I jumped on talking about the amount of grant money that's available per connection. And, you know, that does differ depending on the income level of your community. But it can have a big impact. So essentially doing a financial analysis of what does the picture look like given the costs after consolidation versus if you were to continue as your own entity and knowing what capital improvement projects you have on the horizon that have to be done. So in a merger like that, is there any opportunity for negotiation? Basically, we got a quote from PCWA saying this is what it's going to cost. Not being, never being involved in one of these mergers. Is there an opportunity where we do some analysis and then we go back to them and say, your number's a little bit off and here's why? Yes, you certainly can. PCWA, for lack of better words, is a fairly big dog. But yes, there's always room for negotiation. But that's where the state money really comes into play. And talking to the project, who would be your project manager, you always get assigned one by the state. And talking with them and seeing what they can offer is a big part of the equation. So Catherine, if we go into this process with PCWA, at what point would your services be more important? When would your study make sense for us to do? For instance, PCWA says they want us to put down $36,000 to start the process. At what point in the process do you then tell us your version versus theirs? I'm very curious why they would want $36,000 from you for a start. That's it's for it's for a study and grants, grant study, and it's reimbursable to okay. Well, I would say that the engineering work needs to be solid before I get, you know, if I was to be asked to help, because you've really got to know both on your side, I mean, PTW has given you an estimate of the Cost. I don't know how comfortable you are with that. Um, what you know, you'll do we, but neither do we, that's why we're talking to you. Well, I do, I do think you would have to have that vetted out first, because any analysis I do is based off of the costs from the engineers. And if you're not all comfortable and on the same page with the costs, then you know, you'd be asking for a round two with me, probably. So that's what I would suggest is getting some engineering work done, getting, you know, feeling very comfortable with what these numbers really are. And then I'm not sure exactly at what point these things tend to sort of just play out. It becomes obvious at some point that, yeah, we need to look at that ourselves and not just not just what PCW is saying. Or, yeah. Okay, thank you. Diane, do you have another question? Yeah, Catherine, if you 2019, the district already had a three-phase plan together for the transmission lines because obviously the water treatment plant is now fully completed and funded. And is any of that already that rate study and that analysis of engineering that that rate study was based upon? Is that a pass-through that can be used still obviously adjusted for current costs, right? But most of that legwork was done in 2019. So how much of a savings or applicability is that for somebody like yourself? Thank you. Very, very applicable. From 2019, I'd say that's still reasonably fresh. It's within the last five years. The only caution I would say on that is that normally I would just apply an inflation flag, excuse me, an inflation factor to that. But I would just say you might want to have an engineer do a review of it because currently costs have spiraled just crazily, frankly. And I don't think... Well, Jerry is the one who did the original analysis for that. So you're familiar with him and that's what I mean. Yes, Jerry and I worked together a long time ago. And I've since seen him in the room or talked to him with both Midway Heights and Heather Glenn. Yes. Sorry, I have another question. I'm going to change the gears a little bit. Going back to away from the merger process, I wanted to see, could you give us an estimate of how long the process is to develop a rate study? Yep. So I usually say it's a six to eight, eight months process from start to public hearing and resolution adoption. It can go faster and it can take longer. Rate studies, I would say, highly recommend. They're not something to rush. They need to be done with transparency in the process. There needs to be some community outreach. And if it takes a little bit longer, I always advise take a little longer because it's much better to have a rate study that people understand. They might not always like it, but if they can understand it and understand the need for the rate changes, then it will go much more smoothly. So that's a typical timeframe though, six to eight months. And that's assuming that the engineering costs are predetermined, right? Yeah, there can be a little bit of back and forth in the process, but sometimes I'll start out with a CIP from an engineer and it becomes clear that the rates would just need to go a bit higher than is felt to be acceptable by the community. And in that case, we go back and look at, is there something that we could take out, for example? So there's usually a little back and forth, but generally, yes. I do need to have the numbers from the engineer for the CIP. Thank you. Catherine, my name is Dan. I have a question regarding the specifically on a race study. After you complete it, what services do you provide as far as setting up a meeting with the community and stuff like that, explaining the rate study to the community, and such forth. Yeah, well, I do recommend doing that. And I can do it two ways. One is I just pretty much do it myself with the help of the district setting up the meeting, getting the room, noticing, and so forth. Or I can bring in a sub-consultant who works with me a lot on rate studies and she can help with doing everything from noticing to setting up the meetings to talking to key stakeholders if there are any. So either way, obviously, if I bring in the sub-consultant, it does cost a little bit more, but I have done that with projects and it has certainly paid off. So if there's any concern about community concerns about it and the need for a lot of explanation, you know, and also putting things up on your district website. Shaylene is who I work with and she writes all the script for that if that's something you would need. But I have also just done it where I've kept it pretty basic and just worked with district staff and done it myself. So I can do it either way. Do you typically put a PowerPoint presentation or something like that together for the community of you ahead of time so that they kind of know what's coming or do you just do you just do without the meeting? I usually just do that at the meeting. And then depending on what kinds of issues there are, we can do a workshop in a couple of different formats. And depending on the feel from the community, it can be more formal or it can be more informal. It could be sort of more of a round robin where the general manager says something, the district engineer says something about the state of the system, why we need these improvements, and then I say something, or it can be just a presentation from me. So that's something I couldn't tell you right now. Yeah, I was just trying to get a feel for what type of services you provide with, you know, with the rate study. So I guess that's what my question was. Yeah, well, I do like to do an in-person public workshop at some point in the process. And usually that's after the draft study comes out and the board has heard what the potential rates might be. And there might be options too. I don't know if there's, I haven't looked at your rates, to be honest. I don't know if there'd be any need to look at change in rate structure or if it's just simply a change in the amount of the rates. I don't know. Okay. That's all I have. Thank you so much for answering that. Yeah. One more question. One last question. Would you be able to provide us a rate study that you did for one of these organizations about the same size as ours? Yes, absolutely. You'll mind sharing that with Don and then he could share with the rest of us just so we get an idea of what that looks like. I will. Sorry. I just want to confirm, did you only need a study if you had a majority protest, or is it per state law, you have to have a study to do any rate increase? If you have a majority that's okay with it, you still have to do the... You are going to want to do a rate study for sure. Okay, so the majority, if your majority is fine with it, you still move forward with purchasing the study. Well, I mean, you know, that's a decision for the board. If the board felt comfortable with the work that they had done internally, you don't have to have a great consultant. The thing is that you're better covered. From a legal basis, if you do, because a rate study will cite industry standards, it will cite AWA manuals that it's drawing this from, the methodology from. You're on much better footing if you have a rate study. So I don't know if that was clear, but we don't have to hire a contractor. We could put a rate study together. It could be, for lack of a better term, half-assed, and we can present that. But then someone can challenge it. And then we don't have a bias for raising the rates because it's flawed, right? So that's why it's a very good investment in the proper rate study so that the rates that you're proposing aren't flawed, that they're based on valuable present date data. Exactly. Yes. Very informative. Any other questions from anybody on the board? Diane, go ahead. I only just had one closing comment because I wasn't sure who was in the boardroom with you. I think it was the new neighbors. Historically, the board has actually been able to get a FAP grant from PCWA to cover some of this rate study work. So that would be something obviously that it would be, you know, sought for again in order to compensate Catherine or whoever the board chose to do that with. That generally is something PCWA is amicable to doing. So I'll just yield with that as my closing comment. Thank you. Thank you, Diane. Thank you, Catherine. Appreciate it. So, well, I don't know what to say, but thank you very much. All right. In the near future, the board's going to have to make some decisions on the future, and we're very likely going to need the help. So we appreciate you coming to the board and letting us know about your service. And if you can provide us that study sample, that would be great. And we likely will be talking to you in the future. Okay, thank you. Have a good evening, everybody. Thank you so much. Okay, bye-bye. So, Donna, completely. I'd like to just kind of finish up with the consolidation, Sonia. Okay, anyway, so the letter did not include any grants, possible grants. And right now, there are grants available that are not income related. And so it's because California state wants the small guys to get merged in with the big guys. And what their reasoning is and why they want it, we can all make up our own reasons for that. But I think it has something to do with controlling the droughts and the legislation that would go, you know, for large, sometimes when there's a drought conditions, it does not affect the smaller water companies. But larger ones, they can put the noose around them and hold them to it, hold their toes to the fire on it. So to make it clear, if we consolidate, we may be able to get a grant, but if we don't consolidate, we don't have a chance to get a grant. Right, because a grant is for consolidation, not just improving in infrastructure. It's simply the money is to pay PCWA, so to speak, to allow us into their whole. Well, yeah, just to be clear, I think you're asking a different question. Oh. So yeah, so what PCW is saying is that there is a lot of accessible money for any community, regardless of income or whether they're a distressed community or not, to get money to consolidate into the bigger picture. Correct. That's not saying that there is no money for other things. For the CIP projects. Yeah, there might be money for that, but that's not what he's talking about. And so, and the last part that I wanted to talk about was what Rich was touching on. That PCWA, they have a certain amount on their budget to allocate towards small districts to consolidate. But it's not in their ratepayers' best interest to go through all that. So they just give just a small amount of hours of their time to devote to it. And so they still have some leftover time to devote to the PZW-8 fund consolidation. And so now the next step would be to start talking to the state and seeing about different grants and whatnot. And seeing how the state would view this consolidation if they think that, oh yeah, we can pump all kinds of money towards that or not. And in doing so, they need to dive deeper into their engineering as far as, you know, this was, they call it a desktop, you know, it's an overview estimation and they want to go deeper and a little bit finer tuned numbers. So anyway, in order to do that, they thought that the state would reimburse us for that kind of thing, even for the engineering to look into the consolidation. And so they're going to use their extra hours to keep looking into it. And then they'll circle back when they run out of hours and then come back with, hey, we think that the state actually is interested in helping out the district to consolidate. So you're saying that DCWA will actually go to the state and see what kind of appetite they have for our merger? Absolutely. Okay. Consolidation. Yeah, yeah. Yeah, because it's in their best management. Well, yeah, I'm surprised that PC varies. Well, a lot of dollars attached to it, so that's why they don't have anything. One quick question that I had was regarding the consolidation process and everything like that. You should probably explain a little bit to some of the new people why we're even entertaining this. Because we have a plant, the plant's good now, but we have a lot of pipeline that has been in place since 1962. It's roughly 60 years old. Okay, and there's arguments. It's there's different, all different, because five or six different contractors and companies built this system over the years. Yeah, something like, something like five or six of them. And although we know where most of this stuff is, there's a lot of unknowns. And because of the age of the system, we've had pipes break and we get significant costs in digging it up and repairing the pipe and all that kind of stuff. And there's some arguments now. We have what's called asbestos concrete pipe, which is generally what was used back then. And we're getting all kinds of estimates as to what the surface life of this asbestos concrete pipe. And then there's other non-asbestos concrete pipes, all different sizes and shapes. And we are seeing different areas where the system is starting to break down. And the costs are going up to repair and replace this. So we're trying to be proactive and saying, okay, if we eventually have to replace all those pipes, but one of the big arguments is some service life is 110 years and some other service life is like 30 or 40 years. And we've already gone past that. So that's the big ongoing right now. So that's why we're looking at this and saying, okay, we have to plan for this. How are we going to do it? What's the best way for us as a district to work to make it as economically feasible as possible? And that's where one of the things that came in was the BCWA consolidation. If they come in and absorb the one set setup, the partial consolidation, I don't believe it includes all the pipe replacement and everything else. But the full consolidation does include all that. And so that's why there's a big broad range of costs and everything else. So that's, and we're trying to figure. out what's the best option for us so yeah so there's another part to that too that at least the year ago that jerry the current operator said that he wanted to leave you know in the district and that's you know what we're going to be dealing with we have some bids but during that process i know i was on the committee a year ago that was looking to decide what to do about jerry's departure one of the ideas was to consolidate with pcwa and we had other ideas back then one was to do exactly what we're doing get other bids like we did and another idea was maybe we could do an in-house uh you know hire employees those are the three ideas the hiring the employees kind of disappeared um the pcwi pcwa idea is still kind of hanging in there we had meetings of pcwa a year ago on that exact subject and so this is took them a year but they finally got us a proposal and but ironically it's the same time we're getting proposals uh and have our rfp that was you know we got we're gonna vote on that hopefully later on you know action items that which i think is kind of ironic that they both came in on the same day i don't think that was planned so yeah well just be clear though they're not independent of each other right i mean they're independent of each other because we need to move forward with some sort of operations in the meantime before correct i don't know how long it would take to complete the consolidation or whatever so we need to take action on the rfps as well exactly the consolidation is going to take years yeah so five years we just need to we obviously will need to get somebody in the meantime and so yeah the rfp discussion needs to go forward and we don't know yet when jerry says he's done but maybe it's when we figure out which rfp we get exactly yeah um okay good so um thank you don't that on your report can we move forward to the second item perfect items okay perfect so i'm really sorry i just have to listen to me a bunch but anyway the first resolution is uh um so before we go on with the action items can we circle back to the catherine discussion real quick sure yeah so so i just want to understand is that where the board stands is this something we want to pursue um or not or is it we're in a hold pattern until pcwa tells us if the state has an appetite for support you know um supporting the consolidation or do we want to talk to her about a possible rate study in the meantime so um what does anybody have an idea what the cost would you ask to do rate study what are we talking about i have no idea that would actually go to an rfp well she she told us directly it's too early right too early for what to do a rate study she said we need to we need to play out the consolidation proposal from pcwa until we do a rate study in the meantime we need to get an operator to operate but we need to play this out over a longer period of time she said do not do this quickly um she was pretty clear yeah so she you're absolutely right she said don't do this quickly so it takes time so that's what i want you to consider it takes time and there's two different things that we're talking about one is providing consulting services to support the merger that's one thing that's down the line that's possible the other thing that we need to consider is in order to keep the district running into the future whether it's for a year two years five years do we need to consider a rate study to support the operations we know that our costs are going to go up based on based on the um rfps that we already saw so i don't i i i i think it would be a mistake to wait to see what pcwa is going to do before we consider a race study so so that's my point so and it takes time like she said and we want to do it right so that makes sense richard uh but we're not just looking at pcwa we're looking at current costs including Operations, especially, not to mention the CIPs that we've been talking about. Well, to me, we need to have more discussion about that before we jump into a rate study. We didn't get any numbers on what a rate study might cost. And we don't know what our operations cost will be. So we're in a situation where if we do it now, I mean, the inflation's taking pipe costs over the moon. There are a lot of things that we need to look at. So I wouldn't vote to do a rate study yet, but we need to keep looking at all these numbers, I think. Yeah, I agree. And we haven't yet decided on the operations, if we're going to accept any of these RFPs. So we're like maybe 20 minutes early on Rolando's proposal. But if we do vote on and approve one of these tonight or soon, then immediately after, I think that we need to decide how we're going to cover the cost. It may double from what Jerry, I mean, at least from the proposals, one is double of what Jerry's was and one is a little under double. So I think that's what Rolando is referring to. Does that make sense? You said a couple of things, Ken. So first of all, I don't think we should vote tonight on those RFPs. I only got them on Saturday night, maybe, and I haven't had time to look at them all. And we don't have Heidi here, which would be a mistake if we had a vote on such an important thing without all the board members. And so I think that's premature. I think Rolando's proposal to have a rate study is a little premature, that's all. I just also think about is that we also have a loan that we have to pay off now. So if you pay attention to the financials and how much our expenses are going to be, I just want to make sure that everybody's aware that we have to cover our costs. Absolutely, Rolando. I understand that I came in here as Ken did with all those financials in our faces. We just have to be careful that we do it right now rather than doing anything too quickly that might really screw up the long-term future of the whole district. We need to be careful for our constituents. So because I'm new to this whole process, I've been for a year since I have been involved, I've been saying we need to raise the rates. I don't know the process. Evidently, we need a rate study from this conversation in order to raise the rates properly. And so that's why we're having this discussion right now. And so, I mean, I think your point is, of course, we're being careful with our money, but we can't, we need the rate study to know, you know, evidently to know how we're going to proceed with getting revenues to pay all these upcoming costs. And I don't know when we need to do that, but, you know, so that's, I think that's what I don't, I'm not proposing that we vote on it tonight, having Heidi here and thinking about it for a month, you know, obviously there's wife, but yeah. Well, I was just going to say, she was, Catherine was real clear about, you know, before you engage in the race study, you need to have the engineering done first. And part of that is that we may want to increase rates and build into that, not just covering inflationary issues, but also CIP projects for the next couple of years. And so there's a lot of decisions that need to be made before going out and doing an RFP for rate studies. And so, but the time's getting closer, I should say, is definitely getting closer. And as far as how to pay for the increase, I'm kind of ready to talk about that in just a bit. Okay. I mean, I could talk about it later on this evening, but I think that we should just get on. There's no action item. For the rate study at all, there's no action items for that. So, anyway. Yeah, so I would. Diane, why don't you go ahead and put your something? Diane? Always right. Yes. Okay. I think if I might suggest that this is actually in three big chunks that I can see immediately. One is the smaller hurdle to get over, and that is actual cost increase through inflation. Okay, that has a wholly different set of rules, as Catherine alluded to, and I already knew about, is so long as that can be paid off within five years, that has virtually no hoops. Anytime you're doing a CIP for a major project, such as the Kenneth Loop, that is a separate issue and maybe more prioritized because where the failures are in our system is not necessarily in the cement pipe. And even Jerry admitted it could have 40, 50 more years. It just depends. And when the earth moves, even if it was a brand new pipe, it still could rupture it. That's not the point. The point is, is you look at these at three different stages, three different projects, three different studies. And if you propose it to, I think the FAP grants have to be in February. And you tell PCWA, just like you did with the generator, just like you did with George's rate study, which was, I believe it was $14,000. And almost all of that was covered by the grant from PCWA. So you propose the grants for February in three chunks. This way you can do them in the proper orders. So you've already, now you're obligated to what I know of, it's a $37,000 grant you got last year to do the Kenneth Loop survey, right? Now that's somewhat probably has some caveats to it. I don't know what that grant says, that you have to act on it within a certain amount of time. I don't know that. But I'm suggesting that usually when you get a grant, there's contingencies that go with that. So maybe the board should be looking at this in three projects, if you follow me. And in far as PCWA consolidation for Dick's benefit mostly, I went with former board member Lynn Cook, myself, Tiffany Vanderlinden. We went and met with two of the engineers at PCWA in 2019. And roughly at that time, just to buy in was going to be at around that same price, around 10,000 each to just buy into their system. Now, I did the rough estimate on this. And right now, as it stands, if all the pricing stayed the same, it would cost 630 parcel owners almost $20 million more to replace those pipes the way it stands right now because we're not getting credit for the water plants. So on that basis alone, there's no way. I mean, I don't know about you, but I'm not, nobody wants to pay $1,000 a month for water at the end of the day. So something else has to give. And we are a subdivision of California. We can go to California ourselves and assert ourselves. Just because PCWA has an in there, you develop an in. I will call them. I don't have a problem. I call the president. And Don knows I will. So I yield with that. Thank you very much for the floor. I hope you weren't raising your voice at me because I don't think I deserve it. Oh, I wasn't raising your voice. Some of the things you said I don't agree with. Like inflation will be paid off after five years. That doesn't make sense to me. No, that wasn't what I said. No, when you do. Well, you can listen to the recording. I don't want to get into a back and forth right now. I understand that law. I understand that law. Sir, excuse me. You're calling me out for something that I said. I'm trying to clarify it for you. It is not that. I said, if you have a cost pass-through, when you decide what the lump sum is, it has to be paid off within five years. So if you say your cost of living increase in that projection and what you need to do to offset it, that amount that you're asking the ratepayers to pay has to equate. To being paid off in five years. So I hope that was clear. Okay, Diane. Thank you, Diane. We appreciate it. Let's move on. I think we need to go into the action items and I want to turn that over to for you to announce, you know, to go with the first two anyway. The first action item is to put a direct charge on parcels. I believe it's anyway, several parcels for the standby water charge. And the standby water charge is a $60 charge and it's $60 because of Prop 218, we're not allowed to, unless it went to a vote of the people that are affected by that, they would have to increase their agree to increase their own rate. But anyway, it's to put a $60 charge on those parcels. And then it's what we do every year. So how many of those were there? You know, roughly? It was like 53. 53. I think it was 53. It was more. So the charge is $60, the standby charge for the non-customers. Future customers. Future customers. Okay, so this is the same proposal, resolution as is every year, correct? Correct. Just there's been a few parcel numbers added to it because like there's some parcels like on Stanley that were that were granted water, you know, that we would serve them water. So they'll give you more parcels to add to it. So what they did is on that family, they split a lot. Yeah, and then they put a whole bunch of houses on it. Okay, so is there any before we vote on that? Is there any comments from the public? We'll start with the public. Anybody have a question? Okay. Anybody, any more, any comments, questions? I'll just make a motion to approve the resolution to the standard chart. Anybody second? Okay. Dan seconds it. Dan seconds it. Okay, so I'll do the roll call vote. Okay. So who proposed it? I didn't hear the okay. Thank you. Yeah. So I can. Oh, hi. Hi. Yes. Dan. Hi. Rolando. Hi. Richard. Hi. Okay. All right. And then the second resolution is a direct charge on a bunch of different parcels in what we affectionately call the Gale Loop area. And back in 2008, I believe, the pipe was extended to 65 different parcels out there. And they voted it in. They agreed to have that pipe extended. And then last year, the loan was refinanced through Bond Council. And so then their rate dropped actually substantially. And the number of years to pay dropped substantially as well because of the change in interest rate. And so anyway, now there are 66 parcels because there were 65 in the inception. Now there's 66 because one of the lots was split. And so just a little bit more money is being collected. And so anyway, it's for less than $700 per parcel. So anyway, the same process comes from the comments or questions about what that is from the audience? Any comments from the board? Questions? Is the deal to the people affected by it are being aware of this? Oh, yeah, it's the same. Price that they had last year. Yeah, but it went, it went down. So they're happy. Okay. Well, yeah, I know it went down because of the refinance. Yeah. Okay. I'm okay with it. Okay. I'd like to make a motion to approve resolution 2203 to authorizing Flossar County to place a direct charge on the tax roll on behalf of the Gale movie session. Do we have a second today? A second. Okay, we're all on a second, Seth. I'm just doing that, not because I want to be annoying. I just want to make sure that everyone hears it. And then the roll call vote. Richard? Hi. Ken? Aye. Rolando? Aye. Dan? Aye. Thank you. Next on the agenda is a survey that we don't have to find it. It would go out to Mike. So how would that work? When would we send that out? And I know I got it here somewhere. Who put this survey together? Here it is. It was never on the agenda. It was never on the agenda for the board to vote on to have this survey done. Initially? Yes. And I would suggest putting it on the next agenda for the next month if it's that important. Okay. So last month, what she's saying is that in order to have it go, have an action item here. It needed to be an action item last month. It needed to be an action item on that. The same thing to approve a survey to go out with those. Yes. Why is it that the first two didn't have to be an action item? Because those are every year. Those are resolutions that happen every year, correct? It's the same thing. Okay. No, she's talking about procedures. Right. So it should be on the agenda. Is that correct? Because it's supposed to be on the agenda. Then we put it on an action item the following month. Is that correct? Is that the proper procedure? Exactly. So is that, is she correct on that? I don't know. She has a technical missed. Oh, okay. Yeah. But just to say, you know, we've been a small, well, we're still a small district. But he, in the past, we've done things kind of like this, where it's like, you know, we're sitting around the table going, hey, you know what? We should be doing this. Hey, Doc, can you do that? And then I put it on the agenda next month. Yeah. Yeah. To expedite it. Yeah. So can I ask you, Joanne, is there a reason that we don't, can we, that would it'd be better for us to vote on it next month, I suppose to today? I think, first of all, the reason why it's on the agenda and for the board members to decide if we need this survey to go out. And then the survey, if they all approve for the survey to be sent out, then they decide what they want on the survey. And then it's presented at the next meeting. And then it's open for discussion. Nobody has been able to discuss this because it hasn't been an agenda item. So you would like to see the question of the survey to be first discussed and then approved, and then later voted if we should actually send it out. I think that's the way what Diane has her hand up. She's probably the other thing is there's only four of us here tonight. So maybe this in the interest of including all of the board members, it may be reasonable. So that we have the whole board. Yeah, and so the whole idea of the survey needs to be discussed at the meetings and then why we want to do this survey. And then the board members decide, they vote on it, say, well, yes, it is a necessary thing that needs to be done, even though we haven't in the bylaws. And then if they say yes, then Drawham draws one up, and then it's discussed at the meeting. And if we're following that meeting, but that has never happened. Yeah, and we didn't talk about it once more. I couldn't hear what Rolando said. Oh, say it next. Sorry, Rich. So I recall last month we talked about this topic, and I think we might have had not an action item vote, but there was a recommendation to move forward with it. Well, anyways, we did discuss this last month. Yeah, we did. I think it was Diane that recommended it. I think I said it was, I would accept that idea. Well, my issue here is a little broader, that this kind of thing should go to the board before it goes to the public, and we should have input to it. And so there was no opportunity. It was posted on the website before I even was aware of it. And I just think that we need to have everything that goes on the website at least allow the board to have a comment about it, not to completely edit or change what goes on, but have input. So for a couple of meetings, we've been discussing time between several of the board members and I think even Joanne and some others. And I thought that this was trying to expedite it so that we could change the time if someone needed to change the time or get it clear. I think that we at the last meeting, we had decided to put this as an action item. So it doesn't really matter to me, but I don't want to trigger feelings here. We can postpone it for another month. Okay, go ahead, Diane. I'm basically concurring with Dick because, yes, it was my suggestion. I still think it's a good suggestion. I just think the content or, you know, because it doesn't have to be just about what time you want to show up at the meeting or if you would attend the meeting. I would say if you're going to spend the postage and have it returned or returned an envelope, get the most bang out of it that you can. And I've suggested this to the board before in terms of topics of survey is getting a preliminary great study almost, you know, like, are you in what kind of bracket you're in? Because I'll tell you, back in 2018-19, our demographic would have looked much different. We were, there was plenty of people that might have drug us down in there and given us more opportunity for grant money. So that would be an opportunity to use a survey scenario as well, besides just with, you know, the time of the meeting. So I'm agreeing. Yes. Probably postpone it and discuss how many things you, how much bang for the back can you get if you're going to, you know, include a return stamp postage, whatever, and set it up that way. I wasn't expecting a full-blown survey ready to go. So I yield with that. Thanks. Thank you, Diane. So who put this survey together? It's one of the employees of the district. One of the employees. Yeah. Okay. I know him pretty well. There's only one. Yeah. So I felt like there was a directive from the board to me saying, hey, put out a survey. So I didn't really, I just dreamed up what could be on it. What meetings do you feel are important? What time? This, that, you know, what day? And, and, and I, so I just made it, it was just a bare bones. It wasn't, and it was meant to bring back to have discussions sort of like a launching pad to say, no, oh, hey, like, you know, Diane's suggesting, hey, let's include this other topic here. But the only topic last month really was talking about the time and the day. So that's all I put on it. But anyway, it was not meant to try. To sneak it in here. I was just trying to do it. I think I understand all that, but it's the content of the question is not the actual search player. Well, okay. The way I've been told how things get on the agenda, you ask for it. I can't hear what Joanne's saying. Go ahead. Okay. The way I understand when something like this comes up, it's kind of never mind. I won't go there. That when we want to do something like this, we make it an agenda item. We talk about it, why we want it, and what maybe should be on it. And then the board members vote, say, okay, yes, we're going to put this survey together after they did all the public comments. Then the next meeting, then the survey shows up. And this is, that's not how this was done. And I'm sorry that I don't understand why we have to do a survey for when we meet with the board. When the board meets, we've been meeting seven o'clock Tuesday since the beginning of time, practically. And I think this is kind of a waste of time myself, because what happens when the people who don't come to the meetings don't care and they don't send their survey in? So we're just going to take the surveys we have and because someone says they want it in the morning. And, you know, I just think this is a waste of time. And it will eliminate, if people want to have these meetings during the day, it's going to eliminate a lot of people who work from being on the board. Okay. Thank you, Joanna. I mean, yeah, okay. So is there any motion to postpone this? And I would like to see if it's my idea is to get questions on here and then propose it. I hate to say committee. I don't know how else we're going to get questions. As far as I'm concerned, time for me has not been a problem, but and I don't remember all of the people in the community and the people on the board that have been brought bringing this up. Whoever those people are that wanted the time change from seven o'clock, you know, I thought this was for them and put out a survey. And I thought it was a good idea to put out a survey just so the community knows that we're here and prepares, you know, what's on the survey. I think it's not a bad idea to let people know that we're a meeting and they're welcome and let them feel like they have input and they should, this is their board meeting after all. I thought it was a good idea to put something out there and Don threw this together. I thought it was, you know, he was doing what we asked him to do. Any so if there's a any motion to from the board of first any more comments from anybody uh yeah great balanced i completely agree with joey joanne we've already wasted too much time in talking about even time change yeah i guess that was uh great um i think so too but i'm just one person so any motions if we're going to change the bylaws for the time super loud oh if we're going to change the time that that's in the bylaws why don't we just let the community vote on all our bylaws let me just concur with joanne there are certain um things that are bylaws related and the time is most definitely one whereas something that would like i was suggesting you know get a preliminary uh incomprehensible study or some other questions answered are not predicated upon the bylaw so if you're going to do the questionnaire that even addresses the time frame which i you know talked in about last last meeting but you would have to uh be specific about that too that that really would require participation because it would require a resolution to change the bylaws so i agree with joanne from that perspective there are certain things that are predicated on our bylaws and some that are not that would be in a questionnaire thank you thank you So, can we no motions from anybody, any board member, what we should do if we vote? One thing I would say is we need to quickly come back next month or else I want to come back. I think maybe next month is just have an action item or a brainstorming session of what should be in the survey. Should we have a survey? What should be on the survey? You know, just those two steps. And if the answer is no in the first question, then we just move on. Okay, so don't make a motion, Chippy. I like that idea. Yeah. Okay, I would like to propose a motion that we table this until next month and to put it on as an action item to discuss. Dan, we're not hearing you, Dan. We're going to make the fun over. I would like to propose that we put the motion on to discuss this next month to decide whether we want to have our survey and what items to include in the survey. And so that's my motion. You can second. Okay. I'd second that. Okay. So it's just going to be roll call vote, and it's because we're on Zoom and in person. And so we'll start. Dan. Hi. Ken. Rolando. Nay. Richard. Can I? Well. I think I'll say Nay. I know that ties it up, but I think we spent too much time on this. I just think we should not do it at all, let alone put it off for six months. Is that what Dan said, six months? No, no, next month. Next month. I'd like to put it to bed is what I'm trying to do. Okay. We can put it as an action item and we can decide next month whether we want to have it or not. And if we don't, it's back. Okay, I'll vote for that. We'll decide next month. Okay, let's move along here. The approval of Nora's electric bid. Okay, the approval of that bid is so that that whole thing is paid for through the FAP grant financial assistance program through PCWA. And it went out to bent. And Norris was the only one that bid on the project. And it was in the Auburn Journal newspaper and whatnot. Anyway, Jerry as engineer is recommending that we tuck the bid. It's within the parameters of the grant. So it's covered. Yeah, it's totally covered. We're totally covered, but we only have one proposal, but it's being covered by PCWA. Any from the community, any comments? I just have... I just have one question. How much was our grant that we got? If you ask some harder questions, I don't remember the amount of that specific piece. So we have still grant money to use toward the... Oh yeah, the grant is there. There's actually two different projects that were approved for the FAP grant. Okay. And one was a generator and one was the camp group. And the two funds don't, they're separate from each other. And you can't use there any other comment from the community, anyone else in the community? No, just Joanne. When you get a grant, it's specific to. The project, so it has an all or nothing, either you use it for that or you lose it. Thank you. Uh, from the board, comments, questions? I have a comment. Okay, Richard. Even though we only advertised in one place, so in the future, I would like to see us advertise in more than one place and document that we did that, that we reached out to at least three different separate entities for our bids. That's the due diligence we talked about months ago and have been for a while. But otherwise, I'm fine going forward. I don't want to stop this. I think it's just fine to go ahead. Thank you, Richard. Okay, so we're looking for a motion. Yes, we're looking for. So I move that we approve the bid for the replace a generator and allow Don to execute the agreement with North Electric. I'll second. Roll call. Ken. All right. Dan. All right. Rolando. Hi. Richard. Hi. Thank you. Okay, good. Next is the auditor proposal from Fletcher and Company. Yeah, so I would like to proceed with the Fletcher and Company single audit proposal. It's roughly $14,000. It is well below. I've been on the phone with literally seven other CPAs and this was the lowest bid. And only two of them would even propose to do the job because normally they only work with the PCWA size agencies and government entities. And all of them said, oh, well, our minimum is 19,000. And okay, well, thank you for sharing. So anyway, I further looked at two additional organizations that I know and they weren't interested either. So anyway, with that, I would really be happy if the board would approve the single audit here. So did we not have a bit last month? We did, but I was doing my, just like what Richard was saying, I'm doing, I'm actually taking Richard's call here, I did my due diligence to contact as many CPAs as I could who do single audits and talked with all of them. And I got two proposals. And this is the one. So for the community members that don't know what we're talking about. Oh, I'm sorry. What is this single? So as a government entity, we get audited every year financially. But if we have a loan with the federal using federal funds, which is U.S. Today Loan that just closed in our this last year, if we use $750,000 or more of federal funds, then we are required to do what they call a single audit. And third-grade terms, no, just general terms, they do the financial audit, then they do more of like a policy audit to make sure that we all have our T's crossed and I's done. And it's much more intense kind of an audit. And I've been through one of these before because of the Gale Loop project was greater than 750. This is a one-time. It's a one, did they call it a single audit because we only needed one single time. And when I was talking to these CPAs, what was kind of interesting was we hadn't accessed the USDA funds yet because the loan had not closed. And I said, so I'm asking for, you know, so I'm getting bids on doing a regular. Audit, which is they call yellow book audit, and also single audits. And so, anyway, I don't think I need to borrow any practice anymore. Yeah, thank you. Totally, 750,000 from federal funds, and boom, we get the big. So, this is audit is required. We have no choice. We have to have it. And this seems to be the lowest that we've come up with and after many phone calls, evidently, Londo and Non. So, open any questions to the community. I see Diane's hand up. Comments, go ahead, Diane. I just wanted to know, when is the deadline for us to get that completed? If you said it, Don, I didn't hear it. In other words, what is the requirement for the single audit to be completed? I think we still have like six months from now. It's something like that. It's either six or nine months from the okay. So you do have some time. But did they give you an estimate of how long it would take them to complete it? Yeah, it was in the in the paperwork, but I'm not hearing you. It was in the it was in the take a couple of months. Try one more time, please. Two months. It's going to take a couple of months. Our connection is spotty. It keeps showing. Oh, okay. Thank you. So it'll take them at least two to three months to do it. And we have approximately six months for a deadline. Yes. Okay. Thank you. Anybody, any forward comments? It has to be at the end of our fiscal year, right? We just, yeah, we just finished. But that's a requirement. Right. So, yeah. So just so everybody knows. But anyways, I make no more questions. Anybody, Richard, comment? No? Okay. All right. So I'll move that we approve the RFP for the Fletcher and Company single audit. I'll second. Roll call. Richard. Hi. Rolando. Hi. Dan. Hi. Ken. Hi. I get everybody. All right. Thank you. Okay. Action item number six. Okay. To choose a contractor, the board for maintenance and operations. Okay. I know Richard has already said that he hasn't read thoroughly through the three. We have three bids. I only saw those. I didn't see the full bids. They were sent by email, correct? You just haven't reviewed them. I got them Saturday. Got it. Yeah, exactly. Saturday night. Yeah. So not only that, but Heidi's not here and this is an important issue. And I just, I think it's, I anyway would appreciate more time to take a look at the bids and be able to compare them. There's a lot of pages in all those bids. Putting apples with apples is. It's a process I haven't been able to do yet. Would you like me to do a quick summary? Oh man, that's probably stupid. I won't vote on a quick summary, Don. Dan, hold on, hold on, Dan. Again, look at all three of the bids. There are a lot of unanswered questions that still need to be reviewed in that. I feel like we need to sit down with the board and go, it's not just how much it costs and the experience that they have, but I think we need to do some background checking to find out how some of the other, some of these referrals that they are giving, how are they dealing with those? I think that would be prudent and smart on our part. And I think we also need to sit down. Like, personally, I would like Jerry. We know what Jerry's costs are, but I would not mind having Jerry take a look at these and saying, okay, this is not, what's missing? You know, because I'm not an engineer. And some of the stuff that jumped out at me was a couple to the proposals, we're trying to hire the ex-employee of hydros. But what happens if they don't get that person? What's going to happen? How's that going to affect the cost and the other things and the operations? I can answer that one. They prearranged that with Jared and the shape. Oh, they did? Yeah, they pre-arranged that. Okay. And just so you know, there are, you know, Bill Shin is a T2 and he's working on his three. And truth be told, I'm working on T1. Anyway, not because I want to do. The proposal from American River that all their people working on it are T3. Right, I took all my notes and I saw all that. Yeah, so anyway, I thought that was just kind of interesting. For American River, this is their first contract. Yeah, it's the first road yard. But I mean, everybody needs a first roadway at some point. But I did call on a reference with Coleman, and because they just started a contract, I forget the name of it, but anyway, a contract didn't. Anyway, it was to do wastewater and treated water. I don't think it's at the same plant. And anyway, and so they're serving 200 residents with those two things. And then they have, you know, Colfax and I have those on my house for the wall. So I was thinking, my thought, I agree and concur with Dan 100% that this is too important and with Richard to just make a rash, a quick decision. I was thinking there's an idea that we should all of the applicants that we want to interview to have them individually with the board or whoever that wants to be there to, you know, with Jerry there, you know, asking them questions individually, not as a group, but with each company individually that we're interested in and go through and make sure that, you know, have the question answer period or right here in this room maybe with and get it clear before we hire anybody if they're qualified and have Jerry here questioning. That was an idea that I had. I think that's an excellent idea. One of the things, the concerns that I had was, you know, some opera, some of the contracts have, they talk about hiring private outside, if we get a break and they have a, they talk about hiring outside people to come in and repair the break and stuff like that. We've had great service in the past with Jerry through hydros and they jump right on it and try and they jump right on it. We've got it done. One of the concerns that I have is on it is that, hey, we get a major break like we've had in some of those in the past, that we need to get somebody out there ASAP, not, you know, and so we need to make sure that we are due diligent with that and that we understand completely what they're going to do as far as bringing up outside contractors in to repair the pipe who may or may not be familiar with the system. So that's what my bottom line was. So in the proposals, I'm sure Jason or Andrea could address that, but in their proposal, they outlined what are two contractors, and actually one of them, one of them is Triton, which is Jerry, Jerry LeBuddy's construction company. Which would, anyway, I was happy to see Triton on there just because they've been available in the past. But when the owner of Triton is... Saying, hey, we have an emergency down here. You know, I'll be having outside of your mountain. You see what it's like. So I propose that we have a special meeting as has been suggested. I propose we have a special meeting with Jerry or at least just with Jerry to go over these three proposals with us. I don't know that we can demand that the proposers attend that, but I think we should have a meeting with Jared before we go forward. Within an RFP, right? That they might be invited to go here. Yeah. So, okay. So, but you're saying Richard made a motion, right, to do that. And so I just didn't want to. Well, before someone seconds it, I just wanted to add another part to that. From my perspective, you know, we had one bidder that was considerably higher and it's a rebidder and he upped his price. And so instead of, you know, having, I propose to just have the two companies, Coleman and American River, instead of having the third, which takes extra energy and time. You know, I'm thinking to just narrow it down to the two. I just think it's kind of awkward to have two bidders. I mean, they just bid against each other, right? So to have them in the same room. I was thinking that would be a closed session with one bidder, a closed session with the next. I agree with that. We're going to have two. That would be okay then. Oh, I'm sorry. I am like the master miscommunication today. No, it's okay. No, that's fine. No, I think they got the concept, but kind of make it simpler. And unless we feel, I mean, can't we, at least for today, you know, narrow it down, make it simpler and get a plan of attack to go from here. I seem to recall that in the selection procedure that was in the RFP, it called out that some of the candidates might be, the finalists might be invited for in-person interview, right? I see the recall. Yeah. So the finalists, so it's not all of them. So if we had, there's two that we're considering. I don't think we have to worry about the third. You can go back and look at the RFP, but I think they're called out. That was part of the procedure and was called out ahead of time. So I don't think there's any kind of legal concern. I don't think I'm just saying. And I agree with what Ken's trying to say. I think we should just focus on the two real options. Yes. Yeah, I'm fine with that, just not at the same time. Right. Well, exactly. No. No, separately, definitely. I've had seen gloves on when the joker tells them, I got room for one of you. I can't hear what's being said on the side there. I'm just joking around calling the Batman movie. I don't know if you saw the Batman movie where the Joker says, well, there's two of you and I only need one. And then he has a mistake for them to kill each other in the survivor. Okay. That would just be funny. So if we can add to that motion, Richard. Yes, you want me to restate it? I'll restate it. Yeah, please. I move that we meet with Jerry and each of those two low bidders and have a question and answer session. Before we make a commitment. Yes, I accepted that. Nobody thinks it would be worthwhile meeting prior to meeting with them so that we all have had a chance to review the RFPs and prep. Yeah, have a special meeting to do that. That's fine. I just am not ready now. I'm fine with looking into it until we are comfortable with it. And I think that we all agree. I'm not ready now either, Ricky. I'm sorry to put away on the to rush it. I was more trying to be responsive to Jerry because when you put something back out to RFP, it's like, well, you know, how long do you have the good rates with me? You know, so and well, as long as he stays, right? Less more we say, right? And so do we need we need comment from the public or are we good? Good point. Yeah, we should have comment. Any comments from the public? Dan Diane. Basically, I mean, Jerry was very clear that he would try to hang in there. I mean, but I know he was also clear that he would like to exit for the summer. And if something did come up, I mean, there is always California Rural Water Association to step in and just take care of the baby and the buggy while we sort it out. So I think you have plenty of time to go through thoroughly those two bids. And that's my opinion. So I rest with that. Thank you. I kind of question, not that if California and Royal Water could do it. What I question is, is what the price is. Well, it's cut rate for them, not their partner, because that's the confusing part, right? Because they also put in a bid and it was really high. But California World Water Association is augmented by state funds. And so back when I was talking to Fernando a year ago, he said, you know, basically he can get operators in there for, I think, $35 an hour, whereas Jerry's guys, you know, were being billed in at 50 and 75, depending on what their rating was. So I'm just saying that's what they do. And they come in in an emergency and they just do it on the short term, right? Until you, until you get the facility up and going. Because that's what they, he found a niche, right? Because little districts would all of a sudden, one morning, everybody walked off the job. And so they found this niche to do that. And they got state funding to pull it off. So there's a different caveat between who bid and what they do on the grant side. I have one comment real quick. I just wanted to show my appreciation to Jason and Andrea because they hung in the meeting. And, you know, I think none of the other sitters came to the meeting to understand what we're doing. So I appreciate their time and join the call. And I think they got some insight to what we're trying to do our best for the community. Just want to say thank you to them. Hey, thank you so much for having us. It's been really enlightening and we appreciate your guys' time and consideration. Thank you. Sorry, I was trying to unmute myself. I did owe my wife. Thank you so much for allowing us to bid and appreciate your guys' time as well. Thank you. So thank you, Jason. So can I roll call the vote now on Richard's motion and can second on this? Okay. Dan, aye. Ken, aye. Rolando, aye. And Richard? Aye. From the public, I would like to address Jason and Andrew and thank you as well for caring enough to come and visit with us and get to know us. So thank you. Absolutely. We have family in Christian Valley and have a connection to that part of this area. So we appreciate the time. Thank you. Yeah, I just want to say I'm actually in Christian Valley right now at my grandma's house, where is my pretty much my home away from home since I was nine years old. So, you know, whether you guys pick us or not, this is home to us and we appreciate you guys and the work that you do. Are you going to move to Crystal Valley? You know, it is a real possibility. It's something that's completely on the table for us because we are her second. Caretakers, basically. And she's been ours in the past for sure. So it's 100% on the table. I'm sorry, I don't want to interrupt the board's time, but really quickly, your name sounds really familiar. Does my last name sound familiar to you? You know, it doesn't, but I actually go by my middle name, which is Michelle Hoffman. And we're Slater. So if you see Slater signed on Christian Valley right across from Little Creek, okay. Thank you. Yeah, no problem. That's my maiden name. Her fence was just hit like six months ago. So if you see a broken fence, it's hers. And we're working on it. Okay. Thank you. Let's get to the last action item, which is the board will be asked to give Don direction on number of hours and confirm pay rate. This is for the administrative assistant position. Which we have. So in a nutshell, the job description is to assist to assist me with a whole various duties that I have. And I didn't feel like I could put it out there without knowing how many hours or how much. Well, I know at the budget meeting that 25,000 was set aside for an assistant. But I wanted to get kind of a feel for how many hours you would like me to be posting when it goes out to bid and to confirm the price. Use what's budgeted at $25 an hour. That's my direction. So my question is, where did we come up with $25 an hour and a budget of $25,000 as a budget that wasn't? And so I guess, are we, is this, I guess the job description is clear and I think that we're honing in on that. It's the amount of hours that I'm still confused. How many hours a week? And, you know, how are we coming up with, so if we're going to post it, how are we coming up with how many hours we need them a month, a week? Is it salaried? I mean, obviously $25 an hour is not salary, but so where are we coming up with the number of hours? Is it going to be a month? How should that be posted? We were aiming for halftime, I think. Don works halftime, correct? So do we have tasks that would justify 20 hours a week right now in Don? Well, I thought that part of the objective was to have an assistant, but also to have somebody who is like cross-strained in everything that I do. So anyway, that was my understanding. Here's another flip side that was like, we're going to, if we're proposing 20 hours a week and John is still working full time, what are we going to, how are you going to put that in? Well, a lot of the stuff that they could be doing is remote. Okay. With your remote, then you would give direction of what you want. Okay. All right. So from my experience as an employer, you don't want to start out telling somebody that we need you 20 hours and then later on we only need them five hours and we do some hours. I always start them off at the minimal and then they work out then you give them more hours, you know, and so I don't want to over commit on something. I'm totally for the idea, but you know, I don't want to approach this incorrectly. I want it to be a win-win for everybody and not, you know, I want it to be as effective and then train somebody. And if they are as good as we hope they are, then we give them more hours and maybe even, you know, raise if they're. You know, they are going out and saving us money and getting RFPs out and really kicking butt. Now we can justify, are we just going to, so this is, I just, I just don't want to over when we post it, we don't want to over state the hours. I'd rather start low, work slowly, my opinion. Well, I think we need to dive in and see how it works. And if this person isn't the right person, then we just let them go, right, and hire somebody new. But the board has agreed to do this for the last two years. And Don has got a lot on his plate. And it's really looking like he needs to do some things that, you know, some more things like evaluating the CPI, you know, doing all these RFPs. He needs to be concentrating on things that he's not been doing before. And so he needs relief from what's going on. And then I am one of the board members that voted on that and support it, but I never, I didn't agree with the 25,000. And my vision, you know, work five hours a week. And like I said, if we do have 25,000, if we decide to, oh, we need to meet that person 10 hours a week and then 15, if we know right now, and you can justify to me that we need them for 20 hours a week. And what we're going to, you know, it's not going to be, I know when I have employees and I don't have things for them to do, it just really is a pressure on me to keep them going. And now I'm like, I'm throwing money out the window. So I don't want to, so that's from my perspective. So I will approve and I always have a few hours a week because that's all I have pictured that we need, you know, maybe five hours for starters. That's from that's from my perspective. Anybody else? Five hours a week. Wow. Yeah. Plus 20 hours a month. That'll cover. I mean, Don Don has already stated that he needed someone for, you know, for this meeting, which is once a month. I'd like to see, like you would like to see more RFPs when we start. I mean, I'm in totally agreement with that. Was that going to take more than 20 hours a month? I don't know. That's for my, okay. I've said enough. Okay. Okay. Open to Joanne. I agree with Can. I think we should, it would be a good idea to start with the minimum and the maximum, anywhere from this many hours to this many, and start them out slow and see if they're going to work. And maybe the first place is to have them here doing the minutes and typing them up. That would be to see if they're qualified to do that. You know, because I know I couldn't take minutes, you know, which is why I didn't take the secretary job when it was offered to me 22 years ago. Anyhow, that's my suggestion. Start them out slow and work up to the maximum of 20 hours a week. If they are needed, it should be on a to me basis. Diane's got her digital here. Okay. Diane. I'm just saying, I'm kind of going to state the real obvious here. These meetings last on average three hours, four hours. So that's at least that many for one meeting a month. If this person is going to take the minutes, which is what I read in the description. So that you're burning that alone. So if there's two meetings, there's eight hours. That's what I'm saying. So just the meetings alone. And then transcribing and doing that. But I don't know how long that takes you as a rule, Don, because you would have to double the time almost for somebody who's not used to doing that. Unless they've done it in other settings. So it's pretty easy to burn the 20 hours. I'm just kind of. Pointing that out in just the basic, never mind the more explicit things that you had listed. So I'll yield with that. I certainly agree with that. I'd like to ask Don, how many hours can you put somebody to work, Don, so you feel comfortable doing your job? I'd be comfortable in starting out with, say, 10 hours a week. And I like the idea of having them come to the meeting and I know what needs to be in the minutes and I would be training them and they would understand how, you know, what goes into minutes and what does not. And so anyway, I'd be comfortable with starting out at 10 hours a week, knowing that they're attending the board meetings, but also doing the minutes. And then I've got plenty. Not just attending, doing the minutes, but they're going to be assisting you in other things, right? And you're going to be training them, right? Yes. So how many more hours for that? Well, what I was more being reflective that we could start with, can you do the minutes? And then if they can, and then we can see how long that job takes and then go from there to increase it for the other tasks that I need to have done. Okay, well, so then I'll make a motion that we follow through on what we decided, which was advertising this at $25 an hour. And we start at $10 an hour. 10 hours a week? I'm sorry, 10 hours a week. And then it can go up to 20 as needed. I don't want to interrupt, but perhaps just for the meetings, you could make that just a price, right? So a meeting, regardless of how many hours, maybe they get $100, just like the board members do for attending. It's just a thought. So I just dealt with that real quick. Yeah. I don't agree with that. Okay. Thank you for that comment. And so where do we come up with $25 an hour? That's the last part of this before I'd like. That was in our discussions the last times we discussed this. And I think it was Heidi that said it because we advertised it a lot lower before and didn't get any candidates. And Don was saying, well, we didn't get any candidates. So I can't get somebody to do this job. Okay, that's correct. You can say exactly what Richard. Yeah. So yeah, my opinion is that it should be even higher. I was thinking 30, but that's me. You don't work for the government. So I just, just for the same reasons that you stated, it's hard to get someone good. And I always say when someone's hired with my company, when they, you know, if they're worth, you know, 50 bucks an hour, man, I'm really happy, but they never are. So, but if someone is worth more, that means, you know, they can put a better output and be more, you know, higher quality, higher qualified applicants will tend to want to apply. I can't hear what's being said. She thinks that they start low, they work their way up. That's what she was saying. I agree with Ken, because if you're starting out at 10 hours a week and you're only getting 25 bucks, that's $250. That's not much. You're right. You're not going to get, because you've got low number of hours, you're going to get not a very good applicant pool. Yep. You're right. I'm just trying to get started. How many people live on $300 a week? Also, are we tired? Yeah, so exactly. Exactly. You're right. So, thank you, Reed. That was Reed. So, Rich, why don't you go ahead and read a motion and now we can vote. I just wanted to bring the money part in and now let's just go ahead and make a motion. Let's vote on it. Okay. I'm proposing that we, I don't know that we even need to authorize Don, but authorizing Don to start $25 an hour, 10 hours a week, up to 20 hours a week, depending on how much that person can help. Also, John's discretion. Also like a motion again. Richard? Dan? Hi. Rolando? I knew that was coming. Yeah. That's what we love about Oralando. He's consistent. Yeah, we just wish he would tell us why sometimes. Tell me how to do that. I've told you why. You want to know why I voted Nick? Yeah. I can't hear you. I can't hear what you're saying. Sure. I'm happy to tell you why I voted against it. And it's for the same reason that I voted against it the first time and the second time. I don't think we should be incurring $25,000 worth of expenses on the budget revenue that we have now. I don't think that makes sense. I do think that Don needs help for all the reasons that everybody's called out. And I think that there's a lot of opportunity to do that. I had proposed, and I'll stick to it, that it should be, tell me what you need done, Don, and then I'll approve that much money to get that done rather than being so arbitrary. But that's it. I mean. Thank you. Yeah. I did understand that before. I thought you had something new. Oh, consistent. All right. That helps. Thank you, Rolando. I think there's one thing that... So I can interview and then hire who I think would. Is that correct? Yeah, we need to, but that was what we decided now what should be posted in the stack fee or wherever that we're going to post this, that it's for 10 hours, up to 20 hours, but starting at 10 at $25 an hour with this job description. And that's, I think, we finally got that. And I can just hire them when I'm at your discretion. Yeah, I perfectly. Ton, you go for it. Go for it, Tom. I'm going to put an advertisement with the bill. That's that's acceptable to you guys. With a bill? With the water bills that are going to be coming up. It's another place to advertise, so you need to, you know, have a few places to advertise, right? Well, we have a meme that can go back up on the front page of the website and maybe at least advertise the per hour rate too. So it'll be there. And I don't know where else maybe you need to get approval done for where else you're going to advertise. Like Auburn Journal, whatever. No, you don't need approval to where you're going to advertise. Just advertise widely and get a good candidate. That's all. You go. You don't have to give him a budget for his advertising costs. Let's not take this into midnight. Okay, so agenda items for next month. We need to say anything on that. Or can we move to the any comments, any more comments from the audience and adjournment? So I have one comment. I have one comment. I'd like the board to authorize Don to buy what's called a turtle phone, and it's a meeting. Phone that sits in the middle of the desk so that it takes everybody's voice equally around the desk. They're not that expensive, they're very common. And we should have them at our meetings so we can all hear each other. Even if I'm there and somebody else is calling in, it's very difficult, as Diana and I have said today. Right. I mean, he does have a microphone on the desk, Dick, because I've been in there, but it's obviously not adequate enough to, and it doesn't have enough voice canceling, so maybe it needs to be upgraded or something. I think that's within your discussion, your discussion to do that. I think that's a main final. Thank you, Richard. Thank you. You get so awesome today. Is there any other comments from the audience on items not on the agenda? Yeah, any other comments? I just want to make sure that we schedule the meetings to follow up on RFP stuff. Yeah, so when is the date? I don't know when Heidi's coming back into town, but let's just say she'll be back into town in a weekend from it. Well, I'll be out of town. But do a doodle poll. Do a doodle poll of the board so you can figure out the best time. I'll do my best to attend on Zoom. So can I throw in, you guys tabled the survey, but you also had a newsletter there too, Don. So to go over content of the newsletter as well. You mean for the next meeting or for the to go out with the bills? To put on the next agenda with it. Does everybody want to have the survey? No, no, you already voted. The survey will be what about the newsletter?`,
  segments: [
    {
      segments_id: 0,
      start: 34.4,
      end: 38.800000000000004,
      text: "We got a lot going on tonight because we've got a lot of stuff."
    },
    {
      segments_id: 1,
      start: 39.12,
      end: 42.0,
      text: "So what's going on?"
    },
    {
      segments_id: 2,
      start: 46.800000000000004,
      end: 49.04,
      text: "There's five board members."
    },
    {
      segments_id: 3,
      start: 64.0,
      end: 65.12,
      text: "You're on mute."
    },
    {
      segments_id: 4,
      start: 72.08,
      end: 73.28,
      text: "So, how are they going to hear me?"
    },
    {
      segments_id: 5,
      start: 75.84,
      end: 78.16,
      text: "You can hear you from here."
    },
    {
      segments_id: 6,
      start: 79.92,
      end: 80.64,
      text: "I can hear now."
    },
    {
      segments_id: 7,
      start: 80.8,
      end: 81.76,
      text: "Hello, everyone."
    },
    {
      segments_id: 8,
      start: 82.08,
      end: 83.04,
      text: "Hello, everybody."
    },
    {
      segments_id: 9,
      start: 83.28,
      end: 83.68,
      text: "Hi, okay."
    },
    {
      segments_id: 10,
      start: 86.48,
      end: 87.60000000000001,
      text: "Was everyone here?"
    },
    {
      segments_id: 11,
      start: 88.88,
      end: 93.04,
      text: "So can we call the meeting in order?"
    },
    {
      segments_id: 12,
      start: 93.44,
      end: 93.84,
      text: "Absolutely."
    },
    {
      segments_id: 13,
      start: 94.88,
      end: 96.4,
      text: "Looks like I'm in charge."
    },
    {
      segments_id: 14,
      start: 97.68,
      end: 99.28,
      text: "Yeah, Heidi evidently is not here."
    },
    {
      segments_id: 15,
      start: 100.0,
      end: 100.56,
      text: "Oh, okay."
    },
    {
      segments_id: 16,
      start: 101.60000000000001,
      end: 102.88,
      text: "I get the honors."
    },
    {
      segments_id: 17,
      start: 103.84,
      end: 105.44,
      text: "But can we get started?"
    },
    {
      segments_id: 18,
      start: 106.88,
      end: 108.0,
      text: "Okay, I'll do roll call."
    },
    {
      segments_id: 19,
      start: 108.56,
      end: 110.4,
      text: "It's really more of a sound check."
    },
    {
      segments_id: 20,
      start: 110.88,
      end: 111.68,
      text: "Richard?"
    },
    {
      segments_id: 21,
      start: 112.16,
      end: 112.48,
      text: "Here."
    },
    {
      segments_id: 22,
      start: 113.60000000000001,
      end: 113.92,
      text: "Okay."
    },
    {
      segments_id: 23,
      start: 114.96000000000001,
      end: 115.28,
      text: "Ken?"
    },
    {
      segments_id: 24,
      start: 115.84,
      end: 116.16,
      text: "Here."
    },
    {
      segments_id: 25,
      start: 117.04,
      end: 118.08,
      text: "Rolando here."
    },
    {
      segments_id: 26,
      start: 118.32000000000001,
      end: 118.72,
      text: "Dan?"
    },
    {
      segments_id: 27,
      start: 118.88,
      end: 119.12,
      text: "Here."
    },
    {
      segments_id: 28,
      start: 122.64,
      end: 123.12,
      text: "Heidi."
    },
    {
      segments_id: 29,
      start: 123.44,
      end: 123.68,
      text: "Yeah."
    },
    {
      segments_id: 30,
      start: 124.0,
      end: 124.4,
      text: "Not here."
    },
    {
      segments_id: 31,
      start: 128.16,
      end: 132.0,
      text: "Hey, Ken, can you turn on the mic in front of you?"
    },
    {
      segments_id: 32,
      start: 132.08,
      end: 133.6,
      text: "It says Haley on it."
    },
    {
      segments_id: 33,
      start: 133.92000000000002,
      end: 134.24,
      text: "Okay."
    },
    {
      segments_id: 34,
      start: 136.32,
      end: 136.48,
      text: "Okay."
    },
    {
      segments_id: 35,
      start: 136.64000000000001,
      end: 140.32,
      text: "Yeah, I'm using a shared mic right now."
    },
    {
      segments_id: 36,
      start: 140.56,
      end: 143.6,
      text: "Can you hear me without mic?"
    },
    {
      segments_id: 37,
      start: 143.92000000000002,
      end: 146.24,
      text: "I've got the central mic here."
    },
    {
      segments_id: 38,
      start: 146.56,
      end: 147.76,
      text: "Can you hear me?"
    },
    {
      segments_id: 39,
      start: 148.4,
      end: 149.68,
      text: "Yeah, I can hear you."
    },
    {
      segments_id: 40,
      start: 150.0,
      end: 154.8,
      text: "Okay, because if I turn this on, might have feedback."
    },
    {
      segments_id: 41,
      start: 155.6,
      end: 157.76,
      text: "Oh, yeah, no, it's better the other way."
    },
    {
      segments_id: 42,
      start: 159.36,
      end: 160.48,
      text: "Better the other way."
    },
    {
      segments_id: 43,
      start: 160.8,
      end: 161.12,
      text: "Okay."
    },
    {
      segments_id: 44,
      start: 163.04,
      end: 163.28,
      text: "All right."
    },
    {
      segments_id: 45,
      start: 163.76,
      end: 164.08,
      text: "Thanks."
    },
    {
      segments_id: 46,
      start: 164.48,
      end: 166.88,
      text: "Okay, I'd like to welcome everybody out."
    },
    {
      segments_id: 47,
      start: 167.92000000000002,
      end: 168.48,
      text: "Bear with me."
    },
    {
      segments_id: 48,
      start: 168.72,
      end: 170.16,
      text: "First time I've done this."
    },
    {
      segments_id: 49,
      start: 172.56,
      end: 178.08,
      text: "We have a consent idea."
    },
    {
      segments_id: 50,
      start: 178.48,
      end: 179.44,
      text: "So let's get started."
    },
    {
      segments_id: 51,
      start: 179.76,
      end: 180.96,
      text: "I just wanted to welcome everybody."
    },
    {
      segments_id: 52,
      start: 181.76,
      end: 182.96,
      text: "Yeah, all the new people."
    },
    {
      segments_id: 53,
      start: 183.20000000000002,
      end: 189.04,
      text: "We got some new people that have never attended meeting before."
    },
    {
      segments_id: 54,
      start: 191.44,
      end: 193.92000000000002,
      text: "It'd be interesting to introduce them."
    },
    {
      segments_id: 55,
      start: 194.88,
      end: 197.52,
      text: "So I actually forgot your name."
    },
    {
      segments_id: 56,
      start: 197.68,
      end: 198.48000000000002,
      text: "That's okay now."
    },
    {
      segments_id: 57,
      start: 199.04,
      end: 200.16,
      text: "I'm Mandy Danny."
    },
    {
      segments_id: 58,
      start: 200.56,
      end: 201.20000000000002,
      text: "This is my husband."
    },
    {
      segments_id: 59,
      start: 203.44,
      end: 205.28,
      text: "3475 Christian Valley."
    },
    {
      segments_id: 60,
      start: 205.52,
      end: 210.64000000000001,
      text: "Moved in about 11 months ago and wanting to learn about what happened."
    },
    {
      segments_id: 61,
      start: 210.8,
      end: 214.72,
      text: "I've never been part of a CSD and I didn't know what to expect to expect."
    },
    {
      segments_id: 62,
      start: 214.8,
      end: 219.20000000000002,
      text: "So I just kind of sit back and finally observe and learn."
    },
    {
      segments_id: 63,
      start: 219.52,
      end: 219.76,
      text: "Awesome."
    },
    {
      segments_id: 64,
      start: 220.64000000000001,
      end: 221.36,
      text: "What was your last name?"
    },
    {
      segments_id: 65,
      start: 221.6,
      end: 222.08,
      text: "Danny D."
    },
    {
      segments_id: 66,
      start: 225.28,
      end: 226.08,
      text: "Awesome."
    },
    {
      segments_id: 67,
      start: 227.36,
      end: 228.56,
      text: "Should we introduce ourselves to?"
    },
    {
      segments_id: 68,
      start: 229.92000000000002,
      end: 230.88,
      text: "Yeah, why don't we do that?"
    },
    {
      segments_id: 69,
      start: 231.12,
      end: 232.08,
      text: "So I'm Ken."
    },
    {
      segments_id: 70,
      start: 232.32,
      end: 233.44,
      text: "I'm the vice president."
    },
    {
      segments_id: 71,
      start: 233.6,
      end: 234.56,
      text: "Heidi's not here."
    },
    {
      segments_id: 72,
      start: 234.8,
      end: 242.8,
      text: "So I am aware of the board member."
    },
    {
      segments_id: 73,
      start: 244.72,
      end: 247.76000000000002,
      text: "Hi, I am Donna Leitz, General Manager."
    },
    {
      segments_id: 74,
      start: 248.88,
      end: 251.36,
      text: "We had a major board member a while."
    },
    {
      segments_id: 75,
      start: 256.8,
      end: 257.2,
      text: "Let's see."
    },
    {
      segments_id: 76,
      start: 257.44,
      end: 258.4,
      text: "40 years old."
    },
    {
      segments_id: 77,
      start: 266.8,
      end: 268.48,
      text: "Sorry, I was having trouble unmuting."
    },
    {
      segments_id: 78,
      start: 268.8,
      end: 270.48,
      text: "Thank you, Diana Letty here."
    },
    {
      segments_id: 79,
      start: 273.2,
      end: 274.24,
      text: "Let me see, Greg."
    },
    {
      segments_id: 80,
      start: 274.48,
      end: 275.2,
      text: "Hi, Greg."
    },
    {
      segments_id: 81,
      start: 278.48,
      end: 279.76,
      text: "And then we."
    },
    {
      segments_id: 82,
      start: 280.0,
      end: 280.8,
      text: "Hi, Dick Warren."
    },
    {
      segments_id: 83,
      start: 281.44,
      end: 282.08,
      text: "I'm here."
    },
    {
      segments_id: 84,
      start: 282.88,
      end: 284.64,
      text: "Oh, following Dick, okay."
    },
    {
      segments_id: 85,
      start: 285.92,
      end: 288.64,
      text: "And then Jason and Andrea Hoffman."
    },
    {
      segments_id: 86,
      start: 288.88,
      end: 292.72,
      text: "They are from one of the proposers."
    },
    {
      segments_id: 87,
      start: 295.52,
      end: 296.72,
      text: "All right, good."
    },
    {
      segments_id: 88,
      start: 297.2,
      end: 298.32,
      text: "Welcome, everybody."
    },
    {
      segments_id: 89,
      start: 300.4,
      end: 319.36,
      text: "All right, so start with the approval of the consent item for the consent items, which consists of the minutes to the July 12th meeting or the agenda for the July 12th minutes."
    },
    {
      segments_id: 90,
      start: 321.12,
      end: 326.88,
      text: "Approval of the June 14th regular board meeting minutes and then the monthly expenditures."
    },
    {
      segments_id: 91,
      start: 328.4,
      end: 331.04,
      text: "I move to approve the consent items."
    },
    {
      segments_id: 92,
      start: 332.64,
      end: 334.0,
      text: "I second that."
    },
    {
      segments_id: 93,
      start: 335.84000000000003,
      end: 340.72,
      text: "Okay, and uh roll call vote."
    },
    {
      segments_id: 94,
      start: 344.88,
      end: 345.12,
      text: "Hi."
    },
    {
      segments_id: 95,
      start: 345.92,
      end: 346.24,
      text: "Ken."
    },
    {
      segments_id: 96,
      start: 346.56,
      end: 346.8,
      text: "Hi."
    },
    {
      segments_id: 97,
      start: 347.52,
      end: 348.0,
      text: "Richard."
    },
    {
      segments_id: 98,
      start: 349.04,
      end: 349.28,
      text: "Hi."
    },
    {
      segments_id: 99,
      start: 354.0,
      end: 354.24,
      text: "Okay."
    },
    {
      segments_id: 100,
      start: 355.36,
      end: 362.48,
      text: "So, so Andrea Hoffman, okay, so so is this the uh Jason's wife?"
    },
    {
      segments_id: 101,
      start: 362.8,
      end: 364.96000000000004,
      text: "Oh Jason's wife."
    },
    {
      segments_id: 102,
      start: 365.28,
      end: 370.64,
      text: "Okay, so I see that she's on the board."
    },
    {
      segments_id: 103,
      start: 370.88,
      end: 372.72,
      text: "Did she have something that she was going to say?"
    },
    {
      segments_id: 104,
      start: 373.12,
      end: 373.6,
      text: "Inform?"
    },
    {
      segments_id: 105,
      start: 374.24,
      end: 374.8,
      text: "I don't know."
    },
    {
      segments_id: 106,
      start: 375.76,
      end: 380.56,
      text: "Catherine will inform the board what the booking service that's a different person."
    },
    {
      segments_id: 107,
      start: 381.12,
      end: 383.92,
      text: "That's a different Catherine will be coming in."
    },
    {
      segments_id: 108,
      start: 384.08,
      end: 387.28,
      text: "Catherine is the one who is a great consultant."
    },
    {
      segments_id: 109,
      start: 387.92,
      end: 390.48,
      text: "And she'll be coming in at 7.30."
    },
    {
      segments_id: 110,
      start: 390.56,
      end: 391.84000000000003,
      text: "Coming in hourly."
    },
    {
      segments_id: 111,
      start: 395.04,
      end: 397.76,
      text: "May I ask you all to project a little bit more?"
    },
    {
      segments_id: 112,
      start: 397.92,
      end: 400.56,
      text: "Because it is just a little hard to hear y'all."
    },
    {
      segments_id: 113,
      start: 400.88,
      end: 401.28,
      text: "Thank you."
    },
    {
      segments_id: 114,
      start: 401.76,
      end: 402.08,
      text: "Okay."
    },
    {
      segments_id: 115,
      start: 403.44,
      end: 403.68,
      text: "All right."
    },
    {
      segments_id: 116,
      start: 403.84000000000003,
      end: 416.4,
      text: "Then so we were saying that at 7.30, Catherine Hansford is going to be here to give us her explain her proposal."
    },
    {
      segments_id: 117,
      start: 416.72,
      end: 422.32,
      text: "But so the next item on the first item will be Jerry."
    },
    {
      segments_id: 118,
      start: 422.48,
      end: 423.2,
      text: "I assume Jerry."
    },
    {
      segments_id: 119,
      start: 423.36,
      end: 423.92,
      text: "Is Jerry here?"
    },
    {
      segments_id: 120,
      start: 424.8,
      end: 425.12,
      text: "No."
    },
    {
      segments_id: 121,
      start: 428.0,
      end: 428.4,
      text: "Oh, okay."
    },
    {
      segments_id: 122,
      start: 428.48,
      end: 429.76,
      text: "So Jerry is not here."
    },
    {
      segments_id: 123,
      start: 430.0,
      end: 432.96000000000004,
      text: "And so Don is going to cover for Jerry."
    },
    {
      segments_id: 124,
      start: 433.52,
      end: 433.84000000000003,
      text: "Yeah."
    },
    {
      segments_id: 125,
      start: 433.92,
      end: 441.68,
      text: "So, well, the good news is, is that Jerry had a really short list of what happened."
    },
    {
      segments_id: 126,
      start: 442.8,
      end: 454.08000000000004,
      text: "So anyway, the average flow for the month was 0.48, 480,000 gallons a day."
    },
    {
      segments_id: 127,
      start: 455.28,
      end: 459.28,
      text: "And the raw water was 1.3 MTO or I don't remember that."
    },
    {
      segments_id: 128,
      start: 460.8,
      end: 463.44,
      text: "But anyway, it's a turbidity."
    },
    {
      segments_id: 129,
      start: 464.8,
      end: 470.64,
      text: "We had some waterline repairs, a couple on Stanley, one on Barbara, one on Gale."
    },
    {
      segments_id: 130,
      start: 472.0,
      end: 476.08000000000004,
      text: "And backflow testing was finished complete this time."
    },
    {
      segments_id: 131,
      start: 476.32,
      end: 480.88,
      text: "There are 59 backflows that need to be tested."
    },
    {
      segments_id: 132,
      start: 481.76,
      end: 489.92,
      text: "And usually the backflows that need to be tested is because they have another water source, whether it's a well or a pool."
    },
    {
      segments_id: 133,
      start: 491.52,
      end: 495.03999999999996,
      text: "And so anyway, that's why they have a backlow."
    },
    {
      segments_id: 134,
      start: 495.68,
      end: 500.96000000000004,
      text: "But truth be told, every new construction gets a backlow device."
    },
    {
      segments_id: 135,
      start: 501.6,
      end: 505.52,
      text: "So when they sign up for a meter, they get the meter and a backlow device."
    },
    {
      segments_id: 136,
      start: 506.0,
      end: 508.72,
      text: "And a backflow is their issue."
    },
    {
      segments_id: 137,
      start: 509.03999999999996,
      end: 513.84,
      text: "And our responsibility stops at the meter, but they install a backflow device."
    },
    {
      segments_id: 138,
      start: 514.72,
      end: 518.48,
      text: "So how many backflow devices do we have?"
    },
    {
      segments_id: 139,
      start: 519.04,
      end: 520.24,
      text: "A bunch."
    },
    {
      segments_id: 140,
      start: 521.28,
      end: 526.48,
      text: "And only the ones that need to be tested are the ones that have alternate large source."
    },
    {
      segments_id: 141,
      start: 527.12,
      end: 528.72,
      text: "Oh, and that's 59."
    },
    {
      segments_id: 142,
      start: 528.88,
      end: 529.76,
      text: "So you check all of them."
    },
    {
      segments_id: 143,
      start: 530.64,
      end: 533.44,
      text: "Yeah, and they all pass, which is kind of unusual."
    },
    {
      segments_id: 144,
      start: 533.84,
      end: 541.28,
      text: "Usually there's a couple of them that go south and just need new debts or whatever."
    },
    {
      segments_id: 145,
      start: 542.72,
      end: 550.8,
      text: "So anyway, the capital item said to rebuild the pump station piping, which is inside that building there."
    },
    {
      segments_id: 146,
      start: 551.36,
      end: 553.44,
      text: "And that's still going on."
    },
    {
      segments_id: 147,
      start: 553.6800000000001,
      end: 555.6800000000001,
      text: "The parts are all ordered."
    },
    {
      segments_id: 148,
      start: 556.8,
      end: 562.0,
      text: "And he's going to be putting a cap on that pipe so that we can use that post a lot."
    },
    {
      segments_id: 149,
      start: 563.84,
      end: 564.4,
      text: "And then."
    },
    {
      segments_id: 150,
      start: 565.2,
      end: 571.76,
      text: "So this was the improvement that he told us last time that it was going to exceed what he originally projected, right?"
    },
    {
      segments_id: 151,
      start: 571.9200000000001,
      end: 572.96,
      text: "So we all agreed that that was okay."
    },
    {
      segments_id: 152,
      start: 573.76,
      end: 575.12,
      text: "I didn't realize it was a little chill."
    },
    {
      segments_id: 153,
      start: 575.76,
      end: 582.88,
      text: "And the idea of thumbs up to fix it because it's a maintenance item, not a anyway."
    },
    {
      segments_id: 154,
      start: 584.1600000000001,
      end: 594.56,
      text: "And so, and then he, the last thing that he had noted that the generator proposal was received from Lawrence, he got it."
    },
    {
      segments_id: 155,
      start: 595.44,
      end: 598.0,
      text: "Oh, so that's the end of the platform."
    },
    {
      segments_id: 156,
      start: 602.0,
      end: 608.16,
      text: "So, Panthalope part is still an ongoing project going on."
    },
    {
      segments_id: 157,
      start: 609.12,
      end: 618.56,
      text: "There's still some communications between some people out there and anyway, he's still working on that project."
    },
    {
      segments_id: 158,
      start: 619.04,
      end: 619.44,
      text: "Which project?"
    },
    {
      segments_id: 159,
      start: 619.76,
      end: 621.84,
      text: "The Kenneth Lupe, the engineering for the Kenneth Lupe."
    },
    {
      segments_id: 160,
      start: 623.12,
      end: 644.96,
      text: "And the Kenneth Lupe engineering is to connect from Gale Lane through, or from the pipe would go from Gale Lane through Sunshine Meadow and somehow go properly lines over to Kenneth Way, which is over off of Virginia."
    },
    {
      segments_id: 161,
      start: 645.2,
      end: 654.64,
      text: "What they're basically putting, trying to propose that project is because that area, if never used to be a major break, it's going to affect a lot of people."
    },
    {
      segments_id: 162,
      start: 654.96,
      end: 658.56,
      text: "So what they're trying to do is put a bypass in there."
    },
    {
      segments_id: 163,
      start: 658.8,
      end: 665.2,
      text: "So if they have to shut off part of the system, we can still maintain order to a portion of it."
    },
    {
      segments_id: 164,
      start: 665.6800000000001,
      end: 671.36,
      text: "Right now, the way it is, there's no way to shut it off if we're going to make a break in there."
    },
    {
      segments_id: 165,
      start: 671.6800000000001,
      end: 680.8,
      text: "So the bypass will allow us to still serve the customers while they're repair or replace whatever we need to replace the area."
    },
    {
      segments_id: 166,
      start: 681.12,
      end: 687.28,
      text: "So it's kind of like the looping is kind of like the water's always coming in from the left."
    },
    {
      segments_id: 167,
      start: 687.84,
      end: 691.6800000000001,
      text: "If it's looped, it will come in from the right if you turn off from the left."
    },
    {
      segments_id: 168,
      start: 691.92,
      end: 694.8,
      text: "That's third-gate term."
    },
    {
      segments_id: 169,
      start: 696.08,
      end: 696.96,
      text: "I'm a third-gate teacher."
    },
    {
      segments_id: 170,
      start: 697.04,
      end: 699.44,
      text: "So Diane, did you have a comment or question?"
    },
    {
      segments_id: 171,
      start: 700.32,
      end: 701.6,
      text: "Yes, thank you."
    },
    {
      segments_id: 172,
      start: 702.56,
      end: 711.2,
      text: "One of those callouts on Jerry's list is, of course, my resident, and it's still related to the PRT debacle with the fans."
    },
    {
      segments_id: 173,
      start: 711.84,
      end: 731.52,
      text: "So rather, I know that Jerry, you know, gets however apportionment for that, but I'm just wondering, I don't know about the other addresses, if it's somewhat still related, because that needs to be a different accounting for it to go back to PRT, if that's my opinion."
    },
    {
      segments_id: 174,
      start: 732.0,
      end: 733.36,
      text: "So I'll rest with that."
    },
    {
      segments_id: 175,
      start: 733.52,
      end: 734.24,
      text: "Thank you."
    },
    {
      segments_id: 176,
      start: 735.28,
      end: 736.48,
      text: "Yeah, good point."
    },
    {
      segments_id: 177,
      start: 736.64,
      end: 738.08,
      text: "So let's pause that."
    },
    {
      segments_id: 178,
      start: 738.96,
      end: 752.56,
      text: "So there's these things right now are not, well, I should check on Diane's, but on, because that is everything on Diane's thing is POT."
    },
    {
      segments_id: 179,
      start: 753.6,
      end: 761.52,
      text: "And there's, I'm going to regress just for a second, just so that everybody's on the same page on what's happened."
    },
    {
      segments_id: 180,
      start: 762.4,
      end: 777.6800000000001,
      text: "When the tank number two came online, there must have been some grid in the pipe because they kind of sandblast the whole gut, the whole inside of those giant tanks that we were standing to."
    },
    {
      segments_id: 181,
      start: 779.04,
      end: 787.52,
      text: "And the sandblasting material, which we refer to as grit, some was in the outlet pipe."
    },
    {
      segments_id: 182,
      start: 787.76,
      end: 795.04,
      text: "And it magically just blessed Diane beyond belief."
    },
    {
      segments_id: 183,
      start: 797.04,
      end: 806.56,
      text: "And some of her neighbors, which is unusual about the whole thing is she's like three-quarters of a mile pipewise away from the tank."
    },
    {
      segments_id: 184,
      start: 807.2,
      end: 816.0,
      text: "And so anyway, so anyway, these other waterline issues are not."
    },
    {
      segments_id: 185,
      start: 820.64,
      end: 824.16,
      text: "Yeah, so there's a PRT the charter."
    },
    {
      segments_id: 186,
      start: 824.4,
      end: 825.2,
      text: "Oh, absolutely."
    },
    {
      segments_id: 187,
      start: 825.52,
      end: 826.48,
      text: "So yeah."
    },
    {
      segments_id: 188,
      start: 827.04,
      end: 831.28,
      text: "For all the so far, they've been billed, but they've been paid."
    },
    {
      segments_id: 189,
      start: 831.6,
      end: 831.76,
      text: "Yeah."
    },
    {
      segments_id: 190,
      start: 832.0,
      end: 847.2,
      text: "Well, we've got one outstanding, we've got a combination invoice of, there's grit, there's a couple of doors down from Diane, as well as, and that's the, it's Guy and Gail something."
    },
    {
      segments_id: 191,
      start: 848.16,
      end: 862.56,
      text: "Anyway, so that invoice, as well as the tank, you know, there are some repairs done to tank number one that needs to get reimbursed."
    },
    {
      segments_id: 192,
      start: 863.04,
      end: 865.36,
      text: "So anyway, we're just waiting for the chat."
    },
    {
      segments_id: 193,
      start: 865.52,
      end: 866.1600000000001,
      text: "Let's just see."
    },
    {
      segments_id: 194,
      start: 866.4,
      end: 869.28,
      text: "So it's in process related process."
    },
    {
      segments_id: 195,
      start: 869.6,
      end: 869.9200000000001,
      text: "All right."
    },
    {
      segments_id: 196,
      start: 870.1600000000001,
      end: 870.3199999999999,
      text: "All right."
    },
    {
      segments_id: 197,
      start: 872.24,
      end: 874.24,
      text: "So there's a lot of house on the system."
    },
    {
      segments_id: 198,
      start: 874.96,
      end: 878.24,
      text: "On the end of the way, another end of the lockhouse like now."
    },
    {
      segments_id: 199,
      start: 884.56,
      end: 885.9200000000001,
      text: "Is that Dan talking?"
    },
    {
      segments_id: 200,
      start: 886.0799999999999,
      end: 886.96,
      text: "Is that Dan talking?"
    },
    {
      segments_id: 201,
      start: 887.12,
      end: 888.48,
      text: "I can't hear a word from Dan."
    },
    {
      segments_id: 202,
      start: 888.72,
      end: 889.6,
      text: "Hi, it's Joshua."
    },
    {
      segments_id: 203,
      start: 889.6800000000001,
      end: 893.6800000000001,
      text: "I was just wondering if there are blow-off valves at the end of trunk lines."
    },
    {
      segments_id: 204,
      start: 900.08,
      end: 906.08,
      text: "Joshua is asking, are there blow-off valves at the end of the different mains?"
    },
    {
      segments_id: 205,
      start: 906.72,
      end: 917.28,
      text: "And the answer is that we have hydrants at the end of the different mains and at intersections and to blow out the grid and whatnot."
    },
    {
      segments_id: 206,
      start: 918.32,
      end: 921.84,
      text: "So they do get flush for the long fall because we have to test them."
    },
    {
      segments_id: 207,
      start: 923.12,
      end: 924.88,
      text: "It's an annual exercise."
    },
    {
      segments_id: 208,
      start: 928.4,
      end: 932.88,
      text: "So is that everything on Jerry's report?"
    },
    {
      segments_id: 209,
      start: 933.44,
      end: 933.76,
      text: "Yeah."
    },
    {
      segments_id: 210,
      start: 934.0,
      end: 934.32,
      text: "Okay."
    },
    {
      segments_id: 211,
      start: 934.64,
      end: 937.44,
      text: "So that means that I can just move right on."
    },
    {
      segments_id: 212,
      start: 937.92,
      end: 938.08,
      text: "Mr."
    },
    {
      segments_id: 213,
      start: 938.24,
      end: 939.28,
      text: "Monitor can keep on going."
    },
    {
      segments_id: 214,
      start: 939.52,
      end: 939.68,
      text: "Okay."
    },
    {
      segments_id: 215,
      start: 939.76,
      end: 945.12,
      text: "I don't know if there's a comment or question from anybody on the board."
    },
    {
      segments_id: 216,
      start: 945.28,
      end: 946.56,
      text: "Anything with Jerry's?"
    },
    {
      segments_id: 217,
      start: 947.52,
      end: 947.84,
      text: "Okay."
    },
    {
      segments_id: 218,
      start: 948.72,
      end: 950.4,
      text: "Anyone from the audience?"
    },
    {
      segments_id: 219,
      start: 950.64,
      end: 951.44,
      text: "Anybody?"
    },
    {
      segments_id: 220,
      start: 954.24,
      end: 954.48,
      text: "Okay."
    },
    {
      segments_id: 221,
      start: 956.16,
      end: 956.24,
      text: "Good."
    },
    {
      segments_id: 222,
      start: 957.52,
      end: 959.68,
      text: "So we can now move on."
    },
    {
      segments_id: 223,
      start: 959.92,
      end: 964.08,
      text: "So since Catherine is going to give us a report at 7.30."
    },
    {
      segments_id: 224,
      start: 964.4,
      end: 964.72,
      text: "Yeah."
    },
    {
      segments_id: 225,
      start: 964.64,
      end: 965.2,
      text: "So if I can."
    },
    {
      segments_id: 226,
      start: 965.52,
      end: 968.96,
      text: "Let's just keep on going and then this will just be perfect."
    },
    {
      segments_id: 227,
      start: 969.12,
      end: 969.2,
      text: "Okay."
    },
    {
      segments_id: 228,
      start: 969.52,
      end: 971.36,
      text: "Just show her and do it."
    },
    {
      segments_id: 229,
      start: 971.6,
      end: 971.76,
      text: "Yeah."
    },
    {
      segments_id: 230,
      start: 972.72,
      end: 988.56,
      text: "So there's no correspondence on this agenda, although I just received correspondence from a lady on Allen Drive, who where the road is a road issue."
    },
    {
      segments_id: 231,
      start: 988.88,
      end: 994.08,
      text: "And it's where the crown of the road is very severe at her driveway."
    },
    {
      segments_id: 232,
      start: 994.32,
      end: 1007.2,
      text: "And she needs the district to flatten that part of the road so that her cars don't keep sweeping the road."
    },
    {
      segments_id: 233,
      start: 1007.92,
      end: 1020.88,
      text: "And I mean, they've kind of been dealing with it for about five years, but she's got some medical issues and it's going to have a big van going in and out of the wheelchair kind of thing."
    },
    {
      segments_id: 234,
      start: 1021.6800000000001,
      end: 1027.12,
      text: "And so anyway, she's asking if the district solved that issue."
    },
    {
      segments_id: 235,
      start: 1027.76,
      end: 1033.52,
      text: "And so I'm working on that whole issue and I'll be reporting back next month."
    },
    {
      segments_id: 236,
      start: 1033.84,
      end: 1034.08,
      text: "Okay."
    },
    {
      segments_id: 237,
      start: 1034.4,
      end: 1034.72,
      text: "Yeah."
    },
    {
      segments_id: 238,
      start: 1035.28,
      end: 1037.68,
      text: "So I just need to measure the crown."
    },
    {
      segments_id: 239,
      start: 1038.0,
      end: 1046.32,
      text: "And I'll be asking for to help measure that crown."
    },
    {
      segments_id: 240,
      start: 1046.8,
      end: 1046.96,
      text: "Okay."
    },
    {
      segments_id: 241,
      start: 1047.28,
      end: 1047.6,
      text: "All right."
    },
    {
      segments_id: 242,
      start: 1047.68,
      end: 1048.16,
      text: "That's fine."
    },
    {
      segments_id: 243,
      start: 1049.92,
      end: 1050.24,
      text: "Cool."
    },
    {
      segments_id: 244,
      start: 1050.4,
      end: 1052.24,
      text: "Is that our road or is it far?"
    },
    {
      segments_id: 245,
      start: 1053.04,
      end: 1053.12,
      text: "Okay."
    },
    {
      segments_id: 246,
      start: 1054.24,
      end: 1057.12,
      text: "You can, if it was Placer County or I don't know."
    },
    {
      segments_id: 247,
      start: 1057.52,
      end: 1060.24,
      text: "Oh, well, public works number is."
    },
    {
      segments_id: 248,
      start: 1062.72,
      end: 1064.88,
      text: "I'd say now, there's some good news."
    },
    {
      segments_id: 249,
      start: 1065.12,
      end: 1066.88,
      text: "I got some good news here."
    },
    {
      segments_id: 250,
      start: 1067.3600000000001,
      end: 1077.52,
      text: "The USDA tank project, the loan closed like just a couple of days before the interest rate was going to bump by another percent, 1%."
    },
    {
      segments_id: 251,
      start: 1079.6,
      end: 1088.72,
      text: "So the history of that is that we were trying to close the loan, which is not just like going to the bank and signing things."
    },
    {
      segments_id: 252,
      start: 1089.3600000000001,
      end: 1092.8,
      text: "You got the bond council and all the magic."
    },
    {
      segments_id: 253,
      start: 1093.12,
      end: 1099.2,
      text: "And so anyway, we're trying to close it at two and an eighth, and then it just didn't make it."
    },
    {
      segments_id: 254,
      start: 1099.3600000000001,
      end: 1103.2,
      text: "And it was really on their, on USDA's side of the problem."
    },
    {
      segments_id: 255,
      start: 1104.24,
      end: 1105.3600000000001,
      text: "You know, it's their issue."
    },
    {
      segments_id: 256,
      start: 1106.0,
      end: 1116.24,
      text: "And then, so then I was like, he voted, you know, try, okay, we're going to close this thing in May, you know, and May came and went."
    },
    {
      segments_id: 257,
      start: 1116.56,
      end: 1122.48,
      text: "And so anyway, and then it almost didn't close in June in July 1."
    },
    {
      segments_id: 258,
      start: 1122.72,
      end: 1124.72,
      text: "It's when the interest rate moves to go up."
    },
    {
      segments_id: 259,
      start: 1124.8,
      end: 1126.32,
      text: "So anyway, long story."
    },
    {
      segments_id: 260,
      start: 1126.72,
      end: 1128.08,
      text: "Oh, well, I gave you a long story."
    },
    {
      segments_id: 261,
      start: 1128.32,
      end: 1133.84,
      text: "Anyway, the short story is, is that we got 2.5%, which is a huge savings."
    },
    {
      segments_id: 262,
      start: 1134.0,
      end: 1137.84,
      text: "And the guaranteed interest rate from USDA was 3.7%."
    },
    {
      segments_id: 263,
      start: 1138.8,
      end: 1145.2,
      text: "So that would be like worst case scenario, but we dodge that goal."
    },
    {
      segments_id: 264,
      start: 1147.3600000000001,
      end: 1150.24,
      text: "I just want to make sure I'm still recording."
    },
    {
      segments_id: 265,
      start: 1151.6,
      end: 1164.0,
      text: "The administrative assistant job description that's completed and I'm sure it's attached on the documents."
    },
    {
      segments_id: 266,
      start: 1166.48,
      end: 1171.76,
      text: "And I just want to shout out to Richard for coming through it."
    },
    {
      segments_id: 267,
      start: 1172.08,
      end: 1178.4,
      text: "And it's just really nice to have extra eyes looking at stuff."
    },
    {
      segments_id: 268,
      start: 1179.3600000000001,
      end: 1182.24,
      text: "So we're going to review that on the action items."
    },
    {
      segments_id: 269,
      start: 1182.6399999999999,
      end: 1182.96,
      text: "Okay."
    },
    {
      segments_id: 270,
      start: 1184.88,
      end: 1186.16,
      text: "So anyway, thank you, Richard."
    },
    {
      segments_id: 271,
      start: 1187.8400000000001,
      end: 1189.76,
      text: "Well, you heard my roads update there."
    },
    {
      segments_id: 272,
      start: 1190.0,
      end: 1199.92,
      text: "And hopefully this next month, I'll either have a survey of the roads or a couple of proposals from contractors."
    },
    {
      segments_id: 273,
      start: 1200.56,
      end: 1207.12,
      text: "But I'm not having good response from the county."
    },
    {
      segments_id: 274,
      start: 1207.6,
      end: 1212.64,
      text: "They don't use outside inspectors on their roads."
    },
    {
      segments_id: 275,
      start: 1214.32,
      end: 1227.92,
      text: "And I have a call and no answer and another call and then they'll answer, seeing if there's anyone on the inside that's available to do some inspection on the side for us."
    },
    {
      segments_id: 276,
      start: 1228.96,
      end: 1241.84,
      text: "So because it would just be really nice to have an outside inspector inspecting the roads who knows when is enough oil on the road and when is not."
    },
    {
      segments_id: 277,
      start: 1242.16,
      end: 1246.48,
      text: "Because if there's not enough oil, that's when you see that you can still come off."
    },
    {
      segments_id: 278,
      start: 1248.0,
      end: 1250.8,
      text: "So didn't we have one?"
    },
    {
      segments_id: 279,
      start: 1251.44,
      end: 1252.88,
      text: "We were looking for more."
    },
    {
      segments_id: 280,
      start: 1253.12,
      end: 1256.0,
      text: "A couple more proposals and we haven't yet found anybody."
    },
    {
      segments_id: 281,
      start: 1256.24,
      end: 1256.4,
      text: "Right."
    },
    {
      segments_id: 282,
      start: 1257.68,
      end: 1259.36,
      text: "And where did you look for that?"
    },
    {
      segments_id: 283,
      start: 1259.68,
      end: 1262.88,
      text: "From Flasher County Public Works right there."
    },
    {
      segments_id: 284,
      start: 1263.52,
      end: 1267.52,
      text: "And then a call to CSDA if they have it out."
    },
    {
      segments_id: 285,
      start: 1268.88,
      end: 1269.6,
      text: "But they don't."
    },
    {
      segments_id: 286,
      start: 1272.08,
      end: 1276.48,
      text: "So what would be the next, where else can we look for that?"
    },
    {
      segments_id: 287,
      start: 1278.72,
      end: 1282.32,
      text: "Oh yeah, maybe Chris Coward, a former board member might know."
    },
    {
      segments_id: 288,
      start: 1283.2,
      end: 1284.16,
      text: "Oh, yeah."
    },
    {
      segments_id: 289,
      start: 1284.88,
      end: 1285.44,
      text: "Yeah, that's good."
    },
    {
      segments_id: 290,
      start: 1296.0,
      end: 1305.6,
      text: "So anyway, the RB was opened, or you know, the proposals were open."
    },
    {
      segments_id: 291,
      start: 1306.16,
      end: 1310.24,
      text: "And we had, we were coming in good."
    },
    {
      segments_id: 292,
      start: 1310.56,
      end: 1313.28,
      text: "We were going to have five proposals."
    },
    {
      segments_id: 293,
      start: 1313.6,
      end: 1318.96,
      text: "And then a week before it went to four, or maybe it was two weeks before, it went to four proposals."
    },
    {
      segments_id: 294,
      start: 1319.28,
      end: 1325.2,
      text: "And then on the morning of 6.30 a.m., 6.23 a.m., it went to three."
    },
    {
      segments_id: 295,
      start: 1325.76,
      end: 1348.72,
      text: "And so the three proposals from Jason Hoffman's business, the American River backflow, and then Coleman Engineering, and 49er water."
    },
    {
      segments_id: 296,
      start: 1348.96,
      end: 1350.72,
      text: "Those are the three that came through."
    },
    {
      segments_id: 297,
      start: 1350.96,
      end: 1354.56,
      text: "49er water is a repeat proposal."
    },
    {
      segments_id: 298,
      start: 1354.88,
      end: 1356.8,
      text: "So the other repeat they opted out?"
    },
    {
      segments_id: 299,
      start: 1357.12,
      end: 1358.08,
      text: "They didn't propose."
    },
    {
      segments_id: 300,
      start: 1358.32,
      end: 1359.84,
      text: "They didn't answer that the same proposal."
    },
    {
      segments_id: 301,
      start: 1360.08,
      end: 1360.4,
      text: "Right."
    },
    {
      segments_id: 302,
      start: 1362.96,
      end: 1366.88,
      text: "I think the price was kind of like, yeah, we really don't want to do it."
    },
    {
      segments_id: 303,
      start: 1367.12,
      end: 1368.4,
      text: "Yeah, we don't want to do this proposal."
    },
    {
      segments_id: 304,
      start: 1371.2,
      end: 1371.92,
      text: "Just saying."
    },
    {
      segments_id: 305,
      start: 1373.6,
      end: 1381.12,
      text: "And then the last piece is about the PCWA consolidation letter."
    },
    {
      segments_id: 306,
      start: 1381.44,
      end: 1386.32,
      text: "And so PCWA sent the district a letter."
    },
    {
      segments_id: 307,
      start: 1386.56,
      end: 1391.76,
      text: "And oh God, they sent everybody an individualized letter so that you have your name on it."
    },
    {
      segments_id: 308,
      start: 1392.08,
      end: 1393.44,
      text: "And I correct the book."
    },
    {
      segments_id: 309,
      start: 1393.68,
      end: 1400.08,
      text: "But if you just look at the one that is online from Heidi, it's the same exact one."
    },
    {
      segments_id: 310,
      start: 1400.72,
      end: 1402.96,
      text: "Just different name of it."
    },
    {
      segments_id: 311,
      start: 1403.52,
      end: 1409.3600000000001,
      text: "So anyway, is this okay time to go over that real quick?"
    },
    {
      segments_id: 312,
      start: 1410.32,
      end: 1416.24,
      text: "Yeah, Catherine's not in the meeting yet, so anyway."
    },
    {
      segments_id: 313,
      start: 1416.56,
      end: 1417.6,
      text: "Okay, yeah, let's show it."
    },
    {
      segments_id: 314,
      start: 1418.4,
      end: 1424.08,
      text: "She's currently attending remotely from Parkland."
    },
    {
      segments_id: 315,
      start: 1426.64,
      end: 1429.3600000000001,
      text: "She's just getting out of a meeting in Sacramento."
    },
    {
      segments_id: 316,
      start: 1429.68,
      end: 1436.72,
      text: "So she's going to apart and zooming in and then driving home the trucky afterwards."
    },
    {
      segments_id: 317,
      start: 1437.04,
      end: 1437.92,
      text: "So it's important."
    },
    {
      segments_id: 318,
      start: 1439.04,
      end: 1443.04,
      text: "So anyway, when you hear that, then I'll stop talking."
    },
    {
      segments_id: 319,
      start: 1443.2,
      end: 1443.44,
      text: "Okay."
    },
    {
      segments_id: 320,
      start: 1445.28,
      end: 1447.92,
      text: "Anyway, so PCWA consolidation."
    },
    {
      segments_id: 321,
      start: 1448.88,
      end: 1467.2,
      text: "Just a quick definition of consolidation, which Heidi and I met with PCWA and we just talked through kind of the nuts and bolts of the letter and just asked some questions."
    },
    {
      segments_id: 322,
      start: 1468.16,
      end: 1472.16,
      text: "And it will still be open to having more meetings and more questions."
    },
    {
      segments_id: 323,
      start: 1473.44,
      end: 1478.16,
      text: "But there were a lot of questions just from the letter itself."
    },
    {
      segments_id: 324,
      start: 1478.6399999999999,
      end: 1484.0,
      text: "So anyway, my first question was, do we have to actually hook into your line?"
    },
    {
      segments_id: 325,
      start: 1484.72,
      end: 1485.6,
      text: "Why do we have to do that?"
    },
    {
      segments_id: 326,
      start: 1485.76,
      end: 1489.28,
      text: "And they said, well, that's actually the definition of the consolidation."
    },
    {
      segments_id: 327,
      start: 1489.6,
      end: 1494.96,
      text: "Is their water lines connecting to our water lines?"
    },
    {
      segments_id: 328,
      start: 1495.28,
      end: 1499.76,
      text: "And their regulations are they need to have two places."
    },
    {
      segments_id: 329,
      start: 1500.4,
      end: 1502.4,
      text: "That they're looking into our line."
    },
    {
      segments_id: 330,
      start: 1502.72,
      end: 1512.96,
      text: "And so the two places which you would see on that map, one was at the end of Pondarex and one was at the end of Westridge Avenue."
    },
    {
      segments_id: 331,
      start: 1513.28,
      end: 1520.72,
      text: "Kind of the, if you go from the water tanks and you go across Ponderex and go to the very end, you know, hook in somewhere out there."
    },
    {
      segments_id: 332,
      start: 1521.36,
      end: 1528.4,
      text: "And so anyway, so that's what the consolidation, the definition of it is."
    },
    {
      segments_id: 333,
      start: 1528.72,
      end: 1533.44,
      text: "And it would, and they looked at it."
    },
    {
      segments_id: 334,
      start: 1533.6,
      end: 1536.4,
      text: "There's a partial consolidation and then there's a full consolidation."
    },
    {
      segments_id: 335,
      start: 1536.8,
      end: 1564.08,
      text: "A partial means that they would, I'm not sure if I want to go into that, but a full consolidation means that they would take over the whole water side of things for the district, the entirety, whether it's billing, the water treatment, you know, the labor for that, and the distribution lines, everything."
    },
    {
      segments_id: 336,
      start: 1566.24,
      end: 1583.44,
      text: "And so the concept is that to consolidate, to be fair to their ratepayers, PCWA ratepayers, all 30,000 of them, is to match the age of their system to the age of our system."
    },
    {
      segments_id: 337,
      start: 1584.08,
      end: 1587.92,
      text: "And the numbers on there look all nice."
    },
    {
      segments_id: 338,
      start: 1588.64,
      end: 1592.24,
      text: "It looks like it's highly technical, but it's really just an overview."
    },
    {
      segments_id: 339,
      start: 1592.72,
      end: 1594.96,
      text: "It is more of a ballpark figure."
    },
    {
      segments_id: 340,
      start: 1595.28,
      end: 1617.84,
      text: "And the trying to say, so anyway, the water plant, they deem the water plant as being very sufficient to run the district, you know, putting water into the water lines and no need to put treated water from them into our lines."
    },
    {
      segments_id: 341,
      start: 1617.92,
      end: 1622.56,
      text: "And that's why I asked, why do we have to connect in if we don't really need your water?"
    },
    {
      segments_id: 342,
      start: 1622.8,
      end: 1627.52,
      text: "But it's kind of like their safety net in providing water to the district."
    },
    {
      segments_id: 343,
      start: 1627.76,
      end: 1630.56,
      text: "If our plant goes down, they're the safety net."
    },
    {
      segments_id: 344,
      start: 1631.04,
      end: 1636.0,
      text: "So don't we get our water from PCWA of our raw water already?"
    },
    {
      segments_id: 345,
      start: 1636.24,
      end: 1638.96,
      text: "Yeah, but they'll make the treated water connection."
    },
    {
      segments_id: 346,
      start: 1639.84,
      end: 1640.16,
      text: "Oh."
    },
    {
      segments_id: 347,
      start: 1640.48,
      end: 1648.56,
      text: "So we get raw water now, and what they were suggesting is to get a redundant treated water from their plant."
    },
    {
      segments_id: 348,
      start: 1650.64,
      end: 1650.88,
      text: "Exactly."
    },
    {
      segments_id: 349,
      start: 1651.44,
      end: 1655.3600000000001,
      text: "So there will be redundancy of treated water coming from a piece of raid plant."
    },
    {
      segments_id: 350,
      start: 1657.04,
      end: 1658.88,
      text: "Ramondo, could you speak up a little bit more?"
    },
    {
      segments_id: 351,
      start: 1658.96,
      end: 1661.04,
      text: "Because I only got just pieces of what you said."
    },
    {
      segments_id: 352,
      start: 1661.12,
      end: 1661.44,
      text: "Thank you."
    },
    {
      segments_id: 353,
      start: 1661.76,
      end: 1661.84,
      text: "Sure."
    },
    {
      segments_id: 354,
      start: 1662.32,
      end: 1668.8,
      text: "I was just answering Ken's question, I think, is we currently receive raw water from BCWA."
    },
    {
      segments_id: 355,
      start: 1669.68,
      end: 1676.48,
      text: "If we were to do the consolidation, they require that there be redundancy for the treated water."
    },
    {
      segments_id: 356,
      start: 1676.88,
      end: 1689.04,
      text: "So they would be connecting to our treated water from their plant as well, even in two places, even though our plant is more than sufficient and meets their standards."
    },
    {
      segments_id: 357,
      start: 1690.16,
      end: 1712.16,
      text: "And in doing so, because our plant is sufficient to do that, there's no, in the letter, you'd see that there's nothing, all of zeros for a connection fee, because there's no, they don't have to expand their plants in order to serve our community because our plant served it well enough."
    },
    {
      segments_id: 358,
      start: 1712.8,
      end: 1719.28,
      text: "And so the first thing I asked was, well, shouldn't we get a credit on that release on the tanks?"
    },
    {
      segments_id: 359,
      start: 1719.6,
      end: 1730.64,
      text: "And they said, you know, we can talk about that later when we go from an overview, when we start digging deeper onto the stuff."
    },
    {
      segments_id: 360,
      start: 1731.2,
      end: 1736.16,
      text: "And saving me from putting my foot in my mouth is Catherine coming in."
    },
    {
      segments_id: 361,
      start: 1740.88,
      end: 1741.28,
      text: "All right."
    },
    {
      segments_id: 362,
      start: 1744.72,
      end: 1751.2,
      text: "So anyway, and I'll go back over, I'll finish up on the consolidation."
    },
    {
      segments_id: 363,
      start: 1751.52,
      end: 1762.72,
      text: "But anyway, the thing that they said that that letter has no grant money associated with it."
    },
    {
      segments_id: 364,
      start: 1763.3600000000001,
      end: 1774.08,
      text: "And so they said that the consolidation for that, for a full consolidation, because it's less than the partial, is $6.8 million."
    },
    {
      segments_id: 365,
      start: 1774.88,
      end: 1794.96,
      text: "And then they said that there's a possibility that there could be like about $10,000 per connection to offset that, which is like $6.3 million or we'll just say $6 million just to be a possible $6 million to offset that."
    },
    {
      segments_id: 366,
      start: 1795.2,
      end: 1799.92,
      text: "So anyway, I just want to welcome Catherine Hanson."
    },
    {
      segments_id: 367,
      start: 1800.08,
      end: 1802.0,
      text: "Transferred to the meeting."
    },
    {
      segments_id: 368,
      start: 1802.32,
      end: 1805.44,
      text: "And she's in the lower right corner for me."
    },
    {
      segments_id: 369,
      start: 1807.2,
      end: 1808.96,
      text: "Catherine, can you hear me?"
    },
    {
      segments_id: 370,
      start: 1809.28,
      end: 1810.24,
      text: "Yes, I can."
    },
    {
      segments_id: 371,
      start: 1810.56,
      end: 1811.36,
      text: "Oh, awesome."
    },
    {
      segments_id: 372,
      start: 1811.92,
      end: 1830.0,
      text: "So Catherine is coming to the meeting because I think, and she does great, well, she'll explain how her business can, what they do and how they can help us."
    },
    {
      segments_id: 373,
      start: 1830.48,
      end: 1841.04,
      text: "So before she does that, can either Catherine or you explain what's the purpose of the single part?"
    },
    {
      segments_id: 374,
      start: 1841.44,
      end: 1847.68,
      text: "Is that right?"
    },
    {
      segments_id: 375,
      start: 1849.36,
      end: 1849.52,
      text: "Yeah."
    },
    {
      segments_id: 376,
      start: 1849.84,
      end: 1850.72,
      text: "Oh, the rate study."
    },
    {
      segments_id: 377,
      start: 1852.4,
      end: 1855.52,
      text: "So, Catherine, if you're ready."
    },
    {
      segments_id: 378,
      start: 1856.56,
      end: 1857.68,
      text: "Yeah, I'm hi."
    },
    {
      segments_id: 379,
      start: 1857.76,
      end: 1858.24,
      text: "I'm sorry."
    },
    {
      segments_id: 380,
      start: 1858.64,
      end: 1864.72,
      text: "I don't have my camera on, but I'm currently traveling, so just not in a good place to do it."
    },
    {
      segments_id: 381,
      start: 1864.8,
      end: 1866.08,
      text: "So sorry about that."
    },
    {
      segments_id: 382,
      start: 1867.2,
      end: 1868.4,
      text: "But pleased to meet you."
    },
    {
      segments_id: 383,
      start: 1868.48,
      end: 1869.92,
      text: "My name is Catherine Hansford."
    },
    {
      segments_id: 384,
      start: 1870.4,
      end: 1873.28,
      text: "I'm the principal of Hansford Economic Consulting."
    },
    {
      segments_id: 385,
      start: 1873.52,
      end: 1877.36,
      text: "And I've been in business since about two, well, since 2005."
    },
    {
      segments_id: 386,
      start: 1877.68,
      end: 1880.08,
      text: "I'm located up in Truckee."
    },
    {
      segments_id: 387,
      start: 1880.72,
      end: 1886.0,
      text: "And I do a lot of work with water utilities."
    },
    {
      segments_id: 388,
      start: 1886.56,
      end: 1891.84,
      text: "I primarily work with financial questions."
    },
    {
      segments_id: 389,
      start: 1892.08,
      end: 1894.8,
      text: "I do rate studies, fee studies."
    },
    {
      segments_id: 390,
      start: 1896.24,
      end: 1900.4,
      text: "I have helped with consolidation, merger, acquisitions."
    },
    {
      segments_id: 391,
      start: 1900.56,
      end: 1905.6,
      text: "I've done appraisals of water utilities, both public and private."
    },
    {
      segments_id: 392,
      start: 1906.16,
      end: 1911.2,
      text: "I've done expert review of freight cases."
    },
    {
      segments_id: 393,
      start: 1911.76,
      end: 1916.72,
      text: "And so I primarily work in the water utility business."
    },
    {
      segments_id: 394,
      start: 1917.36,
      end: 1919.04,
      text: "I also do work in other areas."
    },
    {
      segments_id: 395,
      start: 1919.28,
      end: 1928.4,
      text: "I work with roads funding, parks funding, public safety funding, and I work primarily in California."
    },
    {
      segments_id: 396,
      start: 1928.72,
      end: 1937.44,
      text: "And I primarily work with smaller cities and special districts and often of a rural nature."
    },
    {
      segments_id: 397,
      start: 1937.52,
      end: 1960.48,
      text: "So I would say that's really my niche is in working with the smaller communities and in particular communities that I work with a lot of volunteer boards, a lot of small rural utilities that need help with applying for state funds and federal funds, for example."
    },
    {
      segments_id: 398,
      start: 1961.04,
      end: 1964.48,
      text: "So that's really my expertise."
    },
    {
      segments_id: 399,
      start: 1964.96,
      end: 1969.2,
      text: "Locally in your area, I've worked with Midway Heights."
    },
    {
      segments_id: 400,
      start: 1969.28,
      end: 1976.32,
      text: "I've worked with them on getting funding for a tank project and I also helped them with their last rate study."
    },
    {
      segments_id: 401,
      start: 1977.04,
      end: 1979.28,
      text: "And then I've also worked with Heather Glenn."
    },
    {
      segments_id: 402,
      start: 1979.76,
      end: 1989.28,
      text: "I did an income survey for them and then I also did an analysis of a consolidation effort with PCWA for them a couple of years ago."
    },
    {
      segments_id: 403,
      start: 1989.52,
      end: 1991.76,
      text: "Well, a bit more than a couple of years ago now."
    },
    {
      segments_id: 404,
      start: 1996.08,
      end: 1998.4,
      text: "Did Heather Glenn consolidate?"
    },
    {
      segments_id: 405,
      start: 1999.68,
      end: 2000.96,
      text: "Oh, you just cut out there."
    },
    {
      segments_id: 406,
      start: 2001.3600000000001,
      end: 2002.48,
      text: "Could you hear me?"
    },
    {
      segments_id: 407,
      start: 2003.04,
      end: 2005.2,
      text: "Did Heather Glenn consolidate?"
    },
    {
      segments_id: 408,
      start: 2005.52,
      end: 2007.52,
      text: "They did not at the time."
    },
    {
      segments_id: 409,
      start: 2007.76,
      end: 2009.84,
      text: "I don't actually know what they're doing right now."
    },
    {
      segments_id: 410,
      start: 2010.96,
      end: 2019.76,
      text: "Jerry would know if he's around, but no, at the time we did the work, they did not."
    },
    {
      segments_id: 411,
      start: 2020.96,
      end: 2028.24,
      text: "So I received a call from your general manager asking me about my services."
    },
    {
      segments_id: 412,
      start: 2028.48,
      end: 2036.56,
      text: "And I said I'd be happy to hop onto a board meeting and let you know that I'm fairly local and I do this work."
    },
    {
      segments_id: 413,
      start: 2036.88,
      end: 2044.8,
      text: "And if that's something that you would like assistance with, then I would be happy to put together a proposal for you."
    },
    {
      segments_id: 414,
      start: 2047.12,
      end: 2061.44,
      text: "Do you know, if we increase rates just because of inflation of our costs, do we need to go through having a rates study?"
    },
    {
      segments_id: 415,
      start: 2061.76,
      end: 2062.64,
      text: "Yes, you do."
    },
    {
      segments_id: 416,
      start: 2062.88,
      end: 2063.2,
      text: "Yes."
    },
    {
      segments_id: 417,
      start: 2064.48,
      end: 2069.76,
      text: "You have to demonstrate your cost of service and proportionality."
    },
    {
      segments_id: 418,
      start: 2069.92,
      end: 2073.84,
      text: "So in California, there's some very specific requirements."
    },
    {
      segments_id: 419,
      start: 2074.8,
      end: 2078.96,
      text: "I'm sure you've heard of Proposition 218, and you have to follow those."
    },
    {
      segments_id: 420,
      start: 2079.04,
      end: 2089.92,
      text: "So anytime that you are going to increase or adopt a new fee for water, sewer or refuse services, you have to go through this process."
    },
    {
      segments_id: 421,
      start: 2090.16,
      end: 2099.76,
      text: "Now, you can adopt rates that have an inflation factor built into them, but if you do that, that only can go out for"
    },
    {
      segments_id: 422,
      start: 2100.24,
      end: 2100.96,
      text: "Five years."
    },
    {
      segments_id: 423,
      start: 2101.52,
      end: 2108.4,
      text: "So statutes require that you can only apply a cost of inflation factor for five years."
    },
    {
      segments_id: 424,
      start: 2111.44,
      end: 2120.88,
      text: "To piggyback on that question, does it require a vote when we're just do we have to get approval from the ratepayers?"
    },
    {
      segments_id: 425,
      start: 2121.52,
      end: 2124.16,
      text: "No, it's what they call a protest procedure."
    },
    {
      segments_id: 426,
      start: 2124.64,
      end: 2134.88,
      text: "So yeah, you just notify everyone and then if there's no majority protest at that point in time, you can then adopt the rates."
    },
    {
      segments_id: 427,
      start: 2141.76,
      end: 2143.28,
      text: "Are there any other questions?"
    },
    {
      segments_id: 428,
      start: 2143.44,
      end: 2143.84,
      text: "Any questions?"
    },
    {
      segments_id: 429,
      start: 2144.08,
      end: 2145.52,
      text: "Diane, did you have a question?"
    },
    {
      segments_id: 430,
      start: 2147.76,
      end: 2170.16,
      text: "Actually, pardon me, Catherine, you actually jumped into what I was going to say, and that was that five-year scenario where you do just do the notify, because I was telling the board, actually, you know, we can't continually absorb the inflationary rate."
    },
    {
      segments_id: 431,
      start: 2170.32,
      end: 2175.36,
      text: "And there is the provision, and I sent them the code to that a couple of years ago."
    },
    {
      segments_id: 432,
      start: 2176.0,
      end: 2181.28,
      text: "Now, in terms of a CIP project and so on and so forth, that's a different scenario."
    },
    {
      segments_id: 433,
      start: 2181.52,
      end: 2183.36,
      text: "So you basically, you answered it."
    },
    {
      segments_id: 434,
      start: 2183.52,
      end: 2183.84,
      text: "Thank you."
    },
    {
      segments_id: 435,
      start: 2187.04,
      end: 2200.96,
      text: "I wanted to understand a little bit about the work that you do with the merger, such as if we were to merge with PCWA, what would be kind of the services that you would provide in that process?"
    },
    {
      segments_id: 436,
      start: 2201.2,
      end: 2203.36,
      text: "And maybe explain what you did for Glenn."
    },
    {
      segments_id: 437,
      start: 2206.0,
      end: 2211.52,
      text: "Yeah, so it's really looking at what is the impact financially to the customers."
    },
    {
      segments_id: 438,
      start: 2212.0,
      end: 2216.48,
      text: "Are their rates going to be higher or lower upon consolidation?"
    },
    {
      segments_id: 439,
      start: 2217.92,
      end: 2224.4,
      text: "Recognizing that's only one factor, of course, that there might be other good reasons to consolidate."
    },
    {
      segments_id: 440,
      start: 2224.56,
      end: 2227.28,
      text: "It's not just a financial decision."
    },
    {
      segments_id: 441,
      start: 2227.92,
      end: 2238.72,
      text: "But that's primarily what I was doing was to see, as you had mentioned, I heard you when I jumped on talking about the amount of grant money that's available per connection."
    },
    {
      segments_id: 442,
      start: 2238.96,
      end: 2244.64,
      text: "And, you know, that does differ depending on the income level of your community."
    },
    {
      segments_id: 443,
      start: 2246.24,
      end: 2247.6,
      text: "But it can have a big impact."
    },
    {
      segments_id: 444,
      start: 2248.0,
      end: 2267.2,
      text: "So essentially doing a financial analysis of what does the picture look like given the costs after consolidation versus if you were to continue as your own entity and knowing what capital improvement projects you have on the horizon that have to be done."
    },
    {
      segments_id: 445,
      start: 2267.76,
      end: 2271.84,
      text: "So in a merger like that, is there any opportunity for negotiation?"
    },
    {
      segments_id: 446,
      start: 2272.56,
      end: 2280.08,
      text: "Basically, we got a quote from PCWA saying this is what it's going to cost."
    },
    {
      segments_id: 447,
      start: 2281.28,
      end: 2284.16,
      text: "Not being, never being involved in one of these mergers."
    },
    {
      segments_id: 448,
      start: 2284.48,
      end: 2291.52,
      text: "Is there an opportunity where we do some analysis and then we go back to them and say, your number's a little bit off and here's why?"
    },
    {
      segments_id: 449,
      start: 2292.16,
      end: 2293.84,
      text: "Yes, you certainly can."
    },
    {
      segments_id: 450,
      start: 2295.04,
      end: 2300.32,
      text: "PCWA, for lack of better words, is a fairly big dog."
    },
    {
      segments_id: 451,
      start: 2301.76,
      end: 2305.68,
      text: "But yes, there's always room for negotiation."
    },
    {
      segments_id: 452,
      start: 2306.16,
      end: 2309.6,
      text: "But that's where the state money really comes into play."
    },
    {
      segments_id: 453,
      start: 2310.72,
      end: 2319.04,
      text: "And talking to the project, who would be your project manager, you always get assigned one by the state."
    },
    {
      segments_id: 454,
      start: 2320.56,
      end: 2327.84,
      text: "And talking with them and seeing what they can offer is a big part of the equation."
    },
    {
      segments_id: 455,
      start: 2330.08,
      end: 2338.56,
      text: "So Catherine, if we go into this process with PCWA, at what point would your services be more important?"
    },
    {
      segments_id: 456,
      start: 2339.2,
      end: 2342.88,
      text: "When would your study make sense for us to do?"
    },
    {
      segments_id: 457,
      start: 2344.16,
      end: 2354.48,
      text: "For instance, PCWA says they want us to put down $36,000 to start the process."
    },
    {
      segments_id: 458,
      start: 2357.36,
      end: 2363.52,
      text: "At what point in the process do you then tell us your version versus theirs?"
    },
    {
      segments_id: 459,
      start: 2365.36,
      end: 2370.08,
      text: "I'm very curious why they would want $36,000 from you for a start."
    },
    {
      segments_id: 460,
      start: 2371.68,
      end: 2382.88,
      text: "That's it's for it's for a study and grants, grant study, and it's reimbursable to okay."
    },
    {
      segments_id: 461,
      start: 2385.28,
      end: 2399.76,
      text: "Well, I would say that the engineering work needs to be solid before I get, you know, if I was to be asked to help, because you've really got to know both on your side, I mean, PTW has given you an estimate of the"
    },
    {
      segments_id: 462,
      start: 2400.24,
      end: 2400.32,
      text: "Cost."
    },
    {
      segments_id: 463,
      start: 2400.96,
      end: 2403.44,
      text: "I don't know how comfortable you are with that."
    },
    {
      segments_id: 464,
      start: 2404.08,
      end: 2409.12,
      text: "Um, what you know, you'll do we, but neither do we, that's why we're talking to you."
    },
    {
      segments_id: 465,
      start: 2409.76,
      end: 2418.48,
      text: "Well, I do, I do think you would have to have that vetted out first, because any analysis I do is based off of the costs from the engineers."
    },
    {
      segments_id: 466,
      start: 2418.64,
      end: 2428.64,
      text: "And if you're not all comfortable and on the same page with the costs, then you know, you'd be asking for a round two with me, probably."
    },
    {
      segments_id: 467,
      start: 2428.96,
      end: 2438.48,
      text: "So that's what I would suggest is getting some engineering work done, getting, you know, feeling very comfortable with what these numbers really are."
    },
    {
      segments_id: 468,
      start: 2439.68,
      end: 2447.52,
      text: "And then I'm not sure exactly at what point these things tend to sort of just play out."
    },
    {
      segments_id: 469,
      start: 2447.68,
      end: 2457.28,
      text: "It becomes obvious at some point that, yeah, we need to look at that ourselves and not just not just what PCW is saying."
    },
    {
      segments_id: 470,
      start: 2457.92,
      end: 2460.4,
      text: "Or, yeah."
    },
    {
      segments_id: 471,
      start: 2462.0,
      end: 2463.36,
      text: "Okay, thank you."
    },
    {
      segments_id: 472,
      start: 2466.8,
      end: 2468.0,
      text: "Diane, do you have another question?"
    },
    {
      segments_id: 473,
      start: 2469.04,
      end: 2486.64,
      text: "Yeah, Catherine, if you 2019, the district already had a three-phase plan together for the transmission lines because obviously the water treatment plant is now fully completed and funded."
    },
    {
      segments_id: 474,
      start: 2486.96,
      end: 2494.64,
      text: "And is any of that already that rate study and that analysis of engineering that that rate study was based upon?"
    },
    {
      segments_id: 475,
      start: 2494.72,
      end: 2502.88,
      text: "Is that a pass-through that can be used still obviously adjusted for current costs, right?"
    },
    {
      segments_id: 476,
      start: 2503.52,
      end: 2508.96,
      text: "But most of that legwork was done in 2019."
    },
    {
      segments_id: 477,
      start: 2509.6,
      end: 2515.76,
      text: "So how much of a savings or applicability is that for somebody like yourself?"
    },
    {
      segments_id: 478,
      start: 2516.0,
      end: 2516.32,
      text: "Thank you."
    },
    {
      segments_id: 479,
      start: 2517.44,
      end: 2518.72,
      text: "Very, very applicable."
    },
    {
      segments_id: 480,
      start: 2519.2,
      end: 2523.68,
      text: "From 2019, I'd say that's still reasonably fresh."
    },
    {
      segments_id: 481,
      start: 2523.92,
      end: 2525.2,
      text: "It's within the last five years."
    },
    {
      segments_id: 482,
      start: 2525.52,
      end: 2535.68,
      text: "The only caution I would say on that is that normally I would just apply an inflation flag, excuse me, an inflation factor to that."
    },
    {
      segments_id: 483,
      start: 2536.4,
      end: 2552.4,
      text: "But I would just say you might want to have an engineer do a review of it because currently costs have spiraled just crazily, frankly."
    },
    {
      segments_id: 484,
      start: 2552.72,
      end: 2555.6,
      text: "And I don't think..."
    },
    {
      segments_id: 485,
      start: 2556.0,
      end: 2559.68,
      text: "Well, Jerry is the one who did the original analysis for that."
    },
    {
      segments_id: 486,
      start: 2559.84,
      end: 2562.88,
      text: "So you're familiar with him and that's what I mean."
    },
    {
      segments_id: 487,
      start: 2563.44,
      end: 2566.48,
      text: "Yes, Jerry and I worked together a long time ago."
    },
    {
      segments_id: 488,
      start: 2567.04,
      end: 2575.92,
      text: "And I've since seen him in the room or talked to him with both Midway Heights and Heather Glenn."
    },
    {
      segments_id: 489,
      start: 2576.16,
      end: 2576.72,
      text: "Yes."
    },
    {
      segments_id: 490,
      start: 2583.92,
      end: 2585.04,
      text: "Sorry, I have another question."
    },
    {
      segments_id: 491,
      start: 2585.12,
      end: 2586.48,
      text: "I'm going to change the gears a little bit."
    },
    {
      segments_id: 492,
      start: 2586.64,
      end: 2598.32,
      text: "Going back to away from the merger process, I wanted to see, could you give us an estimate of how long the process is to develop a rate study?"
    },
    {
      segments_id: 493,
      start: 2600.8,
      end: 2601.2,
      text: "Yep."
    },
    {
      segments_id: 494,
      start: 2601.52,
      end: 2610.56,
      text: "So I usually say it's a six to eight, eight months process from start to public hearing and resolution adoption."
    },
    {
      segments_id: 495,
      start: 2611.2,
      end: 2614.96,
      text: "It can go faster and it can take longer."
    },
    {
      segments_id: 496,
      start: 2615.44,
      end: 2619.68,
      text: "Rate studies, I would say, highly recommend."
    },
    {
      segments_id: 497,
      start: 2619.92,
      end: 2621.68,
      text: "They're not something to rush."
    },
    {
      segments_id: 498,
      start: 2622.64,
      end: 2626.72,
      text: "They need to be done with transparency in the process."
    },
    {
      segments_id: 499,
      start: 2627.28,
      end: 2629.84,
      text: "There needs to be some community outreach."
    },
    {
      segments_id: 500,
      start: 2630.4,
      end: 2641.68,
      text: "And if it takes a little bit longer, I always advise take a little longer because it's much better to have a rate study that people understand."
    },
    {
      segments_id: 501,
      start: 2642.24,
      end: 2652.56,
      text: "They might not always like it, but if they can understand it and understand the need for the rate changes, then it will go much more smoothly."
    },
    {
      segments_id: 502,
      start: 2652.8,
      end: 2656.88,
      text: "So that's a typical timeframe though, six to eight months."
    },
    {
      segments_id: 503,
      start: 2657.2,
      end: 2660.64,
      text: "And that's assuming that the engineering costs are predetermined, right?"
    },
    {
      segments_id: 504,
      start: 2662.08,
      end: 2680.0,
      text: "Yeah, there can be a little bit of back and forth in the process, but sometimes I'll start out with a CIP from an engineer and it becomes clear that the rates would just need to go a bit higher than is felt to be acceptable by the community."
    },
    {
      segments_id: 505,
      start: 2680.32,
      end: 2687.92,
      text: "And in that case, we go back and look at, is there something that we could take out, for example?"
    },
    {
      segments_id: 506,
      start: 2689.44,
      end: 2692.7200000000003,
      text: "So there's usually a little back and forth, but generally, yes."
    },
    {
      segments_id: 507,
      start: 2693.04,
      end: 2697.2,
      text: "I do need to have the numbers from the engineer for the CIP."
    },
    {
      segments_id: 508,
      start: 2699.6,
      end: 2699.84,
      text: "Thank you."
    },
    {
      segments_id: 509,
      start: 2704.48,
      end: 2708.08,
      text: "Catherine, my name is Dan."
    },
    {
      segments_id: 510,
      start: 2708.24,
      end: 2712.64,
      text: "I have a question regarding the specifically on a race study."
    },
    {
      segments_id: 511,
      start: 2713.04,
      end: 2731.68,
      text: "After you complete it, what services do you provide as far as setting up a meeting with the community and stuff like that, explaining the rate study to the community, and such forth."
    },
    {
      segments_id: 512,
      start: 2733.36,
      end: 2736.0,
      text: "Yeah, well, I do recommend doing that."
    },
    {
      segments_id: 513,
      start: 2736.24,
      end: 2738.4,
      text: "And I can do it two ways."
    },
    {
      segments_id: 514,
      start: 2738.72,
      end: 2749.92,
      text: "One is I just pretty much do it myself with the help of the district setting up the meeting, getting the room, noticing, and so forth."
    },
    {
      segments_id: 515,
      start: 2750.48,
      end: 2771.84,
      text: "Or I can bring in a sub-consultant who works with me a lot on rate studies and she can help with doing everything from noticing to setting up the meetings to talking to key stakeholders if there are any."
    },
    {
      segments_id: 516,
      start: 2773.12,
      end: 2784.56,
      text: "So either way, obviously, if I bring in the sub-consultant, it does cost a little bit more, but I have done that with projects and it has certainly paid off."
    },
    {
      segments_id: 517,
      start: 2784.88,
      end: 2802.48,
      text: "So if there's any concern about community concerns about it and the need for a lot of explanation, you know, and also putting things up on your district website."
    },
    {
      segments_id: 518,
      start: 2803.44,
      end: 2810.08,
      text: "Shaylene is who I work with and she writes all the script for that if that's something you would need."
    },
    {
      segments_id: 519,
      start: 2811.36,
      end: 2816.72,
      text: "But I have also just done it where I've kept it pretty basic and just worked with district staff and done it myself."
    },
    {
      segments_id: 520,
      start: 2816.88,
      end: 2818.4,
      text: "So I can do it either way."
    },
    {
      segments_id: 521,
      start: 2819.6,
      end: 2836.56,
      text: "Do you typically put a PowerPoint presentation or something like that together for the community of you ahead of time so that they kind of know what's coming or do you just do you just do without the meeting?"
    },
    {
      segments_id: 522,
      start: 2836.88,
      end: 2839.44,
      text: "I usually just do that at the meeting."
    },
    {
      segments_id: 523,
      start: 2839.76,
      end: 2846.64,
      text: "And then depending on what kinds of issues there are, we can do a workshop in a couple of different formats."
    },
    {
      segments_id: 524,
      start: 2848.24,
      end: 2854.16,
      text: "And depending on the feel from the community, it can be more formal or it can be more informal."
    },
    {
      segments_id: 525,
      start: 2854.32,
      end: 2871.76,
      text: "It could be sort of more of a round robin where the general manager says something, the district engineer says something about the state of the system, why we need these improvements, and then I say something, or it can be just a presentation from me."
    },
    {
      segments_id: 526,
      start: 2873.92,
      end: 2877.28,
      text: "So that's something I couldn't tell you right now."
    },
    {
      segments_id: 527,
      start: 2879.28,
      end: 2884.88,
      text: "Yeah, I was just trying to get a feel for what type of services you provide with, you know, with the rate study."
    },
    {
      segments_id: 528,
      start: 2885.04,
      end: 2887.2,
      text: "So I guess that's what my question was."
    },
    {
      segments_id: 529,
      start: 2888.32,
      end: 2894.64,
      text: "Yeah, well, I do like to do an in-person public workshop at some point in the process."
    },
    {
      segments_id: 530,
      start: 2894.8,
      end: 2904.32,
      text: "And usually that's after the draft study comes out and the board has heard what the potential rates might be."
    },
    {
      segments_id: 531,
      start: 2904.48,
      end: 2906.56,
      text: "And there might be options too."
    },
    {
      segments_id: 532,
      start: 2906.88,
      end: 2911.2,
      text: "I don't know if there's, I haven't looked at your rates, to be honest."
    },
    {
      segments_id: 533,
      start: 2911.36,
      end: 2918.64,
      text: "I don't know if there'd be any need to look at change in rate structure or if it's just simply a change in the amount of the rates."
    },
    {
      segments_id: 534,
      start: 2918.8,
      end: 2919.84,
      text: "I don't know."
    },
    {
      segments_id: 535,
      start: 2922.32,
      end: 2922.64,
      text: "Okay."
    },
    {
      segments_id: 536,
      start: 2924.0,
      end: 2924.88,
      text: "That's all I have."
    },
    {
      segments_id: 537,
      start: 2924.96,
      end: 2926.88,
      text: "Thank you so much for answering that."
    },
    {
      segments_id: 538,
      start: 2927.2,
      end: 2927.52,
      text: "Yeah."
    },
    {
      segments_id: 539,
      start: 2929.36,
      end: 2930.24,
      text: "One more question."
    },
    {
      segments_id: 540,
      start: 2933.36,
      end: 2934.08,
      text: "One last question."
    },
    {
      segments_id: 541,
      start: 2934.24,
      end: 2940.56,
      text: "Would you be able to provide us a rate study that you did for one of these organizations about the same size as ours?"
    },
    {
      segments_id: 542,
      start: 2941.2,
      end: 2942.32,
      text: "Yes, absolutely."
    },
    {
      segments_id: 543,
      start: 2943.04,
      end: 2948.96,
      text: "You'll mind sharing that with Don and then he could share with the rest of us just so we get an idea of what that looks like."
    },
    {
      segments_id: 544,
      start: 2949.52,
      end: 2950.16,
      text: "I will."
    },
    {
      segments_id: 545,
      start: 2951.12,
      end: 2951.52,
      text: "Sorry."
    },
    {
      segments_id: 546,
      start: 2952.4,
      end: 2964.48,
      text: "I just want to confirm, did you only need a study if you had a majority protest, or is it per state law, you have to have a study to do any rate increase?"
    },
    {
      segments_id: 547,
      start: 2964.8,
      end: 2971.12,
      text: "If you have a majority that's okay with it, you still have to do the..."
    },
    {
      segments_id: 548,
      start: 2972.0,
      end: 2975.2,
      text: "You are going to want to do a rate study for sure."
    },
    {
      segments_id: 549,
      start: 2976.24,
      end: 2982.88,
      text: "Okay, so the majority, if your majority is fine with it, you still move forward with purchasing the study."
    },
    {
      segments_id: 550,
      start: 2983.52,
      end: 2986.0,
      text: "Well, I mean, you know, that's a decision for the board."
    },
    {
      segments_id: 551,
      start: 2986.32,
      end: 2994.24,
      text: "If the board felt comfortable with the work that they had done internally, you don't have to have a great consultant."
    },
    {
      segments_id: 552,
      start: 2994.88,
      end: 2999.84,
      text: "The thing is that you're better covered."
    },
    {
      segments_id: 553,
      start: 3001.52,
      end: 3019.36,
      text: "From a legal basis, if you do, because a rate study will cite industry standards, it will cite AWA manuals that it's drawing this from, the methodology from."
    },
    {
      segments_id: 554,
      start: 3020.32,
      end: 3023.76,
      text: "You're on much better footing if you have a rate study."
    },
    {
      segments_id: 555,
      start: 3025.68,
      end: 3028.96,
      text: "So I don't know if that was clear, but we don't have to hire a contractor."
    },
    {
      segments_id: 556,
      start: 3029.04,
      end: 3030.96,
      text: "We could put a rate study together."
    },
    {
      segments_id: 557,
      start: 3031.36,
      end: 3035.44,
      text: "It could be, for lack of a better term, half-assed, and we can present that."
    },
    {
      segments_id: 558,
      start: 3035.76,
      end: 3038.08,
      text: "But then someone can challenge it."
    },
    {
      segments_id: 559,
      start: 3038.4,
      end: 3042.08,
      text: "And then we don't have a bias for raising the rates because it's flawed, right?"
    },
    {
      segments_id: 560,
      start: 3042.32,
      end: 3055.36,
      text: "So that's why it's a very good investment in the proper rate study so that the rates that you're proposing aren't flawed, that they're based on valuable present date data."
    },
    {
      segments_id: 561,
      start: 3056.88,
      end: 3057.6,
      text: "Exactly."
    },
    {
      segments_id: 562,
      start: 3057.76,
      end: 3058.4,
      text: "Yes."
    },
    {
      segments_id: 563,
      start: 3061.84,
      end: 3062.72,
      text: "Very informative."
    },
    {
      segments_id: 564,
      start: 3064.48,
      end: 3068.08,
      text: "Any other questions from anybody on the board?"
    },
    {
      segments_id: 565,
      start: 3070.96,
      end: 3072.4,
      text: "Diane, go ahead."
    },
    {
      segments_id: 566,
      start: 3072.72,
      end: 3076.96,
      text: "I only just had one closing comment because I wasn't sure who was in the boardroom with you."
    },
    {
      segments_id: 567,
      start: 3077.28,
      end: 3078.56,
      text: "I think it was the new neighbors."
    },
    {
      segments_id: 568,
      start: 3079.6,
      end: 3089.44,
      text: "Historically, the board has actually been able to get a FAP grant from PCWA to cover some of this rate study work."
    },
    {
      segments_id: 569,
      start: 3090.08,
      end: 3101.92,
      text: "So that would be something obviously that it would be, you know, sought for again in order to compensate Catherine or whoever the board chose to do that with."
    },
    {
      segments_id: 570,
      start: 3102.24,
      end: 3106.96,
      text: "That generally is something PCWA is amicable to doing."
    },
    {
      segments_id: 571,
      start: 3107.28,
      end: 3110.08,
      text: "So I'll just yield with that as my closing comment."
    },
    {
      segments_id: 572,
      start: 3110.24,
      end: 3111.12,
      text: "Thank you."
    },
    {
      segments_id: 573,
      start: 3111.44,
      end: 3112.64,
      text: "Thank you, Diane."
    },
    {
      segments_id: 574,
      start: 3113.6,
      end: 3114.88,
      text: "Thank you, Catherine."
    },
    {
      segments_id: 575,
      start: 3115.04,
      end: 3115.68,
      text: "Appreciate it."
    },
    {
      segments_id: 576,
      start: 3119.92,
      end: 3129.12,
      text: "So, well, I don't know what to say, but thank you very much."
    },
    {
      segments_id: 577,
      start: 3129.84,
      end: 3130.24,
      text: "All right."
    },
    {
      segments_id: 578,
      start: 3130.56,
      end: 3135.92,
      text: "In the near future, the board's going to have to make some decisions on the future, and we're very likely going to need the help."
    },
    {
      segments_id: 579,
      start: 3136.0,
      end: 3139.36,
      text: "So we appreciate you coming to the board and letting us know about your service."
    },
    {
      segments_id: 580,
      start: 3139.44,
      end: 3142.8,
      text: "And if you can provide us that study sample, that would be great."
    },
    {
      segments_id: 581,
      start: 3142.96,
      end: 3145.12,
      text: "And we likely will be talking to you in the future."
    },
    {
      segments_id: 582,
      start: 3146.08,
      end: 3146.72,
      text: "Okay, thank you."
    },
    {
      segments_id: 583,
      start: 3146.8,
      end: 3147.84,
      text: "Have a good evening, everybody."
    },
    {
      segments_id: 584,
      start: 3148.8,
      end: 3149.52,
      text: "Thank you so much."
    },
    {
      segments_id: 585,
      start: 3149.84,
      end: 3150.4,
      text: "Okay, bye-bye."
    },
    {
      segments_id: 586,
      start: 3153.36,
      end: 3156.0,
      text: "So, Donna, completely."
    },
    {
      segments_id: 587,
      start: 3157.44,
      end: 3163.04,
      text: "I'd like to just kind of finish up with the consolidation, Sonia."
    },
    {
      segments_id: 588,
      start: 3163.44,
      end: 3171.92,
      text: "Okay, anyway, so the letter did not include any grants, possible grants."
    },
    {
      segments_id: 589,
      start: 3172.24,
      end: 3179.6,
      text: "And right now, there are grants available that are not income related."
    },
    {
      segments_id: 590,
      start: 3180.56,
      end: 3188.96,
      text: "And so it's because California state wants the small guys to get merged in with the big guys."
    },
    {
      segments_id: 591,
      start: 3189.6,
      end: 3199.2,
      text: "And what their reasoning is and why they want it, we can all make up our own reasons for that."
    },
    {
      segments_id: 592,
      start: 3199.36,
      end: 3222.4,
      text: "But I think it has something to do with controlling the droughts and the legislation that would go, you know, for large, sometimes when there's a drought conditions, it does not affect the smaller water companies."
    },
    {
      segments_id: 593,
      start: 3223.28,
      end: 3230.8,
      text: "But larger ones, they can put the noose around them and hold them to it, hold their toes to the fire on it."
    },
    {
      segments_id: 594,
      start: 3232.48,
      end: 3240.88,
      text: "So to make it clear, if we consolidate, we may be able to get a grant, but if we don't consolidate, we don't have a chance to get a grant."
    },
    {
      segments_id: 595,
      start: 3241.76,
      end: 3248.48,
      text: "Right, because a grant is for consolidation, not just improving in infrastructure."
    },
    {
      segments_id: 596,
      start: 3249.28,
      end: 3259.36,
      text: "It's simply the money is to pay PCWA, so to speak, to allow us into their whole."
    },
    {
      segments_id: 597,
      start: 3259.76,
      end: 3262.7200000000003,
      text: "Well, yeah, just to be clear, I think you're asking a different question."
    },
    {
      segments_id: 598,
      start: 3263.04,
      end: 3263.2,
      text: "Oh."
    },
    {
      segments_id: 599,
      start: 3263.36,
      end: 3278.48,
      text: "So yeah, so what PCW is saying is that there is a lot of accessible money for any community, regardless of income or whether they're a distressed community or not, to get money to consolidate into the bigger picture."
    },
    {
      segments_id: 600,
      start: 3278.8,
      end: 3279.04,
      text: "Correct."
    },
    {
      segments_id: 601,
      start: 3279.28,
      end: 3283.76,
      text: "That's not saying that there is no money for other things."
    },
    {
      segments_id: 602,
      start: 3286.64,
      end: 3288.4,
      text: "For the CIP projects."
    },
    {
      segments_id: 603,
      start: 3288.7200000000003,
      end: 3292.7200000000003,
      text: "Yeah, there might be money for that, but that's not what he's talking about."
    },
    {
      segments_id: 604,
      start: 3293.36,
      end: 3299.44,
      text: "And so, and the last part that I wanted to talk about was what Rich was touching on."
    },
    {
      segments_id: 605,
      start: 3300.24,
      end: 3312.72,
      text: "That PCWA, they have a certain amount on their budget to allocate towards small districts to consolidate."
    },
    {
      segments_id: 606,
      start: 3313.6,
      end: 3319.2,
      text: "But it's not in their ratepayers' best interest to go through all that."
    },
    {
      segments_id: 607,
      start: 3319.52,
      end: 3327.12,
      text: "So they just give just a small amount of hours of their time to devote to it."
    },
    {
      segments_id: 608,
      start: 3327.44,
      end: 3335.44,
      text: "And so they still have some leftover time to devote to the PZW-8 fund consolidation."
    },
    {
      segments_id: 609,
      start: 3335.76,
      end: 3344.24,
      text: "And so now the next step would be to start talking to the state and seeing about different grants and whatnot."
    },
    {
      segments_id: 610,
      start: 3344.56,
      end: 3355.44,
      text: "And seeing how the state would view this consolidation if they think that, oh yeah, we can pump all kinds of money towards that or not."
    },
    {
      segments_id: 611,
      start: 3355.76,
      end: 3376.48,
      text: "And in doing so, they need to dive deeper into their engineering as far as, you know, this was, they call it a desktop, you know, it's an overview estimation and they want to go deeper and a little bit finer tuned numbers."
    },
    {
      segments_id: 612,
      start: 3376.8,
      end: 3392.8,
      text: "So anyway, in order to do that, they thought that the state would reimburse us for that kind of thing, even for the engineering to look into the consolidation."
    },
    {
      segments_id: 613,
      start: 3393.12,
      end: 3400.08,
      text: "And so they're going to use their extra hours to keep looking into it."
    },
    {
      segments_id: 614,
      start: 3400.24,
      end: 3410.72,
      text: "And then they'll circle back when they run out of hours and then come back with, hey, we think that the state actually is interested in helping out the district to consolidate."
    },
    {
      segments_id: 615,
      start: 3411.28,
      end: 3418.08,
      text: "So you're saying that DCWA will actually go to the state and see what kind of appetite they have for our merger?"
    },
    {
      segments_id: 616,
      start: 3418.56,
      end: 3419.12,
      text: "Absolutely."
    },
    {
      segments_id: 617,
      start: 3419.2,
      end: 3419.52,
      text: "Okay."
    },
    {
      segments_id: 618,
      start: 3419.6,
      end: 3420.32,
      text: "Consolidation."
    },
    {
      segments_id: 619,
      start: 3420.4,
      end: 3420.64,
      text: "Yeah, yeah."
    },
    {
      segments_id: 620,
      start: 3422.08,
      end: 3424.16,
      text: "Yeah, because it's in their best management."
    },
    {
      segments_id: 621,
      start: 3424.72,
      end: 3427.84,
      text: "Well, yeah, I'm surprised that PC varies."
    },
    {
      segments_id: 622,
      start: 3428.32,
      end: 3433.84,
      text: "Well, a lot of dollars attached to it, so that's why they don't have anything."
    },
    {
      segments_id: 623,
      start: 3437.68,
      end: 3447.28,
      text: "One quick question that I had was regarding the consolidation process and everything like that."
    },
    {
      segments_id: 624,
      start: 3449.2,
      end: 3455.84,
      text: "You should probably explain a little bit to some of the new people why we're even entertaining this."
    },
    {
      segments_id: 625,
      start: 3456.8,
      end: 3465.36,
      text: "Because we have a plant, the plant's good now, but we have a lot of pipeline that has been in place since 1962."
    },
    {
      segments_id: 626,
      start: 3465.76,
      end: 3467.2,
      text: "It's roughly 60 years old."
    },
    {
      segments_id: 627,
      start: 3467.52,
      end: 3469.2,
      text: "Okay, and there's arguments."
    },
    {
      segments_id: 628,
      start: 3469.44,
      end: 3479.28,
      text: "It's there's different, all different, because five or six different contractors and companies built this system over the years."
    },
    {
      segments_id: 629,
      start: 3479.92,
      end: 3482.56,
      text: "Yeah, something like, something like five or six of them."
    },
    {
      segments_id: 630,
      start: 3483.2,
      end: 3488.8,
      text: "And although we know where most of this stuff is, there's a lot of unknowns."
    },
    {
      segments_id: 631,
      start: 3488.96,
      end: 3501.04,
      text: "And because of the age of the system, we've had pipes break and we get significant costs in digging it up and repairing the pipe and all that kind of stuff."
    },
    {
      segments_id: 632,
      start: 3501.36,
      end: 3504.4,
      text: "And there's some arguments now."
    },
    {
      segments_id: 633,
      start: 3506.32,
      end: 3511.92,
      text: "We have what's called asbestos concrete pipe, which is generally what was used back then."
    },
    {
      segments_id: 634,
      start: 3512.8,
      end: 3519.6,
      text: "And we're getting all kinds of estimates as to what the surface life of this asbestos concrete pipe."
    },
    {
      segments_id: 635,
      start: 3519.84,
      end: 3524.88,
      text: "And then there's other non-asbestos concrete pipes, all different sizes and shapes."
    },
    {
      segments_id: 636,
      start: 3525.2,
      end: 3531.12,
      text: "And we are seeing different areas where the system is starting to break down."
    },
    {
      segments_id: 637,
      start: 3531.44,
      end: 3535.68,
      text: "And the costs are going up to repair and replace this."
    },
    {
      segments_id: 638,
      start: 3536.0,
      end: 3549.6,
      text: "So we're trying to be proactive and saying, okay, if we eventually have to replace all those pipes, but one of the big arguments is some service life is 110 years and some other service life is like 30 or 40 years."
    },
    {
      segments_id: 639,
      start: 3549.76,
      end: 3551.44,
      text: "And we've already gone past that."
    },
    {
      segments_id: 640,
      start: 3552.48,
      end: 3555.04,
      text: "So that's the big ongoing right now."
    },
    {
      segments_id: 641,
      start: 3555.28,
      end: 3559.84,
      text: "So that's why we're looking at this and saying, okay, we have to plan for this."
    },
    {
      segments_id: 642,
      start: 3560.16,
      end: 3561.04,
      text: "How are we going to do it?"
    },
    {
      segments_id: 643,
      start: 3561.12,
      end: 3570.7200000000003,
      text: "What's the best way for us as a district to work to make it as economically feasible as possible?"
    },
    {
      segments_id: 644,
      start: 3571.04,
      end: 3576.88,
      text: "And that's where one of the things that came in was the BCWA consolidation."
    },
    {
      segments_id: 645,
      start: 3577.2,
      end: 3589.12,
      text: "If they come in and absorb the one set setup, the partial consolidation, I don't believe it includes all the pipe replacement and everything else."
    },
    {
      segments_id: 646,
      start: 3590.0,
      end: 3593.36,
      text: "But the full consolidation does include all that."
    },
    {
      segments_id: 647,
      start: 3593.6,
      end: 3598.32,
      text: "And so that's why there's a big broad range of costs and everything else."
    },
    {
      segments_id: 648,
      start: 3598.4,
      end: 3599.76,
      text: "So that's, and we're trying to figure."
    },
    {
      segments_id: 649,
      start: 3600.24,
      end: 3899.68,
      text: "out what's the best option for us so yeah so there's another part to that too that at least the year ago that jerry the current operator said that he wanted to leave you know in the district and that's you know what we're going to be dealing with we have some bids but during that process i know i was on the committee a year ago that was looking to decide what to do about jerry's departure one of the ideas was to consolidate with pcwa and we had other ideas back then one was to do exactly what we're doing get other bids like we did and another idea was maybe we could do an in-house uh you know hire employees those are the three ideas the hiring the employees kind of disappeared um the pcwi pcwa idea is still kind of hanging in there we had meetings of pcwa a year ago on that exact subject and so this is took them a year but they finally got us a proposal and but ironically it's the same time we're getting proposals uh and have our rfp that was you know we got we're gonna vote on that hopefully later on you know action items that which i think is kind of ironic that they both came in on the same day i don't think that was planned so yeah well just be clear though they're not independent of each other right i mean they're independent of each other because we need to move forward with some sort of operations in the meantime before correct i don't know how long it would take to complete the consolidation or whatever so we need to take action on the rfps as well exactly the consolidation is going to take years yeah so five years we just need to we obviously will need to get somebody in the meantime and so yeah the rfp discussion needs to go forward and we don't know yet when jerry says he's done but maybe it's when we figure out which rfp we get exactly yeah um okay good so um thank you don't that on your report can we move forward to the second item perfect items okay perfect so i'm really sorry i just have to listen to me a bunch but anyway the first resolution is uh um so before we go on with the action items can we circle back to the catherine discussion real quick sure yeah so so i just want to understand is that where the board stands is this something we want to pursue um or not or is it we're in a hold pattern until pcwa tells us if the state has an appetite for support you know um supporting the consolidation or do we want to talk to her about a possible rate study in the meantime so um what does anybody have an idea what the cost would you ask to do rate study what are we talking about i have no idea that would actually go to an rfp well she she told us directly it's too early right too early for what to do a rate study she said we need to we need to play out the consolidation proposal from pcwa until we do a rate study in the meantime we need to get an operator to operate but we need to play this out over a longer period of time she said do not do this quickly um she was pretty clear yeah so she you're absolutely right she said don't do this quickly so it takes time so that's what i want you to consider it takes time and there's two different things that we're talking about one is providing consulting services to support the merger that's one thing that's down the line that's possible the other thing that we need to consider is in order to keep the district running into the future whether it's for a year two years five years do we need to consider a rate study to support the operations we know that our costs are going to go up based on based on the um rfps that we already saw so i don't i i i i think it would be a mistake to wait to see what pcwa is going to do before we consider a race study so so that's my point so and it takes time like she said and we want to do it right so that makes sense richard uh but we're not just looking at pcwa we're looking at current costs including"
    },
    {
      segments_id: 650,
      start: 3900.24,
      end: 3904.32,
      text: "Operations, especially, not to mention the CIPs that we've been talking about."
    },
    {
      segments_id: 651,
      start: 3906.48,
      end: 3913.36,
      text: "Well, to me, we need to have more discussion about that before we jump into a rate study."
    },
    {
      segments_id: 652,
      start: 3913.92,
      end: 3917.44,
      text: "We didn't get any numbers on what a rate study might cost."
    },
    {
      segments_id: 653,
      start: 3920.48,
      end: 3924.24,
      text: "And we don't know what our operations cost will be."
    },
    {
      segments_id: 654,
      start: 3925.52,
      end: 3933.28,
      text: "So we're in a situation where if we do it now, I mean, the inflation's taking pipe costs over the moon."
    },
    {
      segments_id: 655,
      start: 3933.84,
      end: 3937.2,
      text: "There are a lot of things that we need to look at."
    },
    {
      segments_id: 656,
      start: 3937.36,
      end: 3943.6,
      text: "So I wouldn't vote to do a rate study yet, but we need to keep looking at all these numbers, I think."
    },
    {
      segments_id: 657,
      start: 3943.92,
      end: 3944.88,
      text: "Yeah, I agree."
    },
    {
      segments_id: 658,
      start: 3945.04,
      end: 3953.04,
      text: "And we haven't yet decided on the operations, if we're going to accept any of these RFPs."
    },
    {
      segments_id: 659,
      start: 3954.24,
      end: 3959.36,
      text: "So we're like maybe 20 minutes early on Rolando's proposal."
    },
    {
      segments_id: 660,
      start: 3959.52,
      end: 3969.2,
      text: "But if we do vote on and approve one of these tonight or soon, then immediately after, I think that we need to decide how we're going to cover the cost."
    },
    {
      segments_id: 661,
      start: 3970.0,
      end: 3978.88,
      text: "It may double from what Jerry, I mean, at least from the proposals, one is double of what Jerry's was and one is a little under double."
    },
    {
      segments_id: 662,
      start: 3979.2,
      end: 3983.04,
      text: "So I think that's what Rolando is referring to."
    },
    {
      segments_id: 663,
      start: 3983.6,
      end: 3985.12,
      text: "Does that make sense?"
    },
    {
      segments_id: 664,
      start: 3988.24,
      end: 3989.68,
      text: "You said a couple of things, Ken."
    },
    {
      segments_id: 665,
      start: 3989.76,
      end: 3994.24,
      text: "So first of all, I don't think we should vote tonight on those RFPs."
    },
    {
      segments_id: 666,
      start: 3994.56,
      end: 4001.04,
      text: "I only got them on Saturday night, maybe, and I haven't had time to look at them all."
    },
    {
      segments_id: 667,
      start: 4002.0,
      end: 4010.96,
      text: "And we don't have Heidi here, which would be a mistake if we had a vote on such an important thing without all the board members."
    },
    {
      segments_id: 668,
      start: 4011.92,
      end: 4015.6,
      text: "And so I think that's premature."
    },
    {
      segments_id: 669,
      start: 4019.04,
      end: 4026.32,
      text: "I think Rolando's proposal to have a rate study is a little premature, that's all."
    },
    {
      segments_id: 670,
      start: 4027.44,
      end: 4032.8,
      text: "I just also think about is that we also have a loan that we have to pay off now."
    },
    {
      segments_id: 671,
      start: 4033.12,
      end: 4043.84,
      text: "So if you pay attention to the financials and how much our expenses are going to be, I just want to make sure that everybody's aware that we have to cover our costs."
    },
    {
      segments_id: 672,
      start: 4044.96,
      end: 4046.08,
      text: "Absolutely, Rolando."
    },
    {
      segments_id: 673,
      start: 4046.24,
      end: 4053.92,
      text: "I understand that I came in here as Ken did with all those financials in our faces."
    },
    {
      segments_id: 674,
      start: 4054.08,
      end: 4071.2,
      text: "We just have to be careful that we do it right now rather than doing anything too quickly that might really screw up the long-term future of the whole district."
    },
    {
      segments_id: 675,
      start: 4071.68,
      end: 4074.08,
      text: "We need to be careful for our constituents."
    },
    {
      segments_id: 676,
      start: 4074.96,
      end: 4084.16,
      text: "So because I'm new to this whole process, I've been for a year since I have been involved, I've been saying we need to raise the rates."
    },
    {
      segments_id: 677,
      start: 4084.72,
      end: 4085.92,
      text: "I don't know the process."
    },
    {
      segments_id: 678,
      start: 4086.48,
      end: 4093.68,
      text: "Evidently, we need a rate study from this conversation in order to raise the rates properly."
    },
    {
      segments_id: 679,
      start: 4094.0,
      end: 4098.88,
      text: "And so that's why we're having this discussion right now."
    },
    {
      segments_id: 680,
      start: 4099.04,
      end: 4115.44,
      text: "And so, I mean, I think your point is, of course, we're being careful with our money, but we can't, we need the rate study to know, you know, evidently to know how we're going to proceed with getting revenues to pay all these upcoming costs."
    },
    {
      segments_id: 681,
      start: 4116.08,
      end: 4129.92,
      text: "And I don't know when we need to do that, but, you know, so that's, I think that's what I don't, I'm not proposing that we vote on it tonight, having Heidi here and thinking about it for a month, you know, obviously there's wife, but yeah."
    },
    {
      segments_id: 682,
      start: 4130.16,
      end: 4139.52,
      text: "Well, I was just going to say, she was, Catherine was real clear about, you know, before you engage in the race study, you need to have the engineering done first."
    },
    {
      segments_id: 683,
      start: 4140.08,
      end: 4156.0,
      text: "And part of that is that we may want to increase rates and build into that, not just covering inflationary issues, but also CIP projects for the next couple of years."
    },
    {
      segments_id: 684,
      start: 4156.32,
      end: 4168.08,
      text: "And so there's a lot of decisions that need to be made before going out and doing an RFP for rate studies."
    },
    {
      segments_id: 685,
      start: 4168.4,
      end: 4177.04,
      text: "And so, but the time's getting closer, I should say, is definitely getting closer."
    },
    {
      segments_id: 686,
      start: 4177.36,
      end: 4191.36,
      text: "And as far as how to pay for the increase, I'm kind of ready to talk about that in just a bit."
    },
    {
      segments_id: 687,
      start: 4191.68,
      end: 4192.0,
      text: "Okay."
    },
    {
      segments_id: 688,
      start: 4192.4,
      end: 4197.92,
      text: "I mean, I could talk about it later on this evening, but I think that we should just get on."
    },
    {
      segments_id: 689,
      start: 4198.16,
      end: 4199.52,
      text: "There's no action item."
    },
    {
      segments_id: 690,
      start: 4200.16,
      end: 4203.68,
      text: "For the rate study at all, there's no action items for that."
    },
    {
      segments_id: 691,
      start: 4205.12,
      end: 4206.08,
      text: "So, anyway."
    },
    {
      segments_id: 692,
      start: 4206.24,
      end: 4207.44,
      text: "Yeah, so I would."
    },
    {
      segments_id: 693,
      start: 4208.24,
      end: 4210.88,
      text: "Diane, why don't you go ahead and put your something?"
    },
    {
      segments_id: 694,
      start: 4211.2,
      end: 4211.76,
      text: "Diane?"
    },
    {
      segments_id: 695,
      start: 4212.24,
      end: 4213.04,
      text: "Always right."
    },
    {
      segments_id: 696,
      start: 4213.36,
      end: 4213.68,
      text: "Yes."
    },
    {
      segments_id: 697,
      start: 4214.0,
      end: 4214.32,
      text: "Okay."
    },
    {
      segments_id: 698,
      start: 4214.72,
      end: 4222.32,
      text: "I think if I might suggest that this is actually in three big chunks that I can see immediately."
    },
    {
      segments_id: 699,
      start: 4222.48,
      end: 4228.96,
      text: "One is the smaller hurdle to get over, and that is actual cost increase through inflation."
    },
    {
      segments_id: 700,
      start: 4229.6,
      end: 4247.52,
      text: "Okay, that has a wholly different set of rules, as Catherine alluded to, and I already knew about, is so long as that can be paid off within five years, that has virtually no hoops."
    },
    {
      segments_id: 701,
      start: 4248.32,
      end: 4265.04,
      text: "Anytime you're doing a CIP for a major project, such as the Kenneth Loop, that is a separate issue and maybe more prioritized because where the failures are in our system is not necessarily in the cement pipe."
    },
    {
      segments_id: 702,
      start: 4265.36,
      end: 4269.04,
      text: "And even Jerry admitted it could have 40, 50 more years."
    },
    {
      segments_id: 703,
      start: 4269.28,
      end: 4270.08,
      text: "It just depends."
    },
    {
      segments_id: 704,
      start: 4270.16,
      end: 4274.16,
      text: "And when the earth moves, even if it was a brand new pipe, it still could rupture it."
    },
    {
      segments_id: 705,
      start: 4274.32,
      end: 4275.2,
      text: "That's not the point."
    },
    {
      segments_id: 706,
      start: 4275.52,
      end: 4284.08,
      text: "The point is, is you look at these at three different stages, three different projects, three different studies."
    },
    {
      segments_id: 707,
      start: 4284.4,
      end: 4293.12,
      text: "And if you propose it to, I think the FAP grants have to be in February."
    },
    {
      segments_id: 708,
      start: 4293.44,
      end: 4302.8,
      text: "And you tell PCWA, just like you did with the generator, just like you did with George's rate study, which was, I believe it was $14,000."
    },
    {
      segments_id: 709,
      start: 4303.44,
      end: 4308.0,
      text: "And almost all of that was covered by the grant from PCWA."
    },
    {
      segments_id: 710,
      start: 4308.32,
      end: 4312.72,
      text: "So you propose the grants for February in three chunks."
    },
    {
      segments_id: 711,
      start: 4313.2,
      end: 4316.64,
      text: "This way you can do them in the proper orders."
    },
    {
      segments_id: 712,
      start: 4317.12,
      end: 4327.36,
      text: "So you've already, now you're obligated to what I know of, it's a $37,000 grant you got last year to do the Kenneth Loop survey, right?"
    },
    {
      segments_id: 713,
      start: 4328.24,
      end: 4331.68,
      text: "Now that's somewhat probably has some caveats to it."
    },
    {
      segments_id: 714,
      start: 4331.76,
      end: 4336.32,
      text: "I don't know what that grant says, that you have to act on it within a certain amount of time."
    },
    {
      segments_id: 715,
      start: 4336.48,
      end: 4337.44,
      text: "I don't know that."
    },
    {
      segments_id: 716,
      start: 4337.76,
      end: 4344.88,
      text: "But I'm suggesting that usually when you get a grant, there's contingencies that go with that."
    },
    {
      segments_id: 717,
      start: 4345.2,
      end: 4351.92,
      text: "So maybe the board should be looking at this in three projects, if you follow me."
    },
    {
      segments_id: 718,
      start: 4352.56,
      end: 4370.4,
      text: "And in far as PCWA consolidation for Dick's benefit mostly, I went with former board member Lynn Cook, myself, Tiffany Vanderlinden."
    },
    {
      segments_id: 719,
      start: 4372.16,
      end: 4376.64,
      text: "We went and met with two of the engineers at PCWA in 2019."
    },
    {
      segments_id: 720,
      start: 4376.96,
      end: 4385.6,
      text: "And roughly at that time, just to buy in was going to be at around that same price, around 10,000 each to just buy into their system."
    },
    {
      segments_id: 721,
      start: 4386.48,
      end: 4389.28,
      text: "Now, I did the rough estimate on this."
    },
    {
      segments_id: 722,
      start: 4389.6,
      end: 4405.84,
      text: "And right now, as it stands, if all the pricing stayed the same, it would cost 630 parcel owners almost $20 million more to replace those pipes the way it stands right now because we're not getting credit for the water plants."
    },
    {
      segments_id: 723,
      start: 4406.0,
      end: 4408.88,
      text: "So on that basis alone, there's no way."
    },
    {
      segments_id: 724,
      start: 4409.2,
      end: 4416.72,
      text: "I mean, I don't know about you, but I'm not, nobody wants to pay $1,000 a month for water at the end of the day."
    },
    {
      segments_id: 725,
      start: 4416.96,
      end: 4418.64,
      text: "So something else has to give."
    },
    {
      segments_id: 726,
      start: 4418.96,
      end: 4421.2,
      text: "And we are a subdivision of California."
    },
    {
      segments_id: 727,
      start: 4421.44,
      end: 4424.08,
      text: "We can go to California ourselves and assert ourselves."
    },
    {
      segments_id: 728,
      start: 4424.32,
      end: 4428.72,
      text: "Just because PCWA has an in there, you develop an in."
    },
    {
      segments_id: 729,
      start: 4428.88,
      end: 4429.84,
      text: "I will call them."
    },
    {
      segments_id: 730,
      start: 4430.08,
      end: 4430.72,
      text: "I don't have a problem."
    },
    {
      segments_id: 731,
      start: 4430.88,
      end: 4431.84,
      text: "I call the president."
    },
    {
      segments_id: 732,
      start: 4432.24,
      end: 4433.76,
      text: "And Don knows I will."
    },
    {
      segments_id: 733,
      start: 4434.08,
      end: 4435.28,
      text: "So I yield with that."
    },
    {
      segments_id: 734,
      start: 4435.44,
      end: 4437.04,
      text: "Thank you very much for the floor."
    },
    {
      segments_id: 735,
      start: 4442.32,
      end: 4448.16,
      text: "I hope you weren't raising your voice at me because I don't think I deserve it."
    },
    {
      segments_id: 736,
      start: 4448.96,
      end: 4449.76,
      text: "Oh, I wasn't raising your voice."
    },
    {
      segments_id: 737,
      start: 4450.48,
      end: 4453.84,
      text: "Some of the things you said I don't agree with."
    },
    {
      segments_id: 738,
      start: 4454.0,
      end: 4457.44,
      text: "Like inflation will be paid off after five years."
    },
    {
      segments_id: 739,
      start: 4457.76,
      end: 4459.6,
      text: "That doesn't make sense to me."
    },
    {
      segments_id: 740,
      start: 4459.92,
      end: 4461.36,
      text: "No, that wasn't what I said."
    },
    {
      segments_id: 741,
      start: 4462.16,
      end: 4463.12,
      text: "No, when you do."
    },
    {
      segments_id: 742,
      start: 4463.52,
      end: 4464.72,
      text: "Well, you can listen to the recording."
    },
    {
      segments_id: 743,
      start: 4464.88,
      end: 4467.04,
      text: "I don't want to get into a back and forth right now."
    },
    {
      segments_id: 744,
      start: 4467.36,
      end: 4468.4,
      text: "I understand that law."
    },
    {
      segments_id: 745,
      start: 4469.28,
      end: 4470.08,
      text: "I understand that law."
    },
    {
      segments_id: 746,
      start: 4470.24,
      end: 4471.28,
      text: "Sir, excuse me."
    },
    {
      segments_id: 747,
      start: 4471.84,
      end: 4473.84,
      text: "You're calling me out for something that I said."
    },
    {
      segments_id: 748,
      start: 4473.92,
      end: 4475.44,
      text: "I'm trying to clarify it for you."
    },
    {
      segments_id: 749,
      start: 4475.76,
      end: 4476.88,
      text: "It is not that."
    },
    {
      segments_id: 750,
      start: 4477.12,
      end: 4487.04,
      text: "I said, if you have a cost pass-through, when you decide what the lump sum is, it has to be paid off within five years."
    },
    {
      segments_id: 751,
      start: 4487.36,
      end: 4499.76,
      text: "So if you say your cost of living increase in that projection and what you need to do to offset it, that amount that you're asking the ratepayers to pay has to equate."
    },
    {
      segments_id: 752,
      start: 4500.32,
      end: 4502.24,
      text: "To being paid off in five years."
    },
    {
      segments_id: 753,
      start: 4502.48,
      end: 4503.84,
      text: "So I hope that was clear."
    },
    {
      segments_id: 754,
      start: 4504.56,
      end: 4505.28,
      text: "Okay, Diane."
    },
    {
      segments_id: 755,
      start: 4505.52,
      end: 4506.16,
      text: "Thank you, Diane."
    },
    {
      segments_id: 756,
      start: 4506.4,
      end: 4507.52,
      text: "We appreciate it."
    },
    {
      segments_id: 757,
      start: 4508.24,
      end: 4508.8,
      text: "Let's move on."
    },
    {
      segments_id: 758,
      start: 4511.28,
      end: 4521.2,
      text: "I think we need to go into the action items and I want to turn that over to for you to announce, you know, to go with the first two anyway."
    },
    {
      segments_id: 759,
      start: 4523.6,
      end: 4529.84,
      text: "The first action item is to put a direct charge on parcels."
    },
    {
      segments_id: 760,
      start: 4530.64,
      end: 4535.92,
      text: "I believe it's anyway, several parcels for the standby water charge."
    },
    {
      segments_id: 761,
      start: 4536.24,
      end: 4554.24,
      text: "And the standby water charge is a $60 charge and it's $60 because of Prop 218, we're not allowed to, unless it went to a vote of the people that are affected by that, they would have to increase their agree to increase their own rate."
    },
    {
      segments_id: 762,
      start: 4554.8,
      end: 4561.04,
      text: "But anyway, it's to put a $60 charge on those parcels."
    },
    {
      segments_id: 763,
      start: 4563.44,
      end: 4568.48,
      text: "And then it's what we do every year."
    },
    {
      segments_id: 764,
      start: 4569.76,
      end: 4571.52,
      text: "So how many of those were there?"
    },
    {
      segments_id: 765,
      start: 4571.6,
      end: 4572.4,
      text: "You know, roughly?"
    },
    {
      segments_id: 766,
      start: 4573.36,
      end: 4574.72,
      text: "It was like 53."
    },
    {
      segments_id: 767,
      start: 4574.96,
      end: 4575.52,
      text: "53."
    },
    {
      segments_id: 768,
      start: 4576.08,
      end: 4576.96,
      text: "I think it was 53."
    },
    {
      segments_id: 769,
      start: 4577.28,
      end: 4578.0,
      text: "It was more."
    },
    {
      segments_id: 770,
      start: 4579.36,
      end: 4585.04,
      text: "So the charge is $60, the standby charge for the non-customers."
    },
    {
      segments_id: 771,
      start: 4586.0,
      end: 4586.56,
      text: "Future customers."
    },
    {
      segments_id: 772,
      start: 4587.52,
      end: 4588.16,
      text: "Future customers."
    },
    {
      segments_id: 773,
      start: 4590.24,
      end: 4595.84,
      text: "Okay, so this is the same proposal, resolution as is every year, correct?"
    },
    {
      segments_id: 774,
      start: 4596.08,
      end: 4596.32,
      text: "Correct."
    },
    {
      segments_id: 775,
      start: 4597.36,
      end: 4610.72,
      text: "Just there's been a few parcel numbers added to it because like there's some parcels like on Stanley that were that were granted water, you know, that we would serve them water."
    },
    {
      segments_id: 776,
      start: 4610.88,
      end: 4613.36,
      text: "So they'll give you more parcels to add to it."
    },
    {
      segments_id: 777,
      start: 4614.32,
      end: 4617.12,
      text: "So what they did is on that family, they split a lot."
    },
    {
      segments_id: 778,
      start: 4617.36,
      end: 4619.84,
      text: "Yeah, and then they put a whole bunch of houses on it."
    },
    {
      segments_id: 779,
      start: 4623.12,
      end: 4627.28,
      text: "Okay, so is there any before we vote on that?"
    },
    {
      segments_id: 780,
      start: 4627.44,
      end: 4629.76,
      text: "Is there any comments from the public?"
    },
    {
      segments_id: 781,
      start: 4630.08,
      end: 4631.44,
      text: "We'll start with the public."
    },
    {
      segments_id: 782,
      start: 4631.68,
      end: 4632.88,
      text: "Anybody have a question?"
    },
    {
      segments_id: 783,
      start: 4641.36,
      end: 4641.52,
      text: "Okay."
    },
    {
      segments_id: 784,
      start: 4642.08,
      end: 4647.2,
      text: "Anybody, any more, any comments, questions?"
    },
    {
      segments_id: 785,
      start: 4647.36,
      end: 4651.04,
      text: "I'll just make a motion to approve the resolution to the standard chart."
    },
    {
      segments_id: 786,
      start: 4652.96,
      end: 4653.68,
      text: "Anybody second?"
    },
    {
      segments_id: 787,
      start: 4654.96,
      end: 4655.2,
      text: "Okay."
    },
    {
      segments_id: 788,
      start: 4655.84,
      end: 4656.8,
      text: "Dan seconds it."
    },
    {
      segments_id: 789,
      start: 4656.96,
      end: 4657.92,
      text: "Dan seconds it."
    },
    {
      segments_id: 790,
      start: 4658.24,
      end: 4660.08,
      text: "Okay, so I'll do the roll call vote."
    },
    {
      segments_id: 791,
      start: 4660.48,
      end: 4660.72,
      text: "Okay."
    },
    {
      segments_id: 792,
      start: 4661.36,
      end: 4663.6,
      text: "So who proposed it?"
    },
    {
      segments_id: 793,
      start: 4663.84,
      end: 4667.12,
      text: "I didn't hear the okay."
    },
    {
      segments_id: 794,
      start: 4667.44,
      end: 4668.24,
      text: "Thank you."
    },
    {
      segments_id: 795,
      start: 4668.88,
      end: 4669.2,
      text: "Yeah."
    },
    {
      segments_id: 796,
      start: 4669.84,
      end: 4672.24,
      text: "So I can."
    },
    {
      segments_id: 797,
      start: 4674.08,
      end: 4674.96,
      text: "Oh, hi."
    },
    {
      segments_id: 798,
      start: 4675.36,
      end: 4675.6,
      text: "Hi."
    },
    {
      segments_id: 799,
      start: 4675.68,
      end: 4675.76,
      text: "Yes."
    },
    {
      segments_id: 800,
      start: 4676.48,
      end: 4676.88,
      text: "Dan."
    },
    {
      segments_id: 801,
      start: 4677.12,
      end: 4677.36,
      text: "Hi."
    },
    {
      segments_id: 802,
      start: 4678.16,
      end: 4678.8,
      text: "Rolando."
    },
    {
      segments_id: 803,
      start: 4678.88,
      end: 4678.96,
      text: "Hi."
    },
    {
      segments_id: 804,
      start: 4679.68,
      end: 4680.32,
      text: "Richard."
    },
    {
      segments_id: 805,
      start: 4680.64,
      end: 4681.04,
      text: "Hi."
    },
    {
      segments_id: 806,
      start: 4684.48,
      end: 4684.8,
      text: "Okay."
    },
    {
      segments_id: 807,
      start: 4689.76,
      end: 4690.16,
      text: "All right."
    },
    {
      segments_id: 808,
      start: 4690.48,
      end: 4701.76,
      text: "And then the second resolution is a direct charge on a bunch of different parcels in what we affectionately call the Gale Loop area."
    },
    {
      segments_id: 809,
      start: 4702.56,
      end: 4710.8,
      text: "And back in 2008, I believe, the pipe was extended to 65 different parcels out there."
    },
    {
      segments_id: 810,
      start: 4711.36,
      end: 4714.0,
      text: "And they voted it in."
    },
    {
      segments_id: 811,
      start: 4714.4,
      end: 4717.92,
      text: "They agreed to have that pipe extended."
    },
    {
      segments_id: 812,
      start: 4718.16,
      end: 4729.84,
      text: "And then last year, the loan was refinanced through Bond Council."
    },
    {
      segments_id: 813,
      start: 4731.36,
      end: 4735.44,
      text: "And so then their rate dropped actually substantially."
    },
    {
      segments_id: 814,
      start: 4735.68,
      end: 4741.6,
      text: "And the number of years to pay dropped substantially as well because of the change in interest rate."
    },
    {
      segments_id: 815,
      start: 4742.72,
      end: 4749.12,
      text: "And so anyway, now there are 66 parcels because there were 65 in the inception."
    },
    {
      segments_id: 816,
      start: 4749.28,
      end: 4751.92,
      text: "Now there's 66 because one of the lots was split."
    },
    {
      segments_id: 817,
      start: 4752.8,
      end: 4757.68,
      text: "And so just a little bit more money is being collected."
    },
    {
      segments_id: 818,
      start: 4758.32,
      end: 4767.04,
      text: "And so anyway, it's for less than $700 per parcel."
    },
    {
      segments_id: 819,
      start: 4768.32,
      end: 4780.32,
      text: "So anyway, the same process comes from the comments or questions about what that is from the audience?"
    },
    {
      segments_id: 820,
      start: 4785.12,
      end: 4787.76,
      text: "Any comments from the board?"
    },
    {
      segments_id: 821,
      start: 4788.32,
      end: 4789.04,
      text: "Questions?"
    },
    {
      segments_id: 822,
      start: 4791.52,
      end: 4798.08,
      text: "Is the deal to the people affected by it are being aware of this?"
    },
    {
      segments_id: 823,
      start: 4799.04,
      end: 4799.84,
      text: "Oh, yeah, it's the same."
    },
    {
      segments_id: 824,
      start: 4800.08,
      end: 4801.04,
      text: "Price that they had last year."
    },
    {
      segments_id: 825,
      start: 4802.16,
      end: 4804.08,
      text: "Yeah, but it went, it went down."
    },
    {
      segments_id: 826,
      start: 4804.32,
      end: 4806.32,
      text: "So they're happy."
    },
    {
      segments_id: 827,
      start: 4806.88,
      end: 4807.12,
      text: "Okay."
    },
    {
      segments_id: 828,
      start: 4807.36,
      end: 4810.48,
      text: "Well, yeah, I know it went down because of the refinance."
    },
    {
      segments_id: 829,
      start: 4811.28,
      end: 4811.44,
      text: "Yeah."
    },
    {
      segments_id: 830,
      start: 4811.76,
      end: 4811.92,
      text: "Okay."
    },
    {
      segments_id: 831,
      start: 4812.64,
      end: 4813.52,
      text: "I'm okay with it."
    },
    {
      segments_id: 832,
      start: 4813.84,
      end: 4814.16,
      text: "Okay."
    },
    {
      segments_id: 833,
      start: 4817.36,
      end: 4831.6,
      text: "I'd like to make a motion to approve resolution 2203 to authorizing Flossar County to place a direct charge on the tax roll on behalf of the Gale movie session."
    },
    {
      segments_id: 834,
      start: 4833.84,
      end: 4834.88,
      text: "Do we have a second today?"
    },
    {
      segments_id: 835,
      start: 4835.68,
      end: 4836.16,
      text: "A second."
    },
    {
      segments_id: 836,
      start: 4836.48,
      end: 4838.56,
      text: "Okay, we're all on a second, Seth."
    },
    {
      segments_id: 837,
      start: 4840.4,
      end: 4843.04,
      text: "I'm just doing that, not because I want to be annoying."
    },
    {
      segments_id: 838,
      start: 4843.2,
      end: 4845.04,
      text: "I just want to make sure that everyone hears it."
    },
    {
      segments_id: 839,
      start: 4846.4,
      end: 4848.16,
      text: "And then the roll call vote."
    },
    {
      segments_id: 840,
      start: 4849.36,
      end: 4850.08,
      text: "Richard?"
    },
    {
      segments_id: 841,
      start: 4850.64,
      end: 4851.12,
      text: "Hi."
    },
    {
      segments_id: 842,
      start: 4852.08,
      end: 4852.24,
      text: "Ken?"
    },
    {
      segments_id: 843,
      start: 4852.8,
      end: 4853.36,
      text: "Aye."
    },
    {
      segments_id: 844,
      start: 4853.68,
      end: 4854.4,
      text: "Rolando?"
    },
    {
      segments_id: 845,
      start: 4854.48,
      end: 4854.8,
      text: "Aye."
    },
    {
      segments_id: 846,
      start: 4854.96,
      end: 4855.12,
      text: "Dan?"
    },
    {
      segments_id: 847,
      start: 4855.52,
      end: 4856.24,
      text: "Aye."
    },
    {
      segments_id: 848,
      start: 4859.36,
      end: 4860.16,
      text: "Thank you."
    },
    {
      segments_id: 849,
      start: 4863.28,
      end: 4871.76,
      text: "Next on the agenda is a survey that we don't have to find it."
    },
    {
      segments_id: 850,
      start: 4873.04,
      end: 4875.04,
      text: "It would go out to Mike."
    },
    {
      segments_id: 851,
      start: 4876.64,
      end: 4878.08,
      text: "So how would that work?"
    },
    {
      segments_id: 852,
      start: 4882.64,
      end: 4884.08,
      text: "When would we send that out?"
    },
    {
      segments_id: 853,
      start: 4884.32,
      end: 4887.12,
      text: "And I know I got it here somewhere."
    },
    {
      segments_id: 854,
      start: 4898.88,
      end: 4901.2,
      text: "Who put this survey together?"
    },
    {
      segments_id: 855,
      start: 4901.44,
      end: 4901.84,
      text: "Here it is."
    },
    {
      segments_id: 856,
      start: 4909.12,
      end: 4911.92,
      text: "It was never on the agenda."
    },
    {
      segments_id: 857,
      start: 4912.16,
      end: 4918.08,
      text: "It was never on the agenda for the board to vote on to have this survey done."
    },
    {
      segments_id: 858,
      start: 4919.36,
      end: 4919.76,
      text: "Initially?"
    },
    {
      segments_id: 859,
      start: 4920.4,
      end: 4920.88,
      text: "Yes."
    },
    {
      segments_id: 860,
      start: 4921.44,
      end: 4928.24,
      text: "And I would suggest putting it on the next agenda for the next month if it's that important."
    },
    {
      segments_id: 861,
      start: 4929.12,
      end: 4929.44,
      text: "Okay."
    },
    {
      segments_id: 862,
      start: 4931.2,
      end: 4945.92,
      text: "So last month, what she's saying is that in order to have it go, have an action item here."
    },
    {
      segments_id: 863,
      start: 4947.92,
      end: 4951.44,
      text: "It needed to be an action item last month."
    },
    {
      segments_id: 864,
      start: 4951.76,
      end: 4953.04,
      text: "It needed to be an action item on that."
    },
    {
      segments_id: 865,
      start: 4953.92,
      end: 4961.44,
      text: "The same thing to approve a survey to go out with those."
    },
    {
      segments_id: 866,
      start: 4961.92,
      end: 4962.16,
      text: "Yes."
    },
    {
      segments_id: 867,
      start: 4962.8,
      end: 4965.36,
      text: "Why is it that the first two didn't have to be an action item?"
    },
    {
      segments_id: 868,
      start: 4965.76,
      end: 4968.24,
      text: "Because those are every year."
    },
    {
      segments_id: 869,
      start: 4968.88,
      end: 4971.92,
      text: "Those are resolutions that happen every year, correct?"
    },
    {
      segments_id: 870,
      start: 4972.56,
      end: 4974.0,
      text: "It's the same thing."
    },
    {
      segments_id: 871,
      start: 4975.28,
      end: 4975.6,
      text: "Okay."
    },
    {
      segments_id: 872,
      start: 4976.8,
      end: 4978.96,
      text: "No, she's talking about procedures."
    },
    {
      segments_id: 873,
      start: 4979.2,
      end: 4979.44,
      text: "Right."
    },
    {
      segments_id: 874,
      start: 4979.76,
      end: 4981.6,
      text: "So it should be on the agenda."
    },
    {
      segments_id: 875,
      start: 4981.76,
      end: 4982.24,
      text: "Is that correct?"
    },
    {
      segments_id: 876,
      start: 4982.4,
      end: 4984.24,
      text: "Because it's supposed to be on the agenda."
    },
    {
      segments_id: 877,
      start: 4984.8,
      end: 4988.16,
      text: "Then we put it on an action item the following month."
    },
    {
      segments_id: 878,
      start: 4988.24,
      end: 4988.8,
      text: "Is that correct?"
    },
    {
      segments_id: 879,
      start: 4989.04,
      end: 4990.0,
      text: "Is that the proper procedure?"
    },
    {
      segments_id: 880,
      start: 4993.28,
      end: 4993.6,
      text: "Exactly."
    },
    {
      segments_id: 881,
      start: 4993.84,
      end: 4995.6,
      text: "So is that, is she correct on that?"
    },
    {
      segments_id: 882,
      start: 4995.76,
      end: 4996.64,
      text: "I don't know."
    },
    {
      segments_id: 883,
      start: 4997.28,
      end: 4999.84,
      text: "She has a technical missed."
    },
    {
      segments_id: 884,
      start: 5000.08,
      end: 5000.64,
      text: "Oh, okay."
    },
    {
      segments_id: 885,
      start: 5000.96,
      end: 5001.12,
      text: "Yeah."
    },
    {
      segments_id: 886,
      start: 5001.76,
      end: 5007.76,
      text: "But just to say, you know, we've been a small, well, we're still a small district."
    },
    {
      segments_id: 887,
      start: 5008.16,
      end: 5018.24,
      text: "But he, in the past, we've done things kind of like this, where it's like, you know, we're sitting around the table going, hey, you know what?"
    },
    {
      segments_id: 888,
      start: 5018.88,
      end: 5019.68,
      text: "We should be doing this."
    },
    {
      segments_id: 889,
      start: 5019.92,
      end: 5020.96,
      text: "Hey, Doc, can you do that?"
    },
    {
      segments_id: 890,
      start: 5021.2,
      end: 5022.88,
      text: "And then I put it on the agenda next month."
    },
    {
      segments_id: 891,
      start: 5023.04,
      end: 5023.28,
      text: "Yeah."
    },
    {
      segments_id: 892,
      start: 5024.4,
      end: 5024.48,
      text: "Yeah."
    },
    {
      segments_id: 893,
      start: 5024.56,
      end: 5025.36,
      text: "To expedite it."
    },
    {
      segments_id: 894,
      start: 5025.44,
      end: 5025.6,
      text: "Yeah."
    },
    {
      segments_id: 895,
      start: 5025.76,
      end: 5034.56,
      text: "So can I ask you, Joanne, is there a reason that we don't, can we, that would it'd be better for us to vote on it next month, I suppose to today?"
    },
    {
      segments_id: 896,
      start: 5035.12,
      end: 5045.68,
      text: "I think, first of all, the reason why it's on the agenda and for the board members to decide if we need this survey to go out."
    },
    {
      segments_id: 897,
      start: 5046.0,
      end: 5055.28,
      text: "And then the survey, if they all approve for the survey to be sent out, then they decide what they want on the survey."
    },
    {
      segments_id: 898,
      start: 5055.6,
      end: 5059.36,
      text: "And then it's presented at the next meeting."
    },
    {
      segments_id: 899,
      start: 5059.92,
      end: 5061.84,
      text: "And then it's open for discussion."
    },
    {
      segments_id: 900,
      start: 5062.16,
      end: 5066.96,
      text: "Nobody has been able to discuss this because it hasn't been an agenda item."
    },
    {
      segments_id: 901,
      start: 5067.28,
      end: 5077.76,
      text: "So you would like to see the question of the survey to be first discussed and then approved, and then later voted if we should actually send it out."
    },
    {
      segments_id: 902,
      start: 5078.96,
      end: 5082.0,
      text: "I think that's the way what Diane has her hand up."
    },
    {
      segments_id: 903,
      start: 5082.08,
      end: 5090.56,
      text: "She's probably the other thing is there's only four of us here tonight."
    },
    {
      segments_id: 904,
      start: 5091.68,
      end: 5099.68,
      text: "So maybe this in the interest of including all of the board members, it may be reasonable."
    },
    {
      segments_id: 905,
      start: 5103.6,
      end: 5105.28,
      text: "So that we have the whole board."
    },
    {
      segments_id: 906,
      start: 5106.32,
      end: 5116.8,
      text: "Yeah, and so the whole idea of the survey needs to be discussed at the meetings and then why we want to do this survey."
    },
    {
      segments_id: 907,
      start: 5117.12,
      end: 5125.52,
      text: "And then the board members decide, they vote on it, say, well, yes, it is a necessary thing that needs to be done, even though we haven't in the bylaws."
    },
    {
      segments_id: 908,
      start: 5126.72,
      end: 5132.4,
      text: "And then if they say yes, then Drawham draws one up, and then it's discussed at the meeting."
    },
    {
      segments_id: 909,
      start: 5132.48,
      end: 5137.84,
      text: "And if we're following that meeting, but that has never happened."
    },
    {
      segments_id: 910,
      start: 5141.2,
      end: 5142.72,
      text: "Yeah, and we didn't talk about it once more."
    },
    {
      segments_id: 911,
      start: 5146.8,
      end: 5148.4,
      text: "I couldn't hear what Rolando said."
    },
    {
      segments_id: 912,
      start: 5148.56,
      end: 5149.2,
      text: "Oh, say it next."
    },
    {
      segments_id: 913,
      start: 5150.16,
      end: 5151.6,
      text: "Sorry, Rich."
    },
    {
      segments_id: 914,
      start: 5151.84,
      end: 5163.76,
      text: "So I recall last month we talked about this topic, and I think we might have had not an action item vote, but there was a recommendation to move forward with it."
    },
    {
      segments_id: 915,
      start: 5165.36,
      end: 5167.36,
      text: "Well, anyways, we did discuss this last month."
    },
    {
      segments_id: 916,
      start: 5168.32,
      end: 5168.88,
      text: "Yeah, we did."
    },
    {
      segments_id: 917,
      start: 5169.04,
      end: 5170.88,
      text: "I think it was Diane that recommended it."
    },
    {
      segments_id: 918,
      start: 5171.04,
      end: 5175.28,
      text: "I think I said it was, I would accept that idea."
    },
    {
      segments_id: 919,
      start: 5176.8,
      end: 5187.84,
      text: "Well, my issue here is a little broader, that this kind of thing should go to the board before it goes to the public, and we should have input to it."
    },
    {
      segments_id: 920,
      start: 5189.76,
      end: 5192.72,
      text: "And so there was no opportunity."
    },
    {
      segments_id: 921,
      start: 5193.04,
      end: 5197.2,
      text: "It was posted on the website before I even was aware of it."
    },
    {
      segments_id: 922,
      start: 5198.16,
      end: 5211.6,
      text: "And I just think that we need to have everything that goes on the website at least allow the board to have a comment about it, not to completely edit or change what goes on, but have input."
    },
    {
      segments_id: 923,
      start: 5213.84,
      end: 5225.84,
      text: "So for a couple of meetings, we've been discussing time between several of the board members and I think even Joanne and some others."
    },
    {
      segments_id: 924,
      start: 5226.16,
      end: 5232.48,
      text: "And I thought that this was trying to expedite it so that we could change the time if someone needed to change the time or get it clear."
    },
    {
      segments_id: 925,
      start: 5232.72,
      end: 5238.0,
      text: "I think that we at the last meeting, we had decided to put this as an action item."
    },
    {
      segments_id: 926,
      start: 5238.96,
      end: 5246.16,
      text: "So it doesn't really matter to me, but I don't want to trigger feelings here."
    },
    {
      segments_id: 927,
      start: 5246.96,
      end: 5248.72,
      text: "We can postpone it for another month."
    },
    {
      segments_id: 928,
      start: 5251.12,
      end: 5252.64,
      text: "Okay, go ahead, Diane."
    },
    {
      segments_id: 929,
      start: 5255.2,
      end: 5260.64,
      text: "I'm basically concurring with Dick because, yes, it was my suggestion."
    },
    {
      segments_id: 930,
      start: 5260.8,
      end: 5262.56,
      text: "I still think it's a good suggestion."
    },
    {
      segments_id: 931,
      start: 5262.88,
      end: 5271.84,
      text: "I just think the content or, you know, because it doesn't have to be just about what time you want to show up at the meeting or if you would attend the meeting."
    },
    {
      segments_id: 932,
      start: 5272.16,
      end: 5280.4,
      text: "I would say if you're going to spend the postage and have it returned or returned an envelope, get the most bang out of it that you can."
    },
    {
      segments_id: 933,
      start: 5280.72,
      end: 5292.64,
      text: "And I've suggested this to the board before in terms of topics of survey is getting a preliminary great study almost, you know, like, are you in what kind of bracket you're in?"
    },
    {
      segments_id: 934,
      start: 5292.8,
      end: 5299.12,
      text: "Because I'll tell you, back in 2018-19, our demographic would have looked much different."
    },
    {
      segments_id: 935,
      start: 5299.28,
      end: 5305.76,
      text: "We were, there was plenty of people that might have drug us down in there and given us more opportunity for grant money."
    },
    {
      segments_id: 936,
      start: 5306.32,
      end: 5313.04,
      text: "So that would be an opportunity to use a survey scenario as well, besides just with, you know, the time of the meeting."
    },
    {
      segments_id: 937,
      start: 5313.36,
      end: 5314.48,
      text: "So I'm agreeing."
    },
    {
      segments_id: 938,
      start: 5314.8,
      end: 5314.88,
      text: "Yes."
    },
    {
      segments_id: 939,
      start: 5315.52,
      end: 5329.52,
      text: "Probably postpone it and discuss how many things you, how much bang for the back can you get if you're going to, you know, include a return stamp postage, whatever, and set it up that way."
    },
    {
      segments_id: 940,
      start: 5329.76,
      end: 5334.56,
      text: "I wasn't expecting a full-blown survey ready to go."
    },
    {
      segments_id: 941,
      start: 5335.12,
      end: 5336.64,
      text: "So I yield with that."
    },
    {
      segments_id: 942,
      start: 5336.8,
      end: 5337.04,
      text: "Thanks."
    },
    {
      segments_id: 943,
      start: 5337.76,
      end: 5338.72,
      text: "Thank you, Diane."
    },
    {
      segments_id: 944,
      start: 5339.68,
      end: 5342.24,
      text: "So who put this survey together?"
    },
    {
      segments_id: 945,
      start: 5342.64,
      end: 5345.12,
      text: "It's one of the employees of the district."
    },
    {
      segments_id: 946,
      start: 5345.44,
      end: 5346.24,
      text: "One of the employees."
    },
    {
      segments_id: 947,
      start: 5346.56,
      end: 5346.72,
      text: "Yeah."
    },
    {
      segments_id: 948,
      start: 5346.88,
      end: 5347.2,
      text: "Okay."
    },
    {
      segments_id: 949,
      start: 5347.52,
      end: 5348.32,
      text: "I know him pretty well."
    },
    {
      segments_id: 950,
      start: 5348.56,
      end: 5349.28,
      text: "There's only one."
    },
    {
      segments_id: 951,
      start: 5349.44,
      end: 5349.76,
      text: "Yeah."
    },
    {
      segments_id: 952,
      start: 5350.96,
      end: 5357.6,
      text: "So I felt like there was a directive from the board to me saying, hey, put out a survey."
    },
    {
      segments_id: 953,
      start: 5358.24,
      end: 5364.56,
      text: "So I didn't really, I just dreamed up what could be on it."
    },
    {
      segments_id: 954,
      start: 5364.96,
      end: 5366.72,
      text: "What meetings do you feel are important?"
    },
    {
      segments_id: 955,
      start: 5366.88,
      end: 5367.44,
      text: "What time?"
    },
    {
      segments_id: 956,
      start: 5367.92,
      end: 5369.36,
      text: "This, that, you know, what day?"
    },
    {
      segments_id: 957,
      start: 5370.0,
      end: 5374.24,
      text: "And, and, and I, so I just made it, it was just a bare bones."
    },
    {
      segments_id: 958,
      start: 5374.32,
      end: 5387.92,
      text: "It wasn't, and it was meant to bring back to have discussions sort of like a launching pad to say, no, oh, hey, like, you know, Diane's suggesting, hey, let's include this other topic here."
    },
    {
      segments_id: 959,
      start: 5388.24,
      end: 5393.12,
      text: "But the only topic last month really was talking about the time and the day."
    },
    {
      segments_id: 960,
      start: 5394.0,
      end: 5395.84,
      text: "So that's all I put on it."
    },
    {
      segments_id: 961,
      start: 5396.16,
      end: 5399.76,
      text: "But anyway, it was not meant to try."
    },
    {
      segments_id: 962,
      start: 5400.16,
      end: 5401.44,
      text: "To sneak it in here."
    },
    {
      segments_id: 963,
      start: 5402.64,
      end: 5403.92,
      text: "I was just trying to do it."
    },
    {
      segments_id: 964,
      start: 5404.72,
      end: 5409.28,
      text: "I think I understand all that, but it's the content of the question is not the actual search player."
    },
    {
      segments_id: 965,
      start: 5409.6,
      end: 5411.28,
      text: "Well, okay."
    },
    {
      segments_id: 966,
      start: 5411.76,
      end: 5417.44,
      text: "The way I've been told how things get on the agenda, you ask for it."
    },
    {
      segments_id: 967,
      start: 5418.08,
      end: 5419.44,
      text: "I can't hear what Joanne's saying."
    },
    {
      segments_id: 968,
      start: 5420.0,
      end: 5420.32,
      text: "Go ahead."
    },
    {
      segments_id: 969,
      start: 5421.2,
      end: 5421.52,
      text: "Okay."
    },
    {
      segments_id: 970,
      start: 5423.04,
      end: 5428.4,
      text: "The way I understand when something like this comes up, it's kind of never mind."
    },
    {
      segments_id: 971,
      start: 5428.64,
      end: 5429.44,
      text: "I won't go there."
    },
    {
      segments_id: 972,
      start: 5430.56,
      end: 5435.04,
      text: "That when we want to do something like this, we make it an agenda item."
    },
    {
      segments_id: 973,
      start: 5435.36,
      end: 5440.8,
      text: "We talk about it, why we want it, and what maybe should be on it."
    },
    {
      segments_id: 974,
      start: 5440.96,
      end: 5449.6,
      text: "And then the board members vote, say, okay, yes, we're going to put this survey together after they did all the public comments."
    },
    {
      segments_id: 975,
      start: 5450.16,
      end: 5453.84,
      text: "Then the next meeting, then the survey shows up."
    },
    {
      segments_id: 976,
      start: 5455.52,
      end: 5458.32,
      text: "And this is, that's not how this was done."
    },
    {
      segments_id: 977,
      start: 5458.96,
      end: 5465.12,
      text: "And I'm sorry that I don't understand why we have to do a survey for when we meet with the board."
    },
    {
      segments_id: 978,
      start: 5465.6,
      end: 5471.52,
      text: "When the board meets, we've been meeting seven o'clock Tuesday since the beginning of time, practically."
    },
    {
      segments_id: 979,
      start: 5472.48,
      end: 5485.04,
      text: "And I think this is kind of a waste of time myself, because what happens when the people who don't come to the meetings don't care and they don't send their survey in?"
    },
    {
      segments_id: 980,
      start: 5486.24,
      end: 5495.28,
      text: "So we're just going to take the surveys we have and because someone says they want it in the morning."
    },
    {
      segments_id: 981,
      start: 5495.6,
      end: 5501.04,
      text: "And, you know, I just think this is a waste of time."
    },
    {
      segments_id: 982,
      start: 5501.36,
      end: 5512.32,
      text: "And it will eliminate, if people want to have these meetings during the day, it's going to eliminate a lot of people who work from being on the board."
    },
    {
      segments_id: 983,
      start: 5512.96,
      end: 5513.12,
      text: "Okay."
    },
    {
      segments_id: 984,
      start: 5514.16,
      end: 5514.88,
      text: "Thank you, Joanna."
    },
    {
      segments_id: 985,
      start: 5515.12,
      end: 5516.32,
      text: "I mean, yeah, okay."
    },
    {
      segments_id: 986,
      start: 5517.6,
      end: 5520.72,
      text: "So is there any motion to postpone this?"
    },
    {
      segments_id: 987,
      start: 5520.88,
      end: 5530.72,
      text: "And I would like to see if it's my idea is to get questions on here and then propose it."
    },
    {
      segments_id: 988,
      start: 5533.04,
      end: 5534.8,
      text: "I hate to say committee."
    },
    {
      segments_id: 989,
      start: 5536.4,
      end: 5537.92,
      text: "I don't know how else we're going to get questions."
    },
    {
      segments_id: 990,
      start: 5538.08,
      end: 5550.24,
      text: "As far as I'm concerned, time for me has not been a problem, but and I don't remember all of the people in the community and the people on the board that have been brought bringing this up."
    },
    {
      segments_id: 991,
      start: 5550.88,
      end: 5560.08,
      text: "Whoever those people are that wanted the time change from seven o'clock, you know, I thought this was for them and put out a survey."
    },
    {
      segments_id: 992,
      start: 5560.32,
      end: 5570.96,
      text: "And I thought it was a good idea to put out a survey just so the community knows that we're here and prepares, you know, what's on the survey."
    },
    {
      segments_id: 993,
      start: 5571.12,
      end: 5582.72,
      text: "I think it's not a bad idea to let people know that we're a meeting and they're welcome and let them feel like they have input and they should, this is their board meeting after all."
    },
    {
      segments_id: 994,
      start: 5584.48,
      end: 5589.12,
      text: "I thought it was a good idea to put something out there and Don threw this together."
    },
    {
      segments_id: 995,
      start: 5589.76,
      end: 5593.52,
      text: "I thought it was, you know, he was doing what we asked him to do."
    },
    {
      segments_id: 996,
      start: 5595.44,
      end: 5699.6,
      text: "Any so if there's a any motion to from the board of first any more comments from anybody uh yeah great balanced i completely agree with joey joanne we've already wasted too much time in talking about even time change yeah i guess that was uh great um i think so too but i'm just one person so any motions if we're going to change the bylaws for the time super loud oh if we're going to change the time that that's in the bylaws why don't we just let the community vote on all our bylaws let me just concur with joanne there are certain um things that are bylaws related and the time is most definitely one whereas something that would like i was suggesting you know get a preliminary uh incomprehensible study or some other questions answered are not predicated upon the bylaw so if you're going to do the questionnaire that even addresses the time frame which i you know talked in about last last meeting but you would have to uh be specific about that too that that really would require participation because it would require a resolution to change the bylaws so i agree with joanne from that perspective there are certain things that are predicated on our bylaws and some that are not that would be in a questionnaire thank you thank you"
    },
    {
      segments_id: 997,
      start: 5700.4,
      end: 5709.6,
      text: "So, can we no motions from anybody, any board member, what we should do if we vote?"
    },
    {
      segments_id: 998,
      start: 5711.52,
      end: 5717.2,
      text: "One thing I would say is we need to quickly come back next month or else I want to come back."
    },
    {
      segments_id: 999,
      start: 5718.96,
      end: 5728.8,
      text: "I think maybe next month is just have an action item or a brainstorming session of what should be in the survey."
    },
    {
      segments_id: 1000,
      start: 5729.68,
      end: 5730.8,
      text: "Should we have a survey?"
    },
    {
      segments_id: 1001,
      start: 5731.04,
      end: 5732.08,
      text: "What should be on the survey?"
    },
    {
      segments_id: 1002,
      start: 5733.92,
      end: 5735.76,
      text: "You know, just those two steps."
    },
    {
      segments_id: 1003,
      start: 5735.84,
      end: 5740.48,
      text: "And if the answer is no in the first question, then we just move on."
    },
    {
      segments_id: 1004,
      start: 5741.6,
      end: 5744.24,
      text: "Okay, so don't make a motion, Chippy."
    },
    {
      segments_id: 1005,
      start: 5744.88,
      end: 5745.6,
      text: "I like that idea."
    },
    {
      segments_id: 1006,
      start: 5747.36,
      end: 5747.52,
      text: "Yeah."
    },
    {
      segments_id: 1007,
      start: 5749.36,
      end: 5759.04,
      text: "Okay, I would like to propose a motion that we table this until next month and to put it on as an action item to discuss."
    },
    {
      segments_id: 1008,
      start: 5759.28,
      end: 5761.2,
      text: "Dan, we're not hearing you, Dan."
    },
    {
      segments_id: 1009,
      start: 5762.96,
      end: 5764.08,
      text: "We're going to make the fun over."
    },
    {
      segments_id: 1010,
      start: 5765.6,
      end: 5777.6,
      text: "I would like to propose that we put the motion on to discuss this next month to decide whether we want to have our survey and what items to include in the survey."
    },
    {
      segments_id: 1011,
      start: 5777.92,
      end: 5782.72,
      text: "And so that's my motion."
    },
    {
      segments_id: 1012,
      start: 5787.36,
      end: 5787.92,
      text: "You can second."
    },
    {
      segments_id: 1013,
      start: 5788.88,
      end: 5788.96,
      text: "Okay."
    },
    {
      segments_id: 1014,
      start: 5789.36,
      end: 5790.16,
      text: "I'd second that."
    },
    {
      segments_id: 1015,
      start: 5792.32,
      end: 5792.64,
      text: "Okay."
    },
    {
      segments_id: 1016,
      start: 5794.16,
      end: 5799.04,
      text: "So it's just going to be roll call vote, and it's because we're on Zoom and in person."
    },
    {
      segments_id: 1017,
      start: 5799.84,
      end: 5803.04,
      text: "And so we'll start."
    },
    {
      segments_id: 1018,
      start: 5803.2,
      end: 5803.68,
      text: "Dan."
    },
    {
      segments_id: 1019,
      start: 5804.16,
      end: 5804.56,
      text: "Hi."
    },
    {
      segments_id: 1020,
      start: 5805.04,
      end: 5805.52,
      text: "Ken."
    },
    {
      segments_id: 1021,
      start: 5806.4,
      end: 5807.12,
      text: "Rolando."
    },
    {
      segments_id: 1022,
      start: 5807.28,
      end: 5807.76,
      text: "Nay."
    },
    {
      segments_id: 1023,
      start: 5809.92,
      end: 5810.64,
      text: "Richard."
    },
    {
      segments_id: 1024,
      start: 5812.16,
      end: 5812.56,
      text: "Can I?"
    },
    {
      segments_id: 1025,
      start: 5812.88,
      end: 5813.2,
      text: "Well."
    },
    {
      segments_id: 1026,
      start: 5815.6,
      end: 5816.8,
      text: "I think I'll say Nay."
    },
    {
      segments_id: 1027,
      start: 5818.88,
      end: 5822.16,
      text: "I know that ties it up, but I think we spent too much time on this."
    },
    {
      segments_id: 1028,
      start: 5822.24,
      end: 5827.76,
      text: "I just think we should not do it at all, let alone put it off for six months."
    },
    {
      segments_id: 1029,
      start: 5827.92,
      end: 5830.24,
      text: "Is that what Dan said, six months?"
    },
    {
      segments_id: 1030,
      start: 5830.88,
      end: 5832.4,
      text: "No, no, next month."
    },
    {
      segments_id: 1031,
      start: 5833.04,
      end: 5833.36,
      text: "Next month."
    },
    {
      segments_id: 1032,
      start: 5833.6,
      end: 5837.2,
      text: "I'd like to put it to bed is what I'm trying to do."
    },
    {
      segments_id: 1033,
      start: 5837.36,
      end: 5837.68,
      text: "Okay."
    },
    {
      segments_id: 1034,
      start: 5839.6,
      end: 5844.16,
      text: "We can put it as an action item and we can decide next month whether we want to have it or not."
    },
    {
      segments_id: 1035,
      start: 5844.4,
      end: 5845.52,
      text: "And if we don't, it's back."
    },
    {
      segments_id: 1036,
      start: 5848.0,
      end: 5849.6,
      text: "Okay, I'll vote for that."
    },
    {
      segments_id: 1037,
      start: 5849.76,
      end: 5851.52,
      text: "We'll decide next month."
    },
    {
      segments_id: 1038,
      start: 5870.24,
      end: 5871.84,
      text: "Okay, let's move along here."
    },
    {
      segments_id: 1039,
      start: 5875.76,
      end: 5878.88,
      text: "The approval of Nora's electric bid."
    },
    {
      segments_id: 1040,
      start: 5880.16,
      end: 5895.04,
      text: "Okay, the approval of that bid is so that that whole thing is paid for through the FAP grant financial assistance program through PCWA."
    },
    {
      segments_id: 1041,
      start: 5897.2,
      end: 5898.4,
      text: "And it went out to bent."
    },
    {
      segments_id: 1042,
      start: 5898.8,
      end: 5904.32,
      text: "And Norris was the only one that bid on the project."
    },
    {
      segments_id: 1043,
      start: 5904.8,
      end: 5907.84,
      text: "And it was in the Auburn Journal newspaper and whatnot."
    },
    {
      segments_id: 1044,
      start: 5909.84,
      end: 5917.84,
      text: "Anyway, Jerry as engineer is recommending that we tuck the bid."
    },
    {
      segments_id: 1045,
      start: 5918.08,
      end: 5924.8,
      text: "It's within the parameters of the grant."
    },
    {
      segments_id: 1046,
      start: 5925.12,
      end: 5927.12,
      text: "So it's covered."
    },
    {
      segments_id: 1047,
      start: 5927.44,
      end: 5928.8,
      text: "Yeah, it's totally covered."
    },
    {
      segments_id: 1048,
      start: 5929.36,
      end: 5937.92,
      text: "We're totally covered, but we only have one proposal, but it's being covered by PCWA."
    },
    {
      segments_id: 1049,
      start: 5938.8,
      end: 5944.0,
      text: "Any from the community, any comments?"
    },
    {
      segments_id: 1050,
      start: 5944.96,
      end: 5945.52,
      text: "I just have..."
    },
    {
      segments_id: 1051,
      start: 5947.84,
      end: 5949.04,
      text: "I just have one question."
    },
    {
      segments_id: 1052,
      start: 5949.68,
      end: 5952.4,
      text: "How much was our grant that we got?"
    },
    {
      segments_id: 1053,
      start: 5954.0,
      end: 5959.68,
      text: "If you ask some harder questions, I don't remember the amount of that specific piece."
    },
    {
      segments_id: 1054,
      start: 5960.0,
      end: 5963.2,
      text: "So we have still grant money to use toward the..."
    },
    {
      segments_id: 1055,
      start: 5963.84,
      end: 5967.44,
      text: "Oh yeah, the grant is there."
    },
    {
      segments_id: 1056,
      start: 5967.68,
      end: 5972.88,
      text: "There's actually two different projects that were approved for the FAP grant."
    },
    {
      segments_id: 1057,
      start: 5973.04,
      end: 5973.28,
      text: "Okay."
    },
    {
      segments_id: 1058,
      start: 5973.44,
      end: 5976.0,
      text: "And one was a generator and one was the camp group."
    },
    {
      segments_id: 1059,
      start: 5976.24,
      end: 5979.76,
      text: "And the two funds don't, they're separate from each other."
    },
    {
      segments_id: 1060,
      start: 5979.92,
      end: 5995.76,
      text: "And you can't use there any other comment from the community, anyone else in the community?"
    },
    {
      segments_id: 1061,
      start: 5996.64,
      end: 5997.76,
      text: "No, just Joanne."
    },
    {
      segments_id: 1062,
      start: 5997.92,
      end: 5999.92,
      text: "When you get a grant, it's specific to."
    },
    {
      segments_id: 1063,
      start: 6000.24,
      end: 6006.96,
      text: "The project, so it has an all or nothing, either you use it for that or you lose it."
    },
    {
      segments_id: 1064,
      start: 6008.24,
      end: 6008.8,
      text: "Thank you."
    },
    {
      segments_id: 1065,
      start: 6009.12,
      end: 6012.24,
      text: "Uh, from the board, comments, questions?"
    },
    {
      segments_id: 1066,
      start: 6012.88,
      end: 6014.0,
      text: "I have a comment."
    },
    {
      segments_id: 1067,
      start: 6014.64,
      end: 6015.6,
      text: "Okay, Richard."
    },
    {
      segments_id: 1068,
      start: 6015.84,
      end: 6035.2,
      text: "Even though we only advertised in one place, so in the future, I would like to see us advertise in more than one place and document that we did that, that we reached out to at least three different separate entities for our bids."
    },
    {
      segments_id: 1069,
      start: 6035.52,
      end: 6040.72,
      text: "That's the due diligence we talked about months ago and have been for a while."
    },
    {
      segments_id: 1070,
      start: 6042.32,
      end: 6045.68,
      text: "But otherwise, I'm fine going forward."
    },
    {
      segments_id: 1071,
      start: 6045.84,
      end: 6046.88,
      text: "I don't want to stop this."
    },
    {
      segments_id: 1072,
      start: 6047.12,
      end: 6049.36,
      text: "I think it's just fine to go ahead."
    },
    {
      segments_id: 1073,
      start: 6051.68,
      end: 6052.96,
      text: "Thank you, Richard."
    },
    {
      segments_id: 1074,
      start: 6054.48,
      end: 6056.08,
      text: "Okay, so we're looking for a motion."
    },
    {
      segments_id: 1075,
      start: 6056.4,
      end: 6057.12,
      text: "Yes, we're looking for."
    },
    {
      segments_id: 1076,
      start: 6057.36,
      end: 6071.6,
      text: "So I move that we approve the bid for the replace a generator and allow Don to execute the agreement with North Electric."
    },
    {
      segments_id: 1077,
      start: 6074.0,
      end: 6074.8,
      text: "I'll second."
    },
    {
      segments_id: 1078,
      start: 6078.4,
      end: 6078.96,
      text: "Roll call."
    },
    {
      segments_id: 1079,
      start: 6085.04,
      end: 6085.44,
      text: "Ken."
    },
    {
      segments_id: 1080,
      start: 6086.08,
      end: 6086.4,
      text: "All right."
    },
    {
      segments_id: 1081,
      start: 6086.8,
      end: 6086.96,
      text: "Dan."
    },
    {
      segments_id: 1082,
      start: 6087.44,
      end: 6087.68,
      text: "All right."
    },
    {
      segments_id: 1083,
      start: 6088.08,
      end: 6088.8,
      text: "Rolando."
    },
    {
      segments_id: 1084,
      start: 6088.88,
      end: 6088.96,
      text: "Hi."
    },
    {
      segments_id: 1085,
      start: 6089.28,
      end: 6089.92,
      text: "Richard."
    },
    {
      segments_id: 1086,
      start: 6090.48,
      end: 6090.72,
      text: "Hi."
    },
    {
      segments_id: 1087,
      start: 6095.04,
      end: 6095.84,
      text: "Thank you."
    },
    {
      segments_id: 1088,
      start: 6097.12,
      end: 6098.0,
      text: "Okay, good."
    },
    {
      segments_id: 1089,
      start: 6099.12,
      end: 6105.76,
      text: "Next is the auditor proposal from Fletcher and Company."
    },
    {
      segments_id: 1090,
      start: 6106.32,
      end: 6115.36,
      text: "Yeah, so I would like to proceed with the Fletcher and Company single audit proposal."
    },
    {
      segments_id: 1091,
      start: 6116.08,
      end: 6118.8,
      text: "It's roughly $14,000."
    },
    {
      segments_id: 1092,
      start: 6119.68,
      end: 6121.04,
      text: "It is well below."
    },
    {
      segments_id: 1093,
      start: 6122.4,
      end: 6131.36,
      text: "I've been on the phone with literally seven other CPAs and this was the lowest bid."
    },
    {
      segments_id: 1094,
      start: 6132.0,
      end: 6146.8,
      text: "And only two of them would even propose to do the job because normally they only work with the PCWA size agencies and government entities."
    },
    {
      segments_id: 1095,
      start: 6148.96,
      end: 6153.36,
      text: "And all of them said, oh, well, our minimum is 19,000."
    },
    {
      segments_id: 1096,
      start: 6153.68,
      end: 6156.56,
      text: "And okay, well, thank you for sharing."
    },
    {
      segments_id: 1097,
      start: 6157.2,
      end: 6163.52,
      text: "So anyway, I further looked at two additional organizations that I know and they weren't interested either."
    },
    {
      segments_id: 1098,
      start: 6164.8,
      end: 6173.68,
      text: "So anyway, with that, I would really be happy if the board would approve the single audit here."
    },
    {
      segments_id: 1099,
      start: 6174.4,
      end: 6177.76,
      text: "So did we not have a bit last month?"
    },
    {
      segments_id: 1100,
      start: 6178.16,
      end: 6199.92,
      text: "We did, but I was doing my, just like what Richard was saying, I'm doing, I'm actually taking Richard's call here, I did my due diligence to contact as many CPAs as I could who do single audits and talked with all of them."
    },
    {
      segments_id: 1101,
      start: 6200.64,
      end: 6203.2,
      text: "And I got two proposals."
    },
    {
      segments_id: 1102,
      start: 6203.52,
      end: 6204.8,
      text: "And this is the one."
    },
    {
      segments_id: 1103,
      start: 6206.0,
      end: 6208.96,
      text: "So for the community members that don't know what we're talking about."
    },
    {
      segments_id: 1104,
      start: 6209.28,
      end: 6210.0,
      text: "Oh, I'm sorry."
    },
    {
      segments_id: 1105,
      start: 6210.56,
      end: 6211.52,
      text: "What is this single?"
    },
    {
      segments_id: 1106,
      start: 6212.08,
      end: 6219.44,
      text: "So as a government entity, we get audited every year financially."
    },
    {
      segments_id: 1107,
      start: 6220.08,
      end: 6225.12,
      text: "But if we have a loan with the federal using federal funds, which is U.S."
    },
    {
      segments_id: 1108,
      start: 6225.2,
      end: 6239.76,
      text: "Today Loan that just closed in our this last year, if we use $750,000 or more of federal funds, then we are required to do what they call a single audit."
    },
    {
      segments_id: 1109,
      start: 6240.08,
      end: 6255.04,
      text: "And third-grade terms, no, just general terms, they do the financial audit, then they do more of like a policy audit to make sure that we all have our T's crossed and I's done."
    },
    {
      segments_id: 1110,
      start: 6255.68,
      end: 6259.52,
      text: "And it's much more intense kind of an audit."
    },
    {
      segments_id: 1111,
      start: 6260.08,
      end: 6271.12,
      text: "And I've been through one of these before because of the Gale Loop project was greater than 750."
    },
    {
      segments_id: 1112,
      start: 6271.6,
      end: 6272.24,
      text: "This is a one-time."
    },
    {
      segments_id: 1113,
      start: 6272.64,
      end: 6277.52,
      text: "It's a one, did they call it a single audit because we only needed one single time."
    },
    {
      segments_id: 1114,
      start: 6278.16,
      end: 6290.88,
      text: "And when I was talking to these CPAs, what was kind of interesting was we hadn't accessed the USDA funds yet because the loan had not closed."
    },
    {
      segments_id: 1115,
      start: 6291.84,
      end: 6299.84,
      text: "And I said, so I'm asking for, you know, so I'm getting bids on doing a regular."
    },
    {
      segments_id: 1116,
      start: 6300.32,
      end: 6304.8,
      text: "Audit, which is they call yellow book audit, and also single audits."
    },
    {
      segments_id: 1117,
      start: 6304.96,
      end: 6309.68,
      text: "And so, anyway, I don't think I need to borrow any practice anymore."
    },
    {
      segments_id: 1118,
      start: 6310.48,
      end: 6311.12,
      text: "Yeah, thank you."
    },
    {
      segments_id: 1119,
      start: 6311.6,
      end: 6316.4,
      text: "Totally, 750,000 from federal funds, and boom, we get the big."
    },
    {
      segments_id: 1120,
      start: 6316.88,
      end: 6320.24,
      text: "So, this is audit is required."
    },
    {
      segments_id: 1121,
      start: 6320.32,
      end: 6321.6,
      text: "We have no choice."
    },
    {
      segments_id: 1122,
      start: 6321.92,
      end: 6322.96,
      text: "We have to have it."
    },
    {
      segments_id: 1123,
      start: 6323.12,
      end: 6331.28,
      text: "And this seems to be the lowest that we've come up with and after many phone calls, evidently, Londo and Non."
    },
    {
      segments_id: 1124,
      start: 6331.84,
      end: 6334.48,
      text: "So, open any questions to the community."
    },
    {
      segments_id: 1125,
      start: 6334.88,
      end: 6336.32,
      text: "I see Diane's hand up."
    },
    {
      segments_id: 1126,
      start: 6337.12,
      end: 6338.72,
      text: "Comments, go ahead, Diane."
    },
    {
      segments_id: 1127,
      start: 6340.32,
      end: 6346.16,
      text: "I just wanted to know, when is the deadline for us to get that completed?"
    },
    {
      segments_id: 1128,
      start: 6346.8,
      end: 6349.04,
      text: "If you said it, Don, I didn't hear it."
    },
    {
      segments_id: 1129,
      start: 6350.0,
      end: 6354.8,
      text: "In other words, what is the requirement for the single audit to be completed?"
    },
    {
      segments_id: 1130,
      start: 6356.4,
      end: 6359.76,
      text: "I think we still have like six months from now."
    },
    {
      segments_id: 1131,
      start: 6360.0,
      end: 6360.88,
      text: "It's something like that."
    },
    {
      segments_id: 1132,
      start: 6360.96,
      end: 6363.52,
      text: "It's either six or nine months from the okay."
    },
    {
      segments_id: 1133,
      start: 6363.68,
      end: 6366.16,
      text: "So you do have some time."
    },
    {
      segments_id: 1134,
      start: 6366.72,
      end: 6370.64,
      text: "But did they give you an estimate of how long it would take them to complete it?"
    },
    {
      segments_id: 1135,
      start: 6371.6,
      end: 6375.76,
      text: "Yeah, it was in the in the paperwork, but I'm not hearing you."
    },
    {
      segments_id: 1136,
      start: 6376.48,
      end: 6383.2,
      text: "It was in the it was in the take a couple of months."
    },
    {
      segments_id: 1137,
      start: 6383.76,
      end: 6385.28,
      text: "Try one more time, please."
    },
    {
      segments_id: 1138,
      start: 6386.88,
      end: 6388.32,
      text: "Two months."
    },
    {
      segments_id: 1139,
      start: 6389.2,
      end: 6390.72,
      text: "It's going to take a couple of months."
    },
    {
      segments_id: 1140,
      start: 6390.88,
      end: 6392.48,
      text: "Our connection is spotty."
    },
    {
      segments_id: 1141,
      start: 6392.64,
      end: 6393.44,
      text: "It keeps showing."
    },
    {
      segments_id: 1142,
      start: 6393.68,
      end: 6394.16,
      text: "Oh, okay."
    },
    {
      segments_id: 1143,
      start: 6394.4,
      end: 6394.88,
      text: "Thank you."
    },
    {
      segments_id: 1144,
      start: 6395.04,
      end: 6397.6,
      text: "So it'll take them at least two to three months to do it."
    },
    {
      segments_id: 1145,
      start: 6397.76,
      end: 6400.4,
      text: "And we have approximately six months for a deadline."
    },
    {
      segments_id: 1146,
      start: 6400.96,
      end: 6401.36,
      text: "Yes."
    },
    {
      segments_id: 1147,
      start: 6401.68,
      end: 6401.92,
      text: "Okay."
    },
    {
      segments_id: 1148,
      start: 6402.16,
      end: 6403.04,
      text: "Thank you."
    },
    {
      segments_id: 1149,
      start: 6406.8,
      end: 6409.2,
      text: "Anybody, any forward comments?"
    },
    {
      segments_id: 1150,
      start: 6409.76,
      end: 6412.32,
      text: "It has to be at the end of our fiscal year, right?"
    },
    {
      segments_id: 1151,
      start: 6412.48,
      end: 6414.0,
      text: "We just, yeah, we just finished."
    },
    {
      segments_id: 1152,
      start: 6414.24,
      end: 6415.04,
      text: "But that's a requirement."
    },
    {
      segments_id: 1153,
      start: 6415.6,
      end: 6415.76,
      text: "Right."
    },
    {
      segments_id: 1154,
      start: 6415.92,
      end: 6416.88,
      text: "So, yeah."
    },
    {
      segments_id: 1155,
      start: 6418.48,
      end: 6419.52,
      text: "So just so everybody knows."
    },
    {
      segments_id: 1156,
      start: 6419.76,
      end: 6422.48,
      text: "But anyways, I make no more questions."
    },
    {
      segments_id: 1157,
      start: 6425.28,
      end: 6428.56,
      text: "Anybody, Richard, comment?"
    },
    {
      segments_id: 1158,
      start: 6430.4,
      end: 6430.72,
      text: "No?"
    },
    {
      segments_id: 1159,
      start: 6431.36,
      end: 6431.68,
      text: "Okay."
    },
    {
      segments_id: 1160,
      start: 6431.84,
      end: 6432.24,
      text: "All right."
    },
    {
      segments_id: 1161,
      start: 6432.56,
      end: 6438.96,
      text: "So I'll move that we approve the RFP for the Fletcher and Company single audit."
    },
    {
      segments_id: 1162,
      start: 6441.12,
      end: 6441.84,
      text: "I'll second."
    },
    {
      segments_id: 1163,
      start: 6444.32,
      end: 6444.96,
      text: "Roll call."
    },
    {
      segments_id: 1164,
      start: 6448.8,
      end: 6449.6,
      text: "Richard."
    },
    {
      segments_id: 1165,
      start: 6449.92,
      end: 6450.0,
      text: "Hi."
    },
    {
      segments_id: 1166,
      start: 6451.12,
      end: 6451.76,
      text: "Rolando."
    },
    {
      segments_id: 1167,
      start: 6451.92,
      end: 6452.08,
      text: "Hi."
    },
    {
      segments_id: 1168,
      start: 6452.32,
      end: 6452.64,
      text: "Dan."
    },
    {
      segments_id: 1169,
      start: 6452.96,
      end: 6453.2,
      text: "Hi."
    },
    {
      segments_id: 1170,
      start: 6453.84,
      end: 6454.24,
      text: "Ken."
    },
    {
      segments_id: 1171,
      start: 6454.48,
      end: 6454.8,
      text: "Hi."
    },
    {
      segments_id: 1172,
      start: 6456.0,
      end: 6456.88,
      text: "I get everybody."
    },
    {
      segments_id: 1173,
      start: 6468.48,
      end: 6469.04,
      text: "All right."
    },
    {
      segments_id: 1174,
      start: 6470.0,
      end: 6470.8,
      text: "Thank you."
    },
    {
      segments_id: 1175,
      start: 6472.0,
      end: 6472.32,
      text: "Okay."
    },
    {
      segments_id: 1176,
      start: 6472.8,
      end: 6474.72,
      text: "Action item number six."
    },
    {
      segments_id: 1177,
      start: 6476.8,
      end: 6477.12,
      text: "Okay."
    },
    {
      segments_id: 1178,
      start: 6480.4,
      end: 6485.84,
      text: "To choose a contractor, the board for maintenance and operations."
    },
    {
      segments_id: 1179,
      start: 6486.16,
      end: 6486.48,
      text: "Okay."
    },
    {
      segments_id: 1180,
      start: 6489.36,
      end: 6494.8,
      text: "I know Richard has already said that he hasn't read thoroughly through the three."
    },
    {
      segments_id: 1181,
      start: 6495.04,
      end: 6496.72,
      text: "We have three bids."
    },
    {
      segments_id: 1182,
      start: 6499.68,
      end: 6500.64,
      text: "I only saw those."
    },
    {
      segments_id: 1183,
      start: 6502.64,
      end: 6504.48,
      text: "I didn't see the full bids."
    },
    {
      segments_id: 1184,
      start: 6507.84,
      end: 6509.84,
      text: "They were sent by email, correct?"
    },
    {
      segments_id: 1185,
      start: 6510.4,
      end: 6511.92,
      text: "You just haven't reviewed them."
    },
    {
      segments_id: 1186,
      start: 6512.08,
      end: 6513.12,
      text: "I got them Saturday."
    },
    {
      segments_id: 1187,
      start: 6513.44,
      end: 6513.76,
      text: "Got it."
    },
    {
      segments_id: 1188,
      start: 6514.16,
      end: 6514.72,
      text: "Yeah, exactly."
    },
    {
      segments_id: 1189,
      start: 6515.12,
      end: 6515.84,
      text: "Saturday night."
    },
    {
      segments_id: 1190,
      start: 6516.48,
      end: 6516.8,
      text: "Yeah."
    },
    {
      segments_id: 1191,
      start: 6517.6,
      end: 6524.4,
      text: "So not only that, but Heidi's not here and this is an important issue."
    },
    {
      segments_id: 1192,
      start: 6525.2,
      end: 6535.44,
      text: "And I just, I think it's, I anyway would appreciate more time to take a look at the bids and be able to compare them."
    },
    {
      segments_id: 1193,
      start: 6537.68,
      end: 6540.48,
      text: "There's a lot of pages in all those bids."
    },
    {
      segments_id: 1194,
      start: 6540.8,
      end: 6542.72,
      text: "Putting apples with apples is."
    },
    {
      segments_id: 1195,
      start: 6544.64,
      end: 6546.96,
      text: "It's a process I haven't been able to do yet."
    },
    {
      segments_id: 1196,
      start: 6547.52,
      end: 6549.76,
      text: "Would you like me to do a quick summary?"
    },
    {
      segments_id: 1197,
      start: 6550.4,
      end: 6552.16,
      text: "Oh man, that's probably stupid."
    },
    {
      segments_id: 1198,
      start: 6555.44,
      end: 6557.2,
      text: "I won't vote on a quick summary, Don."
    },
    {
      segments_id: 1199,
      start: 6558.88,
      end: 6560.56,
      text: "Dan, hold on, hold on, Dan."
    },
    {
      segments_id: 1200,
      start: 6561.04,
      end: 6566.88,
      text: "Again, look at all three of the bids."
    },
    {
      segments_id: 1201,
      start: 6567.6,
      end: 6571.68,
      text: "There are a lot of unanswered questions that still need to be reviewed in that."
    },
    {
      segments_id: 1202,
      start: 6573.04,
      end: 6592.64,
      text: "I feel like we need to sit down with the board and go, it's not just how much it costs and the experience that they have, but I think we need to do some background checking to find out how some of the other, some of these referrals that they are giving, how are they dealing with those?"
    },
    {
      segments_id: 1203,
      start: 6593.28,
      end: 6596.48,
      text: "I think that would be prudent and smart on our part."
    },
    {
      segments_id: 1204,
      start: 6597.04,
      end: 6598.8,
      text: "And I think we also need to sit down."
    },
    {
      segments_id: 1205,
      start: 6600.24,
      end: 6602.4,
      text: "Like, personally, I would like Jerry."
    },
    {
      segments_id: 1206,
      start: 6603.44,
      end: 6612.72,
      text: "We know what Jerry's costs are, but I would not mind having Jerry take a look at these and saying, okay, this is not, what's missing?"
    },
    {
      segments_id: 1207,
      start: 6613.04,
      end: 6615.2,
      text: "You know, because I'm not an engineer."
    },
    {
      segments_id: 1208,
      start: 6615.52,
      end: 6626.08,
      text: "And some of the stuff that jumped out at me was a couple to the proposals, we're trying to hire the ex-employee of hydros."
    },
    {
      segments_id: 1209,
      start: 6626.56,
      end: 6628.48,
      text: "But what happens if they don't get that person?"
    },
    {
      segments_id: 1210,
      start: 6629.6,
      end: 6630.48,
      text: "What's going to happen?"
    },
    {
      segments_id: 1211,
      start: 6631.84,
      end: 6635.84,
      text: "How's that going to affect the cost and the other things and the operations?"
    },
    {
      segments_id: 1212,
      start: 6636.08,
      end: 6636.88,
      text: "I can answer that one."
    },
    {
      segments_id: 1213,
      start: 6637.6,
      end: 6641.44,
      text: "They prearranged that with Jared and the shape."
    },
    {
      segments_id: 1214,
      start: 6641.6,
      end: 6642.16,
      text: "Oh, they did?"
    },
    {
      segments_id: 1215,
      start: 6642.32,
      end: 6643.84,
      text: "Yeah, they pre-arranged that."
    },
    {
      segments_id: 1216,
      start: 6644.16,
      end: 6644.48,
      text: "Okay."
    },
    {
      segments_id: 1217,
      start: 6647.36,
      end: 6657.92,
      text: "And just so you know, there are, you know, Bill Shin is a T2 and he's working on his three."
    },
    {
      segments_id: 1218,
      start: 6658.72,
      end: 6662.8,
      text: "And truth be told, I'm working on T1."
    },
    {
      segments_id: 1219,
      start: 6664.4,
      end: 6666.88,
      text: "Anyway, not because I want to do."
    },
    {
      segments_id: 1220,
      start: 6670.96,
      end: 6680.64,
      text: "The proposal from American River that all their people working on it are T3."
    },
    {
      segments_id: 1221,
      start: 6681.2,
      end: 6683.84,
      text: "Right, I took all my notes and I saw all that."
    },
    {
      segments_id: 1222,
      start: 6684.48,
      end: 6687.52,
      text: "Yeah, so anyway, I thought that was just kind of interesting."
    },
    {
      segments_id: 1223,
      start: 6688.56,
      end: 6694.88,
      text: "For American River, this is their first contract."
    },
    {
      segments_id: 1224,
      start: 6694.96,
      end: 6696.24,
      text: "Yeah, it's the first road yard."
    },
    {
      segments_id: 1225,
      start: 6696.64,
      end: 6699.36,
      text: "But I mean, everybody needs a first roadway at some point."
    },
    {
      segments_id: 1226,
      start: 6699.92,
      end: 6715.04,
      text: "But I did call on a reference with Coleman, and because they just started a contract, I forget the name of it, but anyway, a contract didn't."
    },
    {
      segments_id: 1227,
      start: 6717.84,
      end: 6722.48,
      text: "Anyway, it was to do wastewater and treated water."
    },
    {
      segments_id: 1228,
      start: 6724.16,
      end: 6725.92,
      text: "I don't think it's at the same plant."
    },
    {
      segments_id: 1229,
      start: 6726.24,
      end: 6734.64,
      text: "And anyway, and so they're serving 200 residents with those two things."
    },
    {
      segments_id: 1230,
      start: 6735.36,
      end: 6741.76,
      text: "And then they have, you know, Colfax and I have those on my house for the wall."
    },
    {
      segments_id: 1231,
      start: 6744.4,
      end: 6755.76,
      text: "So I was thinking, my thought, I agree and concur with Dan 100% that this is too important and with Richard to just make a rash, a quick decision."
    },
    {
      segments_id: 1232,
      start: 6756.08,
      end: 6796.4,
      text: "I was thinking there's an idea that we should all of the applicants that we want to interview to have them individually with the board or whoever that wants to be there to, you know, with Jerry there, you know, asking them questions individually, not as a group, but with each company individually that we're interested in and go through and make sure that, you know, have the question answer period or right here in this room maybe with and get it clear before we hire anybody if they're qualified and have Jerry here questioning."
    },
    {
      segments_id: 1233,
      start: 6796.48,
      end: 6797.84,
      text: "That was an idea that I had."
    },
    {
      segments_id: 1234,
      start: 6798.32,
      end: 6800.16,
      text: "I think that's an excellent idea."
    },
    {
      segments_id: 1235,
      start: 6800.96,
      end: 6820.56,
      text: "One of the things, the concerns that I had was, you know, some opera, some of the contracts have, they talk about hiring private outside, if we get a break and they have a, they talk about hiring outside people to come in and repair the break and stuff like that."
    },
    {
      segments_id: 1236,
      start: 6820.72,
      end: 6828.08,
      text: "We've had great service in the past with Jerry through hydros and they jump right on it and try and they jump right on it."
    },
    {
      segments_id: 1237,
      start: 6828.24,
      end: 6829.2,
      text: "We've got it done."
    },
    {
      segments_id: 1238,
      start: 6830.08,
      end: 6862.48,
      text: "One of the concerns that I have is on it is that, hey, we get a major break like we've had in some of those in the past, that we need to get somebody out there ASAP, not, you know, and so we need to make sure that we are due diligent with that and that we understand completely what they're going to do as far as bringing up outside contractors in to repair the pipe who may or may not be familiar with the system."
    },
    {
      segments_id: 1239,
      start: 6862.64,
      end: 6864.88,
      text: "So that's what my bottom line was."
    },
    {
      segments_id: 1240,
      start: 6865.12,
      end: 6886.08,
      text: "So in the proposals, I'm sure Jason or Andrea could address that, but in their proposal, they outlined what are two contractors, and actually one of them, one of them is Triton, which is Jerry, Jerry LeBuddy's construction company."
    },
    {
      segments_id: 1241,
      start: 6887.6,
      end: 6896.96,
      text: "Which would, anyway, I was happy to see Triton on there just because they've been available in the past."
    },
    {
      segments_id: 1242,
      start: 6897.28,
      end: 6899.92,
      text: "But when the owner of Triton is..."
    },
    {
      segments_id: 1243,
      start: 6900.16,
      end: 6902.56,
      text: "Saying, hey, we have an emergency down here."
    },
    {
      segments_id: 1244,
      start: 6903.2,
      end: 6910.48,
      text: "You know, I'll be having outside of your mountain."
    },
    {
      segments_id: 1245,
      start: 6911.2,
      end: 6912.16,
      text: "You see what it's like."
    },
    {
      segments_id: 1246,
      start: 6912.72,
      end: 6923.52,
      text: "So I propose that we have a special meeting as has been suggested."
    },
    {
      segments_id: 1247,
      start: 6924.08,
      end: 6935.68,
      text: "I propose we have a special meeting with Jerry or at least just with Jerry to go over these three proposals with us."
    },
    {
      segments_id: 1248,
      start: 6936.64,
      end: 6945.84,
      text: "I don't know that we can demand that the proposers attend that, but I think we should have a meeting with Jared before we go forward."
    },
    {
      segments_id: 1249,
      start: 6948.08,
      end: 6950.08,
      text: "Within an RFP, right?"
    },
    {
      segments_id: 1250,
      start: 6950.24,
      end: 6952.64,
      text: "That they might be invited to go here."
    },
    {
      segments_id: 1251,
      start: 6953.6,
      end: 6953.84,
      text: "Yeah."
    },
    {
      segments_id: 1252,
      start: 6955.6,
      end: 6956.56,
      text: "So, okay."
    },
    {
      segments_id: 1253,
      start: 6960.08,
      end: 6965.68,
      text: "So, but you're saying Richard made a motion, right, to do that."
    },
    {
      segments_id: 1254,
      start: 6965.92,
      end: 6968.56,
      text: "And so I just didn't want to."
    },
    {
      segments_id: 1255,
      start: 6969.12,
      end: 6974.72,
      text: "Well, before someone seconds it, I just wanted to add another part to that."
    },
    {
      segments_id: 1256,
      start: 6977.44,
      end: 6988.0,
      text: "From my perspective, you know, we had one bidder that was considerably higher and it's a rebidder and he upped his price."
    },
    {
      segments_id: 1257,
      start: 6988.48,
      end: 7006.88,
      text: "And so instead of, you know, having, I propose to just have the two companies, Coleman and American River, instead of having the third, which takes extra energy and time."
    },
    {
      segments_id: 1258,
      start: 7007.2,
      end: 7012.24,
      text: "You know, I'm thinking to just narrow it down to the two."
    },
    {
      segments_id: 1259,
      start: 7017.2,
      end: 7022.24,
      text: "I just think it's kind of awkward to have two bidders."
    },
    {
      segments_id: 1260,
      start: 7023.76,
      end: 7025.76,
      text: "I mean, they just bid against each other, right?"
    },
    {
      segments_id: 1261,
      start: 7026.08,
      end: 7027.92,
      text: "So to have them in the same room."
    },
    {
      segments_id: 1262,
      start: 7028.56,
      end: 7032.96,
      text: "I was thinking that would be a closed session with one bidder, a closed session with the next."
    },
    {
      segments_id: 1263,
      start: 7033.6,
      end: 7034.4,
      text: "I agree with that."
    },
    {
      segments_id: 1264,
      start: 7035.12,
      end: 7035.92,
      text: "We're going to have two."
    },
    {
      segments_id: 1265,
      start: 7036.0,
      end: 7037.28,
      text: "That would be okay then."
    },
    {
      segments_id: 1266,
      start: 7043.84,
      end: 7044.88,
      text: "Oh, I'm sorry."
    },
    {
      segments_id: 1267,
      start: 7045.68,
      end: 7047.6,
      text: "I am like the master miscommunication today."
    },
    {
      segments_id: 1268,
      start: 7048.16,
      end: 7048.72,
      text: "No, it's okay."
    },
    {
      segments_id: 1269,
      start: 7048.88,
      end: 7049.6,
      text: "No, that's fine."
    },
    {
      segments_id: 1270,
      start: 7049.76,
      end: 7053.04,
      text: "No, I think they got the concept, but kind of make it simpler."
    },
    {
      segments_id: 1271,
      start: 7053.68,
      end: 7065.84,
      text: "And unless we feel, I mean, can't we, at least for today, you know, narrow it down, make it simpler and get a plan of attack to go from here."
    },
    {
      segments_id: 1272,
      start: 7066.0,
      end: 7077.44,
      text: "I seem to recall that in the selection procedure that was in the RFP, it called out that some of the candidates might be, the finalists might be invited for in-person interview, right?"
    },
    {
      segments_id: 1273,
      start: 7077.84,
      end: 7078.56,
      text: "I see the recall."
    },
    {
      segments_id: 1274,
      start: 7078.8,
      end: 7078.88,
      text: "Yeah."
    },
    {
      segments_id: 1275,
      start: 7079.2,
      end: 7081.44,
      text: "So the finalists, so it's not all of them."
    },
    {
      segments_id: 1276,
      start: 7081.6,
      end: 7084.4,
      text: "So if we had, there's two that we're considering."
    },
    {
      segments_id: 1277,
      start: 7084.72,
      end: 7086.24,
      text: "I don't think we have to worry about the third."
    },
    {
      segments_id: 1278,
      start: 7086.48,
      end: 7088.72,
      text: "You can go back and look at the RFP, but I think they're called out."
    },
    {
      segments_id: 1279,
      start: 7088.96,
      end: 7091.68,
      text: "That was part of the procedure and was called out ahead of time."
    },
    {
      segments_id: 1280,
      start: 7091.76,
      end: 7094.08,
      text: "So I don't think there's any kind of legal concern."
    },
    {
      segments_id: 1281,
      start: 7094.32,
      end: 7095.68,
      text: "I don't think I'm just saying."
    },
    {
      segments_id: 1282,
      start: 7096.32,
      end: 7098.96,
      text: "And I agree with what Ken's trying to say."
    },
    {
      segments_id: 1283,
      start: 7099.04,
      end: 7101.6,
      text: "I think we should just focus on the two real options."
    },
    {
      segments_id: 1284,
      start: 7102.16,
      end: 7102.64,
      text: "Yes."
    },
    {
      segments_id: 1285,
      start: 7102.96,
      end: 7105.6,
      text: "Yeah, I'm fine with that, just not at the same time."
    },
    {
      segments_id: 1286,
      start: 7105.92,
      end: 7106.08,
      text: "Right."
    },
    {
      segments_id: 1287,
      start: 7106.32,
      end: 7107.12,
      text: "Well, exactly."
    },
    {
      segments_id: 1288,
      start: 7108.56,
      end: 7108.72,
      text: "No."
    },
    {
      segments_id: 1289,
      start: 7109.2,
      end: 7111.12,
      text: "No, separately, definitely."
    },
    {
      segments_id: 1290,
      start: 7111.28,
      end: 7116.32,
      text: "I've had seen gloves on when the joker tells them, I got room for one of you."
    },
    {
      segments_id: 1291,
      start: 7117.52,
      end: 7119.68,
      text: "I can't hear what's being said on the side there."
    },
    {
      segments_id: 1292,
      start: 7122.32,
      end: 7124.72,
      text: "I'm just joking around calling the Batman movie."
    },
    {
      segments_id: 1293,
      start: 7124.8,
      end: 7128.72,
      text: "I don't know if you saw the Batman movie where the Joker says, well, there's two of you and I only need one."
    },
    {
      segments_id: 1294,
      start: 7128.88,
      end: 7131.68,
      text: "And then he has a mistake for them to kill each other in the survivor."
    },
    {
      segments_id: 1295,
      start: 7132.56,
      end: 7132.72,
      text: "Okay."
    },
    {
      segments_id: 1296,
      start: 7133.68,
      end: 7135.28,
      text: "That would just be funny."
    },
    {
      segments_id: 1297,
      start: 7137.44,
      end: 7142.48,
      text: "So if we can add to that motion, Richard."
    },
    {
      segments_id: 1298,
      start: 7143.76,
      end: 7145.28,
      text: "Yes, you want me to restate it?"
    },
    {
      segments_id: 1299,
      start: 7145.52,
      end: 7146.48,
      text: "I'll restate it."
    },
    {
      segments_id: 1300,
      start: 7147.2,
      end: 7147.84,
      text: "Yeah, please."
    },
    {
      segments_id: 1301,
      start: 7148.08,
      end: 7159.36,
      text: "I move that we meet with Jerry and each of those two low bidders and have a question and answer session."
    },
    {
      segments_id: 1302,
      start: 7162.72,
      end: 7165.76,
      text: "Before we make a commitment."
    },
    {
      segments_id: 1303,
      start: 7166.64,
      end: 7167.92,
      text: "Yes, I accepted that."
    },
    {
      segments_id: 1304,
      start: 7168.8,
      end: 7176.64,
      text: "Nobody thinks it would be worthwhile meeting prior to meeting with them so that we all have had a chance to review the RFPs and prep."
    },
    {
      segments_id: 1305,
      start: 7177.36,
      end: 7179.36,
      text: "Yeah, have a special meeting to do that."
    },
    {
      segments_id: 1306,
      start: 7181.04,
      end: 7181.84,
      text: "That's fine."
    },
    {
      segments_id: 1307,
      start: 7183.36,
      end: 7184.56,
      text: "I just am not ready now."
    },
    {
      segments_id: 1308,
      start: 7185.04,
      end: 7188.88,
      text: "I'm fine with looking into it until we are comfortable with it."
    },
    {
      segments_id: 1309,
      start: 7189.2,
      end: 7190.32,
      text: "And I think that we all agree."
    },
    {
      segments_id: 1310,
      start: 7190.48,
      end: 7192.32,
      text: "I'm not ready now either, Ricky."
    },
    {
      segments_id: 1311,
      start: 7195.2,
      end: 7199.76,
      text: "I'm sorry to put away on the to rush it."
    },
    {
      segments_id: 1312,
      start: 7200.16,
      end: 7213.04,
      text: "I was more trying to be responsive to Jerry because when you put something back out to RFP, it's like, well, you know, how long do you have the good rates with me?"
    },
    {
      segments_id: 1313,
      start: 7213.36,
      end: 7218.48,
      text: "You know, so and well, as long as he stays, right?"
    },
    {
      segments_id: 1314,
      start: 7219.2,
      end: 7221.04,
      text: "Less more we say, right?"
    },
    {
      segments_id: 1315,
      start: 7222.8,
      end: 7234.0,
      text: "And so do we need we need comment from the public or are we good?"
    },
    {
      segments_id: 1316,
      start: 7234.4,
      end: 7234.72,
      text: "Good point."
    },
    {
      segments_id: 1317,
      start: 7234.88,
      end: 7236.32,
      text: "Yeah, we should have comment."
    },
    {
      segments_id: 1318,
      start: 7236.8,
      end: 7238.96,
      text: "Any comments from the public?"
    },
    {
      segments_id: 1319,
      start: 7242.32,
      end: 7243.52,
      text: "Dan Diane."
    },
    {
      segments_id: 1320,
      start: 7245.28,
      end: 7249.36,
      text: "Basically, I mean, Jerry was very clear that he would try to hang in there."
    },
    {
      segments_id: 1321,
      start: 7249.6,
      end: 7253.6,
      text: "I mean, but I know he was also clear that he would like to exit for the summer."
    },
    {
      segments_id: 1322,
      start: 7253.92,
      end: 7266.16,
      text: "And if something did come up, I mean, there is always California Rural Water Association to step in and just take care of the baby and the buggy while we sort it out."
    },
    {
      segments_id: 1323,
      start: 7266.24,
      end: 7272.64,
      text: "So I think you have plenty of time to go through thoroughly those two bids."
    },
    {
      segments_id: 1324,
      start: 7272.88,
      end: 7274.32,
      text: "And that's my opinion."
    },
    {
      segments_id: 1325,
      start: 7274.64,
      end: 7275.76,
      text: "So I rest with that."
    },
    {
      segments_id: 1326,
      start: 7275.92,
      end: 7276.88,
      text: "Thank you."
    },
    {
      segments_id: 1327,
      start: 7278.32,
      end: 7284.0,
      text: "I kind of question, not that if California and Royal Water could do it."
    },
    {
      segments_id: 1328,
      start: 7284.56,
      end: 7287.44,
      text: "What I question is, is what the price is."
    },
    {
      segments_id: 1329,
      start: 7288.96,
      end: 7295.84,
      text: "Well, it's cut rate for them, not their partner, because that's the confusing part, right?"
    },
    {
      segments_id: 1330,
      start: 7296.0,
      end: 7298.56,
      text: "Because they also put in a bid and it was really high."
    },
    {
      segments_id: 1331,
      start: 7298.8,
      end: 7305.2,
      text: "But California World Water Association is augmented by state funds."
    },
    {
      segments_id: 1332,
      start: 7305.76,
      end: 7322.56,
      text: "And so back when I was talking to Fernando a year ago, he said, you know, basically he can get operators in there for, I think, $35 an hour, whereas Jerry's guys, you know, were being billed in at 50 and 75, depending on what their rating was."
    },
    {
      segments_id: 1333,
      start: 7322.88,
      end: 7326.0,
      text: "So I'm just saying that's what they do."
    },
    {
      segments_id: 1334,
      start: 7326.16,
      end: 7329.84,
      text: "And they come in in an emergency and they just do it on the short term, right?"
    },
    {
      segments_id: 1335,
      start: 7330.08,
      end: 7334.4,
      text: "Until you, until you get the facility up and going."
    },
    {
      segments_id: 1336,
      start: 7335.04,
      end: 7337.92,
      text: "Because that's what they, he found a niche, right?"
    },
    {
      segments_id: 1337,
      start: 7338.08,
      end: 7342.64,
      text: "Because little districts would all of a sudden, one morning, everybody walked off the job."
    },
    {
      segments_id: 1338,
      start: 7342.96,
      end: 7344.96,
      text: "And so they found this niche to do that."
    },
    {
      segments_id: 1339,
      start: 7345.28,
      end: 7347.68,
      text: "And they got state funding to pull it off."
    },
    {
      segments_id: 1340,
      start: 7347.92,
      end: 7354.4,
      text: "So there's a different caveat between who bid and what they do on the grant side."
    },
    {
      segments_id: 1341,
      start: 7358.48,
      end: 7360.16,
      text: "I have one comment real quick."
    },
    {
      segments_id: 1342,
      start: 7360.48,
      end: 7365.92,
      text: "I just wanted to show my appreciation to Jason and Andrea because they hung in the meeting."
    },
    {
      segments_id: 1343,
      start: 7366.16,
      end: 7371.68,
      text: "And, you know, I think none of the other sitters came to the meeting to understand what we're doing."
    },
    {
      segments_id: 1344,
      start: 7372.0,
      end: 7374.24,
      text: "So I appreciate their time and join the call."
    },
    {
      segments_id: 1345,
      start: 7374.56,
      end: 7379.92,
      text: "And I think they got some insight to what we're trying to do our best for the community."
    },
    {
      segments_id: 1346,
      start: 7380.24,
      end: 7381.76,
      text: "Just want to say thank you to them."
    },
    {
      segments_id: 1347,
      start: 7385.28,
      end: 7387.12,
      text: "Hey, thank you so much for having us."
    },
    {
      segments_id: 1348,
      start: 7387.44,
      end: 7391.92,
      text: "It's been really enlightening and we appreciate your guys' time and consideration."
    },
    {
      segments_id: 1349,
      start: 7397.52,
      end: 7398.4,
      text: "Thank you."
    },
    {
      segments_id: 1350,
      start: 7401.52,
      end: 7403.12,
      text: "Sorry, I was trying to unmute myself."
    },
    {
      segments_id: 1351,
      start: 7403.2,
      end: 7404.16,
      text: "I did owe my wife."
    },
    {
      segments_id: 1352,
      start: 7404.24,
      end: 7408.8,
      text: "Thank you so much for allowing us to bid and appreciate your guys' time as well."
    },
    {
      segments_id: 1353,
      start: 7408.96,
      end: 7409.92,
      text: "Thank you."
    },
    {
      segments_id: 1354,
      start: 7411.84,
      end: 7413.2,
      text: "So thank you, Jason."
    },
    {
      segments_id: 1355,
      start: 7413.84,
      end: 7422.24,
      text: "So can I roll call the vote now on Richard's motion and can second on this?"
    },
    {
      segments_id: 1356,
      start: 7423.2,
      end: 7423.52,
      text: "Okay."
    },
    {
      segments_id: 1357,
      start: 7425.68,
      end: 7426.96,
      text: "Dan, aye."
    },
    {
      segments_id: 1358,
      start: 7427.52,
      end: 7428.32,
      text: "Ken, aye."
    },
    {
      segments_id: 1359,
      start: 7429.04,
      end: 7430.32,
      text: "Rolando, aye."
    },
    {
      segments_id: 1360,
      start: 7430.64,
      end: 7431.68,
      text: "And Richard?"
    },
    {
      segments_id: 1361,
      start: 7431.92,
      end: 7432.48,
      text: "Aye."
    },
    {
      segments_id: 1362,
      start: 7439.44,
      end: 7446.96,
      text: "From the public, I would like to address Jason and Andrew and thank you as well for caring enough to come and visit with us and get to know us."
    },
    {
      segments_id: 1363,
      start: 7447.2,
      end: 7448.32,
      text: "So thank you."
    },
    {
      segments_id: 1364,
      start: 7451.44,
      end: 7452.0,
      text: "Absolutely."
    },
    {
      segments_id: 1365,
      start: 7452.8,
      end: 7457.44,
      text: "We have family in Christian Valley and have a connection to that part of this area."
    },
    {
      segments_id: 1366,
      start: 7457.6,
      end: 7459.44,
      text: "So we appreciate the time."
    },
    {
      segments_id: 1367,
      start: 7459.6,
      end: 7460.16,
      text: "Thank you."
    },
    {
      segments_id: 1368,
      start: 7460.48,
      end: 7472.32,
      text: "Yeah, I just want to say I'm actually in Christian Valley right now at my grandma's house, where is my pretty much my home away from home since I was nine years old."
    },
    {
      segments_id: 1369,
      start: 7472.64,
      end: 7480.88,
      text: "So, you know, whether you guys pick us or not, this is home to us and we appreciate you guys and the work that you do."
    },
    {
      segments_id: 1370,
      start: 7485.44,
      end: 7487.12,
      text: "Are you going to move to Crystal Valley?"
    },
    {
      segments_id: 1371,
      start: 7491.76,
      end: 7493.84,
      text: "You know, it is a real possibility."
    },
    {
      segments_id: 1372,
      start: 7494.0,
      end: 7498.8,
      text: "It's something that's completely on the table for us because we are her second."
    },
    {
      segments_id: 1373,
      start: 7500.08,
      end: 7501.28,
      text: "Caretakers, basically."
    },
    {
      segments_id: 1374,
      start: 7502.24,
      end: 7505.68,
      text: "And she's been ours in the past for sure."
    },
    {
      segments_id: 1375,
      start: 7506.24,
      end: 7509.04,
      text: "So it's 100% on the table."
    },
    {
      segments_id: 1376,
      start: 7510.56,
      end: 7515.84,
      text: "I'm sorry, I don't want to interrupt the board's time, but really quickly, your name sounds really familiar."
    },
    {
      segments_id: 1377,
      start: 7516.48,
      end: 7519.04,
      text: "Does my last name sound familiar to you?"
    },
    {
      segments_id: 1378,
      start: 7519.6,
      end: 7525.6,
      text: "You know, it doesn't, but I actually go by my middle name, which is Michelle Hoffman."
    },
    {
      segments_id: 1379,
      start: 7526.16,
      end: 7527.28,
      text: "And we're Slater."
    },
    {
      segments_id: 1380,
      start: 7527.52,
      end: 7533.44,
      text: "So if you see Slater signed on Christian Valley right across from Little Creek, okay."
    },
    {
      segments_id: 1381,
      start: 7534.0,
      end: 7534.4,
      text: "Thank you."
    },
    {
      segments_id: 1382,
      start: 7534.96,
      end: 7535.84,
      text: "Yeah, no problem."
    },
    {
      segments_id: 1383,
      start: 7536.0,
      end: 7536.88,
      text: "That's my maiden name."
    },
    {
      segments_id: 1384,
      start: 7537.36,
      end: 7539.52,
      text: "Her fence was just hit like six months ago."
    },
    {
      segments_id: 1385,
      start: 7539.68,
      end: 7541.92,
      text: "So if you see a broken fence, it's hers."
    },
    {
      segments_id: 1386,
      start: 7542.88,
      end: 7544.4,
      text: "And we're working on it."
    },
    {
      segments_id: 1387,
      start: 7551.12,
      end: 7551.28,
      text: "Okay."
    },
    {
      segments_id: 1388,
      start: 7551.84,
      end: 7552.16,
      text: "Thank you."
    },
    {
      segments_id: 1389,
      start: 7552.24,
      end: 7563.2,
      text: "Let's get to the last action item, which is the board will be asked to give Don direction on number of hours and confirm pay rate."
    },
    {
      segments_id: 1390,
      start: 7563.36,
      end: 7566.16,
      text: "This is for the administrative assistant position."
    },
    {
      segments_id: 1391,
      start: 7570.08,
      end: 7572.56,
      text: "Which we have."
    },
    {
      segments_id: 1392,
      start: 7576.08,
      end: 7586.8,
      text: "So in a nutshell, the job description is to assist to assist me with a whole various duties that I have."
    },
    {
      segments_id: 1393,
      start: 7587.44,
      end: 7597.12,
      text: "And I didn't feel like I could put it out there without knowing how many hours or how much."
    },
    {
      segments_id: 1394,
      start: 7597.36,
      end: 7605.28,
      text: "Well, I know at the budget meeting that 25,000 was set aside for an assistant."
    },
    {
      segments_id: 1395,
      start: 7606.56,
      end: 7618.96,
      text: "But I wanted to get kind of a feel for how many hours you would like me to be posting when it goes out to bid and to confirm the price."
    },
    {
      segments_id: 1396,
      start: 7621.04,
      end: 7626.32,
      text: "Use what's budgeted at $25 an hour."
    },
    {
      segments_id: 1397,
      start: 7628.48,
      end: 7630.0,
      text: "That's my direction."
    },
    {
      segments_id: 1398,
      start: 7631.6,
      end: 7642.56,
      text: "So my question is, where did we come up with $25 an hour and a budget of $25,000 as a budget that wasn't?"
    },
    {
      segments_id: 1399,
      start: 7643.52,
      end: 7653.36,
      text: "And so I guess, are we, is this, I guess the job description is clear and I think that we're honing in on that."
    },
    {
      segments_id: 1400,
      start: 7654.24,
      end: 7657.04,
      text: "It's the amount of hours that I'm still confused."
    },
    {
      segments_id: 1401,
      start: 7657.52,
      end: 7658.96,
      text: "How many hours a week?"
    },
    {
      segments_id: 1402,
      start: 7659.04,
      end: 7668.96,
      text: "And, you know, how are we coming up with, so if we're going to post it, how are we coming up with how many hours we need them a month, a week?"
    },
    {
      segments_id: 1403,
      start: 7669.12,
      end: 7670.0,
      text: "Is it salaried?"
    },
    {
      segments_id: 1404,
      start: 7670.16,
      end: 7675.92,
      text: "I mean, obviously $25 an hour is not salary, but so where are we coming up with the number of hours?"
    },
    {
      segments_id: 1405,
      start: 7676.24,
      end: 7677.28,
      text: "Is it going to be a month?"
    },
    {
      segments_id: 1406,
      start: 7677.76,
      end: 7679.28,
      text: "How should that be posted?"
    },
    {
      segments_id: 1407,
      start: 7684.4,
      end: 7686.72,
      text: "We were aiming for halftime, I think."
    },
    {
      segments_id: 1408,
      start: 7688.8,
      end: 7690.48,
      text: "Don works halftime, correct?"
    },
    {
      segments_id: 1409,
      start: 7692.56,
      end: 7699.76,
      text: "So do we have tasks that would justify 20 hours a week right now in Don?"
    },
    {
      segments_id: 1410,
      start: 7701.68,
      end: 7715.6,
      text: "Well, I thought that part of the objective was to have an assistant, but also to have somebody who is like cross-strained in everything that I do."
    },
    {
      segments_id: 1411,
      start: 7716.88,
      end: 7722.0,
      text: "So anyway, that was my understanding."
    },
    {
      segments_id: 1412,
      start: 7723.28,
      end: 7736.88,
      text: "Here's another flip side that was like, we're going to, if we're proposing 20 hours a week and John is still working full time, what are we going to, how are you going to put that in?"
    },
    {
      segments_id: 1413,
      start: 7740.88,
      end: 7745.12,
      text: "Well, a lot of the stuff that they could be doing is remote."
    },
    {
      segments_id: 1414,
      start: 7745.68,
      end: 7745.92,
      text: "Okay."
    },
    {
      segments_id: 1415,
      start: 7748.4,
      end: 7752.56,
      text: "With your remote, then you would give direction of what you want."
    },
    {
      segments_id: 1416,
      start: 7753.12,
      end: 7753.44,
      text: "Okay."
    },
    {
      segments_id: 1417,
      start: 7753.68,
      end: 7754.24,
      text: "All right."
    },
    {
      segments_id: 1418,
      start: 7755.28,
      end: 7767.28,
      text: "So from my experience as an employer, you don't want to start out telling somebody that we need you 20 hours and then later on we only need them five hours and we do some hours."
    },
    {
      segments_id: 1419,
      start: 7768.16,
      end: 7777.52,
      text: "I always start them off at the minimal and then they work out then you give them more hours, you know, and so I don't want to over commit on something."
    },
    {
      segments_id: 1420,
      start: 7777.84,
      end: 7784.88,
      text: "I'm totally for the idea, but you know, I don't want to approach this incorrectly."
    },
    {
      segments_id: 1421,
      start: 7784.96,
      end: 7791.68,
      text: "I want it to be a win-win for everybody and not, you know, I want it to be as effective and then train somebody."
    },
    {
      segments_id: 1422,
      start: 7792.0,
      end: 7799.76,
      text: "And if they are as good as we hope they are, then we give them more hours and maybe even, you know, raise if they're."
    },
    {
      segments_id: 1423,
      start: 7800.56,
      end: 7808.24,
      text: "You know, they are going out and saving us money and getting RFPs out and really kicking butt."
    },
    {
      segments_id: 1424,
      start: 7808.48,
      end: 7818.88,
      text: "Now we can justify, are we just going to, so this is, I just, I just don't want to over when we post it, we don't want to over state the hours."
    },
    {
      segments_id: 1425,
      start: 7819.04,
      end: 7824.8,
      text: "I'd rather start low, work slowly, my opinion."
    },
    {
      segments_id: 1426,
      start: 7827.6,
      end: 7832.16,
      text: "Well, I think we need to dive in and see how it works."
    },
    {
      segments_id: 1427,
      start: 7832.32,
      end: 7840.48,
      text: "And if this person isn't the right person, then we just let them go, right, and hire somebody new."
    },
    {
      segments_id: 1428,
      start: 7844.32,
      end: 7849.6,
      text: "But the board has agreed to do this for the last two years."
    },
    {
      segments_id: 1429,
      start: 7850.88,
      end: 7854.48,
      text: "And Don has got a lot on his plate."
    },
    {
      segments_id: 1430,
      start: 7855.44,
      end: 7870.16,
      text: "And it's really looking like he needs to do some things that, you know, some more things like evaluating the CPI, you know, doing all these RFPs."
    },
    {
      segments_id: 1431,
      start: 7870.48,
      end: 7874.08,
      text: "He needs to be concentrating on things that he's not been doing before."
    },
    {
      segments_id: 1432,
      start: 7874.4,
      end: 7877.68,
      text: "And so he needs relief from what's going on."
    },
    {
      segments_id: 1433,
      start: 7878.32,
      end: 7887.36,
      text: "And then I am one of the board members that voted on that and support it, but I never, I didn't agree with the 25,000."
    },
    {
      segments_id: 1434,
      start: 7888.0,
      end: 7893.52,
      text: "And my vision, you know, work five hours a week."
    },
    {
      segments_id: 1435,
      start: 7896.08,
      end: 7908.8,
      text: "And like I said, if we do have 25,000, if we decide to, oh, we need to meet that person 10 hours a week and then 15, if we know right now, and you can justify to me that we need them for 20 hours a week."
    },
    {
      segments_id: 1436,
      start: 7908.88,
      end: 7918.88,
      text: "And what we're going to, you know, it's not going to be, I know when I have employees and I don't have things for them to do, it just really is a pressure on me to keep them going."
    },
    {
      segments_id: 1437,
      start: 7919.12,
      end: 7922.8,
      text: "And now I'm like, I'm throwing money out the window."
    },
    {
      segments_id: 1438,
      start: 7923.68,
      end: 7927.04,
      text: "So I don't want to, so that's from my perspective."
    },
    {
      segments_id: 1439,
      start: 7927.28,
      end: 7936.0,
      text: "So I will approve and I always have a few hours a week because that's all I have pictured that we need, you know, maybe five hours for starters."
    },
    {
      segments_id: 1440,
      start: 7936.24,
      end: 7937.76,
      text: "That's from that's from my perspective."
    },
    {
      segments_id: 1441,
      start: 7937.92,
      end: 7938.8,
      text: "Anybody else?"
    },
    {
      segments_id: 1442,
      start: 7939.36,
      end: 7940.24,
      text: "Five hours a week."
    },
    {
      segments_id: 1443,
      start: 7940.56,
      end: 7940.72,
      text: "Wow."
    },
    {
      segments_id: 1444,
      start: 7941.68,
      end: 7942.0,
      text: "Yeah."
    },
    {
      segments_id: 1445,
      start: 7942.56,
      end: 7944.56,
      text: "Plus 20 hours a month."
    },
    {
      segments_id: 1446,
      start: 7945.2,
      end: 7945.92,
      text: "That'll cover."
    },
    {
      segments_id: 1447,
      start: 7946.16,
      end: 7953.84,
      text: "I mean, Don Don has already stated that he needed someone for, you know, for this meeting, which is once a month."
    },
    {
      segments_id: 1448,
      start: 7955.12,
      end: 7960.08,
      text: "I'd like to see, like you would like to see more RFPs when we start."
    },
    {
      segments_id: 1449,
      start: 7960.24,
      end: 7962.4,
      text: "I mean, I'm in totally agreement with that."
    },
    {
      segments_id: 1450,
      start: 7963.36,
      end: 7965.84,
      text: "Was that going to take more than 20 hours a month?"
    },
    {
      segments_id: 1451,
      start: 7967.44,
      end: 7968.0,
      text: "I don't know."
    },
    {
      segments_id: 1452,
      start: 7972.88,
      end: 7974.0,
      text: "That's for my, okay."
    },
    {
      segments_id: 1453,
      start: 7975.52,
      end: 7976.32,
      text: "I've said enough."
    },
    {
      segments_id: 1454,
      start: 7977.04,
      end: 7977.2,
      text: "Okay."
    },
    {
      segments_id: 1455,
      start: 7977.92,
      end: 7978.08,
      text: "Okay."
    },
    {
      segments_id: 1456,
      start: 7978.16,
      end: 7979.92,
      text: "Open to Joanne."
    },
    {
      segments_id: 1457,
      start: 7985.44,
      end: 7987.28,
      text: "I agree with Can."
    },
    {
      segments_id: 1458,
      start: 7987.68,
      end: 8002.56,
      text: "I think we should, it would be a good idea to start with the minimum and the maximum, anywhere from this many hours to this many, and start them out slow and see if they're going to work."
    },
    {
      segments_id: 1459,
      start: 8003.52,
      end: 8008.72,
      text: "And maybe the first place is to have them here doing the minutes and typing them up."
    },
    {
      segments_id: 1460,
      start: 8009.04,
      end: 8012.88,
      text: "That would be to see if they're qualified to do that."
    },
    {
      segments_id: 1461,
      start: 8013.76,
      end: 8026.16,
      text: "You know, because I know I couldn't take minutes, you know, which is why I didn't take the secretary job when it was offered to me 22 years ago."
    },
    {
      segments_id: 1462,
      start: 8027.76,
      end: 8030.56,
      text: "Anyhow, that's my suggestion."
    },
    {
      segments_id: 1463,
      start: 8030.88,
      end: 8037.12,
      text: "Start them out slow and work up to the maximum of 20 hours a week."
    },
    {
      segments_id: 1464,
      start: 8038.32,
      end: 8044.56,
      text: "If they are needed, it should be on a to me basis."
    },
    {
      segments_id: 1465,
      start: 8045.68,
      end: 8047.04,
      text: "Diane's got her digital here."
    },
    {
      segments_id: 1466,
      start: 8047.6,
      end: 8047.92,
      text: "Okay."
    },
    {
      segments_id: 1467,
      start: 8049.76,
      end: 8050.56,
      text: "Diane."
    },
    {
      segments_id: 1468,
      start: 8053.12,
      end: 8056.32,
      text: "I'm just saying, I'm kind of going to state the real obvious here."
    },
    {
      segments_id: 1469,
      start: 8056.48,
      end: 8060.56,
      text: "These meetings last on average three hours, four hours."
    },
    {
      segments_id: 1470,
      start: 8060.88,
      end: 8064.32,
      text: "So that's at least that many for one meeting a month."
    },
    {
      segments_id: 1471,
      start: 8065.12,
      end: 8070.24,
      text: "If this person is going to take the minutes, which is what I read in the description."
    },
    {
      segments_id: 1472,
      start: 8070.56,
      end: 8072.56,
      text: "So that you're burning that alone."
    },
    {
      segments_id: 1473,
      start: 8072.8,
      end: 8074.96,
      text: "So if there's two meetings, there's eight hours."
    },
    {
      segments_id: 1474,
      start: 8075.12,
      end: 8075.92,
      text: "That's what I'm saying."
    },
    {
      segments_id: 1475,
      start: 8076.4,
      end: 8078.24,
      text: "So just the meetings alone."
    },
    {
      segments_id: 1476,
      start: 8078.48,
      end: 8082.4,
      text: "And then transcribing and doing that."
    },
    {
      segments_id: 1477,
      start: 8082.64,
      end: 8091.04,
      text: "But I don't know how long that takes you as a rule, Don, because you would have to double the time almost for somebody who's not used to doing that."
    },
    {
      segments_id: 1478,
      start: 8091.36,
      end: 8094.16,
      text: "Unless they've done it in other settings."
    },
    {
      segments_id: 1479,
      start: 8094.8,
      end: 8098.4,
      text: "So it's pretty easy to burn the 20 hours."
    },
    {
      segments_id: 1480,
      start: 8098.56,
      end: 8099.76,
      text: "I'm just kind of."
    },
    {
      segments_id: 1481,
      start: 8100.16,
      end: 8105.76,
      text: "Pointing that out in just the basic, never mind the more explicit things that you had listed."
    },
    {
      segments_id: 1482,
      start: 8106.08,
      end: 8107.76,
      text: "So I'll yield with that."
    },
    {
      segments_id: 1483,
      start: 8111.92,
      end: 8113.36,
      text: "I certainly agree with that."
    },
    {
      segments_id: 1484,
      start: 8113.68,
      end: 8122.32,
      text: "I'd like to ask Don, how many hours can you put somebody to work, Don, so you feel comfortable doing your job?"
    },
    {
      segments_id: 1485,
      start: 8123.84,
      end: 8129.68,
      text: "I'd be comfortable in starting out with, say, 10 hours a week."
    },
    {
      segments_id: 1486,
      start: 8133.12,
      end: 8150.72,
      text: "And I like the idea of having them come to the meeting and I know what needs to be in the minutes and I would be training them and they would understand how, you know, what goes into minutes and what does not."
    },
    {
      segments_id: 1487,
      start: 8151.28,
      end: 8164.8,
      text: "And so anyway, I'd be comfortable with starting out at 10 hours a week, knowing that they're attending the board meetings, but also doing the minutes."
    },
    {
      segments_id: 1488,
      start: 8165.76,
      end: 8167.2,
      text: "And then I've got plenty."
    },
    {
      segments_id: 1489,
      start: 8167.6,
      end: 8171.76,
      text: "Not just attending, doing the minutes, but they're going to be assisting you in other things, right?"
    },
    {
      segments_id: 1490,
      start: 8171.92,
      end: 8173.36,
      text: "And you're going to be training them, right?"
    },
    {
      segments_id: 1491,
      start: 8173.68,
      end: 8174.24,
      text: "Yes."
    },
    {
      segments_id: 1492,
      start: 8174.56,
      end: 8176.88,
      text: "So how many more hours for that?"
    },
    {
      segments_id: 1493,
      start: 8177.52,
      end: 8184.48,
      text: "Well, what I was more being reflective that we could start with, can you do the minutes?"
    },
    {
      segments_id: 1494,
      start: 8185.04,
      end: 8198.24,
      text: "And then if they can, and then we can see how long that job takes and then go from there to increase it for the other tasks that I need to have done."
    },
    {
      segments_id: 1495,
      start: 8201.6,
      end: 8217.68,
      text: "Okay, well, so then I'll make a motion that we follow through on what we decided, which was advertising this at $25 an hour."
    },
    {
      segments_id: 1496,
      start: 8220.24,
      end: 8222.56,
      text: "And we start at $10 an hour."
    },
    {
      segments_id: 1497,
      start: 8223.92,
      end: 8224.72,
      text: "10 hours a week?"
    },
    {
      segments_id: 1498,
      start: 8225.04,
      end: 8226.96,
      text: "I'm sorry, 10 hours a week."
    },
    {
      segments_id: 1499,
      start: 8229.6,
      end: 8236.4,
      text: "And then it can go up to 20 as needed."
    },
    {
      segments_id: 1500,
      start: 8238.32,
      end: 8244.8,
      text: "I don't want to interrupt, but perhaps just for the meetings, you could make that just a price, right?"
    },
    {
      segments_id: 1501,
      start: 8245.12,
      end: 8251.28,
      text: "So a meeting, regardless of how many hours, maybe they get $100, just like the board members do for attending."
    },
    {
      segments_id: 1502,
      start: 8251.44,
      end: 8252.4,
      text: "It's just a thought."
    },
    {
      segments_id: 1503,
      start: 8252.64,
      end: 8254.88,
      text: "So I just dealt with that real quick."
    },
    {
      segments_id: 1504,
      start: 8258.48,
      end: 8258.72,
      text: "Yeah."
    },
    {
      segments_id: 1505,
      start: 8259.52,
      end: 8260.64,
      text: "I don't agree with that."
    },
    {
      segments_id: 1506,
      start: 8262.32,
      end: 8262.64,
      text: "Okay."
    },
    {
      segments_id: 1507,
      start: 8263.84,
      end: 8264.88,
      text: "Thank you for that comment."
    },
    {
      segments_id: 1508,
      start: 8265.84,
      end: 8268.32,
      text: "And so where do we come up with $25 an hour?"
    },
    {
      segments_id: 1509,
      start: 8268.56,
      end: 8270.64,
      text: "That's the last part of this before I'd like."
    },
    {
      segments_id: 1510,
      start: 8272.08,
      end: 8277.52,
      text: "That was in our discussions the last times we discussed this."
    },
    {
      segments_id: 1511,
      start: 8278.08,
      end: 8284.88,
      text: "And I think it was Heidi that said it because we advertised it a lot lower before and didn't get any candidates."
    },
    {
      segments_id: 1512,
      start: 8284.96,
      end: 8287.76,
      text: "And Don was saying, well, we didn't get any candidates."
    },
    {
      segments_id: 1513,
      start: 8287.84,
      end: 8290.88,
      text: "So I can't get somebody to do this job."
    },
    {
      segments_id: 1514,
      start: 8292.08,
      end: 8292.96,
      text: "Okay, that's correct."
    },
    {
      segments_id: 1515,
      start: 8295.2,
      end: 8296.64,
      text: "You can say exactly what Richard."
    },
    {
      segments_id: 1516,
      start: 8297.12,
      end: 8297.44,
      text: "Yeah."
    },
    {
      segments_id: 1517,
      start: 8297.76,
      end: 8302.72,
      text: "So yeah, my opinion is that it should be even higher."
    },
    {
      segments_id: 1518,
      start: 8302.8,
      end: 8304.96,
      text: "I was thinking 30, but that's me."
    },
    {
      segments_id: 1519,
      start: 8309.76,
      end: 8311.68,
      text: "You don't work for the government."
    },
    {
      segments_id: 1520,
      start: 8316.64,
      end: 8323.04,
      text: "So I just, just for the same reasons that you stated, it's hard to get someone good."
    },
    {
      segments_id: 1521,
      start: 8323.2,
      end: 8336.96,
      text: "And I always say when someone's hired with my company, when they, you know, if they're worth, you know, 50 bucks an hour, man, I'm really happy, but they never are."
    },
    {
      segments_id: 1522,
      start: 8338.56,
      end: 8354.24,
      text: "So, but if someone is worth more, that means, you know, they can put a better output and be more, you know, higher quality, higher qualified applicants will tend to want to apply."
    },
    {
      segments_id: 1523,
      start: 8361.92,
      end: 8363.36,
      text: "I can't hear what's being said."
    },
    {
      segments_id: 1524,
      start: 8364.32,
      end: 8366.56,
      text: "She thinks that they start low, they work their way up."
    },
    {
      segments_id: 1525,
      start: 8366.8,
      end: 8367.52,
      text: "That's what she was saying."
    },
    {
      segments_id: 1526,
      start: 8368.72,
      end: 8379.52,
      text: "I agree with Ken, because if you're starting out at 10 hours a week and you're only getting 25 bucks, that's $250."
    },
    {
      segments_id: 1527,
      start: 8380.72,
      end: 8381.92,
      text: "That's not much."
    },
    {
      segments_id: 1528,
      start: 8382.56,
      end: 8382.96,
      text: "You're right."
    },
    {
      segments_id: 1529,
      start: 8383.12,
      end: 8390.08,
      text: "You're not going to get, because you've got low number of hours, you're going to get not a very good applicant pool."
    },
    {
      segments_id: 1530,
      start: 8391.2,
      end: 8391.52,
      text: "Yep."
    },
    {
      segments_id: 1531,
      start: 8392.16,
      end: 8392.8,
      text: "You're right."
    },
    {
      segments_id: 1532,
      start: 8393.36,
      end: 8394.88,
      text: "I'm just trying to get started."
    },
    {
      segments_id: 1533,
      start: 8396.56,
      end: 8399.52,
      text: "How many people live on $300 a week?"
    },
    {
      segments_id: 1534,
      start: 8400.96,
      end: 8402.4,
      text: "Also, are we tired?"
    },
    {
      segments_id: 1535,
      start: 8402.72,
      end: 8403.68,
      text: "Yeah, so exactly."
    },
    {
      segments_id: 1536,
      start: 8404.16,
      end: 8404.56,
      text: "Exactly."
    },
    {
      segments_id: 1537,
      start: 8404.64,
      end: 8405.2,
      text: "You're right."
    },
    {
      segments_id: 1538,
      start: 8405.52,
      end: 8407.28,
      text: "So, thank you, Reed."
    },
    {
      segments_id: 1539,
      start: 8407.52,
      end: 8408.0,
      text: "That was Reed."
    },
    {
      segments_id: 1540,
      start: 8408.88,
      end: 8414.8,
      text: "So, Rich, why don't you go ahead and read a motion and now we can vote."
    },
    {
      segments_id: 1541,
      start: 8414.88,
      end: 8418.56,
      text: "I just wanted to bring the money part in and now let's just go ahead and make a motion."
    },
    {
      segments_id: 1542,
      start: 8418.64,
      end: 8419.92,
      text: "Let's vote on it."
    },
    {
      segments_id: 1543,
      start: 8421.2,
      end: 8421.52,
      text: "Okay."
    },
    {
      segments_id: 1544,
      start: 8422.96,
      end: 8441.76,
      text: "I'm proposing that we, I don't know that we even need to authorize Don, but authorizing Don to start $25 an hour, 10 hours a week, up to 20 hours a week, depending on how much that person can help."
    },
    {
      segments_id: 1545,
      start: 8446.8,
      end: 8448.72,
      text: "Also, John's discretion."
    },
    {
      segments_id: 1546,
      start: 8451.6,
      end: 8463.92,
      text: "Also like a motion again."
    },
    {
      segments_id: 1547,
      start: 8466.64,
      end: 8467.28,
      text: "Richard?"
    },
    {
      segments_id: 1548,
      start: 8470.72,
      end: 8471.12,
      text: "Dan?"
    },
    {
      segments_id: 1549,
      start: 8471.36,
      end: 8471.68,
      text: "Hi."
    },
    {
      segments_id: 1550,
      start: 8472.48,
      end: 8473.28,
      text: "Rolando?"
    },
    {
      segments_id: 1551,
      start: 8475.36,
      end: 8476.72,
      text: "I knew that was coming."
    },
    {
      segments_id: 1552,
      start: 8478.56,
      end: 8478.88,
      text: "Yeah."
    },
    {
      segments_id: 1553,
      start: 8481.12,
      end: 8482.64,
      text: "That's what we love about Oralando."
    },
    {
      segments_id: 1554,
      start: 8482.88,
      end: 8484.16,
      text: "He's consistent."
    },
    {
      segments_id: 1555,
      start: 8486.4,
      end: 8490.32,
      text: "Yeah, we just wish he would tell us why sometimes."
    },
    {
      segments_id: 1556,
      start: 8492.48,
      end: 8493.44,
      text: "Tell me how to do that."
    },
    {
      segments_id: 1557,
      start: 8493.52,
      end: 8494.72,
      text: "I've told you why."
    },
    {
      segments_id: 1558,
      start: 8499.04,
      end: 8500.56,
      text: "You want to know why I voted Nick?"
    },
    {
      segments_id: 1559,
      start: 8501.76,
      end: 8502.08,
      text: "Yeah."
    },
    {
      segments_id: 1560,
      start: 8503.36,
      end: 8504.0,
      text: "I can't hear you."
    },
    {
      segments_id: 1561,
      start: 8504.16,
      end: 8505.2,
      text: "I can't hear what you're saying."
    },
    {
      segments_id: 1562,
      start: 8505.44,
      end: 8505.68,
      text: "Sure."
    },
    {
      segments_id: 1563,
      start: 8506.16,
      end: 8508.32,
      text: "I'm happy to tell you why I voted against it."
    },
    {
      segments_id: 1564,
      start: 8508.8,
      end: 8514.64,
      text: "And it's for the same reason that I voted against it the first time and the second time."
    },
    {
      segments_id: 1565,
      start: 8514.96,
      end: 8521.76,
      text: "I don't think we should be incurring $25,000 worth of expenses on the budget revenue that we have now."
    },
    {
      segments_id: 1566,
      start: 8522.32,
      end: 8524.0,
      text: "I don't think that makes sense."
    },
    {
      segments_id: 1567,
      start: 8524.56,
      end: 8530.48,
      text: "I do think that Don needs help for all the reasons that everybody's called out."
    },
    {
      segments_id: 1568,
      start: 8530.56,
      end: 8532.8,
      text: "And I think that there's a lot of opportunity to do that."
    },
    {
      segments_id: 1569,
      start: 8533.12,
      end: 8543.12,
      text: "I had proposed, and I'll stick to it, that it should be, tell me what you need done, Don, and then I'll approve that much money to get that done rather than being so arbitrary."
    },
    {
      segments_id: 1570,
      start: 8543.44,
      end: 8545.44,
      text: "But that's it."
    },
    {
      segments_id: 1571,
      start: 8545.68,
      end: 8546.16,
      text: "I mean."
    },
    {
      segments_id: 1572,
      start: 8547.44,
      end: 8547.92,
      text: "Thank you."
    },
    {
      segments_id: 1573,
      start: 8548.24,
      end: 8548.48,
      text: "Yeah."
    },
    {
      segments_id: 1574,
      start: 8550.24,
      end: 8551.6,
      text: "I did understand that before."
    },
    {
      segments_id: 1575,
      start: 8551.68,
      end: 8552.72,
      text: "I thought you had something new."
    },
    {
      segments_id: 1576,
      start: 8554.24,
      end: 8555.2,
      text: "Oh, consistent."
    },
    {
      segments_id: 1577,
      start: 8557.44,
      end: 8557.84,
      text: "All right."
    },
    {
      segments_id: 1578,
      start: 8558.08,
      end: 8558.56,
      text: "That helps."
    },
    {
      segments_id: 1579,
      start: 8559.04,
      end: 8560.24,
      text: "Thank you, Rolando."
    },
    {
      segments_id: 1580,
      start: 8561.44,
      end: 8563.28,
      text: "I think there's one thing that..."
    },
    {
      segments_id: 1581,
      start: 8563.76,
      end: 8568.24,
      text: "So I can interview and then hire who I think would."
    },
    {
      segments_id: 1582,
      start: 8569.36,
      end: 8570.0,
      text: "Is that correct?"
    },
    {
      segments_id: 1583,
      start: 8570.4,
      end: 8590.4,
      text: "Yeah, we need to, but that was what we decided now what should be posted in the stack fee or wherever that we're going to post this, that it's for 10 hours, up to 20 hours, but starting at 10 at $25 an hour with this job description."
    },
    {
      segments_id: 1584,
      start: 8590.72,
      end: 8592.4,
      text: "And that's, I think, we finally got that."
    },
    {
      segments_id: 1585,
      start: 8592.88,
      end: 8598.72,
      text: "And I can just hire them when I'm at your discretion."
    },
    {
      segments_id: 1586,
      start: 8598.96,
      end: 8599.76,
      text: "Yeah, I perfectly."
    },
    {
      segments_id: 1587,
      start: 8602.72,
      end: 8604.4,
      text: "Ton, you go for it."
    },
    {
      segments_id: 1588,
      start: 8605.68,
      end: 8606.48,
      text: "Go for it, Tom."
    },
    {
      segments_id: 1589,
      start: 8607.2,
      end: 8610.0,
      text: "I'm going to put an advertisement with the bill."
    },
    {
      segments_id: 1590,
      start: 8612.08,
      end: 8614.4,
      text: "That's that's acceptable to you guys."
    },
    {
      segments_id: 1591,
      start: 8614.96,
      end: 8615.44,
      text: "With a bill?"
    },
    {
      segments_id: 1592,
      start: 8616.96,
      end: 8618.96,
      text: "With the water bills that are going to be coming up."
    },
    {
      segments_id: 1593,
      start: 8621.04,
      end: 8626.56,
      text: "It's another place to advertise, so you need to, you know, have a few places to advertise, right?"
    },
    {
      segments_id: 1594,
      start: 8629.44,
      end: 8640.4,
      text: "Well, we have a meme that can go back up on the front page of the website and maybe at least advertise the per hour rate too."
    },
    {
      segments_id: 1595,
      start: 8640.72,
      end: 8643.44,
      text: "So it'll be there."
    },
    {
      segments_id: 1596,
      start: 8643.6,
      end: 8648.24,
      text: "And I don't know where else maybe you need to get approval done for where else you're going to advertise."
    },
    {
      segments_id: 1597,
      start: 8648.56,
      end: 8650.8,
      text: "Like Auburn Journal, whatever."
    },
    {
      segments_id: 1598,
      start: 8653.76,
      end: 8655.92,
      text: "No, you don't need approval to where you're going to advertise."
    },
    {
      segments_id: 1599,
      start: 8656.0,
      end: 8659.04,
      text: "Just advertise widely and get a good candidate."
    },
    {
      segments_id: 1600,
      start: 8659.12,
      end: 8660.08,
      text: "That's all."
    },
    {
      segments_id: 1601,
      start: 8662.32,
      end: 8662.96,
      text: "You go."
    },
    {
      segments_id: 1602,
      start: 8663.76,
      end: 8667.12,
      text: "You don't have to give him a budget for his advertising costs."
    },
    {
      segments_id: 1603,
      start: 8669.92,
      end: 8674.72,
      text: "Let's not take this into midnight."
    },
    {
      segments_id: 1604,
      start: 8675.28,
      end: 8678.48,
      text: "Okay, so agenda items for next month."
    },
    {
      segments_id: 1605,
      start: 8680.08,
      end: 8681.84,
      text: "We need to say anything on that."
    },
    {
      segments_id: 1606,
      start: 8683.04,
      end: 8688.72,
      text: "Or can we move to the any comments, any more comments from the audience and adjournment?"
    },
    {
      segments_id: 1607,
      start: 8689.84,
      end: 8690.96,
      text: "So I have one comment."
    },
    {
      segments_id: 1608,
      start: 8691.2,
      end: 8691.92,
      text: "I have one comment."
    },
    {
      segments_id: 1609,
      start: 8693.44,
      end: 8699.84,
      text: "I'd like the board to authorize Don to buy what's called a turtle phone, and it's a meeting."
    },
    {
      segments_id: 1610,
      start: 8700.24,
      end: 8707.6,
      text: "Phone that sits in the middle of the desk so that it takes everybody's voice equally around the desk."
    },
    {
      segments_id: 1611,
      start: 8708.16,
      end: 8710.8,
      text: "They're not that expensive, they're very common."
    },
    {
      segments_id: 1612,
      start: 8712.08,
      end: 8716.8,
      text: "And we should have them at our meetings so we can all hear each other."
    },
    {
      segments_id: 1613,
      start: 8717.52,
      end: 8724.32,
      text: "Even if I'm there and somebody else is calling in, it's very difficult, as Diana and I have said today."
    },
    {
      segments_id: 1614,
      start: 8724.88,
      end: 8724.96,
      text: "Right."
    },
    {
      segments_id: 1615,
      start: 8725.36,
      end: 8737.6,
      text: "I mean, he does have a microphone on the desk, Dick, because I've been in there, but it's obviously not adequate enough to, and it doesn't have enough voice canceling, so maybe it needs to be upgraded or something."
    },
    {
      segments_id: 1616,
      start: 8750.16,
      end: 8754.4,
      text: "I think that's within your discussion, your discussion to do that."
    },
    {
      segments_id: 1617,
      start: 8754.64,
      end: 8756.16,
      text: "I think that's a main final."
    },
    {
      segments_id: 1618,
      start: 8761.52,
      end: 8762.96,
      text: "Thank you, Richard."
    },
    {
      segments_id: 1619,
      start: 8763.92,
      end: 8764.32,
      text: "Thank you."
    },
    {
      segments_id: 1620,
      start: 8764.96,
      end: 8766.4,
      text: "You get so awesome today."
    },
    {
      segments_id: 1621,
      start: 8766.72,
      end: 8771.68,
      text: "Is there any other comments from the audience on items not on the agenda?"
    },
    {
      segments_id: 1622,
      start: 8771.92,
      end: 8773.04,
      text: "Yeah, any other comments?"
    },
    {
      segments_id: 1623,
      start: 8774.0,
      end: 8777.44,
      text: "I just want to make sure that we schedule the meetings to follow up on RFP stuff."
    },
    {
      segments_id: 1624,
      start: 8777.84,
      end: 8779.52,
      text: "Yeah, so when is the date?"
    },
    {
      segments_id: 1625,
      start: 8780.32,
      end: 8789.44,
      text: "I don't know when Heidi's coming back into town, but let's just say she'll be back into town in a weekend from it."
    },
    {
      segments_id: 1626,
      start: 8791.6,
      end: 8794.08,
      text: "Well, I'll be out of town."
    },
    {
      segments_id: 1627,
      start: 8794.96,
      end: 8796.4,
      text: "But do a doodle poll."
    },
    {
      segments_id: 1628,
      start: 8797.68,
      end: 8800.72,
      text: "Do a doodle poll of the board so you can figure out the best time."
    },
    {
      segments_id: 1629,
      start: 8801.04,
      end: 8804.0,
      text: "I'll do my best to attend on Zoom."
    },
    {
      segments_id: 1630,
      start: 8815.04,
      end: 8821.76,
      text: "So can I throw in, you guys tabled the survey, but you also had a newsletter there too, Don."
    },
    {
      segments_id: 1631,
      start: 8822.0,
      end: 8825.2,
      text: "So to go over content of the newsletter as well."
    },
    {
      segments_id: 1632,
      start: 8828.4,
      end: 8832.56,
      text: "You mean for the next meeting or for the to go out with the bills?"
    },
    {
      segments_id: 1633,
      start: 8833.2,
      end: 8835.44,
      text: "To put on the next agenda with it."
    },
    {
      segments_id: 1634,
      start: 8848.88,
      end: 8854.56,
      text: "Does everybody want to have the survey?"
    },
    {
      segments_id: 1635,
      start: 8854.88,
      end: 8856.08,
      text: "No, no, you already voted."
    },
    {
      segments_id: 1636,
      start: 8856.24,
      end: 8859.84,
      text: "The survey will be what about the newsletter?"
    },
    {
      segments_id: 1637,
      start: 8861.6,
      end: 8863.12,
      text: "We can talk about that at the next meeting."
    },
    {
      segments_id: 1638,
      start: 8863.36,
      end: 8864.72,
      text: "Yeah, yeah, let's assume that."
    },
    {
      segments_id: 1639,
      start: 8865.44,
      end: 8866.88,
      text: "I think we learned this online."
    },
    {
      segments_id: 1640,
      start: 8867.44,
      end: 8869.44,
      text: "Yeah, we're tired."
    },
    {
      segments_id: 1641,
      start: 8870.72,
      end: 8872.16,
      text: "I'm shutting down."
    },
    {
      segments_id: 1642,
      start: 8873.12,
      end: 8873.44,
      text: "Okay."
    },
    {
      segments_id: 1643,
      start: 8873.92,
      end: 8875.12,
      text: "Any other comments?"
    },
    {
      segments_id: 1644,
      start: 8875.28,
      end: 8879.2,
      text: "Any okay."
    },
    {
      segments_id: 1645,
      start: 8879.52,
      end: 8882.72,
      text: "I just want to make sure I'm doing everybody's minutes."
    },
    {
      segments_id: 1646,
      start: 8882.88,
      end: 8883.04,
      text: "Okay."
    },
    {
      segments_id: 1647,
      start: 8883.2,
      end: 8884.56,
      text: "So any motion?"
    },
    {
      segments_id: 1648,
      start: 8887.68,
      end: 8887.84,
      text: "Yeah."
    },
    {
      segments_id: 1649,
      start: 8889.2,
      end: 8889.6,
      text: "Thanks, Ken."
    },
    {
      segments_id: 1650,
      start: 8889.92,
      end: 8890.72,
      text: "Good job."
    },
    {
      segments_id: 1651,
      start: 8892.72,
      end: 8893.52,
      text: "You're a rookie."
    },
    {
      segments_id: 1652,
      start: 8895.04,
      end: 8896.48,
      text: "You're not a rookie anymore."
    },
    {
      segments_id: 1653,
      start: 8897.04,
      end: 8897.6,
      text: "I'm no more."
    },
    {
      segments_id: 1654,
      start: 8897.76,
      end: 8898.88,
      text: "I'm not a rookie."
    },
    {
      segments_id: 1655,
      start: 8899.52,
      end: 8901.28,
      text: "I've been initiated."
    },
    {
      segments_id: 1656,
      start: 8902.88,
      end: 8904.8,
      text: "Do we have a motion to adjourn from somebody?"
    },
    {
      segments_id: 1657,
      start: 8905.28,
      end: 8905.44,
      text: "Yeah."
    },
    {
      segments_id: 1658,
      start: 8906.0,
      end: 8906.24,
      text: "Okay."
    },
    {
      segments_id: 1659,
      start: 8907.6,
      end: 8909.36,
      text: "The peanut gallery motions."
    },
    {
      segments_id: 1660,
      start: 8911.28,
      end: 8912.48,
      text: "Dan seconded it."
    },
    {
      segments_id: 1661,
      start: 8912.64,
      end: 8913.6,
      text: "And all in favor?"
    },
    {
      segments_id: 1662,
      start: 8913.76,
      end: 8914.24,
      text: "All in favor."
    },
    {
      segments_id: 1663,
      start: 8914.48,
      end: 8914.8,
      text: "Aye."
    },
    {
      segments_id: 1664,
      start: 8914.88,
      end: 8915.2,
      text: "Go."
    },
    {
      segments_id: 1665,
      start: 8916.88,
      end: 8918.56,
      text: "Thank you, everybody, for attending."
    },
    {
      segments_id: 1666,
      start: 8918.8,
      end: 8920.16,
      text: "Thank you for being nice to me."
    },
    {
      segments_id: 1667,
      start: 8921.6,
      end: 8923.2,
      text: "You did a great job, Ken."
    },
    {
      segments_id: 1668,
      start: 8923.36,
      end: 8924.72,
      text: "Congratulations."
    }
  ]
};
