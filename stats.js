
const linkStats = (arraylinks) => { // --STATS
    const totalArray = arraylinks.map(link => link.href);
    const uniqueLinks = [...new Set(totalArray)];
    return {
        total: totalArray.length,
        uniqueLinks: uniqueLinks.length
    }
};

module.exports = linkStats;
