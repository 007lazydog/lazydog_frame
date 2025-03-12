
function displayXML(xml, xsl, div_id) {    
    //xml、xsl均为xmldocument对象
    // code for IE
    if (window.ActiveXObject) {
        ex = xml.transformNode(xsl);
        document.getElementById(div_id).innerHTML = "";
        document.getElementById(div_id).innerHTML = ex;
    }
    // code for Chrome, Firefox, Opera, etc.
    else if (document.implementation && document.implementation.createDocument) {
        xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xsl);
        resultDocument = xsltProcessor.transformToFragment(xml, document);
        document.getElementById(div_id).innerHTML = "";
        document.getElementById(div_id).appendChild(resultDocument);
    }
}

var book_XSLT = `
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/table">
        <table border="1" cellpadding="0" cellspacing="0">
            <tr>
                <th>ISBN</th>
                <th>book_name</th>
                <th>
                    price
                    <select id="sortOrder" onchange="sortTable()">
                        <option></option>
                        <option value="asc">升</option>
                        <option value="desc">降</option>
                    </select>
                </th>
            </tr>
            <xsl:for-each select="tr[position()>1]">
                [~sort]
                <tr>
                    <td>
                        <xsl:value-of select="td[1]"/>
                    </td>
                    <td>
                        <xsl:value-of select="td[2]"/>
                    </td>
                    <td>
                        <xsl:value-of select="td[3]"/>
                    </td>
                </tr>
            </xsl:for-each>
        </table>
    </xsl:template>
</xsl:stylesheet>

` 