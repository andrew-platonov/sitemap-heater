var https = require('https');
var xml2js = require('xml2js');

const sitemap = "https://feolavka.ru/sitemap.xml";
const host = "feolavka.ru";
const base = "https://feolavka.ru";
const delay = 100;

https.get(sitemap, function(res) {
    res.setEncoding('utf8');
    var data = '';
    res.on('data', function (chunk) {
        data += chunk;
    });
    res.on('end', function () {
        // console.log(data);
        var xml = data.replace("\ufeff", ""); // get rid of BOM
        xml2js.parseString(xml, function (err, json) {
            if( ! err ) {
                let urls = json.urlset.url;
                let total = urls.length;
                for(let i = 0; i < total; i++) {
                    let url = urls[i].loc[0];
                    // console.log(`${i} - ${url}`);
                    setTimeout( () => {
                        let path = url.replace(base, "");
                        console.log(`Heating ${i} of ${total}: ${path}`);
                        path = encodeURI(path);
                        https.get(
                            {
                                host: host,
                                path: path,
                                headers: { 'User-Agent': "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" }
                            },
                            function(res) {
                                let data = '';
                                res.on('data', function(chunk) {
                                    data += chunk;
                                });
                                res.on('end', function () {
                                    console.log(`Heated ${i} of ${total}: ${url}`);
                                });
                            }
                        ).on('error', function(err) {
                            console.log(err);
                        });;                                                
                    }, i * delay * 1000 );
                }
            }
        });
    });
}).on('error', function(err) {
    console.log(err);
});


