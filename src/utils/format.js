import ci from 'cheerio'


export function formatCiText(str, match,tag) { 
  console.log("处理的数据---------->",Array.from(ci.load(str)(match)));
  return Array.from(ci.load(str)(match)).map(item => {
    return tag ? ci.load(item)(tag).text() : ci.load(item).text()
  })
}
export function formatCiNode(str, match) { 
  console.log("处理的数据---------->",Array.from(ci.load(str)(match)));
  return Array.from(ci.load(str)(match)).map(item => { 
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(ci.load(item)('dt').html(), 'text/html');
    const domElement = doc.body.firstChild;
    return domElement
  })
}

export function formatDate(GMT){ 
    const date = new Date(GMT);
    
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    return `${year}${month}${day}`;
}

export default (str,match)=>{ 
  return Array.from(ci.load(str)(match)).map(item=>ci.load(item)('a').text())
}