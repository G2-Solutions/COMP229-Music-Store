export default () => {
    return `<!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          >
          <title>MelodyMart</title>
          <link href="https://fonts.cdnfonts.com/css/fun-groovy" rel="stylesheet">
          <style>
              a{
                text-decoration: none;
                color: #061d95
              }
          </style>
        </head>
        <body style="margin:0">
          <div id="root"></div>
          <script type="text/javascript" src="/dist/bundle.js"></script>
        </body>
      </html>`
}
