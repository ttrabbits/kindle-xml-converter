// @deno-types="https://deno.land/x/dayjs@v1.11.4/types/index.d.ts"
import dayjs from 'https://cdn.skypack.dev/dayjs'
import { XMLParser } from 'https://cdn.skypack.dev/fast-xml-parser'
import { separateTitle } from './kindle.ts'
import type { KindleXml, KindleBook } from './kindle.ts'

const keys = [
  'ASIN',
  'original_title',
  'title',
  'label',
  'author',
  'publisher',
  'publication_date',
  'purchase_date',
] as const
export type Book = { [k in typeof keys[number]]: string }

export function extractBookData(xml: string): Book[] {
  const options = {
    ignoreAttributes: false,
    allowBooleanAttributes: true,
  }
  const parser = new XMLParser(options)
  const data = parser.parse(xml) as KindleXml
  const books = data.response.add_update_list.meta_data
  return books.map(convertKindleBook)
}

function convertKindleBook(v: KindleBook): Book {
  const { original, title, label } = separateTitle(v.title)

  const pubDate = dayjs(v.publication_date).format('YYYY-MM-DD')
  const purchaseDate = dayjs(v.purchase_date).format('YYYY-MM-DD')

  const book = {
    ASIN: v.ASIN,
    original_title: original,
    title: title,
    label: label,
    author: v.authors.author['#text'],
    publisher: v.publishers.publisher,
    publication_date: pubDate,
    purchase_date: purchaseDate,
  }
  return book
}

function convertToCsv(book: Book): string {
  return keys.map((v) => book[v]).join(',')
}

export function generateCsvString(books: Book[]): string {
  const header = keys.join(',')
  const contents = books.map(convertToCsv).join('\n')
  return `${header}\n${contents}`
}
