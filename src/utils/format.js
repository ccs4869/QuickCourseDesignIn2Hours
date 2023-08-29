import ci from 'cheerio'


export function formatCi(str,match){ 
  return Array.from(ci.load(str)(match)).map(item=>ci.load(item)('a').text())
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