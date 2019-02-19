export const marqueeMove = () => {
    const text = `designed and developed by <a href="https://leandrodcc.com/" target="_blank">Leandro Contreras</a> 
    — hit me up on <a href="https://twitter.com/leandrodcc" target="_blank">twitter</a> — check out my 
    <a href="https://github.com/leandrodcc" target="_blank">code</a>`
    const marqueeText = new Array(50).fill(text).join('  —  ')
    const marquee = document.querySelector('.marquee span')
    marquee.innerHTML = marqueeText
}