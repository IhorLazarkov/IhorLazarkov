window.onload = (data) => {
    // console.log({data});
    let current_section = 'home';
    const actionButtons = document.querySelectorAll('#actions > button');

    actionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            //hide
            if (current_section !== '' && current_section !== button.getAttribute('to')) {
                
                const prevButton = document.querySelector(`button[to=${current_section}]`)
                const newClass = prevButton.getAttribute('class').replace('active', '').trim()
                prevButton.setAttribute('class', newClass);

                const section = document.querySelector(`section#${current_section}`);
                const clazz = section.getAttribute('class')
                if (clazz.indexOf('appear') > -1) {
                    section.setAttribute('class', clazz.replace("appear", "hide hidden"))
                }
                button.setAttribute('class', button.getAttribute('class').concat(' active'))
            }
            
            current_section = button.getAttribute('to');
            const section = document.querySelector(`#${current_section}`);
            //make it appear
            const clazz = section.getAttribute("class");
            console.log({ current_section, clazz });
            const newClazz = clazz.replace("hidden", "appear").replace("hide", '').trim()
            section.setAttribute("class", newClazz)
        })

    })
};