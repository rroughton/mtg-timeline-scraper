import axios from 'axios';
import cheerio from 'cheerio';
import { getLineAndCharacterOfPosition } from 'typescript';
import { Event, RestrictionTypes } from "./types/types"
import { getCardlistFromATags, getSentences } from './util/parser';
import { getATagsInMonth, getMonths, getParagraph, getYears } from './util/selector';

// Hoisted Variables
const restrictionTypes: RestrictionTypes[] = [
  "banned", "restricted", "unrestricted", "unbanned"
]

// Setup
const response = await axios.get('https://mtg.fandom.com/wiki/Banned_and_restricted_cards/Timeline');
const $ = cheerio.load(response.data);

// Get Months
const months = getMonths($);
const currentMonth: cheerio.Element = months[0];

// Select array of years
const years = getYears($);

// Get Cardlist 
const aTags = getATagsInMonth($, currentMonth);
const cardListNames = getCardlistFromATags(aTags);

// Get sentences
const paragraph = getParagraph($, currentMonth).text()
const sentences = getSentences(paragraph);

// Event Creation
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

  if (typeof restriction !== 'undefined') {
    event[restriction] = [...event[restriction], ...affectedCards]
  }

  console.log(affectedCards);
  console.log(restriction);

})

console.log(event);