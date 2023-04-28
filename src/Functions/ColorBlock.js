
function colorBlock(block) {
    const colors = ["#a4a4a4", "#f5495c", "#f46d43", "#fdae61", "#fee08b", "#e6f598", "#abdda4", "#66c2a5", "#3288bd", "#8c77ea"]

    if (block.includes('(') || block.includes('%')) return colors[0]
    if (block.includes('T')) return colors[4]
    if (block.includes('X')||block.includes('U')) return colors[1]
    if (block.includes('Z')||block.includes('W')) return colors[8]
    if (block.includes('F')) return colors[3]
    if (block.includes('R')) return colors[5]
    if (block.includes('S')) return colors[2]
    if (block==='M01' || block === 'M1' || block==='M0' || block==='M00' || block==='M30') return colors[9]

  }

  export default colorBlock;