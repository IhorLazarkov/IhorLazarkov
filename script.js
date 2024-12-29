const tabs = document.querySelectorAll('.tab-title');

tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {

        //clear all the active classes
        document.querySelectorAll('.tab-title').forEach(node => {
            node.setAttribute('class', node.getAttribute('class').replace(' active', ''));
        })

        //apply active class
        const style = e.target.getAttribute('class');
        if (style.indexOf('active') > -1) e.target.setAttribute('class', style.replace(' active', ''));
        else e.target.setAttribute('class', style.concat(' active'));
    });
});