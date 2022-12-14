export function HideTextInput(event, primary, secondary) {
  try {
    let projectDiv = document.querySelector(`.${primary}`)
    let projectDisplayButton = document.querySelector(`.${secondary}`)
    const hasButton = event.target.classList.contains(secondary)
    const hasProjectDiv = event.target.classList.contains(primary) || event.target.parentElement.classList.contains(primary)  
    if(hasProjectDiv || hasButton) {
      projectDiv.style.display = 'flex'
      projectDisplayButton.style.display = 'none'   
      projectDiv.getElementsByTagName('input')[0].focus()
    } else {
      projectDiv.style.display = 'none'
      projectDisplayButton.style.display = ''
    }
  } catch {
    // How to fix warning in output hehehe
  }
}