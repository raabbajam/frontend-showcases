if (!!!templates) var templates = {};
templates["item"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"item\">");t.b("\n" + i);t.b("    <img src=\"");t.b(t.v(t.d("item.url",c,p,0)));t.b("\" alt=\"");t.b(t.v(t.d("item.shortDescription",c,p,0)));t.b("\">");t.b("\n" + i);t.b("    <div class=\"label\">");t.b("\n" + i);t.b("      <h2>");t.b(t.v(t.d("item.title",c,p,0)));t.b("</h2>");t.b("\n" + i);t.b("      <h3>");t.b(t.v(t.d("item.subtitle",c,p,0)));t.b("</h3>");t.b("\n" + i);t.b("      <div class=\"detail toggle-hide\">");t.b("\n" + i);t.b("        <i class=\"toggle-detail\">+</i>");t.b("\n" + i);t.b("        <p class=\"hide\">");t.b(t.v(t.d("item.description",c,p,0)));t.b("</p>");t.b("\n" + i);t.b("        <h4 class=\"hide\">Credits</h4>");t.b("\n" + i);t.b("        <div class=\"hide\">");t.b("\n" + i);t.b("          <ul>");t.b("\n" + i);t.b("            <li>Client: ");t.b(t.v(t.d("item.person",c,p,0)));t.b("</li>");t.b("\n" + i);t.b("            <li>Agency / Production : ");t.b(t.v(t.d("item.company",c,p,0)));t.b(" / ");t.b(t.v(t.d("item.company2",c,p,0)));t.b("</li>");t.b("\n" + i);t.b("            <li>Web Development: ");t.b(t.v(t.d("item.malename",c,p,0)));t.b("</li>");t.b("\n" + i);t.b("          </ul>");t.b("\n" + i);t.b("        </div>");t.b("\n" + i);t.b("        <p class=\"hide link\"><a href=\"");t.b(t.v(t.d("item.url",c,p,0)));t.b("\"><i class=\"link\">Visit Site</i></a></p>");t.b("\n" + i);t.b("        <p class=\"detail-links\"><a href=\"javascript:void(0)\">pin it</a><a href=\"javascript:void(0)\">tweet</a></p>");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("  </div>");return t.fl(); },partials: {}, subs: {  }});