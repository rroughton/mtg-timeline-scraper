// All functions should return an element or array of elements
import cheerio from 'cheerio';

export const getMonths = ($: cheerio.Root) => {
  return $('h2 #1994').parent().nextUntil('h2', 'h3').toArray();
}

export const getATagsInMonth = ($: cheerio.Root, currentMonth: cheerio.Element) => {
  return $(currentMonth).nextUntil('h3', 'p').children('a').toArray() as cheerio.TagElement[];
}

export const getParagraph = ($: cheerio.Root, currentMonth: cheerio.Element) => {
  return $(currentMonth).nextUntil('h3', "p")
}