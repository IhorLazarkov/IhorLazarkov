window.onload = (data) => {
    // console.log({data});

    // Navigation tabs
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
            // console.log({ current_section, clazz });
            const newClazz = clazz.replace("hidden", "appear").replace("hide", '').trim()
            section.setAttribute("class", newClazz)
        })
    })

    //Work navigation
    let current_work = 'accenture'
    const work_buttons = document.querySelectorAll('#work nav button')
    work_buttons.forEach(button => {

        button.addEventListener('click', (e) => {
            const to = button.getAttribute('to')
            if (current_work !== to) {
                //hide current work tile
                const current_work_tile = document.querySelector(`div#${current_work}`)
                let hide_clazz = current_work_tile.getAttribute('class').replace('appear', 'hide hidden');
                current_work_tile.setAttribute('class', hide_clazz);
                //make it visible
                const work_tile = document.querySelector(`div#${to}`);
                let appear_clazz = work_tile.getAttribute('class');
                appear_clazz = appear_clazz.replace(' hidden', ' appear').replace('hide', '');
                work_tile.setAttribute('class', appear_clazz);
                //make the sellection as current work
                const prev_button = document.querySelector(`#work nav button[to=${current_work}]`);
                prev_button.setAttribute('class', prev_button.getAttribute('class').replace('active', '').trim())
                button.setAttribute('class', 'active');
                current_work = to;
            }
        })
    })
};