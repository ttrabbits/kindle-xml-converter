export type KindleXml = {
  response: {
    sync_time: string
    cache_metadata: {
      version: number
    }
    add_update_list: {
      meta_data: KindleBook[]
    }
  }
}

export type KindleBook = {
  ASIN: string
  title: KindleText
  authors: {
    author: KindleText
  }
  publishers: {
    publisher: string
  }
  publication_date: string
  purchase_date: string
  textbook_type: string
  cde_contenttype: string
  content_type: string
}

export type KindleText = {
  '#text': string
  '@_pronunciation': string
}

export function separateTitle(title: KindleText) {
  const original = title['#text']

  // separate title and label
  const titleRegexp = new RegExp(/^(.*)\((.*)\)$/)
  const match = original.match(titleRegexp)
  return {
    original,
    title: match ? match[1].trim() : '',
    label: match ? match[2].trim() : '',
  }
}
