import { extractBookData, generateCsvString } from './models/book.ts'

function main() {
  const xml = Deno.readTextFileSync('./KindleSyncMetadataCache.xml')
  const books = extractBookData(xml)
  const csv = generateCsvString(books)
  Deno.writeTextFileSync('output.csv', csv)
}

main()
