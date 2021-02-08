import axios from 'axios';
import cheerio from 'cheerio';
import { getLineAndCharacterOfPosition } from 'typescript';
import {Event, RestrictionTypes} from "./types/types"


const restrictionTypes: RestrictionTypes[] = [
  "banned", "restricted", "unrestricted", "unbanned"
]

const response = await axios.get('https://mtg.fandom.com/wiki/Banned_and_restricted_cards/Timeline');
const $ = cheerio.load(response.data);
const months = $('h2 #1994').parent().nextUntil('h2', 'h3').toArray();
const currentMonth: cheerio.Element = months[0]

//Select array of years
const years = $('h2 .mw-headline')



debugger

const aTags = $(currentMonth).nextUntil('h3', 'p').children('a').toArray() as cheerio.TagElement[];

const cardListElem = aTags.filter((a) => {
  return a.attribs.href.includes("scryfall")
})

const cardListNames = cardListElem.map((a) => a.attribs['data-card-name']);

const paragraph = $(currentMonth).nextUntil('h3', "p").text()
//const paragraph = 'Formation of the original DCI banned/restricted list. Ali from Cairo , Ancestral Recall , Berserk , Black Lotus , Braingeyser , Dingus Egg , Gauntlet of Might , Icy Manipulator , Mox Emerald , Mox Jet , Mox Pearl , Mox Ruby , Mox Sapphire , Orcish Oriflamme , Rukh Egg , Sol Ring , Timetwister , Time Vault , and Time Walk are restricted ("Limited"). Ante cards and Shahrazad are banned. Use of cards from any of the expansion sets (at that time Arabian Nights) are banned unless the referee consents to their use (this would later be changed to allowed "unless expressly disallowed by the head judge prior to the event").'
const sentences = paragraph.split('.');

let event: Event = {
  date: "got already",
  banned: [],
  restricted: [],
  unbanned: [],
  unrestricted: []
}

const yearString = "1994"
const monthString = "January";
let eventDate = new Date()
eventDate.setFullYear(parseInt(yearString));



sentences.forEach(sentence => {



  const affectedCards = cardListNames.filter((name) => {
    return sentence.includes(name)
  })
  const restriction: RestrictionTypes = restrictionTypes.filter((type) => {
    return sentence.includes(type);
  })[0]

  if (typeof restriction !=='undefined')  {
  event[restriction] = [...event[restriction], ...affectedCards]
  }

  console.log(affectedCards);
  console.log(restriction);

  //event.banned = [...event.banned, ...affectedCards] 
})

console.log(event);

/*
const sentence = sentences[2]
const affectedCards = cardListNames.filter((name) => {
  return sentence.includes(name)
})
const restriction = restrictionTypes.filter((type) => {
  return sentence.includes(type);
})[0];
*/



let timeline = [
  {
    date: "a day",
    banned: ["black lotus", "another op card"],
    removed: []
  },
  {
    date: "a day2",
    banned: ["black lotus2", "another op card2"]
  },
  {
    date: "a day3",
    banned: ["black lotus3", "another op card3"]
  },
]

let bannedList = []