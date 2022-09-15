
const linkStats = (arraylinks) => {
    const totalArray = arraylinks.map(link => link.href);
    const uniqueLinks = [...new Set(totalArray)];
    return {
        Total: totalArray.length,
        UniqueLinks: uniqueLinks.length,
    }
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




module.exports = { linkStats, totalLink };