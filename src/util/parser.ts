// all functions should return text or an array of text
export const getSentences = (paragraph: string) => {
  return paragraph.split('.')
}

export const getCardlistFromATags = (aTags: cheerio.TagElement[]) => {
  const cardListElem = aTags.filter((a) => {
    return a.attribs.href.includes("scryfall")
  })

  const cardListNames = cardListElem.map((a) => a.attribs['data-card-name']);
  return cardListNames;
}