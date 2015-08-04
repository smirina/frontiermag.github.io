<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:template match="/">
    <html>
      <body>
        <style>
        html, body {
            background: #FFF5EE;
            margin: 0;
            padding: 0;
          }
        ul {
          padding: 4em;
          margin: 0;
          list-style: none;
          text-align: justify;
        }

        li, div {
          display: inline-block;
        }

        code {
          padding: 0.3em;
        }

        .example {
          width: 25rem;
          height: 12rem;
        }

        .name {
          text-align: center;
          font-size: 1rem;
          padding-bottom: 1em;
          padding-top: 2em;
        }

        h1 {
          margin: 2em;
          font-family: sans-serif;
        }

        </style>

        <h1>Цвета</h1>
        <ul style="list-style: none;">
          <xsl:for-each select="//color">
            <li style="display: inline-block;">
              <figure>
                <rb><div class="example" style="background: #{hex};"></div></rb>
                <figcaption class="name">
                      <xsl:copy-of select="name[@lang='ru']" /> (<code>#<xsl:value-of select="hex" /></code>)
                </figcaption>
              </figure>
            </li>
          </xsl:for-each>
        </ul>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>