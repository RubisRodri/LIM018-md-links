
const linkStats = (arraylinks) => { // --STATS
    const totalArray = arraylinks.map(link => link.href);
    const uniqueLinks = [...new Set(totalArray)];
    return [{
        total: totalArray.length,
        uniqueLinks: uniqueLinks.length,
    }]
};

const totalLink = (arraylinks) => {
    const totalArray = arraylinks.map(link => link.href);
    const uniqueLinks = [...new Set(totalArray)];
    const brokenLinks = arraylinks.filter( link => link.status != 200);
    return{
        Total: totalArray.length,
        Unique:uniqueLinks.length,
        Broken : brokenLinks.length,
    }
};

//module.exports = linkStats;
module.exports = totalLink;

//module.exports = { linkStats, totalLink, }**no se exporta bien
