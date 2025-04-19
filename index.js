const colorPicker = document.getElementById('color-picker')
const colorMode = document.getElementById('color-scheme')
const getColorBtn = document.getElementById('get-color')
let color = colorPicker.value.slice(1)
let currentcolorMode = colorMode.value
let currentColors = [colorPicker.value, '#2B283A', '#FBF3AB', '#AAD1B6', '#A626D3']
colorPicker.addEventListener('input', function(){
    color = colorPicker.value.slice(1)
})

colorMode.addEventListener('change', function(e){
    currentcolorMode = e.target.value
})

getColorBtn.addEventListener('click', function(){
    let count = 2
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorPicker.value.slice(1)}&format=json&mode=${currentcolorMode}&count=4`).then(res => res.json()).then(data =>{
        currentColors = [colorPicker.value]
        for (color of data.colors){
            document.getElementById('color1').style.backgroundColor = colorPicker.value
            document.getElementById('color1text').textContent = colorPicker.value
            document.getElementById(`color${count}`).style.backgroundColor = color.hex.value
            document.getElementById(`color${count}text`).textContent = color.hex.value
            count++
            currentColors.push(color.hex.value)
           
        }
       
    })
})

document.addEventListener('click', function(e){
    if (e.target.className === "color" || e.target.className === "row2"){
        for (let i = 0; i<=currentColors.length; i++){
            if (e.target.id === `color${i}` || e.target.id === `color${i}text`){
                 navigator.clipboard.writeText(currentColors[i-1]).then(() => {
                     const bubble = document.createElement("span");
                        bubble.textContent = "Copied!";
                        bubble.style.position = "absolute";
                        bubble.style.left = `${e.pageX}px`;
                        bubble.style.top = `${e.pageY}px`;
                        bubble.style.fontSize = "14px";
                        bubble.style.background = "#000";
                        bubble.style.color = "#fff";
                        bubble.style.padding = "4px 8px";
                        bubble.style.borderRadius = "6px";
                        bubble.style.opacity = "1";
                        bubble.style.transition = "all 0.6s ease-out";
                        bubble.style.pointerEvents = "none";
                        document.body.appendChild(bubble);
                        requestAnimationFrame(() => {
                        bubble.style.top = `${e.pageY - 30}px`;
                        bubble.style.opacity = "0";
                        });
                        setTimeout(() => bubble.remove(), 600);
                 })
            }
            
        }
    }
})