# kindle-xml-converter

Kindle アプリが作成した XML ファイルを CSV 形式に変換する Deno スクリプト

1. PC 版の Kindle アプリを起動して KindleSyncMetadataCache.xml を作成
2. 上記 XML ファイルをコピーして下記コマンドを実行

```
$ deno run --allow-read --allow-write main.ts
```
